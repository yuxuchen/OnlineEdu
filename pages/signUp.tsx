import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import React from 'react';
import styles from '../styles/Home.module.css'
import { Form, Input, Button, Radio} from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { UserOutlined } from '@ant-design/icons'
import Router from 'next/router';

export default function SignUp (){

      const [value, setValue] = React.useState("manager")

      const onChange = (e: CheckboxChangeEvent) =>{
        setValue(e.target.value)
      }

      const onFinish = (values:any) => {

        const data ={
          role: values.role,
          email: values.email,
          password: values.password
        }

        const url = 'http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/signup'
        axios.post(url,data)
        .then((res) => {
          localStorage.setItem('token', JSON.stringify(res.data.data.token));
          console.log(res.data.data.token)
          alert('success')
          Router.push('/Login')
        }
        )
        .catch((error)=>{
          console.log(error)
          alert('error')
        })
        
        console.log('Success:', data);
      };
  
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };

      return (
    
      <div> 

        <Head>
          <title>Sign up</title>
          <meta name="Sign up" content="Sign up page." />
        </Head>

        <h1 className={styles.title}>
          SIGN UP YOUR ACCOUNT
        </h1>

        <Form
          name='basic'
          labelCol={{span:8}}
          wrapperCol={{span:16}}
          initialValues={{remember: true}}
          layout='vertical'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          className={styles.form}
        >
        <Form.Item
          label="Role"
          name="role"
          rules={[
            {required: true}
          ]}
          className={styles.input}
          >
          <div>
          <Radio.Group 
          onChange={onChange} 
          value={value}
        >
          <Radio value={"student"}>Student</Radio>
          <Radio value={"teacher"}>Teacher</Radio>
          <Radio value={"manager"}>Manager</Radio>
        </Radio.Group>
          </div>
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
          {required: true}
          ]}
          className={styles.input}
          >
            <Input 
          placeholder='Please input your email' 
          prefix ={<UserOutlined />}
          type="text" 
          />
        </Form.Item>

          <Form.Item
          label="Password"
          name="password"
          rules={[
            {required: true}
          ]}
          className={styles.input}
          >
            <Input.Password 
            placeholder='Please input Password'
            type="text" 
            />
          </Form.Item>

          <Form.Item
          label="Confirm Password"
          name="confirm password"
          rules={[
            {required: true}
          ]}
          className={styles.input}
          >
            <Input.Password 
            placeholder='Tap Password again'
            />
          </Form.Item>

          <Form.Item
            className={styles.input}>
            <Button 
                className={styles.button}
                type='primary' 
                htmlType='submit'
            >
                Sign Up
            </Button>
          </Form.Item>

          <Form.Item className={styles.input}>
            <span >
                Already have an account? <Link href='/Login'>Sign in</Link>
            </span>
          </Form.Item>
          
        </Form>

   </div>
  )
}
