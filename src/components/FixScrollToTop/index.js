import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function FixScrollToTop() {
  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default FixScrollToTop
