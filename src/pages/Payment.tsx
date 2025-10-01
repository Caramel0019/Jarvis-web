import { useState} from 'react'
import Alert from '../components/ui/Alert'
import PaymentModal from '../components/modals/PaymentModal'

const Payment = () => {

  const [isPaymentModal] = useState(true)
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null)

  const handleAlert = (type: string, message: string) => {
    setAlert({ type, message })
    setTimeout(() => setAlert(null), 10000)
  }

  return (
    <main className="flex min-h-screen">
      <PaymentModal
        isOPen={isPaymentModal}
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

export default Payment 