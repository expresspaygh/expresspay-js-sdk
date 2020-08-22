"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sprintf_js_1 = require("sprintf-js");
const axios_1 = require("axios");
class Config {
    constructor(merchantId, merchantApiKey) {
        this.merchantId = merchantId;
        this.merchantApiKey = merchantApiKey;
        this.productionUrl = "https://expresspaygh.com/api/";
        this.sandboxUrl = "https://sandbox.expresspaygh.com/api/";
    }
    getRequestInstance(baseURL) {
        return axios_1.default.create({
            baseURL: `${baseURL}`,
            timeout: 1000,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });
    }
    getSandboxUrl() {
        return sprintf_js_1.sprintf("%s", this.sandboxUrl);
    }
    getProductionUrl() {
        return sprintf_js_1.sprintf("%s", this.productionUrl);
    }
    getMerchantId() {
        return sprintf_js_1.sprintf("%s", this.merchantId);
    }
    getMerchantKey() {
        return sprintf_js_1.sprintf("%s", this.merchantApiKey);
    }
}
exports.default = Config;
