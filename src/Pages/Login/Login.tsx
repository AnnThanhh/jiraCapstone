import React from "react";
import { NavLink } from "react-router-dom";
import { DispatchType } from "../../Redux/configStore";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { loginAsyncAction } from "../../Redux/reducers/userLoginReducer";
import * as yup from 'yup';
import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import ReactFacebookLogin from "react-facebook-login";

type Props = {};

export interface UserLoginFrm {
  email:string,
  passWord:string
}

export default function Login({}: Props) {
  const dispatch:DispatchType = useDispatch();

  const onFinish = (values:UserLoginFrm) => {
    const action = loginAsyncAction(values);
    dispatch(action)
  };

  const responseFacebook = (response: any) => {
    console.log(response);
    // Xử lý đăng nhập thành công với Facebook
    const values = {
      email: response.email,
      passWord: "facebook", // hoặc bạn có thể quản lý mật khẩu riêng cho người dùng Facebook
    };
    const action = loginAsyncAction(values);
    dispatch(action);
  };

  return (
    <div className="login">
      <div className="login-box">
         <Form labelAlign="left" layout="vertical" onFinish={onFinish} className="form-antd">
          <h2>Login</h2>

          <Form.Item
          className="form-item"
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />}/>
          </Form.Item>

          <Form.Item
            name="passWord"
            label="Password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 8, message: "Password must be at least 8 characters!" },
            ]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}/>
          </Form.Item>

          <Form.Item  className="mt-5">
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>

          <Form.Item>
          <div className="register-link">
            <p>
              Don't have an account? <NavLink to="/register">Register</NavLink>
            </p>
          </div>
          </Form.Item>

          <h2 className="or-divider">Or</h2>

          <Form.Item>
            <div className="social-login">
              <ReactFacebookLogin
                appId="445110674937027"
                fields="name,email"
                callback={responseFacebook}
                cssClass="facebook-button"
                icon={<i className="fab fa-facebook-f" style={{ marginRight: 8 }}></i>}
              />

            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
