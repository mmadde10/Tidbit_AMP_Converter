'use strict';
import * as cheerio from 'cheerio';
import * as headRules from './ampRules/headRules';
const helper = require('./helpers/loaders_and_checkers')


export function handleHTMLTags($){

    if($('meta[name="viewport"]').length == 0){
        $('head').append(headRules.viewport.amp_tag);
    }
    $('head').append(headRules.boilerplate.amp_tag);
    $('head').append(headRules.canonical.amp_tag);
    $('head').append(headRules.meta.amp_tag);
    appendRequiredScripts($,headRules.ampScript.required_script);  
}

export function appendRequiredScripts($,requred_script){
        $('head').append(`\n${requred_script}`);
}