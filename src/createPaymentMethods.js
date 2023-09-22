let baseUrl = process.env.BASEURL;

const axios = require("axios");
const { fakerVI: faker } = require("@faker-js/faker");

const random = require("./random");
const getData = require("./getData");

let eWalletProviders = ["Momo", "ZaloPay", "Moca", "AirPay", "Apple Pay"];
let bankingProviders = [
  "OCB",
  "SCB",
  "Sacombank",
  "ACB",
  "BIDV",
  "Vietcombank",
  "TPBank",
];

async function createPaymentMethods(n) {
  let eWalletUrl = `${baseUrl}/cashbook/v1/payments/e-wallet`;
  for (let i = 1; i <= n; i++) {
    let eWallet = {
      phoneNumber: `${random(900000000, 999999999)}`,
      name: eWalletProviders[random(0, eWalletProviders.length - 1)],
      accountName: faker.person.fullName(),
    };
    // console.log(eWallet);
    // continue;
    await axios.post(eWalletUrl, eWallet);
  }

  let bankingUrl = `${baseUrl}/cashbook/v1/payments/banking`;
  for (let i = 1; i <= n; i++) {
    let banking = {
      accountNumber: `${random(100000000, 999999999)}`,
      name: bankingProviders[random(0, bankingProviders.length - 1)],
      accountName: faker.person.fullName(),
    };
    // console.log(banking);
    // continue;
    await axios.post(bankingUrl, banking);
  }
  console.log("Created payment methods");
}

module.exports = createPaymentMethods;
