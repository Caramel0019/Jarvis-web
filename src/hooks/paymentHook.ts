import { useState, useEffect } from "react";
import { SigningStargateClient } from "@cosmjs/stargate";
import { sendToExtension } from "../utils/extensionAPI";

interface PaymentData {
  amount: string;
  wallet: string;
}

declare global {
  interface Window {
    keplr?: any;
    leap?: any;
  }
}

export const usePayment = () => {
  const CHAIN_ID = import.meta.env.VITE_CHAIN_ID;
  const RPC_ENDPOINT = import.meta.env.VITE_RPC_ENDPOINT;
  const RECEIVE_ADDRESS = import.meta.env.VITE_RECEIVE_ADDRESS;
  const DENOM = import.meta.env.VITE_DENOM;


  const [payment, setPayment] = useState<PaymentData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const amount = params.get("amount");
    const wallet = params.get("wallet");

    // Validation
    if (amount && wallet) {
      const numAmount = Number(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        setError("Invalid amount");
        return;
      }
      if (wallet !== "keplr" && wallet !== "leap") {
        setError("Invalid wallet type");
        return;
      }
      setPayment({ amount, wallet });
    }
  }, []);

  const processPayment = async () => {
    if (!payment) {
      setError("No payment data available");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const { wallet, amount } = payment;

      // Validate amount
      const numAmount = Number(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        throw new Error("Invalid amount");
      }

      // Select wallet
      const walletExtension = wallet === "keplr" ? window.keplr : window.leap;
      if (!walletExtension) {
        throw new Error(`${wallet} wallet is not installed`);
      }

      // Enable chain
      await walletExtension.enable(CHAIN_ID);

      // Get offline signer
      const offlineSigner = walletExtension.getOfflineSigner(CHAIN_ID);
      const accounts = await offlineSigner.getAccounts();
      
      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found");
      }

      const senderAddress = accounts[0].address;

      // Validate addresses
      if (!senderAddress.startsWith("akash")) {
        throw new Error("Invalid sender address");
      }
      if (!RECEIVE_ADDRESS.startsWith("akash")) {
        throw new Error("Invalid receiver address");
      }

      // Create Stargate client
      const client = await SigningStargateClient.connectWithSigner(
        RPC_ENDPOINT,
        offlineSigner
      );

      // Convert AKT to uAKT (1 AKT = 1,000,000 uAKT)
      const amountInUakt = Math.floor(numAmount * 1_000_000).toString();

      // Construct message
      const msgSend = {
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: {
          fromAddress: senderAddress,
          toAddress: RECEIVE_ADDRESS,
          amount: [{ denom: DENOM, amount: amountInUakt }],
        },
      };

      // Set fee
      const fee = {
        amount: [{ denom: DENOM, amount: "5000" }],
        gas: "200000",
      };

      const memo = "Payment via wallet";

      // Sign and broadcast using the client
      const result = await client.signAndBroadcast(
        senderAddress,
        [msgSend],
        fee,
        memo
      );

      // Check transaction result
      if (result.code !== 0) {
        throw new Error(`Transaction failed: ${result.rawLog || "Unknown error"}`);
      }

      const successData = {
        ...payment,
        txHash: result.transactionHash,
        status: "success",
        sender: senderAddress,
      };

      // Send result to extension
      await sendToExtension("payment_result", successData);

      return successData;
    } catch (err: any) {
      const errorMessage = err.message || "Payment failed";
      setError(errorMessage);

      await sendToExtension("payment_result", {
        ...payment,
        status: "failed",
        error: errorMessage,
      });

      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  return { payment, isProcessing, error, processPayment };
};