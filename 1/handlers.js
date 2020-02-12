'use strict';
/*
 * handlers.js
 * Requesthandlers to be called by the routing mechanism
 */
const fs = require("fs");                           // file system access
const httpStatus = require("http-status-codes");
const lib = require("./libWebUtil");           // home grown utilities
const experimental = require("./myTemplater"); // highly experimental template
const querystring = require("querystring");
let filename = "user.json";


const goError = function(res) {
    res.writeHead(httpStatus.NOT_FOUND, {   // http page not found, 404
        "Content-Type": "text/html; charset=utf-8"
    });
    res.write("<h1>404 Not Found</h1>");
    res.end();
};

exports.getAndRespond = function(path, contentType, res) {
    console.log(path);
    if (fs.existsSync(path)) {              // does file exist, sync
        fs.readFile(path, function(err, data) { // read
            if (err) {                      // if read error
                console.log("error: " + err);           // inform server
                goError(res);               // inform user
                return;                     // back to caller
            }
            
            res.writeHead(httpStatus.OK, contentType); // prep header
            res.write(data);                // prep body with read data
            res.end();                      // send response
        });
    } else {
        goError(res);                       // doesnt exist error
    }
};


exports.receiveData = function(req, res, data) {
    console.log("you went here");
    let obj = lib.makeWebArrays(req, data);         // home made GET and POST objects
    res.writeHead(httpStatus.OK, {                  // yes, write relevant header
        "Content-Type": "text/html; charset=utf-8"
    });
    res.write(experimental.receipt(obj));           // home made templating for native node
    
    
    fs.readFile(filename, "utf8", function(err1, data) {
        if (err1) {
            throw err1;
        }

        let arr = [];                                   // prep array
        arr.push(obj);                                  // push obj onto array
        let jsonstr = JSON.stringify(arr);              // stringify

        fs.writeFile(filename, jsonstr, function(err) { // write to json file
            if (err) {
                throw err;
            }
        });
       
    });
    
    
}
