var ampTags = {
    doctype: "<!doctype html>",
    ampHTML:'<html ⚡ lang="en">',
    charset:  '<meta charset="utf-8" />',
    viewport: '<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">',
    canonical:`<link rel=canonical" href="${canonicalLink}">`,
    ampBoilerplate:"<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>",
    ampScript: `<script async src="https://cdn.ampproject.org/v0.js"></script>`,
    CSS:`<style amp-custom>${CSS}</style>`,
    notBoiler:`style:not([amp-boilerplate])`
}
var ampBodyTags = {
    ampImage: `<amp-img src="${src}" layout=${layout} width="${width}" height="${height}">${content}</amp-img>`,
    ampIframe: `<amp-iframe width="${width}" height="${height}" sandbox="allow-scripts allow-same-origin" layout="responsive" title=${title} id=${id} src=${src}></amp-iframe>`
}
var social = {
    facebook: `<amp-social-share id="ampFacebookLink"  width="${width}" height="${height}"  type="facebook" data-param-app_id=${facebookAppId}></amp-social-share>`,
    twitter: `<amp-social-share id="ampTwitterLink"  width="${width}" height="${height}" type="twitter"></amp-social-share>`,
    linkedIn: `<amp-social-share id="ampLinkedinLink"  width="${width}" height="${height}"  type="linkedin"></amp-social-share>`
}
var banned_scripts = {
    text_template: 'script[type="text/template"]',
    app_temp: 'script[type="application/template"]',
    text_javascrpt: 'script[type="text/javascript"]',
    external_stylesheet: 'link[rel="stylesheet"]'
}
var inline_style = {
    p:'p',
    span:'span',
    table:'table',
    td:'td',
    tr:'tr',
    th:'th'
}
module.exports = ampBodyTags,social,banned_scripts,inline_style;