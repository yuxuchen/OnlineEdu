import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, DatePicker, InputNumber, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { DatePickerProps, RangePickerProps} from 'antd/es/date-picker';
import type { UploadProps } from 'antd';

export default function CourseDetail() { 
  const [current, setCurrent] = useState(0);
  const { RangePicker } = DatePicker;
  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  const onChangePrice = (value: number | string) => {
    console.log('changed', value);
  };
  const onChangeDuration = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,
  ) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };
  const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('onOk: ', value);
  };
  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
  };
  const { TextArea } = Input;
  const { Dragger } = Upload;
  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info:any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e:any) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
 <>
      <Row gutter={16}>
      <Col className="gutter-row" span={6}>
      <Form
            name="basic"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Course Name"
              name="courseName"
              rules={[{ required: true, message: 'Please input course name!' }]}
            >
              <Input />
            </Form.Item>
            </Form>
      </Col>
      <Col className="gutter-row" span={6}>
      <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Teacher"
              name="teacher"
              rules={[{ required: true, message: 'Please input your teacher name!' }]}
            >
              <Input />
            </Form.Item>
            </Form>
      </Col>
      <Col className="gutter-row" span={6}>
      <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 19 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: 'Please input your type!' }]}
            >
              <Input />
            </Form.Item>
            </Form>
      </Col>
      <Col className="gutter-row" span={6}>
      <Form
            name="basic"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17}}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Course Code"
              name="courseCode"
              rules={[{ required: true, message: 'Please input your course code!' }]}
            >
              <Input />
            </Form.Item>
            </Form>
      </Col>
      </Row>
      <Row gutter={16}>
      <Col className="gutter-row" span={8}>
            <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            
            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[{  message: 'Please input Date!' }]}
            >
              <DatePicker onChange={onChangeDate} />
            </Form.Item>
            <Form.Item 
            label="Price"
            name="price"
            wrapperCol={{ offset: 8, span: 16 }}>
            <InputNumber
              defaultValue={1000}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/\$\s?|(,*)/g, '')}
              onChange={onChangePrice}
            />
            </Form.Item>
            <Form.Item label="Student Limit"
            name="studentLimit"
            rules={[{  message: 'Please input student limit numbers!' }]}
            >
              <Input/>
            </Form.Item>
            <Form.Item label="Duration"
            name="Duration"
            rules={[{  message: 'Please input month!' }]}
            >
              <RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              onChange={onChangeDuration}
              onOk={onOk}
            />
            </Form.Item>
            
          </Form>
      </Col>
      <Col className="gutter-row" span={8}>
      <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input your description!' }]}
            >
               <TextArea showCount maxLength={100} style={{ height: 120 }} onChange={onChangeText} />
            </Form.Item>
          </Form>
      </Col>
      <Col className="gutter-row" span={8}>
      <Form
            name="basic"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Cover"
              name="cover"
            >
               <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                  band files
                </p>
              </Dragger>
            </Form.Item>
          </Form>
      </Col>
      
    </Row>
    <Button type="primary" htmlType="submit">
                Submit
    </Button>
    </>
  )
}
