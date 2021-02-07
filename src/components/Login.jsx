import React, { useState } from 'react';

// Design Resources
import { Layout, Button, Form, Input, Alert } from 'antd';

// API
import { signIn } from '../api/auth';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 8 },
};

function Login() {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onValuesChange = (data) => {
    if (data.email) {
      setEmail(data.email.trim());
    }
    if (data.password) {
      setPassword(data.password.trim());
    }
  };

  const onHandleSubmit = async () => {
    setError('');
    try {
      await signIn(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Layout.Content className="container">
      <h1 className="login__title">Enter the Squirrel Zone</h1>
      {Boolean(error) && <Alert message="Error" description={error} type="error" showIcon />}
      <Form
        {...layout}
        layout="horizontal"
        name="sign-in"
        onValuesChange={onValuesChange}
        className="login__form"
        autoComplete="off"
      >
        <Form.Item {...tailLayout} label="E-mail" name="email" className="login__form-item">
          <Input type="email" />
        </Form.Item>
        <Form.Item {...tailLayout} label="Password" name="password" className="login__form-item">
          <Input type="password" />
        </Form.Item>
        <div className="login__form-action">
          <Button type="primary" onClick={onHandleSubmit}>
            Login
          </Button>
        </div>
      </Form>
    </Layout.Content>
  );
}

export default Login;
