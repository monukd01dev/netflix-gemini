import ContentFeed from "../components/home/ContentFeed"
import HeroBanner from "../components/home/HeroBanner"

function AppHomePage() {

  return (
    <div className="bg-black">
      <HeroBanner />
      <div className="relative z-20 -mt-8 md:-mt-30 lg:-mt-40">
        <ContentFeed />
      </div>
    </div>
  )
}

export default AppHomePage
