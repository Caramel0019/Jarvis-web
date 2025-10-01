import { motion, AnimatePresence } from "framer-motion";
import Modal from "../ui/Modal"; 
import React, { useState, useEffect } from "react";
import { usePayment } from "../../hooks/paymentHook";
import { initExtensionAPI } from "../../utils/extensionAPI"; 

interface PaymentModalProps {
  isOPen: boolean;
  onAlert: (type: "success" | "error" | "info", message: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOPen, onAlert }) => {
  const { payment, isProcessing, error, processPayment } = usePayment();
  const [result, setResult] = useState<any>(null);
  const [isValidSession, setIsValidSession] = useState(false);

  useEffect(() => {
    const valid = initExtensionAPI();
    setIsValidSession(valid);
  }, []);

  useEffect(() => {
    if (error) {
      onAlert("error", error);
    }
  }, [error, onAlert]);

  const handleApprove = async () => {
    try {
      const paymentResult = await processPayment();
      setResult(paymentResult);
      onAlert("success", "Payment completed!");
      
      // Close window after delay
      setTimeout(() => window.close(), 2000);
    } catch (err) {
      onAlert("error", "Payment failed");
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
                Process Payment
              </h2>
            </div>

            {/* Main */}
            <div>
              {isProcessing && (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                  <p className="text-white mt-4">Processing...</p>
                </div>
              )}
              
              {!isProcessing && !result && payment && (
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-gray-300 text-sm">Wallet</p>
                    <p className="text-white font-semibold">{payment.wallet}</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-gray-300 text-sm">Amount</p>
                    <p className="text-white font-semibold">{payment.amount} AKT</p>
                  </div>
                  <button
                    onClick={handleApprove}
                    className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Process Payment
                  </button>
                </div>
              )}
              
              {result && (
                <div className="bg-green-600/20 border border-green-600 rounded-lg p-4">
                  <p className="text-green-400 font-semibold mb-2">Payment Successful!</p>
                  <p className="text-gray-300 text-sm">Tx Hash:</p>
                  <p className="text-white font-mono text-xs break-all">{result.txHash}</p>
                </div>
              )}
            </div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;