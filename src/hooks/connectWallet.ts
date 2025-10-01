declare global {
  interface Window {
    leap?: any;
    keplr?: any;
  }
}

interface WalletResponse {
  address: string;
  nonce: string;
  signature: string;
}

const CHAIN_ID = import.meta.env.VITE_CHAIN_ID;

export const connectWallet = async (
  walletType: "keplr" | "leap"
): Promise<WalletResponse> => {
  try {
    const wallet = walletType === "keplr" ? window.keplr : window.leap;
    
    if (!wallet) {
      throw new Error(`${walletType} wallet not installed`);
    }

    // Enable wallet
    await wallet.enable(CHAIN_ID);
    
    // Get signer
    const offlineSigner = wallet.getOfflineSigner(CHAIN_ID);
    const accounts = await offlineSigner.getAccounts();
    const address = accounts[0].address;

    // Generate nonce
    const nonce = Date.now().toString() + Math.random().toString(36);

    let signature: string;

    if (wallet.signArbitrary) {
      // Preferred: sign plain text
      const message = `Auth nonce: ${nonce}`;
      const signResponse = await wallet.signArbitrary(CHAIN_ID, address, message);
      signature = signResponse.signature;
    } else {
      // Fallback: sign as 0 AKT tx
      const signDoc = {
        msgs: [],
        fee: { amount: [], gas: "0" },
        chain_id: CHAIN_ID,
        memo: `Auth nonce: ${nonce}`,
        account_number: "0",
        sequence: "0"
      };
      const signResponse = await wallet.signAmino(CHAIN_ID, address, signDoc);
      signature = signResponse.signature.signature;
    }
    
    return {
      address,
      nonce,
      signature
    };
  } catch (error) {
    throw new Error(`Failed to connect ${walletType}: `);
  }
};
