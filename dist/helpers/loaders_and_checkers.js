'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadJSON = loadJSON;
exports.loadDocument = loadDocument;
exports.checkExist = checkExist;

var _cheerio = require('cheerio');

var cheerio = _interopRequireWildcard(_cheerio);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function loadJSON(JSONFile) {
    var contents = _fs2.default.readFileSync(JSONFile);
    var jsonContent = JSON.parse(contents);
    return jsonContent;
}

function loadDocument(contents) {
    var $ = cheerio.load(contents);
    return $;
}
function checkExist($, tag_name, tag_attr) {
    if ($(tag_name).length) {
        if ($(tag_name).attr(tag_attr)) {
            return false;
        }
        return true;
    } else {
        return false;
    }
}
//# sourceMappingURL=loaders_and_checkers.js.map