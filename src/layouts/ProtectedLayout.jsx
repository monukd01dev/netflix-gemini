import { Navigate, Outlet } from "react-router"
import Footer from "../components/Footer"
import ProtectedNav from "../components/ProtectedNav"
import useAuthStore from "../store/authStore"
import ScrollToTopButton from "../components/ScrollToTopButton"
import useScrollProgress from "../hooks/useScrollProgress"
import useIntersectionRatio from "../hooks/useIntersectionRatio"
import useScrollToTop from "../hooks/useScrollToTop"
function ProtectedLayout() {
    useScrollToTop()
    const currentUser = useAuthStore((state) => state.currentUser)
    const { progress } = useScrollProgress()
    const { ratio, observerTarget } = useIntersectionRatio();
    
    if (!currentUser) {
        return <Navigate to='/signin' replace />
    }

    return (
        <>

            <div className="relative min-h-screen">
                <div className="absolute h-50 bg-green-500 w-1 z-50 invisible  " ref={observerTarget}></div>
                <ProtectedNav ratio={ratio} />
                <Outlet />
            </div>
            <Footer />
            <ScrollToTopButton progress={progress} />
        </>
    )
}

export default ProtectedLayout
