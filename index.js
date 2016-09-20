var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/sasa"] = requestHandlers.sasa;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/uploading"]=requestHandlers.uploading;
handle["/fuck"]=requestHandlers.fuck;

server.start(router.route, handle);
