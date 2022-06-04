import React from 'react';
import DLayout from '../../LayoutDB';
import { Cascader, Row, Tabs } from 'antd';
import CourseDetail from '../../../components/courseComponents/courseDetail';
import CourseSchedule from '../../../components/courseComponents/CourseSchedule';

const { TabPane } = Tabs;
interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}
const options: Option[] = [
  {
    value: 'code',
    label: 'Code',
  },
  {
    value: 'name',
    label: 'Name',
  },
  {
    value: 'category',
    label: 'Category',
  },
]

export default function EditCourses() {
  
  return (
    <DLayout>
      <Row gutter={16}>
      <Cascader style={{width:"100px"}} options={options} placeholder="Please select" />
      <Cascader style={{width:"650px"}} placeholder="Please select" />
      </Row>
      <Row gutter={16}>
      <Tabs defaultActiveKey="1" type="card" size='large'>
        <TabPane tab="Course Details" key="1">
          <CourseDetail/>
        </TabPane>
        <TabPane style = {{alignItems: 'stretch'}} tab="Course schedule" key="2">
          <CourseSchedule/>
        </TabPane>
      </Tabs>
      </Row>
    </DLayout>
  )
}
