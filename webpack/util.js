/**
 * Created by ZLY on 2018/11/8.
 */

const path = require('path')
module.exports = {
    resolvePath: (dir) => path.join(__dirname, '..', dir),
    publicPath: '/'
}
