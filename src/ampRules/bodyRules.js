const img = {
  tag_name: "img",
  amp_name: "amp-img",
  attrs: [
    "src",
    "alt", 
    "border",
    "height",
    "width",
    "layout"
  ],
  mandatory_attrs:[
      "height",
      "width",
      "layout"
  ]
};
const iframe = {
    tag_name: "iframe",
    amp_name: "amp-iframe",
    attrs: [
        "name",
        "frameborder",
        "referrerpolicy",
        "resizable",
        "height",
        "sandbox",
        "scrolling",
        "src",
        "srcdoc",
        "width"
    ],
    mandatory_attrs:[
        "height",
        "width",
        "layout"
    ],
    required_script:`<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>`
};
const video = {
  tag_name: "video",
  amp_name: "amp-video",
  attrs:[ 
       "autoplay", 
       "controls",
       "height",
       "loop",
       "muted",
       "autoplay",
       "poster",
       "playsinline",
       "preload",
       "src",
       "width"
  ],
  required_script:`<script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>`
};
const form = {
tag_name: "form",
amp_tag: "amp-form",
attrs: [ 
        "accept",
        "accept-charset",
        "action-xhr",
        "autocomplete",
        "custom-validation-reporting",
        "enctype",
        "method",
        "name",
        "novalidate",
        "target",
        "verify-xhr"
    ]
}
const input =  {
    tag_name: "input",
    amp_tag: "input",
    attrs: [    
     "accept",
     "accesskey",
     "autocomplete",
     "autofocus",
     "checked",
     "disabled",
     "height",
     "inputmode",
     "list",
     "max",
     "maxlength",
     "min",
     "minlength",
     "multiple",
     "pattern",
     "placeholder",
     "readonly",
     "required",
     "selectiondirection",
     "size",
     "spellcheck",
     "step",
     "tabindex",
     "value",
     "width",
    ]
};
const list =  {
    tag_name: "list",
    amp_tag: "amp_list",
    required_script: `<script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"></script>`
};
const audio = {
    tag_name: "audio",
    amp_tag: "amp-audio",
    attrs:[ 
        "autoplay", 
        "controls", 
        "loop",
        "muted",
        "preload", 
        "src"
    ],
    required_script: `<script async custom-element="amp-audio" src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script>`
};
export const bodyRules = {img, iframe, video}
    