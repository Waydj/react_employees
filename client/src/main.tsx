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
import { Employees } from "./pages/employees"
import { AddEmployee } from "./pages/add-employee"
import { Status } from "./pages/status"
import "./index.css"
import Employee from "./pages/employee"

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Employees />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />,
  },
  {
    path: Paths.emloyeeAdd,
    element: <AddEmployee />,
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />,
  },
  {
    path: `${Paths.employee}/:id`,
    element: <Employee />,
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
