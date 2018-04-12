var jest = require('jest');
var tidbit = require('../index');

let contents = `<!doctype html>
<html lang="en">
  <head>

    <title>News Article</title>

    <style>
        p{
          font-family: helvetica;
        }
        img{
          width: 10;
          height: 10;
        }
        h5{
          font-family: helvetica;
        }
        h3{
          font-family: helvetica;
        }
    </style>

    <link href="base.css" rel="stylesheet" />


    <script type="text/javascript" src="base.js"></script>
  </head>
  <body>
  <section class="article-content ng-binding" style="color: #4c4c4c;"><em></em></section>
<section class="featured-articles" style="color: #4c4c4c;">
<p><em style="color: #4c4c4c"></em></p>
  <table>
    <tr>
      <td class="grHighlight" style="padding-left: 6px;">Single Family/Condo</td>
      <td class="grHighlight" style="padding-left: 6px; text-align: center;">N/A</td>
      <td class="grHighlight" style="padding-left: 6px; text-align: center;">15%</td>
      <td class="grHighlight" style="padding-left: 6px; text-align: center;">50%</td>
    </tr>
    </table>


<p><b style="line-height: 1.5em;">FHA&#x2019;s Cash Down Payment</b></p>

<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
  Your browser does not support the video tag.
</video>


<ul type="disc"><li>Be careful when clicking links and opening attachments. If possible, hover your mouse over linkable text or a graphic to see the destination URL. Proceed with caution (or not at all) to avoid landing on a dangerous site or inadvertently downloading a virus.</li><li>Most of the correspondence you receive should be addressed to you specifically. If you receive an email with a generic greeting, that&#x2019;s a red flag.</li><li>Be on the lookout for misspellings and bad grammar. These can be an indicator of a fake email and at times it may even be intentional&#x2014;mistakes like this can help fraudsters avoid spam filters.</li></ul><p>If you feel you&#x2019;ve been a victim of a phishing scam or fraud as it pertains to getting a mortgage, give your loan officer a call right away to let them know. You should also report any such instance to the Federal Trade Commission (FTC.gov), which aims to protect America&#x2019;s consumers.</p>


  </body>
</html>`;


describe('Index Page returns result', () => {
    test('Main Project AMP', () => {
        let ampPage = tidbit.tidbitConverter(contents);
        console.log('finished\n',ampPage);
        expect(ampPage).not.toBeNull();
    });

    test('Body Project AMP', () => {
      let ampPage = tidbit.tidbitBody(contents);
      console.log('finished body\n',ampPage);
      expect(ampPage).not.toBeNull();
  });
});