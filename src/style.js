'use strict';
import * as cheerio from 'cheerio';
import * as main from '../index';
import requiredTags from '../assets/ampTags';
import * as sizeOf from 'object-sizeof';



function getStyle($){
    let stylesObject = $('style').map(function(index, element){
        return $(this).html();
    }).get().join(' ');

    if(sizeOf(stylesObject) < 50000){
         return `<style amp-custom>${stylesObject}</style>`;
    } 
}

function handleExternalStylesheet($){
    $('link([rel="stylesheet")').each(function(index, element){
        $(this).remove();
    });
}

function handleInlineStyle($,stylesObject,tag){
    $('[style]').each(function(index, attr){
        $(this).removeAttr('style');
    });
}
module.exports = getStyle, handleInlineStyle;