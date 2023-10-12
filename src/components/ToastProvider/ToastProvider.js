import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import { useKeydown } from "../../hooks/useKeydown"

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

  const dismissAllToasts = useCallback(() => setToasts([]), [])

  const value = useMemo(
    () => ({
      toasts,
      dismissToast,
      dispatchToast,
    }),
    [toasts, dispatchToast, dismissToast]
  )

  useKeydown("Escape", dismissAllToasts)

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export default ToastProvider
