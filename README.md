# Tidbit AMP Converter

## Description

Quick Converter of Regular HTML Article Pages into Google AMP Pages

## Information

Tidbit converts basic HTML based articles into either AMP (Accelerated Mobile Pages) markup. Tidbit automates the process of converting plain html code into these two article formats, eliminating the need to create multiple copies of the same article.

* [AMP's Documentation](https://www.ampproject.org/)
* [Facebook Instant Articles Documentation](https://developers.facebook.com/docs/instant-articles/)

## Set up

```bash
npm i tidbit_amp_converter
```

### Functions

#### Build AMP Page HTML

* Contents is your HTML String

```javascript
import * as tidbit from 'tidbit_amp_converter'
//Returns AMP Complient HTML
let ampPage = tidbit.tidbitConverter(contents);
```

#### Build AMP Page HTML (Body Only)

```javascript
import * as tidbit from 'tidbit_amp_converter'
//Returns body of AMP Document
let ampBody = tidbit.tidbitBody(contents);
```

__Note:__
For More info visit [AMP's Documentation](https://www.ampproject.org/docs/getting-started/)

## Testing

Jest is used to run tests on Tidbit

```bash
npm run test
```

## License

MIT
