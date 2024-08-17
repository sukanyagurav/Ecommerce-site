import { createBrowserRouter,RouterProvider } from "react-router-dom"
import RootLayout from "./RootLayout"
import HomePage from "./pages/HomePage"

import Cart from "./pages/Cart"
import ErrorPage from "./pages/ErrorPage"


const router = createBrowserRouter([
  {
    path:'/',
    element:<RootLayout/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path:'/',
        element:<HomePage/>
      },
      {
        path:'/cart',
        element:<Cart/>
      }
    ]
  }
])
function App() {

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
