'use strict';
var amphtmlValidator = require('amphtml-validator');
var errorHandler = require('./src/ampErrorHandler');
var content = `<!doctype html><html lang="en"><head></head><body><p>Test</p><img src="test"></img></body></html>`;


function tidbitConverter(content){
    if(!content){
      return null;
    }
    amphtmlValidator.getInstance().then(function(validator){
      var result = validator.validateString(content);
    
      if(result.status == "FAIL"){
        for (var i = 0; i < result.errors.length; i++) {
          var message = result.errors[i].message;
          handleErrors(message); 
        }
      }
    });
}


function handleErrors(ampMessage){
  let tagMissing = validationErrors.mandatoryTagMissing;
  if(ampMessage === tagMissing.ampTag){
          addTag();
          console.log("Found");
          console.log(tagMissing.ampTag);

  }
  else{
          console.log("Not Found");
  }
}
module.exports = tidbitConverter;