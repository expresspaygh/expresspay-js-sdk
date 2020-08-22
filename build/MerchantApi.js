"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sprintf_js_1 = require("sprintf-js");
const Config_1 = require("./Utility/Config");
const Query_1 = require("./Requests/Query");
const Submit_1 = require("./Requests/Submit");
class MerchantApi {
    constructor(merchant_id, merchant_key, environment) {
        this.config = new Config_1.default(merchant_id, merchant_key);
        this.allowedEnvs = ["sandbox", "production"];
        this.env = environment;
        this.init();
    }
    init() {
        if (!this.allowedEnvs.includes(this.env)) {
            throw new Error(`Sorry, (${this.env}) is not allowed, expecting (sandbox) or (production)`);
        }
        if (this.env === "sandbox") {
            this.base_url = this.config.getSandboxUrl();
        }
        else if (this.env === "production") {
            this.base_url = this.config.getProductionUrl();
        }
        this.client = this.config.getRequestInstance(this.base_url);
    }
    async submit(currency, amount, order_id, order_desc, redirect_url, account_number, order_img_url, first_name, last_name, phone_number, email) {
        try {
            const querystring = require('querystring');
            this.request = {
                "currency": currency,
                "amount": amount,
                "order_id": order_id,
                "order_desc": order_desc,
                "redirect_url": redirect_url,
                "account_number": account_number,
                "order_img_url": order_img_url,
                "first_name": first_name,
                "last_name": last_name,
                "phone_number": phone_number,
                "email": email
            };
            let requestAccessor = new Submit_1.default(this.request, this.config);
            let requestData = requestAccessor.make();
            await this.client.post("submit.php", querystring.stringify(requestData)).then(function (response) {
                if (response.status === 200 && response.statusText === "OK") {
                    return response.data;
                }
                else {
                    throw new Error(`Something bad happened: ${response.data}`);
                }
            }).catch(function (error) {
                if (error.response) {
                    throw new Error(`Status: ${error.response.status} || Data: ${error.response.data}`);
                }
                else {
                    throw new Error(error.message);
                }
            });
        }
        catch (e) {
            throw new Error(e.message);
        }
        throw new Error("Something bad happened, kindly try again");
    }
    checkout(token) {
        try {
            return sprintf_js_1.sprintf("%scheckout.php?token=%s", this.base_url, token);
        }
        catch (e) {
            throw new Error(e.message);
        }
    }
    async query(token) {
        try {
            const querystring = require('querystring');
            this.request = {
                "token": token
            };
            let requestAccessor = new Query_1.default(this.request, this.config);
            let requestData = requestAccessor.make();
            await this.client.post("query.php", querystring.stringify(requestData)).then(function (response) {
                if (response.status === 200 && response.statusText === "OK") {
                    return response.data;
                }
                else {
                    throw new Error(`Something bad happened: ${response.data}`);
                }
            }).catch(function (error) {
                if (error.response) {
                    throw new Error(`Status: ${error.response.status} || Data: ${error.response.data}`);
                }
                else {
                    throw new Error(error.message);
                }
            });
        }
        catch (e) {
            throw new Error(e.message);
        }
        throw new Error("Something bad happened, kindly try again");
    }
}
exports.default = MerchantApi;
