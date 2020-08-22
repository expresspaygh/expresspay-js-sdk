// imports
import Config from "../Utility/Config";

/**
 *
 *
 * @export
 * @class SubmitInvoice
 */
export default class SubmitInvoice
{ 
  /**
  *
  *
  * @type {any}
  * @memberof SubmitInvoice
  */
  private request: any;
  /**
   *
   *
   * @type {object}
   * @memberof SubmitInvoice
   */
  private makeResult: object;
  /**
   *
   *
   * @type {*}
   * @memberof SubmitInvoice
   */
  private config: Config;

  /**
   *Creates an instance of SubmitInvoice.
   * @param {object} request
   * @param {Config} config
   * @memberof SubmitInvoice
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
   * @memberof SubmitInvoice
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

      Object.assign(this.makeResult, {"currency": this.request.currency});
      Object.assign(this.makeResult, {"amount": this.request.amount});
      Object.assign(this.makeResult, {"order-id": this.request.order_id});
      Object.assign(this.makeResult, {"order-desc": this.request.order_desc});
      Object.assign(this.makeResult, {"accountnumber": this.request.account_number});
      Object.assign(this.makeResult, {"redirect-url": this.request.redirect_url});

      if (this.request.order_img_url)
      {
        Object.assign(this.makeResult, {"order_img_url": this.request.order_img_url});
      }
      if (this.request.first_name)
      {
        Object.assign(this.makeResult, {"firstname": this.request.first_name});
      }
      if (this.request.last_name)
      {
        Object.assign(this.makeResult, {"lastname": this.request.last_name});
      }
      if (this.request.phone_number)
      {
        Object.assign(this.makeResult, {"phonenumber": this.request.phone_number});
      }
      if (this.request.email)
      {
        Object.assign(this.makeResult, {"email": this.request.email});
      }
      
    } catch(e) {
      throw new Error(e.message);
    }

    return this.makeResult;
  }
}
