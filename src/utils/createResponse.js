"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (body, statusCode) {
    if (statusCode === void 0) { statusCode = 200; }
    var response = {
        statusCode: statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(body),
    };
    return response;
});
