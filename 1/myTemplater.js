/* myTemplater.js Home made experimental templating */
"use strict";

const fs = require("fs");

const receipt = function(obj) {
    let html = `<!doctype html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Contact</title>
        <link rel="stylesheet" href="style.css"/>
    </head>
    <body>
        <h1>The bakery's Receipt</h1>
        <div>
            <p>You entered the following</p>
            <h3>Name</h3>
            <p>${obj.POST.name}</p>

            <h3>Email</h3>
            <p>${obj.POST.mail}</p>

            <h3>Message</h3>
            <pre>${obj.POST.message}</pre>
        </div>
        <div>
            <h3>We will get back to you.</h3>
            <p><a href="/">Return to front page</a><p>
        </div>
    </body>
</html>`;
    return html;
}

exports.receipt = receipt;