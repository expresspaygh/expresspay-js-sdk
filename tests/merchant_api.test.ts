// imports
import { expect } from 'chai';
import { describe, it } from 'mocha';
import MerchantApi from '../src/MerchantApi';

// Init keys
let environment = "sandbox";
let merchant_id = "089237783227";
let merchant_key = "JKR91Vs1zEcuAj9LwMXQu-H3LPrDq1XCKItTKpmLY1-XsBgCnNpkDT1GER8ih9f-UTYoNINatMbreNIRavgu-89wPOnY6F7mz1lXP3LZ";

// Init merchant api setup
const merchant_api_class = new MerchantApi(merchant_id, merchant_key, environment);

// Token reference for checkout and query request
let _token = "";

// start test
describe('Merchant api tests', () => {

  // run submit checks
  it('Test submit requests', async () => {

    // get submit result
    let merchantApiSubmit : any = await merchant_api_class.submit(
      "GHS", 20.00, "78HJU789UYTR", "Buy Airtime", "https://www.expresspaygh.com",
      "1234567890", "https://expresspaygh.com/images/logo.png", "Jeffery", 
      "Osei", "233545512042", "jefferyosei@expresspaygh.com"
    );

    // assertions
    expect(merchantApiSubmit).to.be.an('object');
    expect(merchantApiSubmit).to.have.property('status');
    expect(merchantApiSubmit.status).to.eql(1);
    expect(merchantApiSubmit).to.have.property('message');
    expect(merchantApiSubmit.message.toUpperCase()).to.eql('SUCCESS');
    expect(merchantApiSubmit).to.have.property('order-id');

    // handle tokens
    expect(merchantApiSubmit).to.have.property('token');
    _token = merchantApiSubmit.token;
    expect(merchantApiSubmit.token).to.eql(_token);

    expect(merchantApiSubmit).to.have.property('redirect-url');
    expect(merchantApiSubmit).to.have.property('merchant-countrycode');
  });

  // run checkout checks
  it('Test checkout requests', async () => {

    // get checkout result
    let merchantApiCheckout : any = await merchant_api_class.checkout(_token);
    
    // assertions
    expect(merchantApiCheckout).to.be.a('string');

  });

  // run query checks
  it('Test query requests', async () => {

    // get query result
    let merchantApiQuery : any = await merchant_api_class.query(_token);
    
    // assertions
    expect(merchantApiQuery).to.be.an('object');
    expect(merchantApiQuery).to.have.property('result');
    expect(merchantApiQuery).to.have.property('result-text');
    expect(merchantApiQuery).to.have.property('token');
    expect(merchantApiQuery.token).to.eql(_token);
    expect(merchantApiQuery).to.have.property('currency');
    expect(merchantApiQuery).to.have.property('amount');

  });
  
});
