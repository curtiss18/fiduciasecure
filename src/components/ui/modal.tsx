import * as React from "react"
import { useEffect } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Modal Portal */}
      <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose} />
        
        {/* Modal Container */}
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          {/* Modal Content */}
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
            {/* Header */}
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold leading-6 text-gray-900" id="modal-title">
                  {title}
                </h3>
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Body */}
            <div className="bg-white px-4 pb-4 sm:p-6 sm:pb-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}