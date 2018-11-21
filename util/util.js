var fs = require('fs');
var path = require('path');

var isFunction = require('@jsmini/is').isFunction;

function travel(dir, callback, excludePath) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            var flag = excludePath.some(function (pattern) {
                return isFunction(pattern) ? pattern(pathname) : pathname.match(pattern);
            });

            // 命中 excludePath
            if (!flag) {
                travel(pathname, callback);
            }

        } else {
            callback(pathname);
        }
    });
}

exports.travel = travel;
