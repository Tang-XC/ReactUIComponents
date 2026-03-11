import { useState, useEffect, useRef } from 'react'

export default function (initialValue?: boolean, callback?: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  const [isFocus, setIsFocus] = useState(initialValue)
  const handleClickOutSide = (evt: MouseEvent) => {
    if (ref.current && ref.current.contains(evt.target as Node)) {
      return
    }
    setIsFocus(false);
    callback?.();
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutSide)
    return () => {
      document.addEventListener('click', handleClickOutSide)
    }
  }, [])
  return {
    ref,
    isFocus,
    setIsFocus,
  }
}