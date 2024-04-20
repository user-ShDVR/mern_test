import { Modal, Space } from "antd"
import { Button, Checkbox, Form, type FormProps, Input } from "antd"
import DropdownUser from "./dropDownUser"
import { useState } from "react"
import Link from "antd/es/typography/Link"
import { Signup } from "../type"
import { Register } from "./register/register"

type FieldType = {
  username?: string
  password?: string
  remember?: string
}

const onFinish: FormProps<FieldType>["onFinish"] = values => {
  console.log("Success:", values)
}

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = errorInfo => {
  console.log("Failed:", errorInfo)
}



const Login: React.FC<{
  setAuthorized: any
  isModalOpen: boolean
  setIsModalOpen: any
  authorized: boolean
}> = ({ setAuthorized, authorized, isModalOpen, setIsModalOpen }) => {
  const [isLogin, setIsLogin] = useState(true)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsModalOpen(false)
    setAuthorized(true)
    event.stopPropagation()
  }

  const handleButtonClick = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <Modal
      open={isModalOpen}
      footer={null}
      onCancel={handleButtonClick}
      style={{ textAlign: "center", display: "flex", justifyContent: "center" }}
    >
      {isLogin ? (
        <>
          <h2>Вход</h2>
          <Form
            name="basic"
            layout="vertical"
            style={{ width: 400 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Email"
              name="username"
              rules={[{ type: 'email', required: true, message: "Вы не ввели email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Пароль"
              name="password"
              rules={[{ required: true, message: "Вы не ввели пароль!" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item<FieldType> name="remember" valuePropName="checked">
              <Checkbox>Запомнить меня</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" block>
                Войти
              </Button>
            </Form.Item>
            <Form.Item>
                <Button type="link" block onClick={() =>setIsLogin(!isLogin)}>
                  Нет аккаунта? Зарегистрироваться
                </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <>
          <Register isLogin={isLogin} setIsLogin={setIsLogin}/>
        </>
      )}
    </Modal>
  )
}

export default Login
