import { Input, Button } from "antd"
import { Form, type FormProps } from "antd"
import type { Signup } from "../../type"

const onFinish: FormProps<Signup>["onFinish"] = values => {
  console.log("Success:", values)
}

const onFinishFailed: FormProps<Signup>["onFinishFailed"] = errorInfo => {
  console.log("Failed:", errorInfo)
}

export const Register: React.FC<{isLogin: boolean, setIsLogin: (value: boolean) => void}> = ({isLogin, setIsLogin}) => {
  const [form] = Form.useForm<Signup>()
  return (
    <>
    <h2>Регистрация</h2>
    <Form
      form={form}
      name="basic"
      layout="vertical"
      style={{ width: 400 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            required: true,
            message: "Вы не ввели email!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Фамилия"
        name="surname"
        rules={[{ required: true, message: "Пожалуйста введите фамилию!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Имя"
        name="name"
        rules={[{ required: true, message: "Пожалуйста введите имя!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Отчество"
        name="lastname"
        rules={[{ required: true, message: "Пожалуйста введите отчество!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Пожалуйста введите пароль!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Зарегистрироваться
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="link" block onClick={() => setIsLogin(!isLogin)}>
          Есть аккаунт? Войти!
        </Button>
      </Form.Item>
    </Form>
    </>

  )
}
