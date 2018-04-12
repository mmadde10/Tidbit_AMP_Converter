'use strict';
import * as cheerio from 'cheerio';
import fs from 'fs';

export function loadJSON(JSONFile) {
  let contents = fs.readFileSync(JSONFile);
  let jsonContent = JSON.parse(contents);
  return jsonContent;
}

export function loadDocument (contents){
  let $ = cheerio.load(contents);
   return $;
}
export function checkExist($,tag_name,tag_attr){
  if($(tag_name).length){
      if($(tag_name).attr(tag_attr)){
          return false;
      }
      return true
  } 
  else{
      return false;
  }    
}
