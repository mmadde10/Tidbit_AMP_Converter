'use strict';
import amphtmlValidator from 'amphtml-validator';
import * as ampConverter from "./src/ampDocument";
import * as document from './src/document'


function tidbitConverter(content){
    if(!content){
      return null;
    }
    amphtmlValidator.getInstance().then(function(validator){
      let result = validator.validateString(content);
    
      if(result.status == "FAIL"){
          let $ = document.loadDocument(content);
           $ = ampConverter.checkForRequiredTags($);
          ampConverter.replaceTags($);
        }
      }
    );
}
module.exports = tidbitConverter;