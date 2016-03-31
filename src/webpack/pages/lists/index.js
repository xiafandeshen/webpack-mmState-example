var html = require('list.html');
var lists = require('lists.js')
avalon.templateCache["pages/lists/list.html"] = html
module.exports = {
    ctrl: lists,
    tpl: html
}
