import React from "react"

import Button from "../Button"
import ToastShelf from "../ToastShelf"
import { useToastContext } from "../ToastProvider"

import styles from "./ToastPlayground.module.css"


const VARIANT_OPTIONS = ["notice", "warning", "success", "error"]

function ToastPlayground({
  defaultToast = {
    message: "",
    variant: VARIANT_OPTIONS[0],
  },
}) {
  const [toast, setToast] = React.useState(defaultToast)
  const { dispatchToast } = useToastContext()

  const updateToast = React.useCallback(
    (toast) => setToast((prev) => ({ ...prev, ...toast })),
    []
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatchToast(toast)
    setToast(defaultToast)
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf />
      <form onSubmit={handleSubmit} className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={toast.message}
              onChange={(e) => updateToast({ message: e.target.value })}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((variant) => (
              <label key={variant} htmlFor={`variant-${variant}`}>
                <input
                  id={`variant-${variant}`}
                  type="radio"
                  name="variant"
                  value={variant}
                  checked={variant === toast.variant}
                  onChange={(e) => updateToast({ variant: e.target.value })}
                />
                {variant}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ToastPlayground
