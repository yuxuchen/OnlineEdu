import React, { useState } from 'react';
import { Steps, Row, Col, Form, Input, Button, DatePicker, InputNumber, Upload, message, Space,Result } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { DatePickerProps, RangePickerProps, UploadProps } from 'antd/es/date-picker';
import DLayout from '../../LayoutDB';
import CourseDetail from '../../../components/courseComponents/courseDetail';
import CourseSchedule from '../../../components/courseComponents/CourseSchedule';
import Success from '../../../components/courseComponents/Success';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


export default function AddCourses() {

  const { Step } = Steps;
  const [current, setCurrent] = useState(0);
  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };
 
  return (
    <DLayout>
       <Steps
        type="navigation"
        current={current}
        onChange={onChange}
        className="site-navigation-steps"
      >
        <Step status="process" title="Course Detail" />
        <Step status="wait" title="Course Schedule" />
        <Step status="wait" title="Success" />
      </Steps>
      {current === 0 && <CourseDetail/>}
      {current === 1 && <CourseSchedule/>}
      {current === 2 && <Success/>}
    </DLayout>
   
  )
}
