import React from "react";
import { Alert, Button, Modal, Input, Form } from "antd";
import { USER, PASS, SALT, PEPPER, hashCode } from "../../Controllers/Auth";

const Login = ({ setLoggedIn, loginFailed, setLoginFailed }) => {
  const onFinish = (values) => {
    const username = hashCode(SALT + values.username + PEPPER);
    const password = hashCode(PEPPER + values.password + SALT);

    if (username === USER && password === PASS) {
      setLoggedIn(true);
    } else {
      setLoginFailed(true);
    }
  };
  return (
    <Modal title="Feed Editor" visible={true} footer={null}>
      <Form onFinish={(values) => onFinish(values)}>
        <Form.Item
          name={"username"}
          label={"Username"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"password"}
          label={"Password"}
        >
          <Input.Password/>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
        {loginFailed &&
          <Alert
            style={{ marginTop: 20 }}
            message={"Wrong username or password!"}
            onClose={() => { setLoginFailed(false); }}
            type="error"
            showIcon
            closable
          />
        }
      </Form>
    </Modal>
  );
};

export default Login;
