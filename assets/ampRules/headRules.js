let MandatoryAMPTags = {
  Doctype: {
    tag_name: "!DOCTYPE",
    spec_name: "html doctype",
    mandatory_parent: ":ROOT",
    fix_type: "append",
    mandatory: true,
    unique: true,
    attrs: {
      name: "html",
      mandatory: true,
      value: ""
      }
  },
  AMP: {  // AMP
    html_format: AMP,
    tag_name: "HTML",
    spec_name: "html ⚡ for top-level html",
    mandatory: true,
    fix_type: "append",
    original: "HTML",
    mandatory_parent: "!DOCTYPE",
    unique: true,
    replacement: '<html amp lang="en">',
    attrs: {
      name: "⚡",
      alternative_names: "amp",
      mandatory: true,
      value: "",
    }  
  },
  Head: {
    tag_name: "HEAD",
    mandatory: true,
    mandatory_parent: "HTML",
    unique: true
  },
  Title: {
    tag_name: "TITLE",
    spec_name: "title"
  },
  tags: {
    html_format: AMP,
    tag_name: "BASE",
    unique: true,
    mandatory_parent: "HEAD",
    attrs: {
      name: "href",
      value: "/"
    }
  },
  canonical: {
    html_format: AMP,
    html_format: EXPERIMENTAL,
    tag_name: "LINK",
    spec_name: "link[rel=canonical]"
    replacement: "link rel=canonical",
    mandatory_parent: "HEAD",
    mandatory: true,
    unique: true,
    attrs: {
      name: "href",
      mandatory: true,
      value_url: {
        allowed_protocol: "http",
        allowed_protocol: "https",
        allow_relative: true
      }
    }
  }
};

let link = {
//Disallowed attr for link  
attr_lists: {
  dissallowed_attrs_list:[
    "charset", 
    "color",
    "crossorigin",
    "hreflang",
    "media",
    "sizes",
    "target",
    "type"
  ]
},
  //Link for cannonical
  tags: {
    html_format: AMP,
    html_format: EXPERIMENTAL,
    tag_name: "LINK",
    spec_name: "link rel=canonical",
    mandatory_parent: "HEAD",
    mandatory: true,
    unique: true,
    attrs: {
      name: "href",
      mandatory: true,
      value_url: {
        allowed_protocol: "http",
        allowed_protocol: "https",
        allow_relative: true
      },
      blacklisted_value_regex: "__amp_source_origin",
    },
    attrs: {
      name: "rel",
      value_casei: "canonical",
      mandatory: true,
      dispatch_key: NAME_VALUE_DISPATCH,
    },
    attr_lists: "common-link-attrs"
  },
  tags: {
    html_format: AMP,
    html_format: AMP4ADS,
    html_format: EXPERIMENTAL,
    tag_name: "LINK",
    spec_name: "link rel=",
    disallowed_ancestor: "TEMPLATE",
    attrs: { name: "href" },
    attrs: {
      name: "rel",
      mandatory: true,
      blacklisted_value_regex: ["(^|\\s)(" , 
          "canonical|" , 
          "components|",
          "import|",
          "manifest|", 
          "preload|",  
          "serviceworker|",
          "stylesheet|", 
          "subresource|",
          ")(\\s|$)"]
    },
    attr_lists: "common-link-attrs"
  },
  linkStyle: {
    html_format: AMP,
    html_format: AMP4ADS,
    tag_name: "LINK",
    spec_name: "link rel=stylesheet for fonts",
    mandatory_parent: "HEAD",
    attrs: { name: "async" },
    attrs: {
      name: "href",
      mandatory: true,
      value_regex: ["https://cdn\\.materialdesignicons\\.com/",
                   "([0-9]+\\.?)+/css/materialdesignicons\\.min\\.css|",
                   "https://cloud\\.typography\\.com/",
                   "[0-9]*/[0-9]*/css/fonts\\.css|",
                   "https://fast\\.fonts\\.net/.*|",
                   "https://fonts\\.googleapis\\.com/css\\?.*|",
                   "https://fonts\\.googleapis\\.com/icon\\?.*|",
                   "https://fonts\\.googleapis\\.com/earlyaccess/.*\\.css|",
                   "https://maxcdn\\.bootstrapcdn\\.com/font-awesome/",
                   "([0-9]+\\.?)+/css/font-awesome\\.min\\.css(\\?.*)?|",
                   "https://use\\.fontawesome\\.com/releases/",
                   "v([0-9]+\\.?)+/css/(all|brands|solids|fontawesome)\\.css|",
                   "https://use\\.typekit\\.net/[\\w\\p{L}\\p{N}_]+\\.css"]
    }
  }
};
// 4.2.5 the meta element
// Charset must be utf8, and a specific viewport is required.
let meta = {
  tag_name: "META",
  fix_type: "append",
  spec_name: "meta charset=utf-8",
  mandatory: true,
  mandatory_parent: "HEAD",
  unique: true,
  attrs: {
    dispatch_key: NAME_DISPATCH,
    name: "charset",
    mandatory: true,
    value_casei: "utf-8"
  },
  //Viewport 
  tags: {
    html_format: AMP,
    html_format: AMP4ADS,
    tag_name: "META",
    spec_name: "meta name=viewport",
    fix_type: "append",
    mandatory: true,
    mandatory_parent: "HEAD",
    unique: true,
    attrs: {
      name: "content",
      mandatory: true,
      value_properties: {
        properties: { name: "width", mandatory: true, value: "device-width"},
        properties: { name: "height" },
        properties: { name: "initial-scale" },
        properties: { name: "minimum-scale", mandatory: true, value_double: 1.0 },
        properties: { name: "maximum-scale" },
        properties: { name: "shrink-to-fit" },
        properties: { name: "user-scalable" },
        properties: { name: "viewport-fit" }
      }
    },
    attrs: {
      name: "name",
      mandatory: true,
      value: "viewport",
      dispatch_key: NAME_VALUE_DISPATCH
    }
  },
};
let ampBoiler = {
  html_format: AMP,
  html_format: EXPERIMENTAL,
  tag_name: "STYLE",
  spec_name: "head > style[amp-boilerplate]",
  satisfies: "head > style[amp-boilerplate]",
  mandatory_alternatives: "head > style[amp-boilerplate]",
  unique: true,
  mandatory_parent: "HEAD",
  requires: "noscript > style[amp-boilerplate]",
  attrs: {
    name: "amp-boilerplate",
    mandatory: true,
    value: "",
    dispatch_key: NAME_VALUE_PARENT_DISPATCH,
  },
  attrs: { name: "nonce" },
  cdata: {
    cdata_regex: "\\s*body{-webkit-animation:-amp-start\\s+8s\\s+steps\\(1,end\\)\\s+0s\\s+1\\s+normal\\s+both;-moz-animation:-amp-start\\s+8s\\s+steps\\(1,end\\)\\s+0s\\s+1\\s+normal\\s+both;-ms-animation:-amp-start\\s+8s\\s+steps\\(1,end\\)\\s+0s\\s+1\\s+normal\\s+both;animation:-amp-start\\s+8s\\s+steps\\(1,end\\)\\s+0s\\s+1\\s+normal\\s+both}@-webkit-keyframes\\s+-amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes\\s+-amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes\\s+-amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes\\s+-amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes\\s+-amp-start{from{visibility:hidden}to{visibility:visible}}\\s*"
  },
};

module.exports = MandatoryAMPTags, link, meta, ampBoiler;