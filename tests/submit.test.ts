// imports
import { expect } from 'chai';
import { describe, it } from 'mocha';
import Config from '../src/Utility/Config';
import Submit from '../src/Requests/Submit';

// Init config setup
let config = new Config("089237783227", "JKR91Vs1zEcuAj9LwMXQu-H3LPrDq1XCKItTKpmLY1-XsBgCnNpkDT1GER8ih9f-UTYoNINatMbreNIRavgu-89wPOnY6F7mz1lXP3LZ");

// submit request
let request = {
  "currency": "GHS",
  "amount": 20.00,
  "order_id": "78HJU789UYTR",
  "order_desc": "Buy Airtime",
  "account_number": "1234567890",
  "redirect_url": "https://www.expresspaygh.com",
  "order_img_url": "https://expresspaygh.com/images/logo.png",
  "first_name": "Jeffery",
  "last_name": "Osei",
  "phone_number": "233545512042",
  "email": "jefferyosei@expresspaygh.com"
}

// Init submit class
let submit = new Submit(request, config);

// start tests
describe('Submit class tests', () => {
  // get maker result
  let submitMake : any = submit.make();

  // run make checks
  it('should return object', () => {
    expect(submitMake).to.be.an('object');
  });
  it('should have merchant-id in make object', () => {
    expect(submitMake).to.have.property('merchant-id');
  });
  it('should have api-key in make object', () => {
    expect(submitMake).to.have.property('api-key');
  });
  it('should have currency in make object', () => {
    expect(submitMake).to.have.property('currency');
  });
  it('should have amount in make object', () => {
    expect(submitMake).to.have.property('amount');
  });
  it('should have order-id in make object', () => {
    expect(submitMake).to.have.property('order-id');
  });
  it('should have order-desc in make object', () => {
    expect(submitMake).to.have.property('order-desc');
  });
  it('should have accountnumber in make object', () => {
    expect(submitMake).to.have.property('accountnumber');
  });
  it('should have redirect-url in make object', () => {
    expect(submitMake).to.have.property('redirect-url');
  });

  if (submitMake.order_img_url)
  {
    it('should have order_img_url in make object', () => {
      expect(submitMake).to.have.property('order_img_url');
    });
  } else {
    it('should not have order_img_url in make object', () => {
      expect(submitMake).to.not.have.property('order_img_url');
    });
  }

  if (submitMake.firstname)
  {
    it('should have firstname in make object', () => {
      expect(submitMake).to.have.property('firstname');
    });
  } else {
    it('should not have firstname in make object', () => {
      expect(submitMake).to.not.have.property('firstname');
    });
  }

  if (submitMake.lastname)
  {
    it('should have lastname in make object', () => {
      expect(submitMake).to.have.property('lastname');
    });
  } else {
    it('should not have lastname in make object', () => {
      expect(submitMake).to.not.have.property('lastname');
    });
  }

  if (submitMake.phonenumber)
  {
    it('should have phonenumber in make object', () => {
      expect(submitMake).to.have.property('phonenumber');
    });
  } else {
    it('should not have phonenumber in make object', () => {
      expect(submitMake).to.not.have.property('phonenumber');
    });
  }

  if (submitMake.email)
  {
    it('should have email in make object', () => {
      expect(submitMake).to.have.property('email');
    });
  } else {
    it('should not have email in make object', () => {
      expect(submitMake).to.not.have.property('email');
    });
  }
  
});