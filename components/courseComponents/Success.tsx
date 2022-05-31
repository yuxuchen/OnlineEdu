
import React, { useState } from 'react';
import { Steps, Row, Col, Form, Input, Button, DatePicker, InputNumber, Upload, message, Space,Result } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { DatePickerProps, RangePickerProps} from 'antd/es/date-picker';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


export default function Success() {

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
      <Col className="gutter-row" span={8}>
       
      </Col>
      <Col className="gutter-row" span={8}>
      <Result
    status="success"
    title="Successfully Purchased Cloud Server ECS!"
    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    extra={[
      <Button type="primary" key="console">
        Go Console
      </Button>,
      <Button key="buy">Buy Again</Button>,
    ]}
  />
      </Col>
      <Col className="gutter-row" span={8}>
       
      </Col>
      
    </Row>
    </>
   
  )
}
