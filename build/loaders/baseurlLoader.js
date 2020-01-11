const config = require('../config')
module.exports = function baseurlLoader(source) {
  return source.replace('/netease-api', config.baseUrl)
}