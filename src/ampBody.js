'use strict';
import * as cheerio from 'cheerio';
const bodyRules = require('./ampRules/bodyRules').bodyRules;
const scriptRules = require('./ampRules/scriptRules');
const appendRequiredScripts = require('./ampHead').appendRequiredScripts;

export function handleAMPTags($){
    let ruleAttrName;
    let content;
    let Attributes;
    let newAMPTag;

    for (var index in bodyRules) {
        $('body').find(bodyRules[index].tag_name).each(function(){
            let attrString = '';
            ruleAttrName = bodyRules[index].attrs;
            content = $(this).html();
            Attributes = $(this).attr();
            for(var j in Attributes){
                if(ruleAttrName.includes(j)){
                    attrString += `${j}=${Attributes[j]} `;
                }  
            }
            newAMPTag = `<${bodyRules[index].amp_name} ${attrString}>${content}</${bodyRules[index].amp_name}>`;
            $(this).replaceWith(newAMPTag);
            if($(this)[0].name === bodyRules[index].tag_name && bodyRules[index].required_script){
                //append required_script to head
                console.log('tt',bodyRules[index].required_script);
                appendRequiredScripts($,bodyRules[index].required_script);
            }
        });
    }
}
export function handleScripting($){
    for (var index in scriptRules.script.dissallowed_type) {
        $(`script[type="${scriptRules.script.dissallowed_type[index]}"]`).each(function(){
            $(this).remove();
        });    
    }
}