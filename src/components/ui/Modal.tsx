import React from 'react'

interface ModalProps {
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => { 

  return (

    <div
      className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur flex items-center justify-center"
    >
        <div className="">
            {children}
        </div>
    </div>
    
  )
}

export default Modal