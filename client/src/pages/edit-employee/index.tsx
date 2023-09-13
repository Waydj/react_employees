import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from "../../app/services/employee"
import { Layout } from "../../components/layout"
import { Row } from "antd"
import { EmployeeForm } from "../../components/employee-form"
import { Employee } from "@prisma/client"
import { Paths } from "../../paths"
import { isErrorWithMessage } from "../../utils/is-error-with-message"

export const EditEmployee = () => {
  const navigate = useNavigate()
  const params = useParams<{ id: string }>()
  const [error, setError] = useState("")
  const { data, isLoading } = useGetEmployeeQuery(params.id || "")
  const [editEmployee] = useEditEmployeeMutation()

  if (isLoading) {
    return <span>Загрузка...</span>
  }

  const handleEditEmployee = async (employee: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee,
      }

      await editEmployee(editedEmployee).unwrap()
      navigate(`${Paths.status}/updated`)
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
          title="Редактировать сотрудника"
          btnText="Сохранить"
          error={error}
          employee={data}
          onFinish={handleEditEmployee}
        />
      </Row>
    </Layout>
  )
}
