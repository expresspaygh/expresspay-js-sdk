// imports
import { sprintf } from "sprintf-js";
import Config from "./Utility/Config";
import QueryInvoice from "./Requests/Query";
import SubmitInvoice from "./Requests/Submit";

/**
 *
 *
 * @export
 * @class MerchantApi
 */
export default class MerchantApi
{
  /**
   *
   *
   * @type {any}
   * @memberof MerchantApi
   */
  private client: any;
  /**
   *
   *
   * @type {Config}
   * @memberof MerchantApi
   */
  private config: Config;
  /**
   *
   *
   * @type {string}
   * @memberof MerchantApi
   */
  private env: string;
  /**
   *
   *
   * @type {string}
   * @memberof MerchantApi
   */
  private base_url: string;
  /**
   *
   *
   * @type {Array<string>}
   * @memberof MerchantApi
   */
  private allowedEnvs: Array<string>;
  /**
   *
   *
   * @type {*}
   * @memberof MerchantApi
   */
  private request: any;

  /**
   *Creates an instance of MerchantApi.
   * @param {string} merchant_id
   * @param {string} merchant_key
   * @param {string} environment
   * @memberof MerchantApi
   */
  public constructor (merchant_id: string, merchant_key: string, environment: string) 
  {
    // set required obj vars
    this.config = new Config(merchant_id, merchant_key);
    this.allowedEnvs = ["sandbox", "production"];
    this.env = environment;

    // init and validate env
    this.init()
  }

  /**
   * Init base url and envs
   *
   * @memberof MerchantApi
   */
  public init() : void
  {
    // check env
    if (!this.allowedEnvs.includes(this.env))
    {
      throw new Error(`Sorry, (${this.env}) is not allowed, expecting (sandbox) or (production)`);
    }

    // get api url
    if (this.env === "sandbox")
    {
      this.base_url = this.config.getSandboxUrl();
    }
    else if (this.env === "production")
    {
      this.base_url = this.config.getProductionUrl();
    }

    // set client
    this.client = this.config.getRequestInstance(this.base_url);
  }
  /**
   * Submit invoice
   *
   * @param {string} currency
   * @param {number} amount
   * @param {string} order_id
   * @param {string} order_desc
   * @param {string} redirect_url
   * @param {string} account_number
   * @param {(string | null)} order_img_url
   * @param {(string | null)} first_name
   * @param {(string | null)} last_name
   * @param {(string | null)} phone_number
   * @param {(string | null)} email
   * @returns {Promise<any>}
   * @memberof MerchantApi
   */
  public async submit(currency: string, amount: number, order_id: string, order_desc: string, redirect_url: string, account_number: string, order_img_url: string | null, first_name: string | null, last_name: string | null, phone_number: string | null, email: string | null) : Promise<any>
  {
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
      }

      let requestAccessor = new SubmitInvoice(this.request, this.config);
      let requestData = requestAccessor.make();

      await this.client.post(
        "submit.php", 
        querystring.stringify(requestData)
      ).then(function (response: { data: any; status: any; statusText: any; headers: any; config: any; }) {
        
        if (response.status === 200 && response.statusText === "OK")
        {
          return response.data;
        } else {
          throw new Error(`Something bad happened: ${response.data}`);
        }

      }).catch(function(error: { response: any; message: any; }) {
        
        if (error.response)
        {
          throw new Error(`Status: ${error.response.status} || Data: ${error.response.data}`)
        } else {
          throw new Error(error.message);
        }

      });

    } catch (e) {
      throw new Error(e.message);
    }

    throw new Error("Something bad happened, kindly try again");
  }

  /**
   *
   *
   * @param {string} token
   * @returns {string}
   * @memberof MerchantApi
   */
  public checkout(token: string) : string | null
  {
    try {
      return sprintf("%scheckout.php?token=%s", this.base_url, token);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  /**
   *
   *
   * @param {string} token
   * @returns {Promise<any>}
   * @memberof MerchantApi
   */
  public async query(token: string) : Promise<any>
  {
    try {

      const querystring = require('querystring');
      
      this.request = {
        "token": token
      }

      let requestAccessor = new QueryInvoice(this.request, this.config);
      let requestData = requestAccessor.make();

      await this.client.post(
        "query.php", 
        querystring.stringify(requestData)
      ).then(function (response: { data: any; status: any; statusText: any; headers: any; config: any; }) {
        
        if (response.status === 200 && response.statusText === "OK")
        {
          return response.data;
        } else {
          throw new Error(`Something bad happened: ${response.data}`);
        }

      }).catch(function(error: { response: any; message: any; }) {
        
        if (error.response)
        {
          throw new Error(`Status: ${error.response.status} || Data: ${error.response.data}`)
        } else {
          throw new Error(error.message);
        }

      });

    } catch (e) {
      throw new Error(e.message);
    }

    throw new Error("Something bad happened, kindly try again");
  }

}
