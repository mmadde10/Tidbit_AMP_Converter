'use strict';
import * as cheerio from 'cheerio';
const head = require('./ampHead');
const body = require('./ampBody');
const style = require('./style');

export function createHead($){
    head.handleHTMLTags($);
}

export function validateBody($){
    body.handleAMPTags($);
    body.handleScripting($);
}
export function validateStyleTags($){
    style.removeDisallowedStyles($);
    style.validateStyle($);
    style.removeExternalStyles($);
}