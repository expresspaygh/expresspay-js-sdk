"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Utility/Config");
class QueryInvoice {
    constructor(request, config) {
        this.config = config;
        this.request = request;
    }
    make() {
        if (!(this.config instanceof Config_1.default) || !this.config) {
            throw new Error("Sorry, config cannot be empty");
        }
        if (!(this.request instanceof Object) || !this.request) {
            throw new Error("Sorry, request cannot be empty");
        }
        try {
            Object.assign(this.makeResult, { "merchant-id": this.config.getMerchantId() });
            Object.assign(this.makeResult, { "api-key": this.config.getMerchantKey() });
            Object.assign(this.makeResult, { "token": this.request.token });
        }
        catch (e) {
            throw new Error(e.message);
        }
        return this.makeResult;
    }
}
exports.default = QueryInvoice;
