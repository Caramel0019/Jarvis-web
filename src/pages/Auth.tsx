import { useState} from 'react'
import Alert from '../components/ui/Alert'
import ConnectWallet from '../components/modals/ConnectWallet'

const Auth = () => {

  const [isConnectWalletOpen] = useState(true)
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null)

  const handleAlert = (type: string, message: string) => {
    setAlert({ type, message })
    setTimeout(() => setAlert(null), 10000)
  }

  return ( 
    <main className="flex min-h-screen">
      <ConnectWallet
        isOPen={isConnectWalletOpen}
        onAlert={handleAlert}
      />
      <Alert
        isOpen={!!alert}
        onClose={() => setAlert(null)}
        type={alert?.type || ''}
        message={alert?.message || ''}
      />
    </main>
  )
}

export default Auth