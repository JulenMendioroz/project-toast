import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"

const ToastContext = createContext(null)

export const useToastContext = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error("Toaster context not available")
  }
  return ctx
}

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dispatchToast = useCallback((toastConfig) => {
    const id = crypto.randomUUID()
    const toast = {
      id,
      ...toastConfig,
    }
    setToasts((prev) => prev.concat(toast))
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const value = useMemo(
    () => ({
      toasts,
      dismissToast,
      dispatchToast,
    }),
    [toasts, dispatchToast, dismissToast]
  )

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export default ToastProvider
