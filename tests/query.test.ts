// imports
import { expect } from 'chai';
import { describe, it } from 'mocha';
import Query from '../src/Requests/Query';
import Config from '../src/Utility/Config';

// Init config setup
let config = new Config("089237783227", "JKR91Vs1zEcuAj9LwMXQu-H3LPrDq1XCKItTKpmLY1-XsBgCnNpkDT1GER8ih9f-UTYoNINatMbreNIRavgu-89wPOnY6F7mz1lXP3LZ");

// query request
let request = {
  "token": "JKR91Vs1zEcuAj9LwMXQu.H3LPrDq1XCKItTKpmLY1.XsBgCnNpkDT1GER8ih9f"
}

// Init query class
let query = new Query(request, config);

// start tests
describe('Query class tests', () => {
  // get maker result
  let queryMake : any = query.make();

  // run make checks
  it('should return object', () => {
    expect(queryMake).to.be.an('object');
  });

  it('should have merchant-id in make object', () => {
    expect(queryMake).to.have.property('merchant-id');
  });
  it('should have api-key in make object', () => {
    expect(queryMake).to.have.property('api-key');
  });
  it('should have token in make object', () => {
    expect(queryMake).to.have.property('token');
  });

  it('merchant-id should be string', () => {
    expect(queryMake['merchant-id']).to.be.a('string');
  });
  it('api-key should be string', () => {
    expect(queryMake['api-key']).to.be.a('string');
  });
  it('token should be string', () => {
    expect(queryMake.token).to.be.a('string');
  });
});