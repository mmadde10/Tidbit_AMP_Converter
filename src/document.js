'use strict';
import * as cheerio from 'cheerio';


export function loadDocument (contents){
   let $ = cheerio.load(contents);
    return $;
}
