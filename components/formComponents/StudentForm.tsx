import React, {useState} from 'react'
import { Form, FormInstance, Input, Select } from 'antd'

export default function StudentForm() {
    
    const {Option} = Select;
    const [form] = Form.useForm();
    const formRef = React.createRef<FormInstance>();

    const onFinish = async (values: any) => {
        console.log('Success:', values);
      };
    
    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };

  return (
        <Form {...layout} 
        form = {form} 
        name = 'control-hooks' 
        onFinish={onFinish}
        ref={formRef}
        >
            <Form.Item name='name' label='Name' rules = {[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name='email' label='Email' rules = {[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name='area' label='Area' rules = {[{required: true}]}>
                <Select>
                    <Option value="China">China</Option>
                    <Option value='Australia'>Australia</Option>
                    <Option value='America'>America</Option>
                </Select>
            </Form.Item>
            <Form.Item name='studentType' label='Student Type' rules = {[{required: true}]}>
                <Select>
                    <Option value="developer">developer</Option>
                    <Option value="tester">tester</Option>
                </Select>
            </Form.Item>
        </Form>
  )
}
