import React, {useState } from 'react'
import DLayout from '../../LayoutDB'
import { useRouter } from 'next/router'
import {getDetail} from '../../../api/courseListApi';
import { Card, Avatar, Button, Image, Row, Col, Space, Descriptions, Steps, Table, Collapse, Select} from 'antd';
import type { ExpandIconPosition } from 'antd/lib/collapse/Collapse';
import { useEffect } from 'react';
import { HeartTwoTone } from '@ant-design/icons';

interface topBorderStyle {
  borderStyle:string, 
  borderBottom:number, 
  borderColor:string, 
  borderWidth:string,
  color:string, 
  textAlign:'center', 
  fontWeight:string,
}
const topBorderStyle: topBorderStyle = {
  borderStyle:'solid', 
  borderBottom:0, 
  borderColor:'#D3D3D3', 
  borderWidth:'1px',
  color:'#6a5acd', 
  textAlign:'center', 
  fontWeight:'bold',
}
interface bottomBorder {
  borderStyle:string, 
  borderColor:string, 
  borderWidth:string, 
  borderTop:number,
  color:string, 
  textAlign:'center', 
  fontWeight:string
}
const bottomBorder: bottomBorder = {
  borderStyle:'solid', 
  borderColor:'#D3D3D3', 
  borderWidth:'1px', 
  borderTop:0,
  color:'#939393', 
  textAlign:'center', 
  fontWeight:'bold'
}
const titleStyle= {
  fontSize:'30px',
  color:'#6a5acd',
}
const { Step } = Steps;
const { Panel } = Collapse;
const { Option } = Select;

export default function CourseDetailLists() {
  const router = useRouter();
  const [tableTime, setTableTime] = 
  useState(['']);
  const [courseCard, setCourseCard] = 
  useState({
              name:'',
              teacherName:'',
              createdAt:'',
              updatedAt:'',
              duration:'',
              status:0,
              star:'',
              teacher:'',
              maxStudents:0,
              sales:{
              batches: 0,
              price: 0,
              earnings: 0,
              paidAmount: 0,
              studentAmount: 0,
            },
            });
  const [courseDetail, setCourseDetail] = 
  useState({
              createdTime:'',
              updatedTime:'',
              status:0,
              uid:'',
              schedule:{
              status: 0,
              classTime: ["",],
              chapters:[{
                createdAt: "",
                updatedAt: "",
                id: 0,
                name: "",
                order: 0,
                content: ""
              },]
            },
              detail:'',
              type:[{id:'', name:''}]
            });
  const columns = [
    {
        title: 'Monday',
        dataIndex: 'Monday',
    },
    {
        title: 'Tuesday',
        dataIndex: 'Tuesday',
    },
    {
      title: 'Wednesday',
      dataIndex: 'Wednesday',
    },
    {
      title: 'Thursday',
      dataIndex: 'Thursday',
    },
    {
      title: 'Friday',
      dataIndex: 'Friday',
    },
    {
      title: 'Saturday',
      dataIndex: 'Saturday',
    },
    {
      title: 'Sunday',
      dataIndex: 'Sunday',
    },
  ]
  
  useEffect(
    ()=>{
        if(router.isReady){
           const id:any =router.query.id;
           getDetail(id).then(
            function(res){
              console.log(res.data.data);
                setCourseCard(res.data.data);
                setCourseDetail(res.data.data);
                let len = res.data.data.schedule.classTime?.length;
                let arr = new Array(0);
                let map = new Map();
                for( let i =0; i<len; i++){
                 let weekDay = res.data.data.schedule.classTime[i].split(' ')[0];
                 let time = res.data.data.schedule.classTime[i].split(' ')[1];
                 map.set(weekDay, time);
                }
                arr.push(Object.fromEntries(map.entries()));
               setTableTime(arr)
            }
        )
        }
    },[router.isReady]
    )

  const [expandIconPosition, setExpandIconPosition] = useState<ExpandIconPosition>('left');
  const onPositionChange = (newExpandIconPosition: ExpandIconPosition) => {
    setExpandIconPosition(newExpandIconPosition);
  };
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  const genExtra = () => (
    <Button
      onClick={event => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    />
  );

  return (
    <DLayout>
      <Row align='top'>
          <Space align="start" size={30}>
          <Card  style={{ width: 400 }}
                bordered={true}
                cover={
                    <Image 
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    alt="Picture of the author"
                    width={400}
                    height={400}/>
                  }>
              
              <Row >
                  <Col span={12} style={{fontWeight:'bold'}}>
                      <p>{courseCard.name}</p>
                  </Col>
                </Row>
                <Row >
                  <Col span={12}>
                      <p>{courseCard.createdAt}</p>
                  </Col>
                  <Col span={12} style={{textAlign:"right" }}>
                      <p><HeartTwoTone twoToneColor="#eb2f96"/> {courseCard.star}</p>
                  </Col>
                </Row>
                <Row >
                  <Col span={12}>
                      <p>Duration:</p>
                  </Col>
                  <Col span={12} style={{textAlign:"right" }}>
                      <p>{courseCard.duration} years</p>
                  </Col>
                </Row>
                <Row >
                  <Col span={12}>
                      <p>Teacher:</p>
                  </Col>
                  <Col span={12} style={{textAlign:"right" }}>
                      <p>{courseCard.teacherName}</p>
                  </Col>
                </Row>
                <Row >
                  <Col span={12}>
                      <p><Avatar src="https://joeschmoe.io/api/v1/random" />Student Limit:</p>
                  </Col>
                  <Col span={12} style={{textAlign:"right" }}>
                      <p>{courseCard.maxStudents}</p>
                  </Col>
                </Row>
                <Row >
                  <Col span={6} style={topBorderStyle}>
                      <p>{courseCard.sales.price}</p>
                  </Col>
                  <Col span={6} 
                  style={topBorderStyle}>
                      <p>{courseCard.sales.batches}</p>
                  </Col>
                  <Col span={6}
                  style={topBorderStyle}>
                      <p>{courseCard.sales.studentAmount}</p>
                  </Col>
                  <Col span={6} 
                  style={topBorderStyle}>
                      <p>{courseCard.sales.earnings}</p>
                  </Col>
                </Row>

                <Row style={{margin: 0}}>
                  <Col span={6} style={bottomBorder}>
                      <p>Pice</p>
                  </Col>
                  <Col span={6} 
                  style={bottomBorder}>
                      <p>Batches</p>
                  </Col>
                  <Col span={6}
                  style={bottomBorder}>
                      <p>Students</p>
                  </Col>
                  <Col span={6} 
                  style={bottomBorder}>
                      <p>Earnings</p>
                  </Col>
                </Row>
            </Card>

            <Card  style={{ width: 1100 }}>
              <Descriptions labelStyle={{fontWeight:'bold'}}>
                <Descriptions.Item contentStyle={titleStyle}>Course Detail</Descriptions.Item>
                  <br/>
                  <br/>
                  <Descriptions.Item span={2} contentStyle={{fontWeight:'bold'}}>Create Time</Descriptions.Item>
                  <br/>
                  <Descriptions.Item span={2}>{courseCard.createdAt}</Descriptions.Item>
                  <br/>
                  <Descriptions.Item span={2} contentStyle={{fontWeight:'bold'}}>Start Time</Descriptions.Item>
                  <br/>
                  <Descriptions.Item span={2}>{courseCard.updatedAt}</Descriptions.Item>
                  <br/>
                  <Descriptions.Item span={2} contentStyle={{fontWeight:'bold'}}>Status</Descriptions.Item>
                  <br/>
              </Descriptions>
              <Steps size="small" current={courseCard.status}>
                    <Step title="Register" />
                    <Step title="Pending" />
                    <Step title="started" />
                    <Step title="In Progress" />
                    <Step title="Midterm" />
                    <Step title="Final" />
                    <Step title="Completed" />
              </Steps>
              <br/>
              <Descriptions labelStyle={{fontWeight:'bold'}}>
                  <Descriptions.Item span={2} contentStyle={{fontWeight:'bold'}}>Course Code</Descriptions.Item>
                  <br/>
                  <Descriptions.Item span={2}>{courseDetail.uid}</Descriptions.Item>
                  <br/>
                  <Descriptions.Item span={2} contentStyle={{fontWeight:'bold'}}>Class Time</Descriptions.Item>
                  <br/>
              </Descriptions>
                  <Table bordered dataSource={tableTime} columns={columns}/>
                  <br/>
              <Descriptions labelStyle={{fontWeight:'bold'}}>
                  <Descriptions.Item span={2} contentStyle={{fontWeight:'bold'}}>Category</Descriptions.Item>
                  <br/>
                  <div>
                    {courseDetail.type?.map((item)=> 
                    {return <Button key={item.id} 
                    style={{color:'salmon', backgroundColor: 'papayawhip', opacity: 1}}>{item.name}</Button>})}
                  </div>
                  <br/>
                  <br/>
                  <Descriptions.Item span={2} contentStyle={{fontWeight:'bold'}}>Description</Descriptions.Item>
                  <br/>
                  <Descriptions.Item span={2}>{courseDetail.detail}</Descriptions.Item>
                  <br/>
                  <Descriptions.Item span={2} contentStyle={{fontWeight:'bold'}}>Chapter</Descriptions.Item>
                  <br/>
              </Descriptions>
              <Collapse
                defaultActiveKey={['1']}
                onChange={onChange}
                expandIconPosition={expandIconPosition}
              >
                  {courseDetail.schedule.chapters?.map((item:any, index:any) => 
                {return <Panel header={item.name} key={index} extra={genExtra()}>
                  <div>{item.content}</div>
                </Panel>})}
                
              </Collapse>
            </Card>
          </Space>
          </Row>
    </DLayout>
  )
}
