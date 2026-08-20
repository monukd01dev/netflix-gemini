import { useEffect } from 'react'
import { useLocation } from 'react-router'

function useScrollToTop() {
    const {pathname} = useLocation()
    useEffect(() => {
        window.scrollTo({
            top:0,
            left:0,
            behavior:'instant'
        })
    }, [pathname])
}

export default useScrollToTop
