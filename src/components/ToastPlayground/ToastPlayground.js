import React, { useState } from "react"

import Button from "../Button"

import styles from "./ToastPlayground.module.css"
import Toast from "../Toast"

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"]

function ToastPlayground() {
  const [form, setForm] = React.useState({
    message: "",
    variant: VARIANT_OPTIONS[0],
  })

  const [isOpen, setIsOpen] = useState(false)

  const updateForm = React.useCallback(
    (form) => setForm((prev) => ({ ...prev, ...form })),
    []
  )

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      {isOpen && <Toast {...form} onDismiss={() => setIsOpen(false)} />}
      <div className={styles.controlsWrapper}>
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
              value={form.message}
              onChange={(e) => updateForm({ message: e.target.value })}
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
                  checked={variant === form.variant}
                  onChange={(e) => updateForm({ variant: e.target.value })}
                />
                {variant}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button onClick={() => setIsOpen(true)}>Pop Toast!</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToastPlayground
