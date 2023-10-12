import React from "react"

import Toast from "../Toast"
import styles from "./ToastShelf.module.css"
import { useToastContext } from "../ToastProvider"

function ToastShelf() {
  const { toasts, dismissToast } = useToastContext()
  return (
    <ol className={styles.wrapper}>
      {toasts.map(({ id, message, variant }) => (
        <li key={id} className={styles.toastWrapper}>
          <Toast
            variant={variant}
            onDismiss={() => dismissToast(id)}
            message={message}
          />
        </li>
      ))}
    </ol>
  )
}

export default ToastShelf
