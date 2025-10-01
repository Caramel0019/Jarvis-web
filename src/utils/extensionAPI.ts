interface ExtensionMessage {
  type: string;
  data: any;
  timestamp: number;
}

// Verify extension origin
const EXTENSION_ID = "YOUR_EXTENSION_ID";

export const initExtensionAPI = () => {
  // Listen for messages from extension
  window.addEventListener("message", (event) => {
    // Only accept messages from our extension
    if (event.source !== window) return;
    
    const message = event.data;
    if (message.source !== "my-extension") return;
  });

  // Check if page was opened by extension
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  
  if (!token) {
    // Redirect if not from extension
    window.location.href = "/";
    return false;
  }
  
  return true;
};

export const sendToExtension = async (type: string, data: any) => {
  const message: ExtensionMessage = {
    type,
    data,
    timestamp: Date.now()
  };

  // Post message to extension
  window.postMessage({
    source: "my-webapp",
    ...message
  }, "*");

};