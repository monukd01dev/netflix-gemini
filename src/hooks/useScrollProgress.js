import { useEffect, useState } from 'react'
import { useLocation } from 'react-router';

function useScrollProgress() {

    const [progress, setProgress] = useState(0);
    const { pathname } = useLocation()
    useEffect(() => {

        function handleScroll() {
            //calculating how much we have scrolled
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            //calculating the total scroll height excluding the viewport cause viewport is always visible
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

            if (scrollTop > 0) {
                const currentProgress = (scrollTop / scrollHeight) * 100;
                setProgress(currentProgress);
            } else {
                setProgress(0)
            }
        }
        window.addEventListener('scroll', handleScroll)

        //calling it for first initialization
        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [pathname])

    return { progress }
}

export default useScrollProgress
