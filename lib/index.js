"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.astroApiAssert = astroApiAssert;
exports.AssertAPIRoute = AssertAPIRoute;
var assert_1 = __importDefault(require("assert"));
var AstroAssertError = /** @class */ (function (_super) {
    __extends(AstroAssertError, _super);
    function AstroAssertError(message, code) {
        var _this = _super.call(this, message) || this;
        _this.name = "AstroAssertError";
        _this.code = code;
        // Maintain proper stack trace (for V8 engines)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, AstroAssertError);
        }
        return _this;
    }
    return AstroAssertError;
}(Error));
function astroApiAssert(condition, message, code) {
    if (code === void 0) { code = 400; }
    try {
        (0, assert_1.default)(condition);
    }
    catch (error) {
        throw new AstroAssertError(message || 'Something went wrong', code);
    }
}
function AssertAPIRoute(fn) {
    return fn().catch(function (error) {
        if (error instanceof AstroAssertError) {
            return new Response(error.message, { status: error.code });
        }
        else {
            if (process.env.NODE_ENV === 'development')
                console.error('astro-assert', error); // Log the error for debugging
            return new Response('Internal Server Error', { status: 500 });
        }
    });
}
