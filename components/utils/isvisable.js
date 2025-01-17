import { useEffect, useState } from 'react'

const OPTIONS = {
  root: null,
  rootMargin: '0px 0px 0px 0px',
  threshold: 0,
}

const useIsVisable = (elementRef) => {
  const [isVisable, setIsVisable] = useState(false)

  useEffect(() => {
    if (elementRef.current) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisable(true)
            observer.unobserve(elementRef.current)
          }
        })
      }, OPTIONS)
      observer.observe(elementRef.current)
    }
  }, [elementRef])
  return isVisable
}

export default useIsVisable
