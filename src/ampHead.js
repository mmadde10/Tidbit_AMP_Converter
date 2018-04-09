'use strict';
import * as cheerio from 'cheerio';
import {MandatoryAMPTags, link, meta, ampBoiler} from '../assets/ampRules/headRules';


function handleMandatoryTags($){
    //Doctype
    let doctype = MandatoryAMPTags.Doctype;
    let ampTag = MandatoryAMPTags.AMP;
    let canonicalLink = MandatoryAMPTags.canonical;

    if(!$(doctype.tag_name).length()){
        $(doctype.mandatory_parent).append(doctype.tag_name);
    }

    //AMP Tag
    if($(ampTag.orignal).length()){
        $(ampTag.orignal).attr(ampTag.attrs.name);
    }
    else{
        $(ampTag.mandatory_parent).append(ampTag.replacement);
    }

}
function handleLinkTags($){
    //Link
    if(!$(canonicalLink.spec_name).length){
        $(canonicalLink.mandatory_parent).append(canonicalLink.spec_name);
    }
    let dissallowedAttr = link.attr_lists.dissallowed_attrs_list;

    //TODO Edit to look for multiple link tags
    for (let index in dissallowedAttr) {
        if ($('link').attr(dissallowedAttr[index]).length){
            $("link").removeAttr(dissallowedAttr[index]);
        }
      }
    //StyleSheet for fonts
    let allowedFonts = link.linkStyle.value_regex;
    for (let index in allowedFonts) {
        if(!$('link').attr(`href=${allowedFonts}`).length){
            $("link").removeAttr(allowedFonts[index]);
        }
    }
}
