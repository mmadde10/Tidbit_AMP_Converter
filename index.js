'use strict';
import * as cheerio from 'cheerio';
import amphtmlValidator from 'amphtml-validator';
import {checkForRequiredTags, handleAMPComponents} from "./src/ampDocument";
import * as document from './src/document'


function tidbitConverter(content){
  let ampHTML;
  if(!content){
    return null;
  }



  amphtmlValidator.getInstance().then(function (validator) {
    var result = validator.validateString(content);
    console.log(result);
    if(result.status === 'PASS'){
      console.log(result.status);
    }

    else{
      for (var i in result.errors){
        var error = result.errors[i];
        var msg = 'line ' + error.line + ', col ' + error.col + ': ' + error.message;
        ((error.severity === 'ERROR') ? console.error : console.warn)(msg);
      }
    }
  });

  let $ = document.loadDocument(content);
  $ = checkForRequiredTags($);
  //for tags
    //handleAMPComponents($,tag)
  //}

    return null;
}
module.exports = tidbitConverter;