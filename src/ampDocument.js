'use strict';

import * as document from 'document';

let $ = document.loadDocument(contents);

 function replaceImageTags($){
    $('body').find('img').each(function(index, element){
        element = element.attribs;
        let src = String(element.src);
        let content = $(this).html();
        let ampIMG = `<amp-img src = ${src}  width = 16  height = 9 layout= "responsive">  ${content} </amp-img>`;
        $(this).replaceWith(ampIMG);
    });
}
function replaceIframeTags($){
    $('iframe').each(function(index, element) {
        let iframe = element.attribs;
        let ampiframe = `<amp-iframe width="16" height="9" sandbox="allow-scripts allow-same-origin" layout="responsive" title=${iframe.title} id=${iframe.id} src=${iframe.src}></amp-iframe>`;
        $(this).replaceWith(ampiframe);
    });
}

function fixDocument($){
    $('style:not([amp-boilerplate])').each(function(){
            let css = $(this).html();
            let ampStyle = `<style amp-custom>${css}</style>`
            $(this).replaceWith(ampStyle);
    });
    $('#socialButtons').each(function(){
        let facebookAppId = $('#facebookLink').attr('app_id');
        let ampSocialShare = `<div id="ampSocialButtons">
            <amp-social-share id="ampFacebookLink"  width="30" height="30"  type="facebook" data-param-app_id=${facebookAppId}></amp-social-share>
            <amp-social-share id="ampTwitterLink"  width="30" height="30"   type="twitter"></amp-social-share>
            <amp-social-share id="ampLinkedinLink"  width="30" height="30"  type="linkedin"></amp-social-share>
            </div>`;
        $(this).replaceWith(ampSocialShare);
    });
}
function deleteBannedElements($){
    $('script[type="text/template"]').each(function(){
        $(this).remove(); 
    });
    $('script[type="application/template"]').each(function(){
        $(this).remove();
    });
    $('script[type="text/javascript"]').each(function(){
        $(this).remove();
    });
    $('link[rel="stylesheet"]').each(function(){
        $(this).remove();
    });
    $('p').each(function() {
        $(this).removeAttr('style');
    });
    $('span').each(function() {
        $(this).removeAttr('style');
    });
    $('table').each(function() {
        $(this).removeAttr('style');
    });
    $('td').each(function() {
        $(this).removeAttr('style');
    });
    $('tr').each(function() {
        $(this).removeAttr('style');
    });
    $('th').each(function() {
        $(this).removeAttr('style');
    });
    $('body').children('style').each(function(){
        $(this).remove();
    });   
}
module.exports = deleteBannedElements, fixDocument, replaceIframeTags, replaceImageTags;