# StellarCheckout

A javascript plugin with a responsive UI.

StellarCheckout integrates e-commerce web sites with the Stellar.org blockchain allowing merchants to accept payment in lumens.

## Installation

```
npm i -save stellar-checkout
```

## Integration
1. Copy and paste the StellarCheckout Drop-in UI initialization code into a page on your web site
2. Configure the initialization code with:
   1. apiKey
   2. amount
   3. destinationKey (the merchant's PublicKey/AccountID)
   4. redirectURL (or custom javascript via the onSubmit callback)
3. Direct customers to the StellarCheckout page you just created


## Create an API key
1. Go to https://stellarcheckout.azurewebsites.net/ and create a user account
2. Browse to https://stellarcheckout.azurewebsites.net/manage/apikeys
3. Create an API Key
4. Copy the API key into the apiKey parameter of the Drop-in UI (see examples)

## Options

```javascript
{
  apiKey: {     // Generate an API key @ https://stellarcheckout.azurewebsites.net/
    type: String,
    required: true
  },
  currency: {		// DefaultValue: USD; ["AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "ZAR"],
  	type: String,
  	required: false
  },
  destinationKey: {	// The merchant's PublicKey/AccountID
  	type: String,
  	required: true
  },
  env: {		// DefaultValue: development; Options: [development|staging|production];
  	type: String,
  	required: false
  },
  memo: {		// A field to record additional data related to a payment. E.g. OrderID, UserID
  	type: String,
  	required: false
  },
  onSubmit: {		// Submit handler executed after a completing a transaction. Has access to error and payment data
  	type: function,
  	required: false
  },
  redirectUrl: {	// The URL to redirect the user to after a succesfully completed transaction
  	type: String,
  	required: false
  },
  total: {		// Order total in the currency specified
  	type: decimal,
  	required: true
  }
}
```

## Examples
Here are some quick examples to get you started.


### simple configuration example
The following example requests a payment of 10 USD and submits the transaction in lumens to the Stellar main network. 
The user is redirected automatically after a successful transaction.
```html
<div id="elem"></div>
<script type="text/javascript" src="../dist/stellar-checkout.js"></script>
<script>
StellarCheckout.ui.render('#elem', {
  apiKey: 'YOUR_API_KEY',
  total: '10',
  env: 'production',
  destinationKey: 'GDLZR4NMRB6ZLZ7QTCQ3UVFVS53VBEJ3RSOZ56F4KINZVIS7DVOZ2V4W',
  redirectUrl: 'http://example.com/cart/order_complete'
});
</script>
```

### basic javascript example
The next example submits a test transaction to test-net in AUD and makes use of the onSubmit callback function.
```html
<div id="elem"></div>
<script type="text/javascript" src="../dist/stellar-checkout.js"></script>
<script>
StellarCheckout.ui.render('#elem', {
  apiKey: 'YOUR_API_KEY',
  total: '249.99',
  currency: 'AUD',
  env: 'development',
  destinationKey: 'GDLZR4NMRB6ZLZ7QTCQ3UVFVS53VBEJ3RSOZ56F4KINZVIS7DVOZ2V4W',
  onSubmit: function(err, result) {
  	if (err) {
	  // handle error condition
	  console.log(err);
	  return;
  	}
  	// result contains transaction info
  	// manually handle the outcome E.g. submit a form OR display transaction details
  	console.log(result);
  }
});
</script>
```

## Completing a transaction
1. Visit a page containing the Drop-in UI (the UI must have an API Key, an amount AND a destinationKey)
2. Enter your Public Key
3. Click Send payment to be taken to the confirmation page (don't close the page)
4. Open your favourite lumens wallet and send a transaction containing the same details as listed on the confirmation page
5. Wait for a response from StellarCheckout

## Tipjar

XLM: GBBADTX7GN4ENDZ55HIFEBSZH4NSKWABTM7LRX7AFZW3SZXULHTKB7XI