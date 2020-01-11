const config = require('../config')
modules.exports = function baseurlLoader(source) {
  return source.replace('/netease-api', config.baseUrl)
}