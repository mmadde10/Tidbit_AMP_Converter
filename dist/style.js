'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeDisallowedStyles = removeDisallowedStyles;
exports.validateStyle = validateStyle;
exports.removeExternalStyles = removeExternalStyles;

var _cheerio = require('cheerio');

var cheerio = _interopRequireWildcard(_cheerio);

var _index = require('../index');

var main = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var styleRules = require('./ampRules/styleRules');

function removeDisallowedStyles($) {
    $('body').children('style').each(function () {
        $(this).remove();
    });
    $("* [style]").removeAttr("style");
    $("* [type]").removeAttr("type");
}
function validateStyle($) {
    var style = $('head').find('style:not([amp-boilerplate])');
    var css = $(style).html();
    var ampStyle = '<style amp-custom>' + css + '</style>';
    $(style).replaceWith(ampStyle);
}
function removeExternalStyles($) {
    var fonts = styleRules.externalStylesheet.attrs.value;
    $('link[rel="stylesheet"]').each(function (index, element) {
        for (var value in fonts) {
            if ($(this).attr('[href=' + fonts[value] + ']') !== undefined) {
                return true;
            }
        }
        $(this).remove();
    });
}
//# sourceMappingURL=style.js.map