// imports
import { sprintf } from "sprintf-js";
import axios, { AxiosInstance } from 'axios';

/**
 *
 *
 * @export
 * @class Config
 */
export default class Config
{
  /**
   *
   *
   * @type {string}
   * @memberof Config
   */
  private sandboxUrl: string;
  /**
   *
   *
   * @type {string}
   * @memberof Config
   */
  private productionUrl: string;
  /**
   *
   *
   * @type {string}
   * @memberof Config
   */
  private merchantId: string;
  /**
   *
   *
   * @type {string}
   * @memberof Config
   */
  private merchantApiKey: string;

  /**
   *Creates an instance of Config.
   * @param {string} merchantId
   * @param {string} merchantApiKey
   * @memberof Config
   */
  public constructor(merchantId: string, merchantApiKey: string)
  {
    this.merchantId = merchantId;
    this.merchantApiKey = merchantApiKey;

    this.productionUrl = "https://expresspaygh.com/api/";
    this.sandboxUrl = "https://sandbox.expresspaygh.com/api/";
  }

  /**
   *
   *
   * @returns {AxiosInstance}
   * @memberof Config
   */
  public getRequestInstance(baseURL: string) : AxiosInstance
  {
    return axios.create({
      baseURL: `${baseURL}`,
      timeout: 1000,
      headers: {"Content-Type": "application/x-www-form-urlencoded"}
    });
  }
  /**
   *
   *
   * @returns {string}
   * @memberof Config
   */
  public getSandboxUrl() : string
  {
    return sprintf("%s", this.sandboxUrl);
  }
  /**
   *
   *
   * @returns {string}
   * @memberof Config
   */
  public getProductionUrl() : string
  {
    return sprintf("%s", this.productionUrl);
  }
  /**
   *
   *
   * @returns {string}
   * @memberof Config
   */
  public getMerchantId() : string
  {
    return sprintf("%s", this.merchantId);
  }

  /**
   *
   *
   * @returns {string}
   * @memberof Config
   */
  public getMerchantKey() : string
  {
    return sprintf("%s", this.merchantApiKey);
  }

}