import { useState } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import {
  useGetEmployeeQuery,
  useRemoveEmployeeMutation,
} from "../../app/services/employee"
import { useSelector } from "react-redux"
import { selectUser } from "../../features/auth/authSlice"
import { Descriptions, Divider, Modal, Space } from "antd"
import { Layout } from "../../components/layout"
import { CustomButton } from "../../components/custom-button"
import { Paths } from "../../paths"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { ErrorMessage } from "../../components/error-message"
import { isErrorWithMessage } from "../../utils/is-error-with-message"

const Employee = () => {
  const params = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const user = useSelector(selectUser)
  const { data, isLoading } = useGetEmployeeQuery(params.id || "")
  const [removeEmployee] = useRemoveEmployeeMutation()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const hideModal = () => {
    setIsModalOpen(false)
  }

  if (isLoading) {
    return <span>Загрузка...</span>
  }

  if (!data) {
    return <Navigate to="/" />
  }

  const handleDeleteUser = async () => {
    hideModal()

    try {
      await removeEmployee(data.id).unwrap()

      navigate(`${Paths.status}/deleted`)
    } catch (error) {
      const isError = isErrorWithMessage(error)

      if (isError) {
        setError(error.data.message)
      } else {
        setError("Неизвестная ошибка")
      }
    }
  }

  return (
    <Layout>
      <Descriptions title="Информация о сотруднике" bordered>
        <Descriptions.Item label="Имя" span={3}>
          {`${data.firstName} ${data.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label="Возраст" span={3}>
          {data.age}
        </Descriptions.Item>
        <Descriptions.Item label="Адрес" span={3}>
          {data.address}
        </Descriptions.Item>
      </Descriptions>
      {user?.id === data.userId && (
        <>
          <Divider orientation="left">Действия</Divider>
          <Space>
            <Link to={`${Paths.employeeEdit}/${data.id}`}>
              <CustomButton
                shape="round"
                type="default"
                icon={<EditOutlined />}
              >
                Редактировать
              </CustomButton>
            </Link>
            <CustomButton
              shape="round"
              danger
              onClick={showModal}
              icon={<DeleteOutlined />}
            >
              Удалить
            </CustomButton>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title="Подтвердите удаление"
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={hideModal}
        okText="Подтвердить"
        cancelText="Отменить"
      >
        Вы действительно хотите удалить пользователя?
      </Modal>
    </Layout>
  )
}

export default Employee
