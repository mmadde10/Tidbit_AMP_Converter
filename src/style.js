'use strict';
import * as cheerio from 'cheerio';
import * as main from '../index';
const styleRules = require('./ampRules/styleRules');


export function removeDisallowedStyles($){
    $('body').children('style').each(function(){
        $(this).remove();
    });
    $("* [style]").removeAttr("style");
    $("* [type]").removeAttr("type");
}
export function validateStyle($){
    let style = $('head').find('style:not([amp-boilerplate])');
    let css = $(style).html();
    let ampStyle = `<style amp-custom>${css}</style>`
    $(style).replaceWith(ampStyle);
}
export function removeExternalStyles($){
    let fonts = styleRules.externalStylesheet.attrs.value;
    $('link[rel="stylesheet"]').each(function(index, element){
        for(let value in fonts){
            if($(this).attr(`[href=${fonts[value]}]`) !== undefined){
                return true;
            }
        }
        $(this).remove();   
    });
}

