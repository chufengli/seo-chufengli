# seo-chufengli

  - Shopback node.js code challenge


### Installation

```bash
npm install seo-chufengli
```

## Usage

```javascript
var seo = require('seo-chufengli')
var shopback = new seo.readFile('test.html')
    .detectStrong(5)
    .detectRel()
	.detectH1()
	.detectImgAlt()
	.detectHead()
	.detectMeta('robots')
	.detectMeta('chufengli')
    .consoleLog()
```

### Todos

 - The input can be Node Readable Stream
 - The output cab be Node Writable Stream

License
----

MIT

Acknowledgements
----

- [cheeriojs/cheerio](https://github.com/cheeriojs/cheerio)

**Free Software, Happy Coding!**