import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useState, useEffect, lazy, Suspense } from "react"

import Loading from "./components/ui/Loading"
import NotMobile from "./components/NotMobile"

const Home = lazy(() => import('./pages/Home'))
const Account = lazy(() => import('./pages/Account'))
const Statistics = lazy(() => import('./pages/Statistics'))
const Loader = lazy(() => import('./components/ui/Loading'))

export default function App() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])


  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        {isMobile ? (
          <Routes>
            <Route index element={<Home />} />
            <Route path="account" element={<Account />} />
            <Route path="dashboard" element={<Statistics />} />
            <Route path="loading" element={<Loader />} />
          </Routes>
        ) : (
          <NotMobile />
        )}

      </Suspense>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3500 },
          error: { duration: 4000 },
          style: {
            fontSize: "16px",
            maxWidth: "99%",
            padding: "16px 24px",
            backgroundColor: "#152126",
            color: "white",
          },
        }}
      />
    </BrowserRouter>
  )
}
