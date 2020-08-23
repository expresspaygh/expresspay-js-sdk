// imports
import { expect } from 'chai';
import { describe, it } from 'mocha';
import Config from '../src/Utility/Config';

// Init config setup
let config = new Config("089237783227", "JKR91Vs1zEcuAj9LwMXQu-H3LPrDq1XCKItTKpmLY1-XsBgCnNpkDT1GER8ih9f-UTYoNINatMbreNIRavgu-89wPOnY6F7mz1lXP3LZ");

// start tests
describe('Config class tests', () => {
  // run sandbox url checks
  it('should return sandbox url' , () => {
    let sandboxUrl = config.getSandboxUrl();
    expect(sandboxUrl).to.be.a('string')
  });
  // run production url checks
  it('should return production url' , () => {
    let productionUrl = config.getProductionUrl();
    expect(productionUrl).to.be.a('string')
  });
  // run merchant id checks
  it('should return merchant id' , () => {
    let merchantId = config.getMerchantId();
    expect(merchantId).to.be.a('string')
  });
  // run merchant api key checks
  it('should return merchant api key' , () => {
    let merchantKey = config.getMerchantKey();
    expect(merchantKey).to.be.a('string')
  });
});