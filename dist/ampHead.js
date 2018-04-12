'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleHTMLTags = handleHTMLTags;
exports.appendRequiredScripts = appendRequiredScripts;

var _cheerio = require('cheerio');

var cheerio = _interopRequireWildcard(_cheerio);

var _headRules = require('./ampRules/headRules');

var headRules = _interopRequireWildcard(_headRules);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var helper = require('./helpers/loaders_and_checkers');

function handleHTMLTags($) {

    if ($('meta[name="viewport"]').length == 0) {
        $('head').append(headRules.viewport.amp_tag);
    }
    $('head').append(headRules.boilerplate.amp_tag);
    $('head').append(headRules.canonical.amp_tag);
    $('head').append(headRules.meta.amp_tag);
    appendRequiredScripts($, headRules.ampScript.required_script);
}

function appendRequiredScripts($, requred_script) {
    $('head').append('\n' + requred_script);
}
//# sourceMappingURL=ampHead.js.map