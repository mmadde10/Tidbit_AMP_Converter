"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var style = exports.style = {
  tag_name: "style",
  amp_tag: "style amp-custom",
  mandatory_parent: 'head',
  disallowed_parent: "body",
  body_attrs: "style",
  max_size: 50000
};
var externalStylesheet = exports.externalStylesheet = {
  tag_name: 'link',
  mandatory_parent: 'head',
  attrs: {
    name: 'href',
    value: ['https://cdn\\.materialdesignicons\\.com/', '([0-9]+\\.?)+/css/materialdesignicons\\.min\\.css|', 'https://cloud\\.typography\\.com/', '[0-9]*/[0-9]*/css/fonts\\.css|', 'https://fast\\.fonts\\.net/.*|', 'https://fonts\\.googleapis\\.com/css\\?.*|', 'https://fonts\\.googleapis\\.com/icon\\?.*|', 'https://fonts\\.googleapis\\.com/earlyaccess/.*\\.css|', 'https://maxcdn\\.bootstrapcdn\\.com/font-awesome/', '([0-9]+\\.?)+/css/font-awesome\\.min\\.css(\\?.*)?|', 'https://use\\.fontawesome\\.com/releases/', 'v([0-9]+\\.?)+/css/(all|brands|solids|fontawesome)\\.css|', 'https://use\\.typekit\\.net/[\\w\\p{L}\\p{N}_]+\\.css']
  }
};
//# sourceMappingURL=styleRules.js.map