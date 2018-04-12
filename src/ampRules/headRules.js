const canonical = {
    tag_name: 'link',
    spec_name: 'link',
    amp_tag: ' <link rel="canonical" href="/">',
    mandatory_parent: 'HEAD',
    attrs: ['href','rel']
};
const meta = {
    tag_name: 'meta',
    amp_tag: '<meta charset="utf-8">'
}
const viewport = {
    tag_name: 'meta',
    amp_tag: `<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">`,
    attrs: ['content','width'],
    mandatory_parent: 'HEAD',
    value: 'device-width',
    properties: [
      'initial-scale',
      'height',
      'maximum-scale',
      'shrink-to-fit',
      'user-scalable',
      'viewport-fit',
    ],
};
const boilerplate = {
    tag_name: 'STYLE',
    mandatory_parent: 'HEAD',
    amp_tag: '<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>\n',
};

const ampScript = {
    tag_name: 'script',
    required_script: `<script async src="https://cdn.ampproject.org/v0.js"></script>`
};

module.exports = {canonical,viewport,boilerplate,ampScript,meta};