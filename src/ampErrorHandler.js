'use strict';
var validationErrors = require('../validator/validationErrors');

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
module.exports = handleErrors;