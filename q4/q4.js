const http = require('http');

// this is just an example of the input, it can contain up to 100 URLs, define your own URLs in input to implement & test out the getContentLength
// const input = ['http://nodejs.org/dist/index.json', 'http://www.google.com', ...];
const input = [];

// implement getContentLength here

getContentLength(input).then(result => console.log(result));
