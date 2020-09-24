class Storage {
  constructor (type) {
    const types = {
      localStorage,
      sessionStorage
    }
    if (!types[type]) {
      throw new TypeError(`type must be localStorage or sessionStorage, not ${type}`)
    }
    this._init(types[type], type)
  }

  _init (storage, type) {
    // funcs
    const _typeCheck = this._typeCheck
    const _stringify = this._stringify
    const _parse = this._parse
    const _event = (type, data) => {
      window.dispatchEvent(Object.assign(
        new Event(type), { ...data, storageArea: storage, url: window.location.href }
      ))
    }

    // original functions
    const getItem = storage.getItem
    const setItem = storage.setItem
    const removeItem = storage.removeItem
    const clearStorage = storage.clear

    // deep copy prototype of storage
    const _storage = Object.create(Object.getPrototypeOf(storage))
    _storage._type = type

    // rewrite functions of prototype
    _storage.getItem = function (key, parse = true) {
      _typeCheck(key)
      const originVal = getItem.call(this, key)
      const value = parse ? _parse(originVal) : originVal
      _event(`${type}GetItem`, {
        key, newValue: value, oldValue: value
      })
      return value
    }

    _storage.setItem = function (key, value) {
      _typeCheck(key)
      const oldValue = _parse(getItem.call(this, key))
      setItem.call(this, key, _stringify(value))
      _event(`${type}SetItem`, {
        key, newValue: value, oldValue
      })
    }

    _storage.removeItem = function (key) {
      _typeCheck(key)
      const oldValue = getItem.call(this.key)
      removeItem.call(this, key)
      _event(`${type}RemoveItem`, {
        key, newValue: null, oldValue
      })
    }

    _storage.clear = function () {
      clearStorage.call(this)
      _event(`${type}Clear`, {
        key: null, newValue: null, oldValue: null
      })
    }

    _storage.pop = function (key, parse = true) {
      _typeCheck(key)
      const originVal = getItem.call(this, key)
      const oldValue = parse ? _parse(originVal) : originVal
      removeItem.call(this, key)
      _event(`${type}PopItem`, {
        key, newValue: null, oldValue
      })
      return oldValue
    }

    // add function shorthands
    _storage.get = _storage.getItem
    _storage.set = _storage.setItem
    _storage.remove = _storage.removeItem

    // triggers
    _storage.active = {}
    _storage.passive = {}

    // valid events
    _storage._activeEvents = ['get', 'set', 'remove', 'pop', 'clear']
    _storage._passiveEvents = ['set', 'remove', 'clear']

    // watch
    _storage.watch = function (triggerType, eventType, handler) {
      const allowEvents = {
        active: this._activeEvents,
        passive: this._passiveEvents
      }

      if (!['active', 'passive'].includes(triggerType)) {
        throw new Error(`watch trigger type must be active or passive, not ${triggerType}`)
      }
      if (!allowEvents[triggerType].includes(eventType)) {
        throw new Error(`${triggerType} trigger allows the following events: ${allowEvents[triggerType]}, not ${eventType}`)
      }
      if (typeof handler !== 'function') {
        throw new TypeError(`watch handler must be a function, not ${typeof handler}`)
      }
      _storage[triggerType][eventType] = handler
    }

    // unwatch
    _storage.unwatch = function (triggerType, eventType) {
      try {
        delete (this[triggerType][eventType])
      } catch {}
    }

    // add ACTIVE (only valid for the current page) listeners & handlers
    for (const [eventType, handler] of Object.entries({
      GetItem: e => _storage.active.get && _storage.active.get(e),
      SetItem: e => _storage.active.set && _storage.active.set(e),
      RemoveItem: e => _storage.active.remove && _storage.active.remove(e),
      PopItem: e => _storage.active.pop && _storage.active.pop(e),
      Clear: e => _storage.active.clear && _storage.active.clear(e)
    })) {
      window.removeEventListener(`${type}${eventType}`, handler)
      window.addEventListener(`${type}${eventType}`, handler)
    }

    // add PASSIVE (only triggered by other pages) listeners & handlers
    // only localStorage can trigger storage event, because the sessionStorage is separate
    if (type === 'localStorage') {
      const storageEventHandler = (e) => {
        const parse = (storageEvent, ...props) => props.forEach(
          prop => Object.defineProperty(
            storageEvent, prop, { value: _parse(storageEvent[prop]) }
          ))

        if ([e.key, e.newValue, e.oldValue].every(i => i === null)) {
          // on clear
          _storage.passive.clear && _storage.passive.clear(e)
        } else if (e.key !== null && e.newValue !== null) {
          // on set
          parse(e, 'newValue', 'oldValue')
          _storage.passive.set && _storage.passive.set(e)
        } else if (e.key !== null && e.newValue === null) {
          // on remove
          parse(e, 'newValue', 'oldValue')
          _storage.passive.remove && _storage.passive.remove(e)
        }
      }

      window.removeEventListener('storage', storageEventHandler)
      window.addEventListener('storage', storageEventHandler)
    }

    // set prototype of storage
    Object.setPrototypeOf(storage, _storage)

    // done
    this.storage = storage
  }

  _typeCheck (key) {
    if (key && !['number', 'string'].includes(typeof key)) {
      throw new Error('key type must be number or string')
    }
  }

  _stringify (value) {
    if (typeof value === 'string') { return value }
    try {
      return JSON.stringify(value)
    } catch {
      return value
    }
  }

  _parse (value) {
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }
}

export default (context, inject) => {
  inject('storages', {
    local: new Storage('localStorage').storage,
    session: new Storage('sessionStorage').storage
  })
}
