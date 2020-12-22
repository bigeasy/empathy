module.exports = function (value) {
    if (value === null) return 'null'
    if (value === void(0)) return 'undefined'
    const type = Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
    return type == 'asyncfunction' ? 'function' : type
}
