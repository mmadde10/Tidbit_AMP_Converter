'use strict';
import * as cheerio from 'cheerio';
import amphtmlValidator from 'amphtml-validator';
import {createHead, validateBody,validateStyleTags} from "./src/ampDocument";
import * as loader from './src/helpers/loaders_and_checkers'


function tidbitConverter(content){
    let ampHTML;
    if(!content){
      return null;
    }
    let $ = loader.loadDocument(content);
    createHead($);
    validateBody($);
    validateStyleTags($);
    ampHTML = `<!doctype html><html amp lang="en">${$('html').html()}</html>`;
    return ampHTML;  
}
function tidbitBody(content){
  let ampHTML;

  if(!content){
    return null;
  }

  let $ = loader.loadDocument(content);
  validateBody($);
  validateStyleTags($);
  ampHTML = $('body').html();
  return `${ampHTML}`;
}

module.exports = {tidbitConverter,tidbitBody};