import { useState, useEffect } from "react"
import { Row } from "antd"
import { Layout } from "../../components/layout"
import { EmployeeForm } from "../../components/employee-form"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "../../features/auth/authSlice"
import { useAddEmployeeMutation } from "../../app/services/employee"
import { Employee } from "@prisma/client"
import { Paths } from "../../paths"
import { isErrorWithMessage } from "../../utils/is-error-with-message"

export const AddEmployee = () => {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const user = useSelector(selectUser)
  const [addEmployee] = useAddEmployeeMutation()

  useEffect(() => {
    if (!user) {
      navigate("login")
    }
  }, [navigate, user])

  const handleAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap()

      navigate(`${Paths.status}/created`)
    } catch (error) {
      const isError = isErrorWithMessage(error)
      if (isError) {
        setError(error.data.message)
      } else {
        setError("Что-то пошло не так")
      }
    }
  }

  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          title="Добавить сотрудника"
          btnText="Добавить"
          onFinish={handleAddEmployee}
          error={error}
        />
      </Row>
    </Layout>
  )
}
