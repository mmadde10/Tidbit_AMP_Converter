//
// Copyright 2016 The AMP HTML Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the license.
//

// This revision id refers to the validator revision id, currently a Google
// internal mechanism. When backwards incompatible changes to the validator
// engine are made, this value must be incremented to prevent old binaries
// in production from crashing. This id is not relevant to validator.js
// because thus far, engine (validator.js) and spec file
// (validator-main.protoascii) are always released together.
min_validator_revision_required: 322

// The spec file revision allows the validator engine to distinguish
// newer versions of the spec file. This is currently a Google internal
// mechanism, validator.js does not use this facility. However, any
// change to this file (validator-main.js) requires updating this revision id.
spec_file_revision: 595

styles_spec_url: "https://www.ampproject.org/docs/guides/author-develop/responsive/style_pages"
script_spec_url: "https://www.ampproject.org/docs/reference/spec//html-tags"

// Validator extensions.
// =====================
// In addition to the rules in this file, the Validator honors the rules
// in the extensions/*/validator-*.protoascii files. This makes it
// easy to organize the rules for extensions next to their Javascript
// implementation.

// Rules for AMP HTML
// (https://www.ampproject.org/docs/reference/spec)

tags: {
  tag_name: "!DOCTYPE"
  spec_name: "html doctype"
  mandatory_parent: "$ROOT"
  mandatory: true
  unique: true
  attrs: {
    name: "html"
    mandatory: true
    value: ""
  }
  spec_url: "https://www.ampproject.org/docs/reference/spec//required-markup"
}

// Below, we list the allowed elements in the order in which they are appear
// in the spec in section 4 "The Elements of HTML"
// (http://www.w3.org/TR/html5/single-page//html-elements).

// 4.1 The root element
// 4.1.1 The html element

tags: {  // AMP4ADS
  html_format: AMP4ADS
  tag_name: "HTML"
  spec_name: "html ⚡4ads for top-level html"
  mandatory: true
  mandatory_parent: "!DOCTYPE"
  unique: true
  attrs: {
    name: "⚡4ads"
    alternative_names: "amp4ads"
    mandatory: true
    value: ""
  }
  spec_url: "https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/amp-a4a-format.md//a4a-format-rules"
}
tags: {  // AMP4EMAIL
  html_format: AMP4EMAIL
  tag_name: "HTML"
  spec_name: "html ⚡4email for top-level html"
  mandatory: true
  mandatory_parent: "!DOCTYPE"
  unique: true
  attrs: {
    name: "⚡4email"
    alternative_names: "amp4email"
    mandatory: true
    value: ""
  }
  spec_url: "https://www.ampproject.org/docs/reference/spec//required-markup"
}

// 4.2 Document metadata
// 4.2.1 The head element
tags: {
  tag_name: "HEAD"
  mandatory: true
  mandatory_parent: "HTML"
  unique: true
  spec_url: "https://www.ampproject.org/docs/reference/spec//required-markup"
}
// 4.2.2 The title element
tags: {
  tag_name: "TITLE"
  spec_name: "title"
}
// 4.2.3 the base element
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "BASE"
  unique: true
  mandatory_parent: "HEAD"
  // We only allow "/" right now because other value can cause havoc with PWA
  // implementations. In the future, it may be possible to widen this to any
  // absolute URL.
  attrs: {
    name: "href"
    value: "/"
  }
  attrs: {
    name: "target"
    value_regex_casei: "(_blank|_self|_top)"
  }
}
// Disallowed.
// 4.2.4 the link element
attr_lists: {
  name: "common-link-attrs"
  attrs: { name: "charset", {value_casei: "utf-8" }}
  attrs}: { name: "color" }
  attrs: { name: "crossorigin" }
  attrs: { name: "hreflang" }
  attrs: { name: "media" }
  attrs: { name: "sizes" }
  attrs: { name: "target" }
  attrs: { name: "type" }
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "LINK"
  spec_name: "link rel="
  disallowed_ancestor: "TEMPLATE"
  attrs: { name: "href" }
  attrs: {
    name: "rel"
    mandatory: true
    blacklisted_value_regex: "(^|\\s)("  // Values are space separated.
        "canonical|"  // Handled separately below, has specific requirements.
        "components|"
        "import|"
        "manifest|"  // Handled separately below, has specific requirements.
        "preload|"  // Handled separately below, has specific requirements.
        "serviceworker|"
        "stylesheet|"  // Handled separately below, has specific requirements.
        "subresource|"
        ")(\\s|$)"
  }
  attr_lists: "common-link-attrs"
  spec_url: "https://www.ampproject.org/docs/reference/spec//html-tags"
}
tags: {
  html_format: AMP
  html_format: EXPERIMENTAL
  tag_name: "LINK"
  spec_name: "link rel=canonical"
  mandatory_parent: "HEAD"
  mandatory: true
  unique: true
  attrs: {
    name: "href"
    mandatory: true
    value_url: {
      allowed_protocol: "http"
      allowed_protocol: "https"
      allow_relative: true
    }
    blacklisted_value_regex: "__amp_source_origin"
  }
  attrs: {
    name: "rel"
    value_casei: "canonical"
    mandatory: true
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attr_lists: "common-link-attrs"
  spec_url: "https://www.ampproject.org/docs/reference/spec//required-markup"
}
// Allow <link rel="manifest" ...> but not <link rel="manifest foo" ...>
tags: {
  html_format: AMP
  html_format: AMP4ADS
  tag_name: "LINK"
  spec_name: "link rel=manifest"
  mandatory_parent: "HEAD"
  satisfies: "amp-app-banner data source"
  attrs: {
    name: "href"
    mandatory: true
    value_url: {
      allowed_protocol: "https"
      allow_relative: true
    }
    blacklisted_value_regex: "__amp_source_origin"
  }
  attrs: {
    name: "rel"
    value_casei: "manifest"
    mandatory: true
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attr_lists: "common-link-attrs"
  spec_url: "https://www.ampproject.org/docs/reference/spec//html-tags"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "LINK"
  spec_name: "link rel=preload"
  disallowed_ancestor: "TEMPLATE"
  attrs: { name: "as" }
  attrs: { name: "href" }
  attrs: {
    name: "rel"
    mandatory: true
    value_casei: "preload"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attr_lists: "common-link-attrs"
  spec_url: "https://www.ampproject.org/docs/reference/spec//html-tags"
}
// Whitelisted font providers
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "LINK"
  spec_name: "link rel=stylesheet for fonts"
  mandatory_parent: "HEAD"
  attrs: { name: "async" }
  attrs: {
    name: "href"
    mandatory: true
    value_regex: "https://cdn\\.materialdesignicons\\.com/"
                 "([0-9]+\\.?)+/css/materialdesignicons\\.min\\.css|"
                 "https://cloud\\.typography\\.com/"
                 "[0-9]*/[0-9]*/css/fonts\\.css|"
                 "https://fast\\.fonts\\.net/.*|"
                 "https://fonts\\.googleapis\\.com/css\\?.*|"
                 "https://fonts\\.googleapis\\.com/icon\\?.*|"
                 "https://fonts\\.googleapis\\.com/earlyaccess/.*\\.css|"
                 "https://maxcdn\\.bootstrapcdn\\.com/font-awesome/"
                 "([0-9]+\\.?)+/css/font-awesome\\.min\\.css(\\?.*)?|"
                 "https://use\\.fontawesome\\.com/releases/"
                 "v([0-9]+\\.?)+/css/(all|brands|solids|fontawesome)\\.css|"
                 "https://use\\.typekit\\.net/[\\w\\p{L}\\p{N}_]+\\.css"
  }
  attrs: { name: "media" }
  attrs: {
    name: "rel"
    mandatory: true
    value_casei: "stylesheet"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attrs: {
    name: "type"
    value_casei: "text/css"
  }
  // SRI attributes (https://www.w3.org/TR/SRI/)
  attrs: { name: "crossorigin" }
  attrs: { name: "integrity" }
  spec_url: "https://www.ampproject.org/docs/reference/spec//custom-fonts"
}
// itemprop=sameAs is allowed per schema.org, needs not be in head
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "LINK"
  spec_name: "link itemprop=sameAs"
  attrs: {
    name: "href"
    mandatory: true
  }
  attrs: {
    name: "itemprop"
    mandatory: true
    value_casei: "sameas"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attr_lists: "common-link-attrs"
  spec_url: "https://www.ampproject.org/docs/reference/spec//html-tags"
}
// rel= isn't mandatory when itemprop= is present.
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "LINK"
  spec_name: "link itemprop="
  attrs: {
    name: "href"
    mandatory: true
  }
  attrs: {
    name: "itemprop"
    mandatory: true
  }
  attr_lists: "common-link-attrs"
  spec_url: "https://www.ampproject.org/docs/reference/spec//html-tags"
}
// rel= isn't mandatory when property= is present.
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "LINK"
  spec_name: "link property="
  attrs: {
    name: "href"
    mandatory: true
  }
  attrs: {
    name: "property"
    mandatory: true
  }
  attr_lists: "common-link-attrs"
  spec_url: "https://www.ampproject.org/docs/reference/spec//html-tags"
}
// 4.2.5 the meta element
// Charset must be utf8, and a specific viewport is required.
tags: {
  tag_name: "META"
  spec_name: "meta charset=utf-8"
  mandatory: true
  mandatory_parent: "HEAD"
  unique: true
  attrs: {
    dispatch_key: NAME_DISPATCH
    name: "charset"
    mandatory: true
    value_casei: "utf-8"
  }
  spec_url: "https://www.ampproject.org/docs/reference/spec//required-markup"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "META"
  spec_name: "meta name=viewport"
  mandatory: true
  mandatory_parent: "HEAD"
  unique: true
  attrs: {
    name: "content"
    mandatory: true
    value_properties: {
      properties: { name: "width", {mandatory: true, value: "device-width" }
      properties: { name: "height" }
      properties: { name: "initial-scale" }
      properties: { name: "minimum-scale", {mandatory: true, value_double: 1.0 }
      properties: { name: "maximum-scale" }
      properties: { name: "shrink-to-fit" }
      properties: { name: "user-scalable" }
      properties: { name: "viewport-fit" }
    }
  }
  attrs: {
    name: "name"
    mandatory: true
    value: "viewport"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  spec_url: "https://www.ampproject.org/docs/reference/spec//required-markup"
}
// This tag is a hack to tell IE 10 to use its modern rendering engine as opposed
// to the IE8 engine. So it's explicitly allowed.
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "META"
  spec_name: "meta http-equiv=X-UA-Compatible"
  mandatory_ancestor: "HEAD"
  attrs: {
    name: "http-equiv"
    mandatory: true
    value_casei: "x-ua-compatible"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attrs: {
    name: "content"
    mandatory: true
    value_properties: {
      properties: { name: "ie", {value: "edge" }
      properties: { name: "chrome",{ value: "1" }
    }
  }
  spec_url: "https://www.ampproject.org/docs/reference/spec//html-tags"
}
// Tag specific to apple-itunes-app installs, see also <amp-app-banner>.
tags: {
  html_format: AMP
  html_format: AMP4ADS
  tag_name: "META"
  spec_name: "meta name=apple-itunes-app"
  mandatory_parent: "HEAD"
  satisfies: "amp-app-banner data source"
  attrs: {
    name: "name"
    value_casei: "apple-itunes-app"
    mandatory: true
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attrs: {
    name: "content"
    mandatory: true
    value_regex: ".*app-id=.*"
  }
  spec_url: "https://www.ampproject.org/docs/reference/spec//html-tags"
}
// AMP & AMP4ADS metadata, name=amp-experiments-opt-in
// https://github.com/lannka/amphtml/blob/master/tools/experiments/README.md
tags: {
  html_format: AMP
  html_format: AMP4ADS
  tag_name: "META"
  spec_name: "meta name=amp-experiments-opt-in"
  mandatory_parent: "HEAD"
  attrs: {
    name: "name"
    mandatory: true
    value_casei: "amp-experiments-opt-in"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attrs: {
    name: "content"
    mandatory: true
  }
}
// AMP metadata, name=amp-3p-iframe-src
tags: {
  html_format: AMP
  tag_name: "META"
  spec_name: "meta name=amp-3p-iframe-src"
  mandatory_parent: "HEAD"
  attrs: {
    name: "name"
    mandatory: true
    value_casei: "amp-3p-iframe-src"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attrs: {
    name: "content"
    mandatory: true
    value_url: {
      allowed_protocol: "https"
    }
  }
  spec_url: "https://www.ampproject.org/docs/reference/components/amp-ad"
}
// AMP metadata, name=amp-experiment-token
// Related to AMP Origin Experiments
tags: {
  html_format: AMP
  tag_name: "META"
  spec_name: "meta name=amp-experiment-token"
  mandatory_parent: "HEAD"
  attrs: {
    name: "name"
    mandatory: true
    value_casei: "amp-experiment-token"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attrs: {
    name: "content"
    mandatory: true
  }
}
// AMP metadata, name=amp-link-variable-allowed-origin
// https://github.com/ampproject/amphtml/issues/8132
tags: {
  html_format: AMP
  tag_name: "META"
  spec_name: "meta name=amp-link-variable-allowed-origin"
  mandatory_parent: "HEAD"
  attrs: {
    name: "name"
    mandatory: true
    value_casei: "amp-link-variable-allowed-origin"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attrs: {
    name: "content"
    mandatory: true
  }
}
// AMP metadata, name=amp-google-client-id-api
tags: {
  html_format: AMP
  tag_name: "META"
  spec_name: "meta name=amp-google-clientid-id-api"
  mandatory_parent: "HEAD"
  attrs: {
    name: "name"
    mandatory: true
    value_casei: "amp-google-client-id-api"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attrs: {
    name: "content"
    mandatory: true
  }
}
// AMP metadata, name=amp-ad-doubleclick-sra
// Enables SRA for amp-ad doubleclick Fast Fetch
tags: {
  html_format: AMP
  tag_name: "META"
  spec_name: "meta name=amp-ad-doubleclick-sra"
  mandatory_parent: "HEAD"
  attrs: {
    name: "name"
    mandatory: true
    value_casei: "amp-ad-doubleclick-sra"
    dispatch_key: NAME_VALUE_DISPATCH
  }
}
// AMP4ADS metadata, name=amp4ads-id
// https://github.com/ampproject/amphtml/issues/7730
tags: {
  html_format: AMP4ADS
  tag_name: "META"
  spec_name: "meta name=amp4ads-id"
  mandatory_parent: "HEAD"
  attrs: {
    name: "name"
    mandatory: true
    value_casei: "amp4ads-id"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attrs: {
    name: "content"
    mandatory: true
  }
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "META"
  spec_name: "meta name= and content="
  // The validator accepts any name="..." attribute values except
  // for a few specific name values which have more specific rules above or
  // are altogether disallowed.
  attrs: {
    name: "name"
    blacklisted_value_regex: "(^|\\s)("
        "amp-.*|"
        "amp4ads-.*|"
        "apple-itunes-app|"
        "content-disposition|"
        "revisit-after|"
        "viewport"
        ")(\\s|$)"
  }
  attrs: { name: "content" }
  // itemprop / property is non-standard, but commonly seen.
  attrs: { name: "itemprop" }
  attrs: { name: "property" }
  // scheme is used by Dublin Core, see issue //13993
  attrs: { name: "scheme" }
}
// This is redundant with meta charset, but also harmless as long as it's
// set to utf-8.
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "META"
  spec_name: "meta http-equiv=Content-Type"
  mandatory_ancestor: "HEAD"
  attrs: {
    name: "http-equiv"
    mandatory: true
    value_casei: "content-type"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attrs: {
    name: "content"
    mandatory: true
    value_casei: "text/html; charset=utf-8"
  }
  spec_url: "https://www.ampproject.org/docs/reference/spec//html-tags"
}
// http-equiv content-language tag
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "META"
  spec_name: "meta http-equiv=content-language"
  mandatory_ancestor: "HEAD"
  attrs: {
    name: "http-equiv"
    mandatory: true
    value_casei: "content-language"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attrs: {
    name: "content"
    mandatory: true
  }
  spec_url: "https://www.ampproject.org/docs/reference/spec//html-tags"
}
// http-equiv pics-label tag
// https://www.w3.org/PICS/
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "META"
  spec_name: "meta http-equiv=pics-label"
  mandatory_ancestor: "HEAD"
  attrs: {
    name: "http-equiv"
    mandatory: true
    value_casei: "pics-label"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attrs: {
    name: "content"
    mandatory: true
  }
  spec_url: "https://www.ampproject.org/docs/reference/spec//html-tags"
}
// http-equiv imagetoolbar tag
// https://msdn.microsoft.com/en-us/library/ms532986(v=vs.85).aspx
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "META"
  spec_name: "meta http-equiv=imagetoolbar"
  mandatory_ancestor: "HEAD"
  attrs: {
    name: "http-equiv"
    mandatory: true
    value_casei: "imagetoolbar"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attrs: {
    name: "content"
    mandatory: true
  }
  spec_url: "https://www.ampproject.org/docs/reference/spec//html-tags"
}
// http-equiv content-style-type
// https://www.w3.org/TR/REC-html40/present/styles//h-14.2.1
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "META"
  spec_name: "meta http-equiv=Content-Style-Type"
  mandatory_ancestor: "HEAD"
  attrs: {
    name: "http-equiv"
    mandatory: true
    value_casei: "content-style-type"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attrs: {
    name: "content"
    mandatory: true
    value_casei: "text/css"
  }
  spec_url: "https://www.ampproject.org/docs/reference/spec//html-tags"
}
// http-equiv content-script-type
// https://www.w3.org/TR/html4/interact/scripts//h-18.2.2.1
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "META"
  spec_name: "meta http-equiv=Content-Script-Type"
  mandatory_ancestor: "HEAD"
  attrs: {
    name: "http-equiv"
    mandatory: true
    value_casei: "content-script-type"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attrs: {
    name: "content"
    mandatory: true
    value_casei: "text/javascript"
  }
  spec_url: "https://www.ampproject.org/docs/reference/spec//html-tags"
}
// http-equiv origin-trial tag
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "META"
  spec_name: "meta http-equiv=origin-trial"
  mandatory_ancestor: "HEAD"
  attrs: {
    name: "http-equiv"
    mandatory: true
    value_casei: "origin-trial"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attrs: {
    name: "content"
    mandatory: true
  }
  spec_url: "https://www.ampproject.org/docs/reference/spec//html-tags"
}
// http-equiv resource-type
// http://www.metatags.info/meta_http_equiv_resource_type
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "META"
  spec_name: "meta http-equiv=resource-type"
  mandatory_ancestor: "HEAD"
  attrs: {
    name: "http-equiv"
    mandatory: true
    value_casei: "resource-type"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attrs: {
    name: "content"
    mandatory: true
  }
  spec_url: "https://www.ampproject.org/docs/reference/spec//html-tags"
}
// http-equiv x-dns-prefetch-control
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
tags: {
  html_format: AMP
  tag_name: "META"
  spec_name: "meta http-equiv=x-dns-prefetch-control"
  mandatory_ancestor: "HEAD"
  attrs: {
    name: "http-equiv"
    mandatory: true
    value_casei: "x-dns-prefetch-control"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attrs: {
    name: "content"
    mandatory: true
    value_regex_casei: "(off|on)"
  }
  spec_url: "https://www.ampproject.org/docs/reference/spec//html-tags"
}
// AMP metadata, name=amp-ad-enable-refresh
// Enables Refresh for amp-ad doubleclick Fast Fetch
tags: {
  html_format: AMP
  html_format: AMP4ADS
  tag_name: "META"
  spec_name: "meta name=amp-ad-enable-refresh"
  mandatory_ancestor: "HEAD"
  attrs: {
    name: "name"
    mandatory: true
    value_casei: "amp-ad-enable-refresh"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attrs: {
    name: "content"
    mandatory: true
  }
}
// AMP metadata, name=amp-to-amp-navigation
// Enables AMP-to-AMP navigation
tags: {
  html_format: AMP
  html_format: EXPERIMENTAL
  tag_name: "META"
  spec_name: "meta name=amp-to-amp-navigation"
  mandatory_parent: "HEAD"
  unique: true
  attrs: {
    name: "name"
    mandatory: true
    value_casei: "amp-to-amp-navigation"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attrs: {
    name: "content"
    mandatory: true
  }
}


// 4.2.6 The style
// Text contents of the style tag will be validated seperately.
tags: {  // Special custom 'author' spreadsheet for AMP
  html_format: AMP
  html_format: EXPERIMENTAL
  tag_name: "STYLE"
  spec_name: "style amp-custom"
  unique: true
  mandatory_parent: "HEAD"
  attrs: {
    name: "amp-custom"
    mandatory: true
    value: ""
    // This is a fine dispatch key, but we would prefer that this tagspec
    // is used for errors related to <style> tags missing the amp-custom
    // attribute rather than the boilerplate tagspec which doesn't have an
    // attribute and thus can't have a dispatch_key.
    // dispatch_key: NAME_DISPATCH
  }
  attrs: { name: "nonce" }
  attrs: {  // This is a default, but it doesn't hurt.
    name: "type"
    value_casei: "text/css"
  }
  cdata: {
    max_bytes: 50000
    max_bytes_spec_url: "https://www.ampproject.org/docs/reference/spec//maximum-size"
    css_spec: {
      at_rule_spec: {
        name: 'font-face'
        type: PARSE_AS_DECLARATIONS
      }
      at_rule_spec: {
        name: 'keyframes'
        type: PARSE_AS_RULES
      }
      at_rule_spec: {
        name: 'media'
        type: PARSE_AS_RULES
      }
      at_rule_spec: {
        name: 'supports'
        type: PARSE_AS_RULES
      }
      at_rule_spec: {
        name: '$DEFAULT'  // matches if none of the above match
        type: PARSE_AS_ERROR
      }
      image_url_spec: {
        allowed_protocol: "https"
        allowed_protocol: "http"
        allowed_protocol: "data"
        allowed_protocol: "absolute"  // Temporary / will go away.
        allow_relative: true
        allow_empty: true
      }
      font_url_spec: {
        allowed_protocol: "https"
        allowed_protocol: "http"
        allowed_protocol: "data"
        allow_relative: true
        allow_empty: true
      }
    }
    blacklisted_cdata_regex: {
      regex: "<!--"
      error_message: "html comments"
    }
    // These regex blacklists are temporary hacks to validate essential CSS
    // rules. They will be replaced later with more principled solutions.
    blacklisted_cdata_regex: {
      regex: "(^|\\W)i-amphtml-"
      error_message: "CSS i-amphtml- name prefix"
    }
    blacklisted_cdata_regex: {
      regex: "!important"
      error_message: "CSS !important"
    }
  }
  spec_url: "https://www.ampproject.org/docs/reference/spec//stylesheets"
}
tags: {  // Special custom 'author' spreadsheet for AMP4ADS
  html_format: AMP4ADS
  tag_name: "STYLE"
  spec_name: "style amp-custom (AMP4ADS)"
  unique: true
  mandatory_parent: "HEAD"
  attrs: {
    name: "amp-custom"
    mandatory: true
    value: ""
    // This is a fine dispatch key, but we would prefer that this tagspec
    // is used for errors related to <style> tags missing the amp-custom
    // attribute rather than the boilerplate tagspec which doesn't have an
    // attribute and thus can't have a dispatch_key.
    // dispatch_key: NAME_DISPATCH
  }
  attrs: { name: "nonce" }
  attrs: {  // This is a default, but it doesn't hurt.
    name: "type"
    value_casei: "text/css"
  }
  cdata: {
    max_bytes: 20000  // Smaller than AMP, which is 50,000.
    max_bytes_spec_url: "https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/amp-a4a-format.md//css"
    css_spec: {
      at_rule_spec: {
        name: 'font-face'
        type: PARSE_AS_DECLARATIONS
      }
      at_rule_spec: {
        name: 'keyframes'
        type: PARSE_AS_RULES
      }
      at_rule_spec: {
        name: 'media'
        type: PARSE_AS_RULES
      }
      at_rule_spec: {
        name: 'supports'
        type: PARSE_AS_RULES
      }
      at_rule_spec: {
        name: '$DEFAULT'  // matches if none of the above match
        type: PARSE_AS_ERROR
      }
      image_url_spec: {
        allowed_protocol: "https"
        allowed_protocol: "http"
        allowed_protocol: "data"
        allowed_protocol: "absolute"  // Temporary / will go away.
        allow_relative: true
        allow_empty: true
      }
      font_url_spec: {
        allowed_protocol: "https"
        allowed_protocol: "http"
        allowed_protocol: "data"
        allow_relative: true
        allow_empty: true
      }
      validate_amp4ads: true
    }
    blacklisted_cdata_regex: {
      regex: "<!--"
      error_message: "html comments"
    }
    // These regex blacklists are temporary hacks to validate essential CSS
    // rules. They will be replaced later with more principled solutions.
    blacklisted_cdata_regex: {
      regex: "(^|\\W)i-amphtml-"
      error_message: "CSS i-amphtml- name prefix"
    }
    blacklisted_cdata_regex: {
      regex: "!important"
      error_message: "CSS !important"
    }
  }
  spec_url: "https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/amp-a4a-format.md//css"
}
tags: {  // Special custom 'author' spreadsheet for AMP
  html_format: AMP4EMAIL
  tag_name: "STYLE"
  spec_name: "style amp-custom (AMP4EMAIL)"
  unique: true
  mandatory_parent: "HEAD"
  attrs: {
    name: "amp-custom"
    mandatory: true
    value: ""
    // This is a fine dispatch key, but we would prefer that this tagspec
    // is used for errors related to <style> tags missing the amp-custom
    // attribute rather than the boilerplate tagspec which doesn't have an
    // attribute and thus can't have a dispatch_key.
    // dispatch_key: NAME_DISPATCH
  }
  attrs: { name: "nonce" }
  attrs: {  // This is a default, but it doesn't hurt.
    name: "type"
    value_casei: "text/css"
  }
  // TODO(b/68756045): Whitelist CSS properties allowed in Dynamic Mail.
  cdata: {
    max_bytes: 50000
    max_bytes_spec_url: "https://www.ampproject.org/docs/reference/spec//maximum-size"
    css_spec: {
      at_rule_spec: {
        name: 'media'
        type: PARSE_AS_RULES
      }
      at_rule_spec: {
        name: '$DEFAULT'  // matches if none of the above match
        type: PARSE_AS_ERROR
      }
      image_url_spec: {
        allowed_protocol: "https"
      }
      // Allowed CSS properties in AMP4Email.
      allowed_declarations: "azimuth"
      allowed_declarations: "background"
      allowed_declarations: "background-blend-mode"
      allowed_declarations: "background-clip"
      allowed_declarations: "background-color"
      allowed_declarations: "background-image"
      allowed_declarations: "background-origin"
      allowed_declarations: "background-position"
      allowed_declarations: "background-repeat"
      allowed_declarations: "background-size"
      allowed_declarations: "border"
      allowed_declarations: "border-bottom"
      allowed_declarations: "border-bottom-color"
      allowed_declarations: "border-bottom-left-radius"
      allowed_declarations: "border-bottom-right-radius"
      allowed_declarations: "border-bottom-style"
      allowed_declarations: "border-bottom-width"
      allowed_declarations: "border-collapse"
      allowed_declarations: "border-color"
      allowed_declarations: "border-left"
      allowed_declarations: "border-left-color"
      allowed_declarations: "border-left-style"
      allowed_declarations: "border-left-width"
      allowed_declarations: "border-radius"
      allowed_declarations: "border-right"
      allowed_declarations: "border-right-color"
      allowed_declarations: "border-right-style"
      allowed_declarations: "border-right-width"
      allowed_declarations: "border-spacing"
      allowed_declarations: "border-style"
      allowed_declarations: "border-top"
      allowed_declarations: "border-top-color"
      allowed_declarations: "border-top-left-radius"
      allowed_declarations: "border-top-right-radius"
      allowed_declarations: "border-top-style"
      allowed_declarations: "border-top-width"
      allowed_declarations: "border-width"
      allowed_declarations: "box-sizing"
      allowed_declarations: "break-after"
      allowed_declarations: "break-before"
      allowed_declarations: "break-inside"
      allowed_declarations: "caption-side"
      allowed_declarations: "clear"
      allowed_declarations: "color"
      allowed_declarations: "column-count"
      allowed_declarations: "column-fill"
      allowed_declarations: "column-gap"
      allowed_declarations: "column-rule"
      allowed_declarations: "column-rule-color"
      allowed_declarations: "column-rule-style"
      allowed_declarations: "column-rule-width"
      allowed_declarations: "column-span"
      allowed_declarations: "column-width"
      allowed_declarations: "columns"
      allowed_declarations: "direction"
      allowed_declarations: "display"
      allowed_declarations: "elevation"
      allowed_declarations: "empty-cells"
      allowed_declarations: "float"
      allowed_declarations: "font"
      allowed_declarations: "font-family"
      allowed_declarations: "font-feature-settings"
      allowed_declarations: "font-kerning"
      allowed_declarations: "font-size"
      allowed_declarations: "font-size-adjust"
      allowed_declarations: "font-stretch"
      allowed_declarations: "font-style"
      allowed_declarations: "font-synthesis"
      allowed_declarations: "font-variant"
      allowed_declarations: "font-variant-alternates"
      allowed_declarations: "font-variant-caps"
      allowed_declarations: "font-variant-east-asian"
      allowed_declarations: "font-variant-ligatures"
      allowed_declarations: "font-variant-numeric"
      allowed_declarations: "font-weight"
      allowed_declarations: "height"
      allowed_declarations: "image-orientation"
      allowed_declarations: "image-resolution"
      allowed_declarations: "isolation"
      allowed_declarations: "letter-spacing"
      allowed_declarations: "line-height"
      allowed_declarations: "list-style"
      allowed_declarations: "list-style-position"
      allowed_declarations: "list-style-type"
      allowed_declarations: "margin"
      allowed_declarations: "margin-bottom"
      allowed_declarations: "margin-left"
      allowed_declarations: "margin-right"
      allowed_declarations: "margin-top"
      allowed_declarations: "max-height"
      allowed_declarations: "max-width"
      allowed_declarations: "min-height"
      allowed_declarations: "min-width"
      allowed_declarations: "mix-blend-mode"
      allowed_declarations: "object-fit"
      allowed_declarations: "object-position"
      allowed_declarations: "opacity"
      allowed_declarations: "outline"
      allowed_declarations: "outline-color"
      allowed_declarations: "outline-style"
      allowed_declarations: "outline-width"
      allowed_declarations: "overflow"
      allowed_declarations: "padding"
      allowed_declarations: "padding-bottom"
      allowed_declarations: "padding-left"
      allowed_declarations: "padding-right"
      allowed_declarations: "padding-top"
      allowed_declarations: "pause"
      allowed_declarations: "pause-after"
      allowed_declarations: "pause-before"
      allowed_declarations: "pitch"
      allowed_declarations: "pitch-range"
      allowed_declarations: "quotes"
      allowed_declarations: "richness"
      allowed_declarations: "speak"
      allowed_declarations: "speak-header"
      allowed_declarations: "speak-numeral"
      allowed_declarations: "speak-punctuation"
      allowed_declarations: "speech-rate"
      allowed_declarations: "stress"
      allowed_declarations: "table-layout"
      allowed_declarations: "text-align"
      allowed_declarations: "text-combine-upwrite"
      allowed_declarations: "text-decoration"
      allowed_declarations: "text-decoration-color"
      allowed_declarations: "text-decoration-line"
      allowed_declarations: "text-decoration-skip"
      allowed_declarations: "text-decoration-style"
      allowed_declarations: "text-emphasis"
      allowed_declarations: "text-emphasis-color"
      allowed_declarations: "text-emphasis-style"
      allowed_declarations: "text-indent"
      allowed_declarations: "text-orientation"
      allowed_declarations: "text-overflow"
      allowed_declarations: "text-transform"
      allowed_declarations: "text-underline-position"
      allowed_declarations: "unicode-bidi"
      allowed_declarations: "vertical-align"
      allowed_declarations: "voice-family"
      allowed_declarations: "width"
      allowed_declarations: "word-spacing"
      allowed_declarations: "writing-mode"
    }
    blacklisted_cdata_regex: {
      regex: "<!--"
      error_message: "html comments"
    }
    // These regex blacklists are temporary hacks to validate essential CSS
    // rules. They will be replaced later with more principled solutions.
    blacklisted_cdata_regex: {
      regex: "(^|\\W)i-amphtml-"
      error_message: "CSS i-amphtml- name prefix"
    }
    blacklisted_cdata_regex: {
      regex: "!important"
      error_message: "CSS !important"
    }
  }
  spec_url: "https://www.ampproject.org/docs/reference/spec//stylesheets"
}

tags: {
  html_format: AMP
  html_format: EXPERIMENTAL
  tag_name: "STYLE"
  spec_name: "head > style[amp-boilerplate] - old variant"
  mandatory_alternatives: "head > style[amp-boilerplate]"
  unique: true
  mandatory_parent: "HEAD"
  deprecation: "head > style[amp-boilerplate]"
  deprecation_url: "https://github.com/ampproject/amphtml/blob/master/spec/amp-boilerplate.md"
  attrs: { name: "nonce" }
  cdata: {
    cdata_regex: "body ?{opacity: ?0}"
  }
  spec_url: "https://github.com/ampproject/amphtml/blob/master/spec/amp-boilerplate.md"
}
tags: {
  html_format: AMP
  tag_name: "STYLE"
  spec_name: "noscript > style[amp-boilerplate] - old variant"
  mandatory_alternatives: "noscript > style[amp-boilerplate]"
  unique: true
  mandatory_parent: "NOSCRIPT"
  mandatory_ancestor: "HEAD"
  deprecation: "noscript > style[amp-boilerplate]"
  deprecation_url: "https://github.com/ampproject/amphtml/blob/master/spec/amp-boilerplate.md"
  attrs: { name: "nonce" }
}
tags: {
  html_format: AMP
  html_format: EXPERIMENTAL
  tag_name: "STYLE"
  spec_name: "head > style[amp-boilerplate]"
  satisfies: "head > style[amp-boilerplate]"
  mandatory_alternatives: "head > style[amp-boilerplate]"
  unique: true
  mandatory_parent: "HEAD"
  requires: "noscript > style[amp-boilerplate]"
  attrs: {
    name: "amp-boilerplate"
    mandatory: true
    value: ""
    dispatch_key: NAME_VALUE_PARENT_DISPATCH
  }
  attrs: { name: "nonce" }
  cdata: {
    // This regex allows arbitrary whitespace whenever some whitespace
    // is required in the boilerplate. It was made by replacing ' ' with \\s+.
    cdata_regex: "\\s*body{-webkit-animation:-amp-start\\s+8s\\s+steps\\(1,end\\)\\s+0s\\s+1\\s+normal\\s+both;-moz-animation:-amp-start\\s+8s\\s+steps\\(1,end\\)\\s+0s\\s+1\\s+normal\\s+both;-ms-animation:-amp-start\\s+8s\\s+steps\\(1,end\\)\\s+0s\\s+1\\s+normal\\s+both;animation:-amp-start\\s+8s\\s+steps\\(1,end\\)\\s+0s\\s+1\\s+normal\\s+both}@-webkit-keyframes\\s+-amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes\\s+-amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes\\s+-amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes\\s+-amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes\\s+-amp-start{from{visibility:hidden}to{visibility:visible}}\\s*"
  }
  spec_url: "https://github.com/ampproject/amphtml/blob/master/spec/amp-boilerplate.md"
}
tags: {
  html_format: AMP4ADS
  tag_name: "STYLE"
  spec_name: "head > style[amp4ads-boilerplate]"
  mandatory: true
  unique: true
  mandatory_parent: "HEAD"
  attrs: {
    name: "amp4ads-boilerplate"
    mandatory: true
    value: ""
    dispatch_key: NAME_VALUE_PARENT_DISPATCH
  }
  attrs: { name: "nonce" }
  cdata: {
    // This regex allows arbitrary whitespace around the body statement, but
    // not inside it. This is a compromise to keep things simple, but allow
    // pretty printing tools some latitude.
    cdata_regex: "\\s*body{visibility:hidden}\\s*"
  }
  spec_url: "https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/amp-a4a-format.md//boilerplate"
}
tags: {
  html_format: AMP4EMAIL
  tag_name: "STYLE"
  spec_name: "head > style[amp4email-boilerplate]"
  mandatory: true
  unique: true
  mandatory_parent: "HEAD"
  attrs: {
    name: "amp4email-boilerplate"
    mandatory: true
    value: ""
    dispatch_key: NAME_VALUE_PARENT_DISPATCH
  }
  attrs: { name: "nonce" }
  cdata: {
    // This regex allows arbitrary whitespace whenever some whitespace
    // is required in the boilerplate. It was made by replacing ' ' with \\s+.
    cdata_regex: "\\s*body{visibility:hidden}\\s*"
  }
  spec_url: "https://github.com/ampproject/amphtml/blob/master/spec/amp-boilerplate.md"
}
tags: {
  html_format: AMP
  html_format: EXPERIMENTAL
  tag_name: "STYLE"
  spec_name: "noscript > style[amp-boilerplate]"
  satisfies: "noscript > style[amp-boilerplate]"
  mandatory_alternatives: "noscript > style[amp-boilerplate]"
  unique: true
  mandatory_parent: "NOSCRIPT"
  mandatory_ancestor: "HEAD"
  requires: "head > style[amp-boilerplate]"
  attrs: {
    name: "amp-boilerplate"
    mandatory: true
    value: ""
    dispatch_key: NAME_VALUE_PARENT_DISPATCH
  }
  attrs: { name: "nonce" }
}

tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "STYLE"
  spec_name: "style[amp-keyframes]"
  unique: true
  mandatory_parent: "BODY"
  mandatory_last_child: true
  attrs: {
     name: "amp-keyframes"
     value: ""
     mandatory: true
     dispatch_key: NAME_DISPATCH
  }
  cdata: {
    max_bytes: 500000
    max_bytes_spec_url: "https://www.ampproject.org/docs/reference/spec//keyframes-stylesheet"
    css_spec: {
      at_rule_spec: {
        name: 'keyframes'
        type: PARSE_AS_RULES
      }
      at_rule_spec: {
        name: 'media'
        type: PARSE_AS_RULES
      }
      at_rule_spec: {
        name: 'supports'
        type: PARSE_AS_RULES
      }
      at_rule_spec: {
        name: '$DEFAULT'  // matches if none of the above match
        type: PARSE_AS_ERROR
      }
      validate_keyframes: true
      allowed_declarations: "animation-timing-function"
      allowed_declarations: "offset-distance"
      allowed_declarations: "opacity"
      allowed_declarations: "transform"
      allowed_declarations: "visibility"
    }
  }
}

// 4.3 Sections
// 4.3.1 The body element
tags: {
  tag_name: "BODY"
  mandatory: true
  unique: true
  mandatory_parent: "HTML"
}
// 4.3.2 The article element
tags: {
  tag_name: "ARTICLE"
}
// 4.3.3 The section element
tags: {
  tag_name: "SECTION"
  disallowed_ancestor: "AMP-ACCORDION"
}
// 4.3.4 The nav element
tags: {
  tag_name: "NAV"
}
// 4.3.5 The aside element
tags: {
  tag_name: "ASIDE"
}
// 4.3.6 The h1, h2, h3, h4, h5, and h6 elements
tags: {
  tag_name: "H1"
  attrs: { name: "align" }
}
tags: {
  tag_name: "H2"
  attrs: { name: "align" }
}
tags: {
  tag_name: "H3"
  attrs: { name: "align" }
}
tags: {
  tag_name: "H4"
  attrs: { name: "align" }
}
tags: {
  tag_name: "H5"
  attrs: { name: "align" }
}
tags: {
  tag_name: "H6"
  attrs: { name: "align" }
}
// 4.3 7 The header element
tags: {
  tag_name: "HEADER"
}
// 4.3 7 The footer element
tags: {
  tag_name: "FOOTER"
}
// 4.3 7 The address element
tags: {
  tag_name: "ADDRESS"
}

// 4.4 Grouping Content
// 4.4.1 The p element
tags: {
  tag_name: "P"
  attrs: { name: "align" }
}
// 4.4.2 The hr element
tags: {
  tag_name: "HR"
}
// 4.4.3 The pre element
tags: {
  tag_name: "PRE"
}
// 4.4.4 The blockquote element
attr_lists: {
  name: "cite-attr"
  attrs: {
    name: "cite"
    value_url: {
      allow_empty: true
      allow_relative: true
      allowed_protocol: "http"
      allowed_protocol: "https"
    }
    blacklisted_value_regex: "__amp_source_origin"
  }
}
tags: {
  tag_name: "BLOCKQUOTE"
  attrs: { name: "align" }
  attr_lists: "cite-attr"
}
// 4.4.5 The ol element
tags: {
  tag_name: "OL"
  attrs: {
    name: "reversed"
    value: ""
  }
  attrs: {
    name: "start"
    value_regex: "[0-9]*"
  }
  attrs: {
    name: "type"
    value_regex: "[1AaIi]"
  }
}
// 4.4.6 The ul element
tags: {
  tag_name: "UL"
}
// 4.4.7 The li element
tags: {
  tag_name: "LI"
  attrs: {
    name: "value"
    value_regex: "[0-9]*"
  }
}
// 4.4.8 The dl element
tags: {
  tag_name: "DL"
}
// 4.4.9 The dt element
tags: {
  tag_name: "DT"
}
// 4.4.10 The dd element
tags: {
  tag_name: "DD"
}
// 4.4.11 The figure element
tags: {
  tag_name: "FIGURE"
}
// 4.4.12 The figcaption element
tags: {
  tag_name: "FIGCAPTION"
}
// 4.4.13 The div element
tags: {
  tag_name: "DIV"
  attrs: { name: "align" }
}
// 4.4.14 The main element
tags: {
  tag_name: "MAIN"
}

// 4.5 Text-level semantics
// 4.5.1 The a element
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "A"
  attrs: {
    name: "href"
    value_url: {
      allow_empty: true
      allow_relative: true
      allowed_protocol: "ftp"
      allowed_protocol: "geo"
      allowed_protocol: "http"
      allowed_protocol: "https"
      allowed_protocol: "mailto"
      allowed_protocol: "maps"
      // Whitelisting additional commonly observed third party
      // protocols which should be safe
      // Blackberry messenger
      // (http://devblog.blackberry.com/2015/02/cross-platform-sharing-with-bbm/)
      allowed_protocol: "bbmi"
      allowed_protocol: "fb-messenger"
      allowed_protocol: "intent"
      // Line messenger (https://media.line.me/howto/en/)
      allowed_protocol: "line"
      allowed_protocol: "skype"
      allowed_protocol: "sms"
      allowed_protocol: "snapchat"
      allowed_protocol: "tel"
      allowed_protocol: "tg"
      allowed_protocol: "threema"
      allowed_protocol: "twitter"
      allowed_protocol: "viber"
      allowed_protocol: "whatsapp"
    }
    blacklisted_value_regex: "__amp_source_origin"
  }
  attrs: { name: "hreflang" }
  attrs: { name: "referrerpolicy" }
  attrs: {
    name: "rel"
    // There are a wide variety of link rel attribute values used in the wild as
    // this attribute is used as meta-data for any html client such as search
    // engines. Unfortunately, there are also a number of attribute values which
    // have behavioral impacts in modern browsers. A few places where these are
    // loosely documented include:
    // - http://microformats.org/wiki/existing-rel-values
    // - http://www.iana.org/assignments/link-relations/link-relations.xhtml
    // - https://html.spec.whatwg.org///linkTypes
    // We blacklist a few specific values which have browser behavior that could
    // negatively impact performance.
    // TODO(gregable): This could be improved such that the error message would
    // report which value in a list is the one causing problems.
    blacklisted_value_regex: "(^|\\s)("  // Values are space separated.
        "components|"
        "dns-prefetch|"
        "import|"
        "manifest|"
        "preconnect|"
        "prefetch|"
        "preload|"
        "prerender|"
        "serviceworker|"
        "stylesheet|"  // Only allowed for link tags, specific req's for AMP.
        "subresource|"
        ")(\\s|$)"
  }
  attrs: {
    name: "role"
    implicit: true
  }
  attrs: {
    name: "tabindex"
    implicit: true
  }
  attrs: {
    name: "target"
    value_regex: "(_blank|_self|_top)"
  }
  attrs: { name: "download" }
  attrs: { name: "media" }
  attrs: { name: "type" ,{value_casei: "text/html" }
  // These are not valid html5 but are commonly used and are supported in all
  // major browsers.
  attrs: { name: "border" }
  attrs: { name: "name" }
  // <amp-bind>
  attrs: { name: "[href]" }
  spec_url: "https://www.ampproject.org/docs/reference/spec//links"
}
// AMP4EMAIL restricts the use of mustache delimiters in href. The only allowed
// protocols for href are https and mailto. Relative urls are disallowed.
tags: {
  html_format: AMP4EMAIL
  tag_name: "A"
  spec_name: "A (AMP4EMAIL)"
  attrs: {
    name: "href"
    value_url: {
      allow_relative: false
      allowed_protocol: "https"
      allowed_protocol: "mailto"
    }
    // Openning doubly curly brackets {{ (these are mustache delimiters) can only
    // appear at the beginnig of the attribute's value. Likewise closing doubly
    // curly brackets }} can only appear at the end of the attribute's value.
    // Furthermore unbalanced delimiters are not allowed.
    // Additionally section mustache delimiters, i.e., {{//, {{^, {{/ are
    // disallowed.
    blacklisted_value_regex: "(__amp_source_origin|"
        "(.|\\s){{|"    // Openning delimiter can only appear at the beginning.
        "}}(.|\\s)|"    // Closing delimiter can only appear at the end.
        "^{{.*[^}][^}]$|"    // Delimiters must be balanced.
        "^[^{][^{].*}}$|"    // Delimiters must be balanced.
        "^}}|"    // Also caught by the requirements on balanced delimiters.
        "{{$|"    // Also caught by the requirements on balanced delimiters.
        "{{//|"    // Section delimiters are disallowed.
        "{{/|"    // Section delimiters are disallowed.
        "{{\\^)"  // Section delimiters are disallowed.
  }
  attrs: { name: "hreflang" }
  attrs: {
    name: "role"
    implicit: true
  }
  attrs: {
    name: "tabindex"
    implicit: true
  }
  attrs: {
    name: "target"
    value_regex: "_blank"
  }
  // TODO(gregable): Specify the set of allowed media queries.
  attrs: { name: "media" }
  attrs: { name: "type", {value_casei: "text/html" }}
  // These are not valid html5 but are commonly used and are supported in all
  // major browsers.
  attrs: { name: "border" }
  attrs: { name: "name" }
}

// 4.5.2 The em element
tags: {
  tag_name: "EM"
}
// 4.5.3 The strong element
tags: {
  tag_name: "STRONG"
}
// 4.5.4 The small element
tags: {
  tag_name: "SMALL"
}
// 4.5.5 The s element
tags: {
  tag_name: "S"
}
// 4.5.6 The cite element
tags: {
  tag_name: "CITE"
}
// 4.5.7 The q element
tags: {
  tag_name: "Q"
  attr_lists: "cite-attr"
}
// 4.5.8 The dfn element
tags: {
  tag_name: "DFN"
}
// 4.5.9 The abbr element
tags: {
  tag_name: "ABBR"
}
// 4.5.10 The data element
tags: {
  tag_name: "DATA"
}
// 4.5.11 The time element
tags: {
  tag_name: "TIME"
  attrs: {
    name: "datetime"
  }
}
// 4.5.12 The code element
tags: {
  tag_name: "CODE"
}
// 4.5.13 The var element
tags: {
  tag_name: "VAR"
}
// 4.5.14 The samp element
tags: {
  tag_name: "SAMP"
}
// 4.5.15 The kbd element
tags: {
  tag_name: "KBD"
}
// 4.5.16 The sub and sup elements
tags: {
  tag_name: "SUB"
}
tags: {
  tag_name: "SUP"
}
// 4.5.17 The i element
tags: {
  tag_name: "I"
}
// 4.5.18 The b element
tags: {
  tag_name: "B"
}
// 4.5.19 The u element
tags: {
  tag_name: "U"
}
// 4.5.20 The mark element
tags: {
  tag_name: "MARK"
}
// 4.5.21 The ruby element
tags: {
  tag_name: "RUBY"
}
// 4.5.22 The rb element
tags: {
  tag_name: "RB"
}
// 4.5.23 The rt element
tags: {
  tag_name: "RT"
}
// 4.5.24 The rtc element
tags: {
  tag_name: "RTC"
}
// 4.5.25 The rp element
tags: {
  tag_name: "RP"
}
// 4.5.26 The bdi element
tags: {
  tag_name: "BDI"
}
// 4.5.27 The bdo element
tags: {
  tag_name: "BDO"
  attrs: { name: "dir" }
}
// 4.5.28 The span element
tags: {
  tag_name: "SPAN"
}
// 4.5.29 The br element
tags: {
  tag_name: "BR"
}
// 4.5.30 The wbr element
tags: {
  tag_name: "WBR"
}

// 4.6 Edits
// 4.6.1 The ins element
tags: {
  tag_name: "INS"
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins
  // These attributes have specific formatting, but as they are metadata
  // that can't hurt performance, rendering or security, we don't validate
  // the values.
  attrs: { name: "datetime" }
  attr_lists: "cite-attr"
}
// 4.6.2 The del element
tags: {
  tag_name: "DEL"
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del
  // These attributes have specific formatting, but as they are metadata
  // that can't hurt performance, rendering or security, we don't validate
  // the values.
  attrs: { name: "datetime" }
  attr_lists: "cite-attr"
}

// 4.7 Embedded Content
// AMP HTML allows embedded content only via its own tags (e.g. amp-img), with
// the exception of tags inside of a <noscript> ancestor.
// 4.7.1 The img element
tags: {
  html_format: AMP  // Disallowed in AMP4ADS because <noscript> is disallowed.
  tag_name: "IMG"
  mandatory_ancestor: "NOSCRIPT"
  mandatory_ancestor_suggested_alternative: "AMP-IMG"
  spec_url: "https://www.ampproject.org/docs/reference/components/amp-img"
  attrs: { name: "alt" }
  attrs: { name: "ismap" }
  attrs: {
    name: "longdesc"
    value_url: {
      allow_relative: true
      allowed_protocol: "http"
      allowed_protocol: "https"
    }
    blacklisted_value_regex: "__amp_source_origin"
  }
  attrs: {
    name: "src"
    alternative_names: "srcset"
    mandatory: true
    value_url: {
      allowed_protocol: "data"
      allowed_protocol: "https"
      allow_relative: true  // Will be set to false at a future date.
    }
    blacklisted_value_regex: "__amp_source_origin"
  }
  // These are not supported in html5, but are widely supported by browsers
  // and are commonly used. Since these are only used in noscript contexts,
  // we allow them.
  attrs: { name: "border" }
  attrs: { name: "height" }
  attrs: { name: "width" }
}
// 4.7.2 The iframe element
tags: {
  html_format: AMP  // Disallowed in AMP4ADS because <noscript> is disallowed.
  tag_name: "IFRAME"
  mandatory_ancestor: "NOSCRIPT"
  mandatory_ancestor_suggested_alternative: "AMP-IFRAME"
  spec_url: "https://www.ampproject.org/docs/reference/components/amp-iframe"
  attrs: {
    name: "name"
  }
  attrs: {
    name: "frameborder"
    value_regex: "0|1"
  }
  attrs: { name: "referrerpolicy" }
  attrs: {
    name: "resizable"
    value: ""
  }
  attrs: {
    name: "height"
  }
  attrs: {
    name: "sandbox"
  }
  attrs: {
    name: "scrolling"
    value_regex: "auto|yes|no"
  }
  attrs: {
    name: "src"
    mandatory_oneof: "['src', 'srcdoc']"
    value_url: {
      allowed_protocol: "data"
      allowed_protocol: "https"
      allow_relative: false
    }
    blacklisted_value_regex: "__amp_source_origin"
  }
  attrs: {
    name: "srcdoc"
    mandatory_oneof: "['src', 'srcdoc']"
  }
  attrs: {
    name: "width"
  }
}
// 4.7.6 The video element
// Only allowed in noscript tags. Otherwise use amp-video.
tags: {
  html_format: AMP  // Disallowed in AMP4ADS because <noscript> is disallowed.
  tag_name: "VIDEO"
  mandatory_ancestor: "NOSCRIPT"
  mandatory_ancestor_suggested_alternative: "AMP-VIDEO"
  attrs: { name: "autoplay" }
  attrs: { name: "controls" }
  attrs: { name: "height" }
  attrs: { name: "loop" }
  attrs: {
    name: "muted"
    deprecation: "autoplay"
    deprecation_url: "https://www.ampproject.org/docs/reference/components/amp-video"
  }
  attrs: { name: "playsinline" }
  attrs: { name: "poster" }
  attrs: { name: "preload" }
  attrs: {
    name: "src"
    value_url: {
      allowed_protocol: "data"
      allowed_protocol: "https"
      allow_relative: false
    }
    blacklisted_value_regex: "__amp_source_origin"
  }
  attrs: { name: "width" }
  spec_url: "https://www.ampproject.org/docs/reference/components/amp-video"
}
// 4.7.7 The audio element
// Only allowed in noscript tags. Otherwise use amp-audio.
tags: {
  html_format: AMP  // Disallowed in AMP4ADS because <noscript> is disallowed.
  tag_name: "AUDIO"
  mandatory_ancestor: "NOSCRIPT"
  mandatory_ancestor_suggested_alternative: "AMP-AUDIO"
  attrs: { name: "autoplay" }
  attrs: { name: "controls" }
  attrs: { name: "loop" }
  attrs: { name: "muted" }
  attrs: { name: "preload" }
  attrs: {
    name: "src"
    value_url: {
      allowed_protocol: "data"
      allowed_protocol: "https"
      allow_relative: false
    }
    blacklisted_value_regex: "__amp_source_origin"
  }
  spec_url: "https://www.ampproject.org/docs/reference/components/amp-audio"
}
// 4.7.8 The source element
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "SOURCE"
  spec_name: "amp-video > source"
  mandatory_parent: "AMP-VIDEO"
  attrs: {
    name: "src"
    value_url: {
      allowed_protocol: "https"
      allow_relative: true  // Will be set to false at a future date.
    }
    blacklisted_value_regex: "__amp_source_origin"
  }
  attrs: { name: "media" }
  attrs: { name: "type" }
  // <amp-bind>
  attrs: { name: "[src]" }
  attrs: { name: "[type]" }
  spec_url: "https://www.ampproject.org/docs/reference/components/amp-video"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "SOURCE"
  spec_name: "amp-audio > source"
  mandatory_parent: "AMP-AUDIO"
  attrs: {
    name: "src"
    value_url: {
      allowed_protocol: "https"
      allow_relative: true  // Will be set to false at a future date.
    }
    blacklisted_value_regex: "__amp_source_origin"
  }
  attrs: { name: "media" }
  attrs: { name: "type" }
  // <amp-bind>
  attrs: { name: "[src]" }
  attrs: { name: "[type]" }
  spec_url: "https://www.ampproject.org/docs/reference/components/amp-audio"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "SOURCE"
  spec_name: "audio > source"
  mandatory_parent: "AUDIO"
  attrs: {
    name: "src"
    mandatory: true
    value_url: {
      allowed_protocol: "https"
      allow_relative: true  // Will be set to false at a future date.
    }
    blacklisted_value_regex: "__amp_source_origin"
  }
  attrs: {
    name: "type"
    mandatory: true
  }
  attrs: { name: "media" }
  spec_url: "https://www.ampproject.org/docs/reference/components/amp-audio"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "SOURCE"
  spec_name: "video > source"
  mandatory_parent: "VIDEO"
  attrs: {
    name: "src"
    mandatory: true
    value_url: {
      allowed_protocol: "https"
      allow_relative: true  // Will be set to false at a future date.
    }
    blacklisted_value_regex: "__amp_source_origin"
  }
  attrs: {
    name: "type"
    mandatory: true
  }
  attrs: { name: "media" }
  spec_url: "https://www.ampproject.org/docs/reference/components/amp-video"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "SOURCE"
  spec_name: "amp-ima-video > source"
  mandatory_parent: "AMP-IMA-VIDEO"
  requires_extension: "amp-ima-video"
  attrs: { name: "media" }
  attrs: {
    name: "src"
    value_url: {
      allowed_protocol: "https"
      allow_relative: true  // Will be set to false at a future date.
    }
    blacklisted_value_regex: "__amp_source_origin"
  }
  attrs: { name: "type" }
  // <amp-bind>
  attrs: { name: "[src]" }
  attrs: { name: "[type]" }
}
// 4.7.8 The track element
// We have two attr_list variants to encode the requirement that if
// the attribute kind has the value 'subtitles', then the tag must
// also have a srclang attribute. The first attr_list does not allow
// kind=subtitles, but srclang is optional. The second attr_list
// mandates kind=subtitles and srclang attributes.
attr_lists: {
  name: "track-attrs-no-subtitles"
  attrs: {
    name: "src"
    mandatory: true
    value_url: {
      allow_relative: false
      allowed_protocol: "https"
    }
    blacklisted_value_regex: "__amp_source_origin"
  }
  attrs: { name: "default",{ value: "" }}
  attrs: {
    name: "kind"
    value_regex: "(captions|descriptions|chapters|metadata)"
  }
  attrs: { name: "label" }
  attrs: { name: "srclang" }
}
attr_lists: {
  name: "track-attrs-subtitles"
  attrs: {
    name: "src"
    mandatory: true
    value_url: {
      allow_relative: false
      allowed_protocol: "https"
    }
    blacklisted_value_regex: "__amp_source_origin"
  }
  attrs: { name: "default", {value: "" }
  attrs: {
    name: "kind"
    mandatory: true
    value_casei: "subtitles"
  }
  attrs: { name: "label" }
  attrs: {
    name: "srclang"
    mandatory: true
  }
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "TRACK"
  spec_name: "audio > track"
  mandatory_parent: "AUDIO"
  attr_lists: "track-attrs-no-subtitles"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "TRACK"
  spec_name: "audio > track[kind=subtitles]"
  mandatory_parent: "AUDIO"
  attr_lists: "track-attrs-subtitles"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "TRACK"
  spec_name: "video > track"
  mandatory_parent: "VIDEO"
  attr_lists: "track-attrs-no-subtitles"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "TRACK"
  spec_name: "video > track[kind=subtitles]"
  mandatory_parent: "VIDEO"
  attr_lists: "track-attrs-subtitles"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "TRACK"
  spec_name: "amp-audio > track"
  mandatory_parent: "AMP-AUDIO"
  // <amp-bind>
  attrs: { name: "[label]" }
  attrs: { name: "[src]" }
  attrs: { name: "[srclang]" }
  attr_lists: "track-attrs-no-subtitles"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "TRACK"
  spec_name: "amp-audio > track[kind=subtitles]"
  mandatory_parent: "AMP-AUDIO"
  // <amp-bind>
  attrs: { name: "[label]" }
  attrs: { name: "[src]" }
  attrs: { name: "[srclang]" }
  attr_lists: "track-attrs-subtitles"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "TRACK"
  spec_name: "amp-video > track"
  mandatory_parent: "AMP-VIDEO"
  // <amp-bind>
  attrs: { name: "[label]" }
  attrs: { name: "[src]" }
  attrs: { name: "[srclang]" }
  attr_lists: "track-attrs-no-subtitles"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "TRACK"
  spec_name: "amp-video > track[kind=subtitles]"
  mandatory_parent: "AMP-VIDEO"
  // <amp-bind>
  attrs: { name: "[label]" }
  attrs: { name: "[src]" }
  attrs: { name: "[srclang]" }
  attr_lists: "track-attrs-subtitles"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "TRACK"
  spec_name: "amp-ima-video > track[kind=subtitles]"
  mandatory_parent: "AMP-IMA-VIDEO"
  // <amp-bind>
  attrs: { name: "[label]" }
  attrs: { name: "[src]" }
  attrs: { name: "[srclang]" }
  attr_lists: "track-attrs-subtitles"
  spec_url: "https://www.ampproject.org/docs/reference/components/amp-ima-video"
}


// 4.7.15 SVG
// We allow some limited embedded SVG tags. We do not allow inline styles
// or embedding any external resources.
// Attribute lists: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
attr_lists: {
  name: "svg-conditional-processing-attributes"
  attrs: { name: "requiredextensions" }
  attrs: { name: "requiredfeatures" }
  attrs: { name: "systemlanguage" }
}
attr_lists: {
  name: "svg-core-attributes"
  attrs: { name: "xml:lang" }
  attrs: { name: "xml:space" }
  attrs: { name: "xmlns" }
  attrs: { name: "xmlns:xlink" }
}
attr_lists: {
  name: "svg-filter-primitive-attributes"
  attrs: { name: "height" }
  attrs: { name: "result" }
  attrs: { name: "width" }
  attrs: { name: "x" }
  attrs: { name: "y" }
}
attr_lists: {
  name: "svg-presentation-attributes"
  attrs: { name: "alignment-baseline" }
  attrs: { name: "baseline-shift" }
  attrs: { name: "clip" }
  attrs: { name: "clip-path" }
  attrs: { name: "clip-rule" }
  attrs: { name: "color" }
  attrs: { name: "color-interpolation" }
  attrs: { name: "color-interpolation-filters" }
  attrs: { name: "color-profile" }
  attrs: { name: "color-rendering" }
  attrs: { name: "cursor" }
  attrs: { name: "direction" }
  attrs: { name: "display" }
  attrs: { name: "dominant-baseline" }
  attrs: { name: "enable-background" }
  attrs: { name: "fill" }
  attrs: { name: "fill-opacity" }
  attrs: { name: "fill-rule" }
  attrs: { name: "filter" }
  attrs: { name: "flood-color" }
  attrs: { name: "flood-opacity" }
  attrs: { name: "font-family" }
  attrs: { name: "font-size" }
  attrs: { name: "font-size-adjust" }
  attrs: { name: "font-stretch" }
  attrs: { name: "font-style" }
  attrs: { name: "font-variant" }
  attrs: { name: "font-weight" }
  attrs: { name: "glyph-orientation-horizontal" }
  attrs: { name: "glyph-orientation-vertical" }
  attrs: { name: "image-rendering" }
  attrs: { name: "kerning" }
  attrs: { name: "letter-spacing" }
  attrs: { name: "lighting-color" }
  attrs: { name: "marker-end" }
  attrs: { name: "marker-mid" }
  attrs: { name: "marker-start" }
  attrs: { name: "mask" }
  attrs: { name: "opacity" }
  attrs: { name: "overflow" }
  attrs: { name: "pointer-events" }
  attrs: { name: "shape-rendering" }
  attrs: { name: "stop-color" }
  attrs: { name: "stop-opacity" }
  attrs: { name: "stroke" }
  attrs: { name: "stroke-dasharray" }
  attrs: { name: "stroke-dashoffset" }
  attrs: { name: "stroke-linecap" }
  attrs: { name: "stroke-linejoin" }
  attrs: { name: "stroke-miterlimit" }
  attrs: { name: "stroke-opacity" }
  attrs: { name: "stroke-width" }
  attrs: { name: "text-anchor" }
  attrs: { name: "text-decoration" }
  attrs: { name: "text-rendering" }
  attrs: { name: "unicode-bidi" }
  attrs: { name: "vector-effect" }
  attrs: { name: "visibility" }
  attrs: { name: "word-spacing" }
  attrs: { name: "writing-mode" }
}
attr_lists: {
  name: "svg-transfer-function-attributes"
  attrs: { name: "amplitude" }
  attrs: { name: "exponent" }
  attrs: { name: "intercept" }
  attrs: { name: "offset" }
  attrs: { name: "slope" }
  attrs: { name: "table" }
  attrs: { name: "tablevalues" }
}
attr_lists: {
  name: "svg-xlink-attributes"
  attrs: { name: "xlink:actuate" }
  attrs: { name: "xlink:arcrole" }
  attrs: {
    name: "xlink:href"
    // xlink:href is deprecated since SVG2 in favor of href.
    alternative_names: "href"
    value_url: {
      allowed_protocol: "http"
      allowed_protocol: "https"
      allow_relative: true
      allow_empty: false
    }
  }
  attrs: { name: "xlink:role" }
  attrs: { name: "xlink:show" }
  attrs: { name: "xlink:title" }
  attrs: { name: "xlink:type" }
}
// Style attributes are broadly disallowed, but specifically allowed
// within SVG as SVG are commonly generated by tools.
attr_lists: {
  name: "svg-style-attr"
  attrs: {
    name: "style"
    blacklisted_value_regex: "!important"
  }
}

// Basics
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "G"
  mandatory_ancestor: "SVG"
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "transform" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-conditional-processing-attributes"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "GLYPH"
  mandatory_ancestor: "SVG"
  attrs: { name: "arabic-form" }
  attrs: { name: "d" }
  attrs: { name: "glyph-name" }
  attrs: { name: "horiz-adv-x" }
  attrs: { name: "orientation" }
  attrs: { name: "unicode" }
  attrs: { name: "vert-origin-x" }
  attrs: { name: "vert-origin-y" }
  attrs: { name: "vert-adv-y" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "GLYPHREF"
  mandatory_ancestor: "SVG"
  attrs: { name: "dx" }
  attrs: { name: "dy" }
  attrs: { name: "format" }
  attrs: { name: "glyphref" }
  attrs: { name: "x" }
  attrs: { name: "y" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  attr_lists: "svg-xlink-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "IMAGE"
  mandatory_ancestor: "SVG"
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "height" }
  attrs: { name: "preserveaspectratio" }
  attrs: { name: "transform" }
  attrs: { name: "width" }
  attrs: { name: "x" }
  attrs: { name: "y" }
  // XLink Attributes:
  attrs: { name: "xlink:actuate" }
  attrs: { name: "xlink:arcrole" }
  attrs: {
    name: "xlink:href"
    // xlink:href is deprecated since SVG2 in favor of href.
    alternative_names: "href"
    value_url: {
      allowed_protocol: "data"
      allowed_protocol: "http"
      allowed_protocol: "https"
      allow_relative: true
      allow_empty: false
    }
    // Inline SVGs execute in a different context and can affect page elements.
    blacklisted_value_regex: "(^|\\s)data:image\\/svg\\+xml"
  }
  attrs: { name: "xlink:role" }
  attrs: { name: "xlink:show" }
  attrs: { name: "xlink:title" }
  attrs: { name: "xlink:type" }

  attr_lists: "svg-style-attr"
  attr_lists: "svg-conditional-processing-attributes"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "MARKER"
  mandatory_ancestor: "SVG"
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "markerunits" }
  attrs: { name: "markerwidth" }
  attrs: { name: "markerheight" }
  attrs: { name: "orient" }
  attrs: { name: "preserveaspectratio" }
  attrs: { name: "refx" }
  attrs: { name: "refy" }
  attrs: { name: "transform" }
  attrs: { name: "viewbox" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "METADATA"
  mandatory_ancestor: "SVG"
  attr_lists: "svg-style-attr"
  attr_lists: "svg-core-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "PATH"
  mandatory_ancestor: "SVG"
  attrs: { name: "d" }
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "pathlength" }
  attrs: { name: "sketch:type" }
  attrs: { name: "transform" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-conditional-processing-attributes"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "SOLIDCOLOR"
  mandatory_ancestor: "SVG"
  attrs: { name: "solid-color" }
  attrs: { name: "solid-opacity" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "SVG"
  attrs: { name: "contentscripttype" }
  attrs: { name: "contentstyletype" }
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "height" }
  attrs: { name: "preserveaspectratio" }
  attrs: { name: "version", {value_regex: "(1.0|1.1)" }}
  attrs: { name: "viewbox" }
  attrs: { name: "width" }
  attrs: { name: "x" }
  attrs: { name: "y" }
  attrs: { name: "zoomandpan" }
  attr_lists: "svg-conditional-processing-attributes"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "SWITCH"
  mandatory_ancestor: "SVG"
  attr_lists: "svg-style-attr"
  attr_lists: "svg-conditional-processing-attributes"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "VIEW"
  mandatory_ancestor: "SVG"
  attr_lists: "svg-style-attr"
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "preserveaspectratio" }
  attrs: { name: "viewbox" }
  attrs: { name: "viewtarget" }
  attrs: { name: "zoomandpan" }
  attr_lists: "svg-core-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
// Shapes
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "CIRCLE"
  mandatory_ancestor: "SVG"
  attrs: { name: "cx" }
  attrs: { name: "cy" }
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "r" }
  attrs: { name: "sketch:type" }
  attrs: { name: "transform" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-conditional-processing-attributes"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "ELLIPSE"
  mandatory_ancestor: "SVG"
  attrs: { name: "cx" }
  attrs: { name: "cy" }
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "rx" }
  attrs: { name: "ry" }
  attrs: { name: "sketch:type" }
  attrs: { name: "transform" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-conditional-processing-attributes"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "LINE"
  mandatory_ancestor: "SVG"
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "sketch:type" }
  attrs: { name: "transform" }
  attrs: { name: "x1" }
  attrs: { name: "x2" }
  attrs: { name: "y1" }
  attrs: { name: "y2" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-conditional-processing-attributes"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "POLYGON"
  mandatory_ancestor: "SVG"
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "points" }
  attrs: { name: "sketch:type" }
  attrs: { name: "transform" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-conditional-processing-attributes"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "POLYLINE"
  mandatory_ancestor: "SVG"
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "points" }
  attrs: { name: "sketch:type" }
  attrs: { name: "transform" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-conditional-processing-attributes"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "RECT"
  mandatory_ancestor: "SVG"
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "height" }
  attrs: { name: "rx" }
  attrs: { name: "ry" }
  attrs: { name: "sketch:type" }
  attrs: { name: "transform" }
  attrs: { name: "width" }
  attrs: { name: "x" }
  attrs: { name: "y" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-conditional-processing-attributes"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
// Text
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "TEXT"
  mandatory_ancestor: "SVG"
  attrs: { name: "dx" }
  attrs: { name: "dy" }
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "lengthadjust" }
  attrs: { name: "rotate" }
  attrs: { name: "text-anchor" }
  attrs: { name: "textlength" }
  attrs: { name: "transform" }
  attrs: { name: "x" }
  attrs: { name: "y" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-conditional-processing-attributes"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "TEXTPATH"
  mandatory_ancestor: "SVG"
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "method" }
  attrs: { name: "spacing" }
  attrs: { name: "startoffset" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-conditional-processing-attributes"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  attr_lists: "svg-xlink-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "TREF"
  mandatory_ancestor: "SVG"
  attrs: { name: "externalresourcesrequired" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-conditional-processing-attributes"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  attr_lists: "svg-xlink-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "TSPAN"
  mandatory_ancestor: "SVG"
  attrs: { name: "dx" }
  attrs: { name: "dy" }
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "rotate" }
  attrs: { name: "lengthadjust" }
  attrs: { name: "textlength" }
  attrs: { name: "x" }
  attrs: { name: "y" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-conditional-processing-attributes"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
// Rendering
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "CLIPPATH"
  mandatory_ancestor: "SVG"
  attrs: { name: "clippathunits" }
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "transform" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-conditional-processing-attributes"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "FILTER"
  mandatory_ancestor: "SVG"
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "filterres" }
  attrs: { name: "filterunits" }
  attrs: { name: "height" }
  attrs: { name: "primitiveunits" }
  attrs: { name: "width" }
  attrs: { name: "x" }
  attrs: { name: "y" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  attr_lists: "svg-xlink-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "HKERN"
  mandatory_ancestor: "SVG"
  attrs: { name: "g1" }
  attrs: { name: "g2" }
  attrs: { name: "k" }
  attrs: { name: "u1" }
  attrs: { name: "u2" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-core-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "LINEARGRADIENT"
  mandatory_ancestor: "SVG"
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "gradientunits" }
  attrs: { name: "gradienttransform" }
  attrs: { name: "spreadmethod" }
  attrs: { name: "x1" }
  attrs: { name: "y1" }
  attrs: { name: "x2" }
  attrs: { name: "y2" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  attr_lists: "svg-xlink-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "MASK"
  mandatory_ancestor: "SVG"
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "height" }
  attrs: { name: "maskcontentunits" }
  attrs: { name: "maskunits" }
  attrs: { name: "width" }
  attrs: { name: "x" }
  attrs: { name: "y" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-conditional-processing-attributes"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "PATTERN"
  mandatory_ancestor: "SVG"
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "height" }
  attrs: { name: "patternunits" }
  attrs: { name: "patterncontentunits" }
  attrs: { name: "patterntransform" }
  attrs: { name: "preserveaspectratio" }
  attrs: { name: "viewbox" }
  attrs: { name: "width" }
  attrs: { name: "x" }
  attrs: { name: "y" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-conditional-processing-attributes"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  attr_lists: "svg-xlink-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "RADIALGRADIENT"
  mandatory_ancestor: "SVG"
  attrs: { name: "cx" }
  attrs: { name: "cy" }
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "fr" }
  attrs: { name: "fx" }
  attrs: { name: "fy" }
  attrs: { name: "gradientunits" }
  attrs: { name: "gradienttransform" }
  attrs: { name: "r" }
  attrs: { name: "spreadmethod" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  attr_lists: "svg-xlink-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "STOP"
  spec_name: "lineargradient > stop"
  mandatory_ancestor: "LINEARGRADIENT"
  attrs: { name: "offset" }
  attrs: { name: "stop-color" }
  attrs: { name: "stop-opacity" }
  attr_lists: "svg-style-attr"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "STOP"
  spec_name: "radialgradient > stop"
  mandatory_ancestor: "RADIALGRADIENT"
  attrs: { name: "offset" }
  attrs: { name: "stop-color" }
  attrs: { name: "stop-opacity" }
  attr_lists: "svg-style-attr"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "VKERN"
  mandatory_ancestor: "SVG"
  attrs: { name: "g1" }
  attrs: { name: "g2" }
  attrs: { name: "k" }
  attrs: { name: "u1" }
  attrs: { name: "u2" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-core-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
// Special
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "DEFS"
  mandatory_ancestor: "SVG"
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "transform" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-conditional-processing-attributes"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "SYMBOL"
  mandatory_ancestor: "SVG"
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "preserveaspectratio" }
  attrs: { name: "viewbox" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "USE"
  mandatory_ancestor: "SVG"
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "height" }
  attrs: { name: "transform" }
  attrs: { name: "width" }
  attrs: { name: "x" }
  attrs: { name: "y" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-conditional-processing-attributes"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  attr_lists: "svg-xlink-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
// Filters
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "FECOLORMATRIX"
  mandatory_ancestor: "SVG"
  attrs: { name: "in" }
  attrs: { name: "type" }
  attrs: { name: "values" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-filter-primitive-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "FECOMPOSITE"
  mandatory_ancestor: "SVG"
  attrs: { name: "in" }
  attrs: { name: "in2" }
  attrs: { name: "k1" }
  attrs: { name: "k2" }
  attrs: { name: "k3" }
  attrs: { name: "k4" }
  attrs: { name: "operator" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-filter-primitive-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "FEFLOOD"
  mandatory_ancestor: "SVG"
  attr_lists: "svg-style-attr"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-filter-primitive-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "FEGAUSSIANBLUR"
  mandatory_ancestor: "SVG"
  attrs: { name: "edgemode" }
  attrs: { name: "in" }
  attrs: { name: "stddeviation" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-filter-primitive-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "FEMERGE"
  mandatory_ancestor: "SVG"
  attr_lists: "svg-style-attr"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-filter-primitive-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "FEMERGENODE"
  mandatory_ancestor: "SVG"
  attrs: { name: "in" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-core-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "FEOFFSET"
  mandatory_ancestor: "SVG"
  attrs: { name: "dx" }
  attrs: { name: "dy" }
  attrs: { name: "in" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-filter-primitive-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
// HTML inside SVG, esp. to allow amp-img.
// See https://github.com/ampproject/amphtml/issues/717
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "FOREIGNOBJECT"
  mandatory_ancestor: "SVG"
  attrs: { name: "externalresourcesrequired" }
  attrs: { name: "height" }
  attrs: { name: "transform" }
  attrs: { name: "width" }
  attrs: { name: "x" }
  attrs: { name: "y" }
  attr_lists: "svg-style-attr"
  attr_lists: "svg-conditional-processing-attributes"
  attr_lists: "svg-core-attributes"
  attr_lists: "svg-presentation-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
// ARIA
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "DESC"
  mandatory_ancestor: "SVG"
  attr_lists: "svg-style-attr"
  attr_lists: "svg-core-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "TITLE"
  spec_name: "svg title"
  mandatory_ancestor: "SVG"
  attr_lists: "svg-style-attr"
  attr_lists: "svg-core-attributes"
  spec_url: "https://www.ampproject.org/docs/reference/spec//svg"
}

// 4.8 Links
// Links are a concept, rather than a tag. See tagspecs for "LINK", "A", etc.

// 4.9 Tabular data
// 4.9.1 The table element
tags: {
  tag_name: "TABLE"
  attrs: { name: "sortable" }
  // These attributes are not supported in HTML5, but are widely supported and
  // commonly found.
  attrs: { name: "align" }
  attrs: { name: "border", {value_regex: "0|1" }}
  attrs: { name: "bgcolor" }
  attrs: { name: "cellpadding" }
  attrs: { name: "cellspacing" }
  attrs: { name: "width" }
}
// 4.9.2 The caption element
tags: {
  tag_name: "CAPTION"
}
// 4.9.3 The colgroup element
tags: {
  tag_name: "COLGROUP"
  attrs: { name: "span" }
}
// 4.9.4 The col element
tags: {
  tag_name: "COL"
  attrs: { name: "span" }
}
// 4.9.5 The tbody element
tags: {
  tag_name: "TBODY"
}
// 4.9.6 The thead element
tags: {
  tag_name: "THEAD"
}
// 4.9.7 The tfoot element
tags: {
  tag_name: "TFOOT"
}
// 4.9.8 The tr element
tags: {
  tag_name: "TR"
  // These attributes are not supported in HTML5, but are widely supported and
  // commonly found.
  attrs: { name: "align" }
  attrs: { name: "bgcolor" }
  attrs: { name: "height" }
  attrs: { name: "valign" }
}
// 4.9.9 The td element
tags: {
  tag_name: "TD"
  attrs: { name: "colspan" }
  attrs: { name: "headers" }
  attrs: { name: "rowspan" }
  // These attributes are not supported in HTML5, but are widely supported and
  // commonly found.
  attrs: { name: "align" }
  attrs: { name: "bgcolor" }
  attrs: { name: "height" }
  attrs: { name: "valign" }
  attrs: { name: "width" }
}
// 4.9.10 The th element
tags: {
  tag_name: "TH"
  attrs: { name: "abbr" }
  attrs: { name: "colspan" }
  attrs: { name: "headers" }
  attrs: { name: "rowspan" }
  attrs: { name: "scope" }
  attrs: { name: "sorted" }
  // These attributes are not supported in HTML5, but are widely supported and
  // commonly found.
  attrs: { name: "align" }
  attrs: { name: "bgcolor" }
  attrs: { name: "height" }
  attrs: { name: "valign" }
  attrs: { name: "width" }
}

// 4.10 Forms
// Form elements are allowed only when amp-form extension script is included
// with the exception of the button element which is always allowed.
// 4.10.3 The form element
tags: {  // <form method=GET ...>
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "FORM"
  spec_name: "FORM [method=GET]"
  requires_extension: "amp-form"
  disallowed_ancestor: "AMP-APP-BANNER"
  attrs: { name: "accept" }
  attrs: { name: "accept-charset" }
  // For method=GET forms, we require `action` and allow `action-xhr`.
  attrs: {
    name: "action"
    mandatory: true
    value_url: {
      allow_relative: true
      allowed_protocol: "https"
    }
    blacklisted_value_regex: "__amp_source_origin"
  }
  attrs: {
    name: "action-xhr"
    value_url: {
      allow_relative: true
      allowed_protocol: "https"
    }
    blacklisted_value_regex: "__amp_source_origin"
  }
  attrs: { name: "autocomplete" }
  attrs: {
    name: "custom-validation-reporting"
    value_regex: "(show-first-on-submit|show-all-on-submit|as-you-go|interact-and-submit)"
  }
  attrs: { name: "enctype" }
  attrs: {
    name: "method"
    // Default value is GET, so if method attribute is missing,
    // it matches this tagspec.
    value_casei: "get"
  }
  attrs: { name: "name" }
  attrs: { name: "novalidate" }
  attrs: {
    name: "target"
    mandatory: true
    value_regex_casei: "(_blank|_top)"
  }
  attrs: {
    name: "verify-xhr"
    value_url: {
      allow_relative: true
      allowed_protocol: "https"
    }
    blacklisted_value_regex: "__amp_source_origin"
  }
}
tags: {  // <form method=POST ...>
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "FORM"
  spec_name: "FORM [method=POST]"
  requires_extension: "amp-form"
  disallowed_ancestor: "AMP-APP-BANNER"
  attrs: { name: "accept" }
  attrs: { name: "accept-charset" }
  // For method=POST forms, we require `action-xhr` and disallow `action`.
  attrs: {
    name: "action-xhr"
    mandatory: true
    value_url: {
      allow_relative: true
      allowed_protocol: "https"
    }
    blacklisted_value_regex: "__amp_source_origin"
  }
  attrs: { name: "autocomplete" }
  attrs: {
    name: "custom-validation-reporting"
    value_regex: "(show-first-on-submit|show-all-on-submit|as-you-go)"
  }
  attrs: { name: "enctype" }
  attrs: {
    name: "method"
    mandatory: true
    value_casei: "post"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attrs: { name: "name" }
  attrs: { name: "novalidate" }
  attrs: {
    name: "target"
    mandatory: true
    value_regex_casei: "(_blank|_top)"
  }
  attrs: {
    name: "verify-xhr"
    value_url: {
      allow_relative: true
      allowed_protocol: "https"
    }
    blacklisted_value_regex: "__amp_source_origin"
  }
}


tags: {
  tag_name: "DIV"
  spec_name: "FORM > DIV [submitting]"
  mandatory_parent: "FORM"
  attrs: { name: "align" }
  attrs: {
    name: "submitting"
    mandatory: true
    // Avoid triggering errors for non-form divs.
    dispatch_key: NAME_DISPATCH
  }
}
tags: {
  tag_name: "DIV"
  spec_name: "FORM > DIV [submit-success]"
  mandatory_parent: "FORM"
  attrs: { name: "align" }
  attrs: {
    name: "submit-success"
    mandatory: true
  }
}
tags: {
  tag_name: "DIV"
  spec_name: "FORM > DIV [submit-success][template]"
  mandatory_parent: "FORM"
  attrs: { name: "align" }
  attrs: {
    name: "submit-success"
    mandatory: true
  }
  attrs: {
    name: "template"
    mandatory: true
  }
}
tags: {
  tag_name: "DIV"
  spec_name: "FORM > DIV [submit-error]"
  mandatory_parent: "FORM"
  attrs: { name: "align" }
  attrs: {
    name: "submit-error"
    mandatory: true
  }
}
tags: {
  tag_name: "DIV"
  spec_name: "FORM > DIV [submit-error][template]"
  mandatory_parent: "FORM"
  attrs: { name: "align" }
  attrs: {
    name: "submit-error"
    mandatory: true
  }
  attrs: {
    name: "template"
    mandatory: true
  }
}
attr_lists: {
  name: "input-name-attr"
  attrs: {
    name: "name"
    blacklisted_value_regex: "(^|\\s)("  // Values are space separated
        "__amp_\\S*|"
        "__count__|"
        "__defineGetter__|"
        "__defineSetter__|"
        "__lookupGetter__|"
        "__lookupSetter__|"
        "__noSuchMethod__|"
        "__parent__|"
        "__proto__|"
        "__AMP_\\S*|"
        "\\$p|"
        "\\$proxy|"
        "acceptCharset|"
        "addEventListener|"
        "appendChild|"
        "assignedSlot|"
        "attachShadow|"
        "baseURI|"
        "checkValidity|"
        "childElementCount|"
        "childNodes|"
        "classList|"
        "className|"
        "clientHeight|"
        "clientLeft|"
        "clientTop|"
        "clientWidth|"
        "compareDocumentPosition|"
        "computedName|"
        "computedRole|"
        "contentEditable|"
        "createShadowRoot|"
        "enqueAction|"
        "firstChild|"
        "firstElementChild|"
        "getAnimations|"
        "getAttribute|"
        "getAttributeNS|"
        "getAttributeNode|"
        "getAttributeNodeNS|"
        "getBoundingClientRect|"
        "getClientRects|"
        "getDestinationInsertionPoints|"
        "getElementsByClassName|"
        "getElementsByTagName|"
        "getElementsByTagNameNS|"
        "getRootNode|"
        "hasAttribute|"
        "hasAttributeNS|"
        "hasAttributes|"
        "hasChildNodes|"
        "hasPointerCapture|"
        "innerHTML|"
        "innerText|"
        "inputMode|"
        "insertAdjacentElement|"
        "insertAdjacentHTML|"
        "insertAdjacentText|"
        "isContentEditable|"
        "isDefaultNamespace|"
        "isEqualNode|"
        "isSameNode|"
        "lastChild|"
        "lastElementChild|"
        "lookupNamespaceURI|"
        "namespaceURI|"
        "nextElementSibling|"
        "nextSibling|"
        "nodeName|"
        "nodeType|"
        "nodeValue|"
        "offsetHeight|"
        "offsetLeft|"
        "offsetParent|"
        "offsetTop|"
        "offsetWidth|"
        "outerHTML|"
        "outerText|"
        "ownerDocument|"
        "parentElement|"
        "parentNode|"
        "previousElementSibling|"
        "previousSibling|"
        "querySelector|"
        "querySelectorAll|"
        "releasePointerCapture|"
        "removeAttribute|"
        "removeAttributeNS|"
        "removeAttributeNode|"
        "removeChild|"
        "removeEventListener|"
        "replaceChild|"
        "reportValidity|"
        "requestPointerLock|"
        "scrollHeight|"
        "scrollIntoView|"
        "scrollIntoViewIfNeeded|"
        "scrollLeft|"
        "scrollWidth|"
        "setAttribute|"
        "setAttributeNS|"
        "setAttributeNode|"
        "setAttributeNodeNS|"
        "setPointerCapture|"
        "shadowRoot|"
        "styleMap|"
        "tabIndex|"
        "tagName|"
        "textContent|"
        "toString|"
        "valueOf|"
        "(webkit|ms|moz|o)dropzone|"
        "(webkit|moz|ms|o)MatchesSelector|"
        "(webkit|moz|ms|o)RequestFullScreen|"
        "(webkit|moz|ms|o)RequestFullscreen"
        ")(\\s|$)"
  }
}
// 4.10.4 The label element
tags: {
  tag_name: "LABEL"
  attrs: { name: "for" }
}
// 4.10.5 The input element
tags: {
  tag_name: "INPUT"
  attrs: { name: "accept" }
  attrs: { name: "accesskey" }
  attrs: { name: "autocomplete" }
  attrs: { name: "autofocus" }
  attrs: { name: "checked" }
  attrs: { name: "disabled" }
  attrs: { name: "height" }
  attrs: { name: "inputmode" }
  attrs: { name: "list" }
  attrs: { name: "max" }
  attrs: { name: "maxlength" }
  attrs: { name: "min" }
  attrs: { name: "minlength" }
  attrs: { name: "multiple" }
  attrs: { name: "pattern" }
  attrs: { name: "placeholder" }
  attrs: { name: "readonly" }
  attrs: { name: "required" }
  attrs: { name: "selectiondirection" }
  attrs: { name: "size" }
  attrs: { name: "spellcheck" }
  attrs: { name: "step" }
  attrs: { name: "tabindex" }
  attrs: {
    name: "type"
    blacklisted_value_regex: "(^|\\s)("  // Values are space separated.
        "button|"
        "file|"
        "image|"
        "password|"
        ")(\\s|$)"
  }
  attrs: { name: "value" }
  attrs: { name: "width" }
  // <amp-bind>
  attrs: { name: "[accept]" }
  attrs: { name: "[accesskey]" }
  attrs: { name: "[autocomplete]" }
  attrs: { name: "[checked]" }
  attrs: { name: "[disabled]" }
  attrs: { name: "[height]" }
  attrs: { name: "[inputmode]" }
  attrs: { name: "[max]" }
  attrs: { name: "[maxlength]" }
  attrs: { name: "[min]" }
  attrs: { name: "[minlength]" }
  attrs: { name: "[multiple]" }
  attrs: { name: "[pattern]" }
  attrs: { name: "[placeholder]" }
  attrs: { name: "[readonly]" }
  attrs: { name: "[required]" }
  attrs: { name: "[selectiondirection]" }
  attrs: { name: "[size]" }
  attrs: { name: "[spellcheck]" }
  attrs: { name: "[step]" }
  attrs: { name: "[type]" }
  attrs: { name: "[value]" }
  attrs: { name: "[width]" }
  attr_lists: "input-name-attr"
  spec_url: "https://www.ampproject.org/docs/reference/components/amp-form"
}
// 4.10.6 The button element
tags: {
  tag_name: "BUTTON"
  attrs: {
    name: "disabled"
    value: ""
  }
  attrs: {
    name: "role"
    implicit: true
  }
  attrs: {
    name: "tabindex"
    implicit: true
  }
  attrs: { name: "type" }
  attrs: { name: "value" }
  // <amp-bind>
  attrs: { name: "[disabled]" }
  attrs: { name: "[type]" }
  attrs: { name: "[value]" }
  attr_lists: "input-name-attr"
}
tags: {
  html_format: AMP
  html_format: AMP4ADS
  tag_name: "BUTTON"
  spec_name: "amp-app-banner button[open-button]"
  satisfies: "amp-app-banner button[open-button]"
  mandatory_ancestor: "AMP-APP-BANNER"
  attrs: {
    name: "open-button"
    value: ""
  }
  attrs: {
    name: "role"
    implicit: true
  }
  attrs: {
    name: "tabindex"
    implicit: true
  }
  attrs: { name: "type" }
  attrs: { name: "value" }
  attr_lists: "input-name-attr"
}
// 4.10.7 The select element
tags: {
  tag_name: "SELECT"
  attrs: { name: "autofocus" }
  attrs: { name: "disabled" }
  attrs: { name: "multiple" }
  attrs: { name: "required" }
  attrs: { name: "size" }
  // <amp-bind>
  attrs: { name: "[autofocus]" }
  attrs: { name: "[disabled]" }
  attrs: { name: "[multiple]" }
  attrs: { name: "[required]" }
  attrs: { name: "[size]" }
  attr_lists: "input-name-attr"
  spec_url: "https://www.ampproject.org/docs/reference/components/amp-form"
}
// 4.10.8 The datalist element
tags: {
  tag_name: "DATALIST"
  spec_url: "https://www.ampproject.org/docs/reference/components/amp-form"
}
// 4.10.9 The optgroup element
tags: {
  tag_name: "OPTGROUP"
  mandatory_parent: "SELECT"
  attrs: { name: "disabled" }
  attrs: { name: "label" }
  // <amp-bind>
  attrs: { name: "[disabled]" }
  attrs: { name: "[label]" }
  spec_url: "https://www.ampproject.org/docs/reference/components/amp-form"
}
// 4.10.10 The option element
tags: {
  tag_name: "OPTION"
  attrs: { name: "disabled" }
  attrs: { name: "label" }
  attrs: { name: "selected" }
  attrs: { name: "value" }
  // <amp-bind>
  attrs: { name: "[disabled]" }
  attrs: { name: "[label]" }
  attrs: { name: "[selected]" }
  attrs: { name: "[value]" }
  spec_url: "https://www.ampproject.org/docs/reference/components/amp-form"
}
// 4.10.11 The textarea element
tags: {
  tag_name: "TEXTAREA"
  attrs: { name: "autocomplete" }
  attrs: { name: "autofocus" }
  attrs: { name: "cols" }
  attrs: { name: "disabled" }
  attrs: { name: "maxlength" }
  attrs: { name: "minlength" }
  attrs: { name: "placeholder" }
  attrs: { name: "readonly" }
  attrs: { name: "required" }
  attrs: { name: "rows" }
  attrs: { name: "selectiondirection" }
  attrs: { name: "selectionend" }
  attrs: { name: "selectionstart" }
  attrs: { name: "spellcheck" }
  attrs: { name: "wrap" }
  // <amp-bind>
  attrs: { name: "[autocomplete]" }
  attrs: { name: "[autofocus]" }
  attrs: { name: "[cols]" }
  attrs: { name: "[disabled]" }
  attrs: { name: "[maxlength]" }
  attrs: { name: "[minlength]" }
  attrs: { name: "[placeholder]" }
  attrs: { name: "[readonly]" }
  attrs: { name: "[required]" }
  attrs: { name: "[rows]" }
  attrs: { name: "[selectiondirection]" }
  attrs: { name: "[selectionend]" }
  attrs: { name: "[selectionstart]" }
  attrs: { name: "[spellcheck]" }
  attrs: { name: "[wrap]" }
  attr_lists: "input-name-attr"
  spec_url: "https://www.ampproject.org/docs/reference/components/amp-form"
}
// 4.10.13 The output element
tags: {
  tag_name: "OUTPUT"
  attrs: { name: "for" }
  attrs: { name: "form" }
  attr_lists: "input-name-attr"
}
// 4.10.14 The progress element
tags: {
  tag_name: "PROGRESS"
  attrs: { name: "max" }
  attrs: { name: "value" }
}
// 4.10.15 The meter element
tags: {
  tag_name: "METER"
  attrs: { name: "high" }
  attrs: { name: "low" }
  attrs: { name: "max" }
  attrs: { name: "min" }
  attrs: { name: "optimum" }
  attrs: { name: "value" }
}
// 4.10.16 The fieldset element
tags: {
  tag_name: "FIELDSET"
  attrs: { name: "disabled" }
  // <amp-bind>
  attrs: { name: "[disabled]" }
  attr_lists: "input-name-attr"
}
// 4.10.17 The legend element
tags: {
  tag_name: "LEGEND"
}

// 4.11 Scripting
// 4.11.1 The script element
// Only the amphtml script, custom extensions and the LD/JSON description are
// allowed.
tags: {
  html_format: AMP
  html_format: AMP4EMAIL
  html_format: EXPERIMENTAL
  tag_name: "SCRIPT"
  spec_name: "amphtml engine v0.js script"
  mandatory: true
  unique: true
  mandatory_parent: "HEAD"
  attrs: {
    name: "async"
    mandatory: true
    value: ""
  }
  attrs: { name: "nonce" }
  attrs: {
    name: "src"
    mandatory: true
    value: "https://cdn.ampproject.org/v0.js"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attrs: {
    name: "type"
    value_casei: "text/javascript"
  }
  cdata: {
    blacklisted_cdata_regex: {
      regex: "."
      error_message: "contents"
    }
  }
  spec_url: "https://www.ampproject.org/docs/reference/spec//required-markup"
}
tags: {
  html_format: AMP4ADS
  tag_name: "SCRIPT"
  spec_name: "amp4ads engine amp4ads-v0.js script"
  mandatory: true
  unique: true
  mandatory_parent: "HEAD"
  attrs: {
    name: "async"
    mandatory: true
    value: ""
  }
  attrs: { name: "nonce" }
  attrs: {
    name: "src"
    mandatory: true
    value: "https://cdn.ampproject.org/amp4ads-v0.js"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  attrs: {
    name: "type"
    value_casei: "text/javascript"
  }
  cdata: {
    blacklisted_cdata_regex: {
      regex: "."
      error_message: "contents"
    }
  }
  spec_url: "https://www.ampproject.org/docs/reference/spec//required-markup"
}
// JSON Linked Data
tags: {
  tag_name: "SCRIPT"
  spec_name: "script type=application/ld+json"
  attrs: { name: "nonce" }
  attrs: {
    name: "type"
    mandatory: true
    value_casei: "application/ld+json"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  cdata: {
    blacklisted_cdata_regex: {
      regex: "<!--"
      error_message: "html comments"
    }
  }
}
// AMP RTC (Real Time Config)
tags: {
  html_format: AMP
  html_format: EXPERIMENTAL
  tag_name: "SCRIPT"
  spec_name: "script id=amp-rtc"
  unique: true
  mandatory_parent: "HEAD"
  attrs: { name: "nonce" }
  attrs: {
    name: "type"
    mandatory: true
    value_casei: "application/json"
  }
  attrs: {
    name: "id"
    mandatory: true
    value_casei: "amp-rtc"
    dispatch_key: NAME_VALUE_DISPATCH
  }
  cdata: {
    blacklisted_cdata_regex: {
      regex: "<!--"
      error_message: "html comments"
    }
  }
}
// AMP IMA VIDEO
tags: {
  html_format: AMP
  html_format: EXPERIMENTAL
  tag_name: "SCRIPT"
  spec_name: "amp-ima-video > script[type=application/json]"
  mandatory_parent: "AMP-IMA-VIDEO"
  attrs: {
    name: "type"
    mandatory: true
    value_casei: "application/json"
    dispatch_key: NAME_VALUE_PARENT_DISPATCH
  }
  cdata: {
    blacklisted_cdata_regex: {
      regex: "<!--"
      error_message: "html comments"
    }
  }
}
// Specific script tags for custom elements and runtime imports.
// 4.11.2 The noscript element
tags: {
  html_format: AMP
  html_format: EXPERIMENTAL
  tag_name: "NOSCRIPT"
  spec_name: "noscript enclosure for boilerplate"
  mandatory: true
  unique: true
  mandatory_parent: "HEAD"
  spec_url: "https://github.com/ampproject/amphtml/blob/master/spec/amp-boilerplate.md"
}
// We allow noscript in the body to contain tags otherwise disallowed by AMP.
tags: {
  html_format: AMP
  tag_name: "NOSCRIPT"
  // Noscript inside of noscript has strange parsing semantics in browsers and
  // isn't really helping anyone anyway.
  mandatory_ancestor: "BODY"
  disallowed_ancestor: "NOSCRIPT"
}
// 4.11.3 The template element
// See extensions/amp-mustache/validator-amp-mustache.protoascii.

// 11 Obsolute features
// 11.2 Non-conforming features
tags: {
  html_format: AMP
  html_format: EXPERIMENTAL
  tag_name: "ACRONYM"
}
tags: {
  html_format: AMP
  html_format: EXPERIMENTAL
  tag_name: "BIG"
}
tags: {
  html_format: AMP
  html_format: EXPERIMENTAL
  tag_name: "CENTER"
}
tags: {
  html_format: AMP
  html_format: EXPERIMENTAL
  tag_name: "DIR"
}
tags: {
  html_format: AMP
  html_format: EXPERIMENTAL
  tag_name: "HGROUP"
}
tags: {
  html_format: AMP
  html_format: EXPERIMENTAL
  tag_name: "LISTING"
}
tags: {
  html_format: AMP
  html_format: EXPERIMENTAL
  tag_name: "MULTICOL"
}
tags: {
  html_format: AMP
  html_format: EXPERIMENTAL
  tag_name: "NEXTID"
}
tags: {
  html_format: AMP
  html_format: EXPERIMENTAL
  tag_name: "NOBR"
}
tags: {
  html_format: AMP
  html_format: EXPERIMENTAL
  tag_name: "SPACER"
}
tags: {
  html_format: AMP
  html_format: EXPERIMENTAL
  tag_name: "STRIKE"
}
tags: {
  html_format: AMP
  html_format: EXPERIMENTAL
  tag_name: "TT"
}
tags: {
  html_format: AMP
  html_format: EXPERIMENTAL
  tag_name: "XMP"
}

// Some additional tags, microformats, allowances.

// The slot element.
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot
tags: {
  html_format: AMP
  html_format: EXPERIMENTAL
  tag_name: "SLOT"
  attrs: { name: "name" }
}

// This tag is a preserved indicator for documents created in microsoft word.
// They do not render.
tags: {
  html_format: AMP
  tag_name: "O:P"
}

// Tags and attributes specific to AMP HTML.
// AMP Custom elements require a "src" or a "srcset" attribute,
// having both is also allowed.
attr_lists: {
  name: "mandatory-src-or-srcset"
  attrs: {
    name: "src"
    alternative_names: "srcset"
    mandatory: true
    value_url: {
      allowed_protocol: "data"
      allowed_protocol: "http"
      allowed_protocol: "https"
      allow_relative: true
    }
    blacklisted_value_regex: "__amp_source_origin"
  }
}
// In AMP4EMAIL Custom elements require a "src" attribute. Unlike AMP-HTML,
// srcset is disallowed. In addition "src" is not bindable in AMP4EMAIL and the
// only accepted protocol is https. Finally the AMP4EMAIL restrictions on
// mustache on href appear here as well.
attr_lists: {
  name: "mandatory-src-amp4email"
  attrs: {
    name: "src"
    mandatory: true
    value_url: {
      allowed_protocol: "https"
      allow_relative: false
    }
    // Openning doubly curly brackets {{ (these are mustache delimiters) can only
    // appear at the beginnig of the attribute's value. Likewise closing doubly
    // curly brackets }} can only appear at the end of the attribute's value.
    // Furthermore unbalanced delimiters are not allowed.
    // Additionally section mustache delimiters, i.e., {{//, {{^, {{/ are
    // disallowed.
    blacklisted_value_regex: "(__amp_source_origin|"
        "(.|\\s){{|"    // Openning delimiter can only appear at the beginning.
        "}}(.|\\s)|"    // Closing delimiter can only appear at the end.
        "^{{.*[^}][^}]$|"    // Delimiters must be balanced.
        "^[^{][^{].*}}$|"    // Delimiters must be balanced.
        "^}}|"    // Also caught by the requirements on balanced delimiters.
        "{{$|"    // Also caught by the requirements on balanced delimiters.
        "{{//|"    // Section delimiters are disallowed.
        "{{/|"    // Section delimiters are disallowed.
        "{{\\^)"  // Section delimiters are disallowed.
  }
}
// Same as above except that the attribute is not mandatory.
attr_lists: {
  name: "optional-src-amp4email"
  attrs: {
    name: "src"
    value_url: {
      allowed_protocol: "https"
      allow_relative: false
    }
    blacklisted_value_regex: "(__amp_source_origin|"
        "(.|\\s){{|"    // Openning delimiter can only appear at the beginning.
        "}}(.|\\s)|"    // Closing delimiter can only appear at the end.
        "^{{.*[^}][^}]$|"    // Delimiters must be balanced.
        "^[^{][^{].*}}$|"    // Delimiters must be balanced.
        "^}}|"    // Also caught by the requirements on balanced delimiters.
        "{{$|"    // Also caught by the requirements on balanced delimiters.
        "{{//|"    // Section delimiters are disallowed.
        "{{/|"    // Section delimiters are disallowed.
        "{{\\^)"  // Section delimiters are disallowed.
  }
}

// Extended AMP globally optional tags.
attr_lists: {
  name: "extended-amp-global"
  attrs: { name: "media" }
  attrs: { name: "noloading", {value: "" }
}
tags: {  // <amp-img>
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "AMP-IMG"
  attrs: { name: "alt" }
  attrs: { name: "attribution" }
  attrs: { name: "placeholder" }
  // <amp-bind>
  attrs: { name: "[alt]" }
  attrs: { name: "[attribution]" }
  attrs: { name: "[src]" }
  attrs: { name: "[srcset]" }
  attr_lists: "extended-amp-global"
  attr_lists: "lightboxable-elements"
  attr_lists: "mandatory-src-or-srcset"
  spec_url: "https://www.ampproject.org/docs/reference/components/amp-img"
  amp_layout: {
    supported_layouts: FILL
    supported_layouts: FIXED
    supported_layouts: FIXED_HEIGHT
    supported_layouts: FLEX_ITEM
    supported_layouts: INTRINSIC
    supported_layouts: NODISPLAY
    supported_layouts: RESPONSIVE
  }
}
// See the restrictions on mandatory-src-amp4email.
tags: {  // <amp-img>
  html_format: AMP4EMAIL
  tag_name: "AMP-IMG"
  spec_name: "AMP-IMG (AMP4EMAIL)"
  attrs: { name: "alt" }
  attrs: { name: "attribution" }
  attrs: { name: "placeholder" }
  attr_lists: "extended-amp-global"
  attr_lists: "mandatory-src-amp4email"
  // <amp-bind>
  attrs: { name: "[alt]" }
  attrs: { name: "[attribution]" }
  spec_url: "https://www.ampproject.org/docs/reference/components/amp-img"
  amp_layout: {
    supported_layouts: FILL
    supported_layouts: FIXED
    supported_layouts: FIXED_HEIGHT
    supported_layouts: FLEX_ITEM
    supported_layouts: NODISPLAY
    supported_layouts: RESPONSIVE
  }
}

tags: {  // <amp-layout>
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "AMP-LAYOUT"
  attr_lists: "extended-amp-global"
  spec_url: "https://www.ampproject.org/docs/reference/components/amp-layout"
  amp_layout: {
    supported_layouts: FILL
    supported_layouts: FIXED
    supported_layouts: FIXED_HEIGHT
    supported_layouts: FLEX_ITEM
    supported_layouts: INTRINSIC
    supported_layouts: NODISPLAY
    supported_layouts: RESPONSIVE
  }
}
tags: {  // <amp-pixel>
  html_format: AMP
  html_format: AMP4ADS
  html_format: EXPERIMENTAL
  tag_name: "AMP-PIXEL"
  attrs: { name: "allow-ssr-img" }
  attrs: {
    name: "referrerpolicy"
    value: "no-referrer"
  }
  attrs: {
    name: "src"
    mandatory: true
    value_url: {
      allowed_protocol: "https"
      allow_relative: true  // Will be set to false at a future date.
      allow_empty: true
    }
    blacklisted_value_regex: "__amp_source_origin"
  }
  attr_lists: "extended-amp-global"
  spec_url: "https://www.ampproject.org/docs/reference/components/amp-pixel"
  amp_layout: {
    defines_default_height: true
    defines_default_width: true
    supported_layouts: FIXED
    supported_layouts: NODISPLAY
  }
}
attr_lists: {
  name: "$AMP_LAYOUT_ATTRS"
  attrs: { name: "height" }
  attrs: { name: "heights" }
  attrs: { name: "layout" }
  attrs: { name: "sizes" }
  attrs: { name: "width" }
  // <amp-bind>
  attrs: { name: "[height]" }
  attrs: { name: "[width]" }
}

// AMP Extension attributes. These attributes are used in every AMP
// extension script tag
attr_lists: {
  name: "common-extension-attrs"
  attrs: {
    name: "async"
    mandatory: true
    value: ""
  }
  attrs: { name: "nonce" }
  attrs: {
    name: "type"
    value_casei: "text/javascript"
  }
}

// Global attributes: These can be used in all tags.
attr_lists: {
  name: "$GLOBAL_ATTRS"
  // For schema.org annotations.
  attrs: { name: "itemid" }
  attrs: { name: "itemprop" }
  attrs: { name: "itemref" }
  attrs: { name: "itemscope" }
  attrs: { name: "itemtype" }
  // Also for schema.org, RDFa syntax
  attrs: { name: "about" }
  attrs: { name: "content" }
  attrs: { name: "datatype" }
  attrs: { name: "inlist" }
  attrs: { name: "prefix" }
  attrs: { name: "property" }
  attrs: {
    name: "rel"
    blacklisted_value_regex: "(^|\\s)("  // Values are space separated
        "canonical|"
        "components|"
        "dns-prefetch|"
        "import|"
        "manifest|"
        "preconnect|"
        "preload|"
        "prerender|"
        "serviceworker|"
        "stylesheet|"
        "subresource"
        ")(\\s|$)"
  }
  attrs: { name: "resource" }
  attrs: { name: "rev" }
  attrs: { name: "typeof" }
  attrs: { name: "vocab" }
  // 3.2.5 HTML5 Global attributes.
  attrs: { name: "accesskey" }
  attrs: {
    name: "class"
    blacklisted_value_regex: "(^|\\W)i-amphtml-"
  }
  attrs: { name: "dir" }
  attrs: { name: "draggable" }
  attrs: {
    name: "hidden"
    value: ""
  attrs: { name: "lang" }
  attrs: { name: "tabindex" }
  attrs: { name: "title" }
  attrs: { name: "translate" }
  // Accessible Rich Internet Applications http://www.w3.org/TR/wai-aria/
  attrs: { name: "aria-activedescendant" }
  attrs: { name: "aria-atomic" }
  attrs: { name: "aria-autocomplete" }
  attrs: { name: "aria-busy" }
  attrs: { name: "aria-checked" }
  attrs: { name: "aria-controls" }
  attrs: { name: "aria-current" }
  attrs: { name: "aria-describedby" }
  attrs: { name: "aria-disabled" }
  attrs: { name: "aria-dropeffect" }
  attrs: { name: "aria-expanded" }
  attrs: { name: "aria-flowto" }
  attrs: { name: "aria-grabbed" }
  attrs: { name: "aria-haspopup" }
  attrs: { name: "aria-hidden" }
  attrs: { name: "aria-invalid" }
  attrs: { name: "aria-label" }
  attrs: { name: "aria-labelledby" }
  attrs: { name: "aria-level" }
  attrs: { name: "aria-live" }
  attrs: { name: "aria-multiline" }
  attrs: { name: "aria-multiselectable" }
  attrs: { name: "aria-orientation" }
  attrs: { name: "aria-owns" }
  attrs: { name: "aria-posinset" }
  attrs: { name: "aria-pressed" }
  attrs: { name: "aria-readonly" }
  attrs: { name: "aria-relevant" }
  attrs: { name: "aria-required" }
  attrs: { name: "aria-selected" }
  attrs: { name: "aria-setsize" }
  attrs: { name: "aria-sort" }
  attrs: { name: "aria-valuemax" }
  attrs: { name: "aria-valuemin" }
  attrs: { name: "aria-valuenow" }
  attrs: { name: "aria-valuetext" }
  attrs: {
    name: "on"
    trigger: {
      if_value_regex: "tap:.*"
      also_requires_attr: "role"
      also_requires_attr: "tabindex"
    }
  }
  attrs: { name: "role" }
  // For placeholders inside amp-ad and other tags, we allow the
  // placeholder empty attribute. See e.g.
  // https://github.com/ampproject/amphtml/pull/284/commits
  attrs: { name: "placeholder" value: "" }
  // We allow the empty fallback attribute on any element
  attrs: { name: "fallback" value: "" }
  attrs: { name: "lightbox" }
  attrs: { name: "overflow" }
  // amp-access specific attributes, see
  // https://www.ampproject.org/docs/reference/components/amp-access
  // TODO(gregable): These should only be allowed on any tag inside BODY or HEAD.
  attrs: { name: "amp-access" }
  attrs: { name: "amp-access-behavior" }
  attrs: { name: "amp-access-hide" }
  attrs: { name: "amp-access-id" }
  attrs: { name: "amp-access-loader" }
  attrs: { name: "amp-access-loading" }
  attrs: { name: "amp-access-off" }
  attrs: { name: "amp-access-on" }
  attrs: { name: "amp-access-show" }
  attrs: { name: "amp-access-style" }
  attrs: { name: "amp-access-template" }
  attrs: { name: "i-amp-access-id" }
  // amp-form specific attributes, see
  // https://github.com/ampproject/amphtml/issues/5268
  attrs: {
    name: "validation-for"
    trigger: {
      also_requires_attr: "visible-when-invalid"
    }
  }
  attrs: {
    name: "visible-when-invalid"
    value_regex: "(badInput|"
      "customError|"
      "patternMismatch|"
      "rangeOverflow|"
      "rangeUnderflow|"
      "stepMismatch|"
      "tooLong|"
      "typeMismatch|"
      "valueMissing)"
    trigger: {
      also_requires_attr: "validation-for"
    }
  }
  // amp-fx-collection specific attributes, see
  // https://www.ampproject.org/docs/reference/components/amp-fx-collection
  attrs: {
    name: "amp-fx"
    value_casei: "parallax"
    requires_extension: "amp-fx-collection"
  }
  // amp-subscriptions specific attributes, see
  // https://www.ampproject.org/docs/reference/components/amp-subscriptions
  attrs: {
    name: "subscriptions-action"
    requires_extension: "amp-subscriptions"
  }
  attrs: {
    name: "subscriptions-actions"
    value: ""
    requires_extension: "amp-subscriptions"
  }
  attrs: {
    name: "subscriptions-dialog"
    value: ""
    requires_extension: "amp-subscriptions"
  }
  attrs: {
    name: "subscriptions-display"
    requires_extension: "amp-subscriptions"
  }
  attrs: {
    name: "subscriptions-section"
    value_regex_casei: "(actions|content|content-not-granted)"
    requires_extension: "amp-subscriptions"
  }
  attrs: {
    name: "subscriptions-service"
    requires_extension: "amp-subscriptions"
  }
  // <amp-bind>
  attrs: { name: "[aria-activedescendant]" }
  attrs: { name: "[aria-atomic]" }
  attrs: { name: "[aria-autocomplete]" }
  attrs: { name: "[aria-busy]" }
  attrs: { name: "[aria-checked]" }
  attrs: { name: "[aria-controls]" }
  attrs: { name: "[aria-describedby]" }
  attrs: { name: "[aria-disabled]" }
  attrs: { name: "[aria-dropeffect]" }
  attrs: { name: "[aria-expanded]" }
  attrs: { name: "[aria-flowto]" }
  attrs: { name: "[aria-grabbed]" }
  attrs: { name: "[aria-haspopup]" }
  attrs: { name: "[aria-hidden]" }
  attrs: { name: "[aria-invalid]" }
  attrs: { name: "[aria-label]" }
  attrs: { name: "[aria-labelledby]" }
  attrs: { name: "[aria-level]" }
  attrs: { name: "[aria-live]" }
  attrs: { name: "[aria-multiline]" }
  attrs: { name: "[aria-multiselectable]" }
  attrs: { name: "[aria-orientation]" }
  attrs: { name: "[aria-owns]" }
  attrs: { name: "[aria-posinset]" }
  attrs: { name: "[aria-pressed]" }
  attrs: { name: "[aria-readonly]" }
  attrs: { name: "[aria-relevant]" }
  attrs: { name: "[aria-required]" }
  attrs: { name: "[aria-selected]" }
  attrs: { name: "[aria-setsize]" }
  attrs: { name: "[aria-sort]" }
  attrs: { name: "[aria-valuemax]" }
  attrs: { name: "[aria-valuemin]" }
  attrs: { name: "[aria-valuenow]" }
  attrs: { name: "[aria-valuetext]" }
  attrs: { name: "[class]" }
  attrs: { name: "[hidden]" }
  attrs: { name: "[text]" }
}

// Error  Used in the verbose validator to select between multiple
// generated error types for a failing error. A higher number means that the
// error is more specific, ie: more helpful, preferred.
error_specificity: { code: UNKNOWN_CODE}
error_specificity: { code: MANDATORY_CDATA_MISSING_OR_INCORRECT}
error_specificity: { code: CDATA_VIOLATES_BLACKLIST}
error_specificity: { code: NON_WHITESPACE_CDATA_ENCOUNTERED}
error_specificity: { code: DISALLOWED_TAG_ANCESTOR}
error_specificity: { code: MANDATORY_TAG_ANCESTOR}
error_specificity: { code: MANDATORY_TAG_ANCESTOR_WITH_HIN}
error_specificity: { code: MANDATORY_TAG_MISSIN}
error_specificity: { code: WRONG_PARENT_TA}
error_specificity: { code: TAG_REQUIRED_BY_MISSIN}
error_specificity: { code: TAG_EXCLUDED_BY_TA}
error_specificity: { code: MISSING_REQUIRED_EXTENSIO}
error_specificity: { code: ATTR_MISSING_REQUIRED_EXTENSIO}
error_specificity: { code: WARNING_TAG_REQUIRED_BY_MISSIN}
error_specificity: { code: EXTENSION_UNUSE}
error_specificity: { code: WARNING_EXTENSION_UNUSE }
error_specificity: { code: WARNING_EXTENSION_DEPRECATED_VERSIO}
error_specificity: { code: DISALLOWED_TA}
error_specificity: { code: DISALLOWED_ATT}
error_specificity: { code: INVALID_ATTR_VALU}
error_specificity: { code: DUPLICATE_ATTRIBUT}
error_specificity: { code: ATTR_VALUE_REQUIRED_BY_LAYOU}
error_specificity: { code: MANDATORY_ATTR_MISSIN}
error_specificity: { code: MANDATORY_ONEOF_ATTR_MISSIN}
error_specificity: { code: ATTR_REQUIRED_BUT_MISSIN}
error_specificity: { code: DUPLICATE_UNIQUE_TA}
error_specificity: { code: DUPLICATE_UNIQUE_TAG_WARNIN}
error_specificity: { code: STYLESHEET_TOO_LON}
error_specificity: { code: CSS_SYNTA}
error_specificity: { code: CSS_SYNTAX_INVALID_AT_RUL}
error_specificity: {
  code: MANDATORY_PROPERTY_MISSING_FROM_ATTR_VALU
}
error_specificity: { code: INVALID_PROPERTY_VALUE_IN_ATTR_VALU}
error_specificity: { code: DISALLOWED_PROPERTY_IN_ATTR_VALU}
error_specificity: { code: MUTUALLY_EXCLUSIVE_ATTR}
error_specificity: { code: UNESCAPED_TEMPLATE_IN_ATTR_VALU}
error_specificity: { code: TEMPLATE_PARTIAL_IN_ATTR_VALU}
error_specificity: { code: TEMPLATE_IN_ATTR_NAME}
error_specificity: {
  code: INCONSISTENT_UNITS_FOR_WIDTH_AND_HEIGH
}
error_specificity: { code: IMPLIED_LAYOUT_INVALID}
error_specificity: { code: SPECIFIED_LAYOUT_INVALID}
error_specificity: { code: ATTR_DISALLOWED_BY_IMPLIED_LAYOUT}
error_specificity: { code: ATTR_DISALLOWED_BY_SPECIFIED_LAYOUT}
error_specificity: { code: DUPLICATE_DIMENSION}
error_specificity: { code: DISALLOWED_RELATIVE_URL}
error_specificity: { code: MISSING_URL }
error_specificity: { code: DISALLOWED_DOMAIN}
error_specificity: { code: INVALID_URL_PROTOCOL}
error_specificity: { code: INVALID_URL}
error_specificity: { code: DISALLOWED_STYLE_ATTR}
error_specificity: { code: CSS_SYNTAX_STRAY_TRAILING_BACKSLASH}
error_specificity: { code: CSS_SYNTAX_UNTERMINATED_COMMENT}
error_specificity: { code: CSS_SYNTAX_UNTERMINATED_STRING}
error_specificity: { code: CSS_SYNTAX_BAD_URL}
error_specificity: {
  code: CSS_SYNTAX_EOF_IN_PRELUDE_OF_QUALIFIED_RU
}
error_specificity: { code: CSS_SYNTAX_INVALID_DECLARATI}
error_specificity: { code: CSS_SYNTAX_INCOMPLETE_DECLARATI}
error_specificity: { code: CSS_SYNTAX_ERROR_IN_PSEUDO_SELECT}
error_specificity: { code: CSS_SYNTAX_MISSING_SELECT}
error_specificity: { code: CSS_SYNTAX_NOT_A_SELECTOR_STA}
error_specificity: {
  code: CSS_SYNTAX_UNPARSED_INPUT_REMAINS_IN_SELECT
}
error_specificity: { code: CSS_SYNTAX_MISSING_U }
error_specificity: { code: CSS_SYNTAX_DISALLOWED_DOMA}
error_specificity: { code: CSS_SYNTAX_INVALID_U }
error_specificity: { code: CSS_SYNTAX_INVALID_URL_PROTOC}
error_specificity: { code: CSS_SYNTAX_DISALLOWED_RELATIVE_U}
error_specificity: { code: INCORRECT_NUM_CHILD_TAG }
error_specificity: { code: DISALLOWED_CHILD_TAG_NAME}
error_specificity: { code: DISALLOWED_FIRST_CHILD_TAG_NAME}
error_specificity: { code: CSS_SYNTAX_INVALID_ATTR_SELECTOR }
error_specificity: {
  code: CHILD_TAG_DOES_NOT_SATISFY_REFERENCE_POINT
}
error_specificity: { code: MANDATORY_REFERENCE_POINT_MISSING}
error_specificity: { code: DUPLICATE_REFERENCE_POINT}
error_specificity: { code: TAG_REFERENCE_POINT_CONFLICT}
error_specificity: {
  code: CHILD_TAG_DOES_NOT_SATISFY_REFERENCE_POINT_SINGULAR
}
error_specificity: { code: CSS_SYNTAX_DISALLOWED_PROPERTY_VALUE}
error_specificity: {
  code: CSS_SYNTAX_DISALLOWED_PROPERTY_VALUE_WITH_HINT
}
error_specificity: {
  code: CSS_SYNTAX_PROPERTY_DISALLOWED_WITHIN_AT_RULE
}
error_specificity: {
  code: CSS_SYNTAX_PROPERTY_DISALLOWED_TOGETHER_WITH
}
error_specificity: {
  code: CSS_SYNTAX_PROPERTY_REQUIRES_QUALIFICATION
}
error_specificity: {
  code: BASE_TAG_MUST_PRECEED_ALL_URLS
}
error_specificity: { code: DISALLOWED_SCRIPT_TAG }
error_specificity: { code: GENERAL_DISALLOWED_TAG}
error_specificity: { code: DEPRECATED_ATTR}
error_specificity: { code: DEPRECATED_TAG}
error_specificity: { code: DISALLOWED_MANUFACTURED_BODY}
error_specificity: { code: DOCUMENT_TOO_COMPLEX}
error_specificity: { code: INCORRECT_MIN_NUM_CHILD_TAGS}
error_specificity: { code: TAG_NOT_ALLOWED_TO_HAVE_SIBLINGS}
error_specificity: { code: MANDATORY_LAST_CHILD_TAG}
error_specificity: {
  code: CSS_SYNTAX_INVALID_PROPERTY

}
error_specificity: {
  code: CSS_SYNTAX_INVALID_PROPERTY_NOLIST

}
error_specificity: {
  code: CSS_SYNTAX_QUALIFIED_RULE_HAS_NO_DECLARATIONS

}
error_specificity: {
  code: CSS_SYNTAX_DISALLOWED_QUALIFIED_RULE_MUST_BE_INSIDE_KEYFRAME

}
error_specificity: {
  code: CSS_SYNTAX_DISALLOWED_KEYFRAME_INSIDE_KEYFRAME
 
}
error_specificity: {
  code: CSS_SYNTAX_MALFORMED_MEDIA_QUERY
 
}
error_specificity: {
  code: CSS_SYNTAX_DISALLOWED_MEDIA_TYPE
  
}
error_specificity: {
  code: CSS_SYNTAX_DISALLOWED_MEDIA_FEATURE
  
}
error_specificity: {
  code: INVALID_UTF8
}


// Error formats
amp_error_formats = {
  code: MANDATORY_TAG_MISSING,
  code: TAG_REQUIRED_BY_MISSING,
  code: WARNING_TAG_REQUIRED_BY_MISSING,
  code: TAG_EXCLUDED_BY_TAG,
  code: WARNING_EXTENSION_UNUSED,
  code: EXTENSION_UNUSED,
  code: WARNING_EXTENSION_DEPRECATED_VERSION
  ,code: ATTR_REQUIRED_BUT_MISSING
  ,code: DISALLOWED_TAG
  ,code: GENERAL_DISALLOWED_TAG
  ,code: DISALLOWED_SCRIPT_TAG
  ,code: DISALLOWED_ATTR
  ,code: DISALLOWED_STYLE_ATTR
  ,code: INVALID_ATTR_VALUE
  ,code: DUPLICATE_ATTRIBUTE
  ,code: ATTR_VALUE_REQUIRED_BY_LAYOUT
  ,code: IMPLIED_LAYOUT_INVALID
  ,code: SPECIFIED_LAYOUT_INVALID
  ,code: MANDATORY_ATTR_MISSING
  ,code: INCONSISTENT_UNITS_FOR_WIDTH_AND_HEIGHT
  ,code: STYLESHEET_TOO_LONG


  ,code: MANDATORY_CDATA_MISSING_OR_INCORRECT

  ,code: CDATA_VIOLATES_BLACKLIST
  ,code: NON_WHITESPACE_CDATA_ENCOUNTERED
  ,code: DISALLOWED_PROPERTY_IN_ATTR_VALUE
  ,code: INVALID_PROPERTY_VALUE_IN_ATTR_VALUE
  ,code: DUPLICATE_DIMENSION
  ,code: MISSING_URL
  ,code: INVALID_URL
  ,code: INVALID_URL_PROTOCOL
  ,code: DISALLOWED_DOMAIN
  ,code: DISALLOWED_RELATIVE_URL

  ,code: MANDATORY_PROPERTY_MISSING_FROM_ATTR_VALUE

  ,code: UNESCAPED_TEMPLATE_IN_ATTR_VALUE
  ,code: TEMPLATE_PARTIAL_IN_ATTR_VALUE
  ,code: DEPRECATED_TAG
  ,code: DEPRECATED_ATTR
  ,code: MUTUALLY_EXCLUSIVE_ATTRS

  ,code: MANDATORY_ONEOF_ATTR_MISSING
  ,code: WRONG_PARENT_TAG
  ,code: DISALLOWED_TAG_ANCESTOR
  ,code: MANDATORY_TAG_ANCESTOR
  ,code: MANDATORY_TAG_ANCESTOR_WITH_HINT
  ,code: DUPLICATE_UNIQUE_TAG
  ,code: DUPLICATE_UNIQUE_TAG_WARNING
  ,code: TEMPLATE_IN_ATTR_NAME
  ,code: ATTR_DISALLOWED_BY_IMPLIED_LAYOUT
  ,code: ATTR_DISALLOWED_BY_SPECIFIED_LAYOUT
  ,code: INCORRECT_NUM_CHILD_TAGS
 
  ,code: INCORRECT_MIN_NUM_CHILD_TAGS
 


  ,code: TAG_NOT_ALLOWED_TO_HAVE_SIBLINGS


  ,code: MANDATORY_LAST_CHILD_TAG



  ,code: DISALLOWED_CHILD_TAG_NAME


  ,code: DISALLOWED_FIRST_CHILD_TAG_NAME
 

  ,code: DISALLOWED_MANUFACTURED_BODY



  ,code: CHILD_TAG_DOES_NOT_SATISFY_REFERENCE_POINT



  ,code: CHILD_TAG_DOES_NOT_SATISFY_REFERENCE_POINT_SINGULAR


  ,code: MANDATORY_REFERENCE_POINT_MISSING



  ,code: DUPLICATE_REFERENCE_POINT



  ,code: TAG_REFERENCE_POINT_CONFLICT



  ,code: BASE_TAG_MUST_PRECEED_ALL_URLS


  ,code: MISSING_REQUIRED_EXTENSION

  ,code: ATTR_MISSING_REQUIRED_EXTENSION


  ,code: DOCUMENT_TOO_COMPLEX


  ,code: INVALID_UTF8
}}}}}}}}