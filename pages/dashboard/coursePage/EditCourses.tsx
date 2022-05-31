import React, { useState } from 'react'
import DLayout from '../../LayoutDB';
import { Cascader, Row, Col, Tabs, Radio} from 'antd';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { RadioChangeEvent } from 'antd';
import CourseDetail from '../../../components/courseComponents/courseDetail';
import CourseSchedule from '../../../components/courseComponents/CourseSchedule';

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'code',
    label: 'code',
  },
  {
    value: 'name',
    label: 'Name',
  },
  {
    value: 'category',
    label: 'Category',
  },
];
const { TabPane } = Tabs;

export default function EditCourses() {
  const onChange = (value: string[]) => {
    console.log(value);
  };
  const [size, setSize] = useState<SizeType>('big');
  const onChangeTab = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };
  return (
    <DLayout>
      <Row gutter={16}>
      <Cascader style={{width:"100px"}} options={options} onChange={onChange} placeholder="Please select" />
      <Cascader style={{width:"650px"}} onChange={onChange} placeholder="Please select" />
      </Row>
      <Row gutter={16}>
      <Tabs defaultActiveKey="1" type="card" size={size}>
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
