import React, { useState } from 'react';
import { Steps } from 'antd';
import DLayout from '../../LayoutDB';
import CourseDetail from '../../../components/courseComponents/courseDetail';
import CourseSchedule from '../../../components/courseComponents/CourseSchedule';
import Success from '../../../components/courseComponents/Success';


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
        {current === 0 ? <Step status= "process" title="Course Detail" /> :  <Step status= "finish" title="Course Detail" />}
        {current === 1 ? <Step status= "process" title="Course Schedule" /> :  <Step status= "wait" title="Course Schedule" />}
        {current === 2 ? <Step status= "process" title="Success" /> :  <Step status= "wait" title="Success" />}
      </Steps>
      <div style={{padding:'15px 0'}}>
      {current === 0 && <CourseDetail/>}
      {current === 1 && <CourseSchedule/>}
      {current === 2 && <Success/>}
      </div>
      
    </DLayout>
   
  )
}
