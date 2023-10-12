import { useEffect } from "react"

export const useKeydown = (keyCode, callback) => {
  useEffect(() => {
    const handleEvent = (event) => {
      if (event.code === keyCode) callback()
    }
    window.addEventListener("keydown", handleEvent)
    return () => window.removeEventListener("keydown", handleEvent)
  }, [keyCode, callback])
}
