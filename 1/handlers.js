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
    
    let filename = 'user.json';
    let array = [];

    fs.readFile(filename, "utf8", function(err1, data) {
        if (err1) {
            throw err1;
        }

        array = JSON.parse(data);  //Read array  
        array.push(obj); //tilføjer til array  
        let jsonstr = JSON.stringify(array);              // stringify 

        fs.writeFile(filename, jsonstr, function(err) { // write to json file
            if (err) {                                  // rewrite, not update
                throw err;
            }
            console.log("Your messsage was succesfully created");
        });
        
       
    });
    
    
}
