<p align="center">
  <img src="https://expresspaygh.com/images/logo.png" />
</p>
<br/>

# Expresspay JavaScript SDK

A simple library for JavaScript integrators. This SDK is intended for server-side usage only.

------------------

# Install

* Install NodeJS and NPM for your environment - [NodeJS](https://nodejs.org/en/download/)
* Import package via npm using the walkthrough below
```

Create a `.npmrc` file in the root of your project and add the line below (without the quotes):

"registry=https://npm.pkg.github.com/expresspaygh"

Add a package.json file to your project and use one of the options below to install

---------------

Install from the command line:

npm install @expresspaygh/expresspay-js-sdk@1.0.0

--------------

Install via package.json:

"@expresspaygh/expresspay-js-sdk": "1.0.0"
```

-------------------

# Demo / Test

* Browser Demo: [Exp-JS-SDK-Demo](https://github.com/expresspaygh/exp-demos/tree/master/exp-js-sdk-demo)
* Unit Test: 
  - Install [Typescript](https://www.typescriptlang.org/download)
  - Install [Mocha](https://mochajs.org)
  - Run `npm install` in the root of this project
  - Run `npm run-script test` in the root of this project

-------------------

# How to use

## Allowed Environments

* Sandbox - "sandbox"
* Production - "production"

-------------------

## Submit request

This request creates a new invoice to process a payment, below you will find an example request and response.

```javascript
// **************** PULL IN EXPRESSPAY JS SDK ********************
const expay = require("@expresspaygh/expresspay-js-sdk");

/*
Init import classes
Args:
  - merchant_id = Your expressPay merchant id
  - merchant_key = Your expressPay merchant api key
  - environment = Your preferred environment, allowed params ('sandbox' or 'production')
*/
const merchant_api_class = new expay.default(merchant_id, merchant_key, environment);

/*
Submit new invoice
Args:
  - currency: string,
  - amount: float,
  - order_id: string,
  - order_desc: string,
  - redirect_url: string,
  - account_number: string,
  - order_img_url: string or None,
  - first_name: string or None,
  - last_name: string or None,
  - phone_number: string or None,
  - email: string or None,
*/
let merchantApiSubmit = merchant_api_class.submit(
  "GHS", 20.00, "78HJU789UYTR", "Buy Airtime", "https://www.expresspaygh.com",
  "1234567890", "https://expresspaygh.com/images/logo.png", "Jeffery", 
  "Osei", "233545512042", "jefferyosei@expresspaygh.com"
);

/* handle promise based response */
merchantApiSubmit.then( (response) => {

  console.log("**********************************\n");
  console.info("SUBMIT RESPONSE: \n");
  console.info(response);
  console.log("\n**********************************\n");

}).catch( (error) => {

  console.log("**********************************\n");
  console.info("SUBMIT ERROR: \n");
  console.info(error);
  console.log("\n**********************************\n");
  
});

```

```
**********************************
SUBMIT RESPONSE: 

{ 
  'status': 1,
  'order-id': '78HJU789UYTR',
  'guest-checkout': 'TRUE',
  'merchantservice-name': 'TAP',
  'merchantservice-srvrtid': '089237783227',
  'message': 'Success',
  'token': '43165f2bcf90eef856.514313495f2bcf90eef8b1.85035432516432mjhyte',
  'redirect-url': 'https://www.expresspaygh.com',
  'user-key': null,
  'merchant-name': 'TAP',
  'merchant-mcc': '5411',
  'merchant-city': 'Accra',
  'merchant-countrycode': 'GH' 
}
**********************************
```

--------------------

## Checkout request

This request creates a checkout url for a customer to make payment on expressPay, below you will find an example request and response.


```javascript
// **************** PULL IN EXPRESSPAY JS SDK ********************
const expay = require("@expresspaygh/expresspay-js-sdk");

/*
Init import classes
Args:
  - merchant_id = Your expressPay merchant id
  - merchant_key = Your expressPay merchant api key
  - environment = Your preferred environment, allowed params ('sandbox' or 'production')
*/
const merchant_api_class = new expay.default(merchant_id, merchant_key, environment);

/*
Token returned from your "Submit" request
*/
let _token = "43165f2bcf90eef856.514313495f2bcf90eef8b1.85035432516432mjhyte";

/*
Get checkout url
Args:
  - token: string,
*/
let merchantApiCheckout = merchant_api_class.checkout(_token);

/*
Response from the checkout method is not promise based
*/
console.log("**********************************\n");
console.info("CHECKOUT RESPONSE: \n");
console.info(merchantApiCheckout);
console.log("\n**********************************\n");

```

```
**********************************
CHECKOUT RESPONSE: (The checkout url is based on your selected environment)

https://sandbox.expresspaygh.com/api/checkout.php?token=43165f2bcf90eef856.514313495f2bcf90eef8b1.85035432516432mjhyte
**********************************
```

-------------------

## Query request - Before payment

This request checks the payment status for an invoice on expressPay, below you will find an example request and response for an unpaid invoice.

```javascript
// **************** PULL IN EXPRESSPAY JS SDK ********************
const expay = require("@expresspaygh/expresspay-js-sdk");

/*
Init import classes
Args:
  - merchant_id = Your expressPay merchant id
  - merchant_key = Your expressPay merchant api key
  - environment = Your preferred environment, allowed params ('sandbox' or 'production')
*/
const merchant_api_class = new expay.default(merchant_id, merchant_key, environment);

/*
Token returned from your "Submit" request
*/
let _token = "43165f2bcf90eef856.514313495f2bcf90eef8b1.85035432516432mjhyte";

/*
Query invoice payment status
Args:
  - token: string
*/
let merchantApiQuery = merchant_api_class.query(_token);

/* handle promise based response */
merchantApiQuery.then( (response) => {

  console.log("**********************************\n");
  console.info("QUERY RESPONSE BEFORE PAYMENT: \n");
  console.info(response);
  console.log("\n**********************************\n");

}).catch( (error) => {

  console.log("**********************************\n");
  console.info("QUERY ERROR BEFORE PAYMENT: \n");
  console.info(error);
  console.log("\n**********************************\n");
  
});

```

```
**********************************
QUERY RESPONSE BEFORE PAYMENT: 

{ 
  'result': 3,
  'result-text': 'No transaction data available',
  'order-id': '78HJU789UYTR',
  'token': '43165f2bcf90eef856.514313495f2bcf90eef8b1.85035432516432mjhyte',
  'currency': 'GHS',
  'amount': '20' 
}
**********************************
```

-------------------

## Query request - After payment

This request checks the payment status for an invoice on expressPay, below you will find an example request and response for a paid invoice.

```javascript
// **************** PULL IN EXPRESSPAY JS SDK ********************
const expay = require("@expresspaygh/expresspay-js-sdk");

/*
Init import classes
Args:
  - merchant_id = Your expressPay merchant id
  - merchant_key = Your expressPay merchant api key
  - environment = Your preferred environment, allowed params ('sandbox' or 'production')
*/
const merchant_api_class = new expay.default(merchant_id, merchant_key, environment);

/*
Token returned from your "Submit" request
*/
let _token = "43165f2bcf90eef856.514313495f2bcf90eef8b1.85035432516432mjhyte";

/*
Query invoice payment status
Args:
  - token: string
*/
let merchantApiQuery = merchant_api_class.query(_token);

/* handle promise based response */
merchantApiQuery.then( (response) => {

  console.log("**********************************\n");
  console.info("QUERY RESPONSE AFTER PAYMENT: \n");
  console.info(response);
  console.log("\n**********************************\n");

}).catch( (error) => {

  console.log("**********************************\n");
  console.info("QUERY ERROR AFTER PAYMENT: \n");
  console.info(error);
  console.log("\n**********************************\n");
  
});

```

```
**********************************
QUERY RESPONSE AFTER PAYMENT: 

{ 
  'result': 1,
  'result-text': 'Success',
  'order-id': '78HJU789UYTR',
  'token': '43165f2bcf90eef856.514313495f2bcf90eef8b1.85035432516432mjhyte',
  'currency': 'GHS',
  'amount': '20',
  'auth-code': '831000',
  'transaction-id': '15aa4476x3a4f',
  'date-processed': '2020-08-30 15:05:23',
  'paid_from: '411111******1111',
  'payment_type': 'XPAY_GW',
  'payment_reference': '831000',
  'payment_option': 'VISA',
  'payment_option_type': 'CARDNET',
  'payment_option_type_name': 'Visa, Mastercard, Amex or Discover'
}
**********************************
```

----------------------

&copy; Copyright 2020, All rights reserved. [Expresspay Ghana Limited](https://expresspaygh.com)

