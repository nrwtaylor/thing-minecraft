var fs = require("fs");
var filePath = "/opt/minecraft/server/logs/latest.log";
var file = fs.readFileSync(filePath);

console.log(file);

//#fs.watchFile(filePath, function(curr, prev) {
//  file = fs.readFileSync(filePath);
//  console.log(file);
//});

Tail = require('tail').Tail;

tail = new Tail(filePath);

tail.on("line", function(data) {
  console.log(data);
});
