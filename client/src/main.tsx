import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import { ConfigProvider, theme } from "antd"
import { store } from "./app/store"
import { Paths } from "./paths"
import { Login } from "./pages/login"
import { Register } from "./pages/register"
import { Auth } from "./features/auth/auth"
import "./index.css"

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <h1>Employess</h1>,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <Auth>
          <RouterProvider router={router} />
        </Auth>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
)
