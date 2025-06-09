// lib/types.js

export const PaymentMethod = {
  ESEWA: "esewa",
  KHALTI: "khalti",
};

// Just for reference — JS doesn't use types like TS
export const PaymentRequestDataExample = {
  amount: "1000",
  productName: "Test Product",
  transactionId: "txn12345",
  method: PaymentMethod.ESEWA,
};
