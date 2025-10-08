import { postAsync } from "./api-utils";

export const createOrder = async (orderData, token) => {
  return await postAsync("/api/payments/create-order", orderData, token);
};

export const verifyPayment = async (paymentData, token) => {
  return await postAsync("/api/payments/verify-payment", paymentData, token);
};

export const subscribeToPlan = async (subscriptionData, token) => {
  return await postAsync("/api/payments/subscribe", subscriptionData, token);
};