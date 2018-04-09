// 4.2.6 The style
let authorStylesheet = {  
  html_format: AMP,
  html_format: EXPERIMENTAL,
  tag_name: "STYLE",
  spec_name: "style amp-custom",
  unique: true,
  mandatory_parent: "HEAD",
  attrs: {
    name: "amp-custom",
    mandatory: true,
    value: ""
  },
  attrs: { name: "nonce" },
  attrs: {  
    name: "type",
    value_casei: "text/css"
  },
  cdata: {
    max_bytes: 50000,
    css_spec: {
      at_rule_spec: {
        name: 'font-face',
        type: PARSE_AS_DECLARATIONS
      },
      at_rule_spec: {
        name: 'keyframes',
        type: PARSE_AS_RULES
      },
      at_rule_spec: {
        name: 'media',
        type: PARSE_AS_RULES
      },
      at_rule_spec: {
        name: 'supports',
        type: PARSE_AS_RULES
      },
      at_rule_spec: {
        name: '$DEFAULT', // matches if none of the above match
        type: PARSE_AS_ERROR
      },
      image_url_spec: {
        allowed_protocol: "https",
        allowed_protocol: "http",
        allowed_protocol: "data",
        allowed_protocol: "absolute", // Temporary / will go away.
        allow_relative: true,
        allow_empty: true
      },
      font_url_spec: {
        allowed_protocol: "https",
        allowed_protocol: "http",
        allowed_protocol: "data",
        allow_relative: true,
        allow_empty: true
      }
    },
    blacklisted_cdata_regex: {
      regex: "<!--",
      error_message: "html comments"
    },
    blacklisted_cdata_regex: {
      regex: "(^|\\W)i-amphtml-",
      error_message: "CSS i-amphtml- name prefix"
    },
    blacklisted_cdata_regex: {
      regex: "!important",
      error_message: "CSS !important"
    }
  }
};
let stylesheetsize = {  
  html_format: AMP4ADS,
  tag_name: "STYLE",
  spec_name: "style amp-custom (AMP4ADS)",
  unique: true,
  mandatory_parent: "HEAD",
  attrs: {
    name: "amp-custom",
    mandatory: true,
    value: ""
  },
  attrs: { name: "nonce" },
  attrs: {  
    name: "type",
    value_casei: "text/css"
  },
  cdata: {
    max_bytes: 20000, 
    css_spec: {
      at_rule_spec: {
        name: 'font-face',
        type: PARSE_AS_DECLARATIONS
      },
      at_rule_spec: {
        name: 'keyframes',
        type: PARSE_AS_RULES
      },
      at_rule_spec: {
        name: 'media',
        type: PARSE_AS_RULES
      },
      at_rule_spec: {
        name: 'supports',
        type: PARSE_AS_RULES
      },
      at_rule_spec: {
        name: '$DEFAULT',
        type: PARSE_AS_ERROR
      },
      image_url_spec: {
        allowed_protocol: "https",
        allowed_protocol: "http",
        allowed_protocol: "data",
        allowed_protocol: "absolute",  
        allow_relative: true,
        allow_empty: true
      },
      font_url_spec: {
        allowed_protocol: "https",
        allowed_protocol: "http",
        allowed_protocol: "data",
        allow_relative: true,
        allow_empty: true
      },
      validate_amp4ads: true
    },
    blacklisted_cdata_regex: {
      regex: "<!--",
      error_message: "html comments"
    },
    blacklisted_cdata_regex: {
      regex: "(^|\\W)i-amphtml-",
      error_message: "CSS i-amphtml- name prefix"
    },
    blacklisted_cdata_regex: {
      regex: "!important",
      error_message: "CSS !important"
    }
  }
}
module.exports = authorStylesheet, stylesheetsize;

