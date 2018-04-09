'use strict';
import * as cheerio from 'cheerio';
import * as main from '../index';

function checkForRequiredTags($){
    for (var key in requiredTags) {
        if(!$(requiredTags[key]).length){
            if(requiredTags[key] === `<html ⚡ lang="en">`){
                handleHTMLTags($,requiredTags[key]);  
            }
            else{
                $('head').append(requiredTags[key]);
            }
        }  
    }
    return $('html').html();
}

function handleHTMLTags($,Tag){
    if($.html().length){
       let tml =  $.html();
    }
    $('html').prepend(Tag);
}

function handleAMPComponents($,tag){
    $(`${tag}`).each(function(index, element){
        let attribs = element.attribs;
        let content = $(this).html();
        $(this).replacewith(`<amp-${tag} ${attribs}>${content}</amp-${tag}>`);
    });
}

module.exports = {checkForRequiredTags, handleAMPComponents};