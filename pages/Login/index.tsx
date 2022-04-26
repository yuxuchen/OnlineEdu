import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { Form, Input, Button, Radio, Checkbox, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { AES } from 'crypto-js'
import axios from 'axios';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import Router from 'next/router';
import { login } from '../../api/login';



export default function SignIn(){

      const onChange = (e: CheckboxChangeEvent):void=> {
        e.target.checked;
        
      }
      interface Data{
        email: string,
        password:string,
        role:string
      }
      
      const onFinish = async(values:Data) => {
        // const data = {
        //   email: values.email,
        //   password: AES.encrypt(values.password,"cms").toString(),
        //   role: values.role
        // }
        // const url = 'http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/login'
        
        
        // axios.post(url,data)
        login(values.email, values.password, values.role)
        .then((res) =>{
          message.success('login successfully')
          console.log('show')
          console.log('show',res.data)
          
            localStorage.setItem('token', res.data.data.token)
            Router.push('/dashboard/studentPage')
            
          
        })
        .catch((error)=>{
          console.log(error)
        })
        
        
      }
  
      return (
      <div> 
        <Head>
          <title>Sign in</title>
          <meta name="Sign in" content="Sign in page." />
        </Head>

        <h1 className={styles.title}>
          COURSE MANAGEMENT ASSISTANT
        </h1>

        <Row>
        <Col span='8'>
        </Col>
          <Col span='10'>
            
          <Form
          layout='vertical'
          onFinish= {onFinish}
        >
        <Form.Item
          label="Role"
          name="role"
          >
        <div>
        <Radio.Group>
          <Radio.Button value="student">student</Radio.Button>
          <Radio.Button value="teacher">teacher</Radio.Button>
          <Radio.Button value="manager">manager</Radio.Button>
        </Radio.Group>
        </div>
        </Form.Item>
        

        <Form.Item
        label="Email"
        name="email"
        >
            <Input 
          placeholder='username' 
          prefix ={<UserOutlined />}
          />
        </Form.Item>

        <Form.Item
        label="Password"
        name="password">
            <Input 
          placeholder='password' 
          prefix ={<LockOutlined />}
          />
        </Form.Item>
        
        <Form.Item >
          <Checkbox onChange={onChange} >
            Remember me
          </Checkbox>
         </Form.Item>
         
          <Form.Item >

            <Button 
                 type='primary' 
                 htmlType='submit' 
              >
                Sign in
              </Button>

              
          </Form.Item>

          <Form.Item >
            <span>
              No account? </span>
              <Link href='/signUp'>Sign up</Link>
            <Link href='/dashboard/studentPage'>student</Link>
          </Form.Item>
        </Form>

          </Col>
        </Row>
        
   </div>
  )

}

