import { motion, AnimatePresence } from "framer-motion";
import Modal from "../ui/Modal";
import React, { useState, useEffect } from "react";
import { connectWallet } from "../../hooks/connectWallet";
import { sendToExtension, initExtensionAPI } from "../../utils/extensionAPI"; 

interface ConnectWalletProps {
  isOPen: boolean;
  onAlert: (type: "success" | "error" | "info", message: string) => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ isOPen, onAlert }) => {
  const [isConnecting, setConnecting] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);

  useEffect(() => {
    // Verify request is from extension
    const valid = initExtensionAPI();
    setIsValidSession(valid);
  }, []);

  const handleConnectWallet = async (wallet: "Keplr" | "Leap") => {
    if (!isValidSession) {
      onAlert("error", "Invalid session");
      return;
    }

    setConnecting(true);
    try {
      const walletType = wallet.toLowerCase() as "keplr" | "leap";
      const result = await connectWallet(walletType);
      
      // Send wallet info to extension
      await sendToExtension("wallet_connected", {
        wallet: walletType,
        address: result.address,
        nonce: result.nonce,
        signature: result.signature
      });
      
      onAlert("success", "Wallet connected successfully!");
      
      // Close modal after short delay
      setTimeout(() => window.close(), 1500);
    } catch (error) {
      onAlert("error", error.message);
      setConnecting(false);
    }
  };

  if (!isValidSession) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="text-red-500">Unauthorized access</div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOPen && (
        <Modal>
          <motion.div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white text-center">
                Connect Wallet
              </h2>
            </div>

            {/* Main */}
            <div>
              {isConnecting && (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                  <p className="text-white mt-4">Connecting...</p>
                </div>
              )}
              {!isConnecting && (
                <div className="space-y-4">
                  <button
                    onClick={() => handleConnectWallet("Keplr")}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all font-medium text-lg text-white"
                  >
                    Connect with Keplr
                  </button>
                  <button
                    onClick={() => handleConnectWallet("Leap")}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all font-medium text-lg text-white"
                  >
                    Connect with Leap
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default ConnectWallet;