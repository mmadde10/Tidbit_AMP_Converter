'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createHead = createHead;
exports.validateBody = validateBody;
exports.validateStyleTags = validateStyleTags;

var _cheerio = require('cheerio');

var cheerio = _interopRequireWildcard(_cheerio);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var head = require('./ampHead');
var body = require('./ampBody');
var style = require('./style');

function createHead($) {
    head.handleHTMLTags($);
}

function validateBody($) {
    body.handleAMPTags($);
    body.handleScripting($);
}
function validateStyleTags($) {
    style.removeDisallowedStyles($);
    style.validateStyle($);
    style.removeExternalStyles($);
}
//# sourceMappingURL=ampDocument.js.map