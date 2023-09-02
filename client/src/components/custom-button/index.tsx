import { Button, Form } from "antd"

type Props = {
  children: React.ReactNode
  htmlType?: "button" | "submit" | "reset" | undefined
  type?:
    | "link"
    | "text"
    | "default"
    | "primary"
    | "dashed"
    | "ghost"
    | undefined
  danger?: boolean | undefined
  onClick?: () => void
  loading?: boolean | undefined
  shape?: "default" | "circle" | "round" | undefined
  icon?: React.ReactNode
}

export const CustomButton = ({
  children,
  htmlType = "button",
  type,
  danger,
  loading,
  shape,
  icon,
  onClick,
}: Props) => {
  return (
    <Form.Item>
      <Button
        type={type}
        htmlType={htmlType}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
        onClick={onClick}
      >
        {children}
      </Button>
    </Form.Item>
  )
}
