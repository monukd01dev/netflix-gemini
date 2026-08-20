import LayoutTopLevel from "./layouts/LayoutTopLevel"
import { RouterProvider } from "react-router"
import appRouter from "./routes"
import { Toaster } from "react-hot-toast"
import useAuthEventChange from "./hooks/useAuthEventChange"

function App() {

  const { loading } = useAuthEventChange();

  return (!loading &&
    (<LayoutTopLevel>
      <RouterProvider router={appRouter} />
      <Toaster />
    </LayoutTopLevel>)
  )
}

export default App
