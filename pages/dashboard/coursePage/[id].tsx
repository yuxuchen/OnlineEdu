import React, {useState } from 'react'
import DLayout from '../../LayoutDB'
import { useRouter } from 'next/router'
import {getDetail} from '../../../api/courseListApi';
import { Card, Avatar, Button, List, Skeleton, Divider, Image, Row, Col, Space, Descriptions, Steps, Table} from 'antd';
import { getCourseList } from '../../../api/courseListApi';
import { useEffect } from 'react';
import { HeartTwoTone } from '@ant-design/icons';

const topBorderStyle = {
  borderStyle:'solid', 
  borderBottom:0, 
  borderColor:'#D3D3D3', 
  borderWidth:'1px',
  color:'#6a5acd', 
  textAlign:'center', 
  fontWeight:'bold',
}
const bottomBorder = {
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
const { Step } = Steps

export default function CourseDetailLists() {
  const router = useRouter();
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
            }
        )
        }
    },[router.isReady]
    )
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
                  style={{
                    borderStyle:'solid', borderColor:'#D3D3D3', borderWidth:'1px', borderBottom:0,
                    color:'#6a5acd', textAlign:'center', 
                    fontWeight:'bold'}}>
                      <p>{courseCard.sales.batches}</p>
                  </Col>
                  <Col span={6}
                  style={{
                    borderStyle:'solid', borderColor:'#D3D3D3', borderWidth:'1px', borderBottom:0,
                    color:'#6a5acd', textAlign:'center', 
                    fontWeight:'bold'}}>
                      <p>{courseCard.sales.studentAmount}</p>
                  </Col>
                  <Col span={6} 
                  style={{
                    borderStyle:'solid', borderColor:'#D3D3D3', borderWidth:'1px', borderBottom:0,
                    color:'#6a5acd', textAlign:'center', 
                    fontWeight:'bold'}}>
                      <p>{courseCard.sales.earnings}</p>
                  </Col>
                </Row>

                <Row style={{margin: 0}}>
                  <Col span={6} style={bottomBorder}>
                      <p>Pice</p>
                  </Col>
                  <Col span={6} 
                  style={{
                    borderStyle:'solid', borderColor:'#D3D3D3', borderWidth:'1px', borderTop:0,
                    color:'#939393', textAlign:'center', 
                    fontWeight:'bold'}}>
                      <p>Batches</p>
                  </Col>
                  <Col span={6}
                  style={{
                    borderStyle:'solid', borderColor:'#D3D3D3', borderWidth:'1px', borderTop:0,
                    color:'#939393', textAlign:'center', 
                    fontWeight:'bold'}}>
                      <p>Students</p>
                  </Col>
                  <Col span={6} 
                  style={{
                    borderStyle:'solid', borderColor:'#D3D3D3', borderWidth:'1px', borderTop:0,
                    color:'#939393', textAlign:'center', 
                    fontWeight:'bold'}}>
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
                  <Descriptions.Item span={2} contentStyle={{fontWeight:'bold'}}>{courseDetail.schedule.classTime.split(',')}</Descriptions.Item>
                  <br/>
                  <Descriptions.Item span={2} contentStyle={{fontWeight:'bold'}}>Class Time</Descriptions.Item>
                  <br/>
              </Descriptions>
                  <Table bordered dataSource={courseDetail.schedule.classTime?.map((item:string)=>{
                    item.split('')[0];
                  
                
                  })} columns={columns}/>
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
              
            </Card>
          </Space>
          </Row>
    </DLayout>
  )
}
