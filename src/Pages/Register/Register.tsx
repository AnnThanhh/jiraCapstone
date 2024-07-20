import React from 'react';
import {useFormik} from 'formik';
import { NavLink } from 'react-router-dom';
import { DispatchType } from '../../Redux/configStore';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { registerAsyncAction } from '../../Redux/reducers/userLoginReducer';
import { Button, Form, Input } from 'antd';
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import ReactFacebookLogin from 'react-facebook-login';

type Props = {}

export interface UserRegisterFrm {
  email: string,
  passWord: string,
  name: string,
  phoneNumber: string
}

export default function Register({}: Props) {
  const dispatch:DispatchType = useDispatch();
  

  const onFinish = (values:UserRegisterFrm) => {
    const action = registerAsyncAction(values);
    dispatch(action)

  };

  const responseFacebook = (response: any) => {
    console.log(response);
    const { email, name, id } = response;
    if (email && name && id) {
      const values: UserRegisterFrm = {
        email,
        passWord: 'facebook', 
        name,
        phoneNumber: '', 
      };
      const action = registerAsyncAction(values);
      dispatch(action);

    }
  };

  return (
    <div className="register">
      <div className="register-box">
        <Form labelAlign="left" layout="vertical" onFinish={onFinish} className="form-antd">
          <h2>Register</h2>

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />}/>
          </Form.Item>

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
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" },
              {
                pattern: /^[0-9]+$/,
                message: "Please enter a valid phone number",
              },
            ]}
          >
            <Input prefix={<PhoneOutlined className="site-form-item-icon" />}/>
          </Form.Item>

          <Form.Item
            name="passWord"
            label="Password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 8, message: "Password must be at least 8 characters!" },
              { pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/, message: 'Password must include at least one uppercase letter, one lowercase letter, and one number!' }
            ]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}/>
          </Form.Item>

          <Form.Item  className="mt-5">
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>

          <Form.Item>
          <div className="login-link">
            <p>
              Already have an account? <NavLink to="/login">Login now</NavLink>
            </p>
          </div>
          </Form.Item>

          <h2 className="or-divider">Or</h2>

          <Form.Item>
            <div className="social-login">
              <ReactFacebookLogin
                appId="YOUR_FACEBOOK_APP_ID"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="facebook-button"
                textButton="Register with Facebook"
                icon={<i className="fab fa-facebook-f" style={{ marginRight: 8 }}></i>}
              />
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}