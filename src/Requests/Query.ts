// imports
import Config from "../Utility/Config";

/**
 *
 *
 * @export
 * @class QueryInvoice
 */
export default class QueryInvoice
{ 
  /**
  *
  *
  * @type {any}
  * @memberof QueryInvoice
  */
  private request: any;
  /**
   *
   *
   * @type {object}
   * @memberof QueryInvoice
   */
  private makeResult: object = {};
  /**
   *
   *
   * @type {*}
   * @memberof QueryInvoice
   */
  private config: Config;

  /**
   *Creates an instance of QueryInvoice.
   * @param {object} request
   * @param {Config} config
   * @memberof QueryInvoice
   */
  public constructor(request: object, config: Config)
  {
    this.config = config;
    this.request = request;
  }
  
  /**
   *
   *
   * @returns {object}
   * @memberof QueryInvoice
   */
  public make() : object
  {
    if (!(this.config instanceof Config) || !this.config)
    {
      throw new Error("Sorry, config cannot be empty");
    }

    if (!(this.request instanceof Object) || !this.request)
    {
      throw new Error("Sorry, request cannot be empty");
    }

    try {
      
      Object.assign(this.makeResult, {"merchant-id": this.config.getMerchantId()});
      Object.assign(this.makeResult, {"api-key": this.config.getMerchantKey()});
      Object.assign(this.makeResult, {"token": this.request.token});

    } catch(e) {
      throw new Error(e.message);
    }

    return this.makeResult;
  }
}
