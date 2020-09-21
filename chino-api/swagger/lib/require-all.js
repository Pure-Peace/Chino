const fs = require('fs')

const DEFAULT_EXCLUDE_DIR = /^\./
const DEFAULT_FILTER = /^([^.].*)\.js(on)?$/
const DEFAULT_RECURSIVE = true

module.exports = function requireAll (options) {
  const dirname = typeof options === 'string' ? options : options.dirname
  const excludeDirs = options.excludeDirs === undefined ? DEFAULT_EXCLUDE_DIR : options.excludeDirs
  const filter = options.filter === undefined ? DEFAULT_FILTER : options.filter
  const modules = {}
  const recursive = options.recursive === undefined ? DEFAULT_RECURSIVE : options.recursive
  const resolve = options.resolve || identity
  const map = options.map || identity

  function excludeDirectory (dirname) {
    return !recursive ||
      (excludeDirs && dirname.match(excludeDirs))
  }

  function filterFile (filename) {
    if (typeof filter === 'function') {
      return filter(filename)
    }

    const match = filename.match(filter)
    if (!match) { return }

    return match[1] || match[0]
  }

  const files = fs.readdirSync(dirname)

  files.forEach(function (file) {
    const filepath = dirname + '/' + file
    if (fs.statSync(filepath).isDirectory()) {
      if (excludeDirectory(file)) { return }

      const subModules = requireAll({
        dirname: filepath,
        filter,
        excludeDirs,
        map,
        resolve
      })

      if (Object.keys(subModules).length === 0) { return }

      modules[map(file, filepath)] = subModules
    } else {
      const name = filterFile(file)
      if (!name) { return }

      modules[map(name, filepath)] = resolve(require(filepath))
    }
  })

  return modules
}

function identity (val) {
  return val
}
