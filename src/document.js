'use strict';
import * as cheerio from 'cheerio';


export function loadDocument (contents){
    $ = cheerio.load(contents);
    return $;
}

export function findElement($,element){
    if($(element).length != 0){
        let selectedElement = $(element).html();
        return selectedElement;
        }
}

export function changeElement(){
    let newElement;
    let oldElement = $(element).html();
    let newerElement = $(oldElement).replaceWith(newElement);
    return (newerElement).html();
}

