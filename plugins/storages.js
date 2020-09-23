class Storage {
  constructor (type) {
    if (type === 'sessionStorage') {
      this._init(sessionStorage, type)
    } else {
      this._init(localStorage, 'localStorage')
    }
  }

  set (key, value) {
    this._typeCheck(key)
    this.storage.setItem(key, this._stringify(value))
  }

  get (key) {
    this._typeCheck(key)
    return this._parse(this.storage.getItem(key))
  }

  remove (key) {
    this._typeCheck(key)
    this.storage.removeItem(key)
  }

  pop (key) {
    const value = this.get(key)
    this.remove(key)
    return value
  }

  clear () {
    this.storage.clear()
  }

  watch () {
    const storageHandler = (e) => {
      console.log(111, e)
    }

    const setItemHandler = (e) => {
      console.log(222, e)
    }

    // only localStorage can trigger storage event
    if (this.type === 'localStorage') {
      window.removeEventListener('storage', storageHandler)
      window.addEventListener('storage', storageHandler)
    }

    window.removeEventListener(`${this.type}SetItem`, setItemHandler)
    window.addEventListener(`${this.type}SetItem`, setItemHandler)
  }

  _init (storage, type) {
    this.type = type
    const _stringify = this._stringify

    // original functions
    const setItem = storage.setItem
    const removeItem = storage.removeItem

    storage.setItem = function (key, value) {
      const oldValue = storage.getItem(key)
      value = _stringify(value)
      if (oldValue !== value) {
        const setItemEvent = new Event(`${type}SetItem`)
        setItemEvent.key = key
        setItemEvent.newValue = value
        setItemEvent.oldValue = oldValue
        window.dispatchEvent(setItemEvent)
        setItem.call(this, key, value)
      }
    }

    storage.removeItem = function (key) {
      const oldValue = storage.getItem(key)
      const removeItemEvent = new Event(`${type}RemoveItem`)
      removeItemEvent.key = key
      removeItemEvent.newValue = null
      removeItemEvent.oldValue = oldValue
      window.dispatchEvent(removeItemEvent)
      removeItem.call(this, key)
    }

    this.storage = storage
    this.watch()
  }

  _typeCheck (key) {
    if (!['number', 'string'].includes(typeof key)) {
      throw new Error(`${this.type} key type must be number or string`)
    }
  }

  _stringify (value) {
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
    local: new Storage('localStorage'),
    session: new Storage('sessionStorage')
  })
}
