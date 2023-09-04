import { Card, Form, Row, Space, Typography } from "antd"
import { Header } from "../../components/header"
import { Layout } from "../../components/layout"
import CustomInput from "../../components/custom-input"
import PasswordInput from "../../components/password-input"
import { CustomButton } from "../../components/custom-button"
import { Link } from "react-router-dom"
import { Paths } from "../../paths"

export const Login = () => {
  return (
    <Layout>
      <Header />
      <Row align="middle" justify="center">
        <Card title="Войдите" style={{ width: "30rem" }}>
          <Form onFinish={() => {}}>
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <CustomButton type="primary" htmlType="submit">
              Войти
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Нет аккаунта? <Link to={Paths.register}>Зарегистрируйтесь</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}
