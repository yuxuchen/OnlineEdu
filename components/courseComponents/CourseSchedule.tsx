import React, { useState } from 'react';
import { Steps, Row, Col, Form, Input, Button, DatePicker, InputNumber, Upload, message, Space } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { DatePickerProps, RangePickerProps} from 'antd/es/date-picker';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


export default function CourseSchedule() {

  const { Step } = Steps;
  const [current, setCurrent] = useState(0);
  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };
  const onFinishAdd = (values: any) => {
    console.log('Received values of form:', values);
  };
  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
  <>
       <Row gutter={16}>
      <Col className="gutter-row" span={12}>
      <Form
            name="basic"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinishAdd}
            autoComplete="off"
          >
        <p style={{fontSize:'25px'}}> Chapters</p>
        <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'first']}
                  rules={[{ required: true, message: 'Missing key words' }]}
                >
                  <Input placeholder="key word" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'last']}
                  rules={[{ required: true, message: 'Missing' }]}
                >
                  <Input placeholder="words" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
      </Col>
      <Col className="gutter-row" span={12}>
      <Form
            name="basic"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinishAdd}
            autoComplete="off"
          >
       <p style={{fontSize:'25px'}}> Class Times</p>
        <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'first']}
                  rules={[{ required: true, message: 'Missing dates' }]}
                >
                  <Input placeholder="key word" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'last']}
                  rules={[{ required: true, message: 'Missing' }]}
                >
                  <DatePicker onChange={onChangeDate} />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
      </Col>
    </Row>

    </>
  )
}
