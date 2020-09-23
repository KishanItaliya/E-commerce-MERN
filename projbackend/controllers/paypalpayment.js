var braintree = require("braintree");

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "65xmvtsdnzpwfjr5",
  publicKey: "9h9jm77qyyqmj6mg",
  privateKey: "38cbb1c893f42600bdfcf1f607b729c7"
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.send(response)
        }
    });
}

exports.processPayment = (req, res) => {

    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
       
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err){
              res.status(500).json(err)
          }
          else{
              res.json(result)
          }
      });
}