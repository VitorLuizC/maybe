"use strict";
exports.__esModule = true;
var Maybe = {
    isNone: function (value) {
        return value === null || value === undefined;
    },
    map: function (value, fn) {
        return Maybe.isNone(value) ? void value : fn(value);
    }
};
exports["default"] = Maybe;
