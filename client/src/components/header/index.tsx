import { Link, useNavigate } from "react-router-dom"
import { Layout, Space, Typography } from "antd"
import {
  TeamOutlined,
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons"
import { CustomButton } from "../custom-button"
import { Paths } from "../../paths"
import styles from "./index.module.css"
import { useDispatch, useSelector } from "react-redux"
import { logout, selectUser } from "../../features/auth/authSlice"

export const Header = () => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <CustomButton type="ghost">
            <Typography.Title level={1}>Сотрудники</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      {user ? (
        <CustomButton type="ghost" icon={<LogoutOutlined />} onClick={onLogout}>
          Выйти
        </CustomButton>
      ) : (
        <Space>
          <Link to={Paths.register}>
            <CustomButton type="ghost" icon={<UserAddOutlined />}>
              Зарегистрироваться
            </CustomButton>
          </Link>
          <Link to={Paths.login}>
            <CustomButton type="ghost" icon={<LoginOutlined />}>
              Войти
            </CustomButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  )
}
