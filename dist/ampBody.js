'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleAMPTags = handleAMPTags;
exports.handleScripting = handleScripting;

var _cheerio = require('cheerio');

var cheerio = _interopRequireWildcard(_cheerio);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var bodyRules = require('./ampRules/bodyRules').bodyRules;
var scriptRules = require('./ampRules/scriptRules');
var appendRequiredScripts = require('./ampHead').appendRequiredScripts;

function handleAMPTags($) {
    var ruleAttrName = void 0;
    var content = void 0;
    var Attributes = void 0;
    var newAMPTag = void 0;

    for (var index in bodyRules) {
        $('body').find(bodyRules[index].tag_name).each(function () {
            var attrString = '';
            ruleAttrName = bodyRules[index].attrs;
            content = $(this).html();
            Attributes = $(this).attr();
            for (var j in Attributes) {
                if (ruleAttrName.includes(j)) {
                    attrString += j + '=' + Attributes[j] + ' ';
                }
            }
            newAMPTag = '<' + bodyRules[index].amp_name + ' ' + attrString + '>' + content + '</' + bodyRules[index].amp_name + '>';
            $(this).replaceWith(newAMPTag);
            if ($(this)[0].name === bodyRules[index].tag_name && bodyRules[index].required_script) {
                //append required_script to head
                console.log('tt', bodyRules[index].required_script);
                appendRequiredScripts($, bodyRules[index].required_script);
            }
        });
    }
}
function handleScripting($) {
    for (var index in scriptRules.script.dissallowed_type) {
        $('script[type="' + scriptRules.script.dissallowed_type[index] + '"]').each(function () {
            $(this).remove();
        });
    }
}
//# sourceMappingURL=ampBody.js.map