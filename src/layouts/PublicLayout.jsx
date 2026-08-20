import { Navigate, Outlet } from "react-router"
import Footer from "../components/Footer"
import PublicNav from "../components/PublicNav";
import useAuthStore from "../store/authStore";
import useScrollToTop from "../hooks/useScrollToTop";
function PublicLayout() {
    useScrollToTop()
    const currentUser = useAuthStore((state)=>state.currentUser);

    if(currentUser){
        return <Navigate to='/app' replace/>
    }

    return (
        <>
            <div className="relative min-h-screen">
                <PublicNav />
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default PublicLayout
