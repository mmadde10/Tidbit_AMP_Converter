const validationErrors = {
    dissallowedHTML: {
        Doctype:'The parent tag of tag html "⚡" for top-level html" is "$root", but it can only be "!doctype".',
        BodyTag:'Tag or text which is only allowed inside the body section found outside of the body section.'
    },
    mandatoryTagMissing: {
        Doctype:'The mandatory tag "html doctype" is missing or incorrect.',
        Head: 'The mandatory tag "head" is missing or incorrect.',
        Canonical: 'The mandatory tag "link rel=canonical" is missing or incorrect.',
        Charset: 'The mandatory tag "meta charset=utf-8" is missing or incorrect.',
        viewport:'The mandatory tag "meta name=viewport" is missing or incorrect.',
        ampScript:'The mandatory tag "amphtml engine v0.js script" is missing or incorrect.',
        ampBoilerPlate: 'The mandatory tag "noscript enclosure for boilerplate" is missing or incorrect.',
        ampTag: `The mandatory attribute '⚡' is missing in tag 'html ⚡ for top-level html'.`
    },
    stylesheet:{
        length:"STYLESHEET_TOO_LONG",
        syntax:"CSS_SYNTAX",
        syntaxInvalidRule: "CSS_SYNTAX_INVALID_AT_RULE",
        disallowedStyle:"DISALLOWED_STYLE_ATTR"
    },
    layout:{
        "impliedInvalid":"IMPLIED_LAYOUT_INVALID",
        "impliedDiallowed":"ATTR_DISALLOWED_BY_IMPLIED_LAYOUT",
        "specifiedInvalid":"SPECIFIED_LAYOUT_INVALID",
        "specifiedDisallowed":"ATTR_DISALLOWED_BY_SPECIFIED_LAYOUT",
        "invalidValue":"ATTR_VALUE_REQUIRED_BY_LAYOUT",
        "inconsistantWidthandHeight": "INCONSISTENT_UNITS_FOR_WIDTH_AND_HEIGHT"
    },
    image:{
        "disallowedImageTag":"MANDATORY_TAG_ANCESTOR_WITH_HINT",
        "disallowedImageHTML":"DISALLOWED_HTML_WITH_AMP_EQUIVALENT"
    },
    script:{
       "customScrpitTagDissallowed":"DISALLOWED_SCRIPT_TAG"
    }
}
module.exports = validationErrors;