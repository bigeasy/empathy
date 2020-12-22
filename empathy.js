module.exports = function (value) {
    if (value === null) return 'null'
    if (value === void(0)) return 'undefined'
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
}
