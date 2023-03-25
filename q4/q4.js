const https = require("https");
const { resolve } = require("path");
const querystring = require("querystring");

const server = https.createServer((req, res) => {
  console.log("req.method:", req.method);
  const url = req.url;
  req.query = querystring.parse(url.split("?")[1]);
  res.end(JSON.stringify(req.query));
});
server.listen(3000);
console.log("GET OK~~~");

// this is just an example of the input, it can contain up to 100 URLs, define your own URLs in input to implement & test out the getContentLength
const inputs = [
  "https://cn.vuejs.org/",
  "https://www.baidu.com/",
  "https://juejin.cn/",
  "https://angular.cn/",
  "https://react.docschina.org/",
];

let requests = 0;
let responses = [];

// const getContentLength = (input) => {
//   https.get(input, (res) => {
//     console.log(res.headers["content-length"]);
//     responses.push(res);
//     requests++;
//     if (requests == inputs.length) {
//       console.log(responses[1]);
//     }
//   });
// };

// implement getContentLength here
// for (let i in inputs) {
//   getContentLength(inputs[i]);
// }
getContentLength(inputs).then((res) => {
  console.log(res);
});
function getContentLength(inputs) {
  const promises = inputs.map(
    (url) =>
      new Promise((resolve, reject) => {
        const req = https.get(url, (res) => {
          if (res.statusCode !== 200) {
            reject(new Error(`Invalid status code: ${res.statusCode}`));
            return;
          }
          console.log(res);
          let contentLength = res.headers["content-length"];
          if (contentLength) {
            resolve(parseInt(contentLength));
          } else {
            reject(new Error("Missing content length header"));
          }
        });
        req.on("error", reject);
        req.end();
      })
  );
  return Promise.all(promises);
}
