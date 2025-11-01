import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'

function RootLayout() {
  return (
    <>
      <Header />
      <main className="container min-h-[calc(100vh-473px)] py-8">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
export default RootLayout
