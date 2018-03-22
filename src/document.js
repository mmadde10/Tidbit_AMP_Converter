'use strict';
import * as cheerio from 'cheerio';


export function loadDocument (contents){
    $ = cheerio.load(contents);
    return $;
}
