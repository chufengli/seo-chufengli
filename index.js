const cheerio = require('cheerio')
const fs = require('fs')

function SeoFileRuler(path) {
	this.$ = cheerio.load(fs.readFileSync(path))
	this.result = ''
}

SeoFileRuler.prototype.detectImgAlt = function detectImgAlt() {
	var altMissing = 0
	this.$('img').each(function (index, element) {
		var alt = element.attribs.alt
		if(alt === undefined)
			altMissing++
	})
	
	this.result += 'There are ' + altMissing + ' <img> tag without alt attribute\n'
	return this
}

SeoFileRuler.prototype.detectRel = function detectRel() {
	var relMissing = 0
	this.$('a').each(function (index, element) {
		var rel = element.attribs.rel
		if(rel === undefined)
			relMissing++
	})
	
	this.result += 'There are ' + relMissing + ' <a> tag without rel attribute\n'
	return this
}

SeoFileRuler.prototype.detectStrong = function detectStrong(num) {
	var defaultNum = 15	
	if(num !== undefined)
		defaultNum = num
	
	if(this.$('strong').get().length > defaultNum) 
		this.result += 'This HTML have more than ' + defaultNum + ' <strong> tag\n'
	
	return this
}

SeoFileRuler.prototype.detectH1 = function detectH1() {
	var h1 = this.$('h1').get().length
	if(h1 > 1) 
		this.result += 'This HTML have more than one <h1> tag\n'
	
	return this
}

SeoFileRuler.prototype.detectHead = function detectHead() {
	if(this.$('title').text() == '')
		this.result += 'This HTML without <title> tag\n'
	
	var description = true
	var keywords = true
	this.$('meta[name]').each(function (index, element) {
		var name = element.attribs.name
		if(name == 'description')
			description = false
		if(name == 'keywords')
			keywords = false
	})
	
	if(description)
		this.result += 'This HTML without <meta name="descriptions" … /> tag\n'
	if(keywords)
		this.result += 'This HTML without <meta name="keywords" … /> tag\n'
	
	return this
}

SeoFileRuler.prototype.detectMeta = function detectMeta(customTag) {
	var customRule = true
	this.$('meta[name]').each(function (index, element) {
		var name = element.attribs.name
		if(name == customTag)
			customRule = false
	})
	
	if(customRule)
		this.result += 'This HTML without <meta name="' + customTag + '" … /> tag\n'
	else
		this.result += 'This HTML existing <meta name="' + customTag + '" … /> tag\n'

	return this
}

SeoFileRuler.prototype.consoleLog = function() {
	console.log(this.result)
	return this
}

SeoFileRuler.prototype.writeFile = function(path) {
	var defaultPath = '/seo-chufengli.log'	
	if(path !== undefined)
		defaultPath = path
	
	fs.writeFile(defaultPath, this.result, 'utf8', function(err) {
		if(err)
			return console.log(err)
		console.log("The file was saved at: " + path)
	})
	
	return this
}

module.exports.load = SeoFileRuler


