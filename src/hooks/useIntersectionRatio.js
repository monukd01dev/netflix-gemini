import { useEffect, useRef, useState } from 'react'

function useIntersectionRatio() {
    const [ratio, setRatio] = useState(0);
    const observerTarget = useRef(null);

    useEffect(() => {
        const target = observerTarget.current;
        const thresholds = Array.from({ length: 51 }, (_, index) => (index + index) / 100)
        const observer = new IntersectionObserver(([entry]) => {
            setRatio(entry.intersectionRatio)
        }, {
            threshold: thresholds
        })

        if (target) {
            observer.observe(target)
        }
        return () => {
            if (observer) {
                observer.unobserve(target)
            }
        }
    }, [])
    return {
        ratio,
        observerTarget
    }
}

export default useIntersectionRatio
