'use strict';
var amphtmlValidator = require('amphtml-validator');
var errorHandler = require('./src/ampErrorHandler');
var content = `<!doctype html><html lang="en"><head></head><body><p>Test</p><img src="test"></img></body></html>`;

amphtmlValidator.getInstance().then(function(validator) {

  var result = validator.validateString(content);

  if(result.status == "FAIL"){
    for (var i = 0; i < result.errors.length; i++) {
      var error = result.errors[i];
      var msg = error.message;
      errorHandler(content,msg); 
    }
  }
  else{
    //return result
    console.log(content);
  }

})
.catch(function(error) {
 console.log(error);
});
