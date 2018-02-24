'use strict';
var amphtmlValidator = require('amphtml-validator');
var errorHandler = require('./src/ampErrorHandler');
var content = `<!doctype html><html lang="en"></html>`;

amphtmlValidator.getInstance()
.then(function(instance) {
  var validationResult = instance.validateString(content);
  if(validationResult.result == "FAIL"){
    var valid = errorHandler.handleErrors(content,validationResult); 
  }
  
  //console.log(validationResult);
})
.catch(function(error) {
 console.log(error);
});
