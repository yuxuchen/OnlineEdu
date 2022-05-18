import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getStudent } from '../../../api/studentListApi';
import {Card, Row, Col, Avatar, Divider, Space, Table, Tabs, Button } from 'antd';
import LayoutDB from '../../LayoutDB'
import { UserOutlined } from '@ant-design/icons';
import { Descriptions } from 'antd'

const { Meta } = Card;
const { TabPane } = Tabs;
const titleStyle= {
  fontSize:'30px',
  color:'purple',
}

const columns = [
  {
    title: 'No.',
    dataIndex: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Type',
    dataIndex: 'type.name',
  },
  {
    title: 'Join Time',
    dataIndex: 'courseDate',
  },
];


export default function Detail() {
  const router = useRouter(); 
  const [tableData, setTableData] = useState({
    id:1,
    name:'',
    type:'',
    joinTime:''
  })
  const [stuCardData, setStuCardData] = useState({
    name:'',
    email:'',
    age:0,
    phone:'',
    address:'',
    education:'',
    area:'',
    gender:'',
    memberStartAt:'',
    memberEndAt:'',
    type:'',
    createTime:'',
    updateTime:'',
    interest:[],
    description:''
  })

    useEffect(()=>{
      if(router.isReady){
      const id:any = router.query.id;
      console.log(router.query.id)
      const stuDetail = async ()=>{
        const data = await getStudent(id);
        console.log(data.data.data.courses);
        setStuCardData({
          name:data.data.data.name,
          email:data.data.data.email,
          age:data.data.data.age,
          phone:data.data.data.phone,
          address:data.data.data.address,
          education:data.data.data.education,
          area:data.data.data.country,
          gender:data.data.data.gender,
          memberStartAt:data.data.data.memberStartAt,
          memberEndAt:data.data.data.memberEndAt,
          type:data.data.data.type?.name,
          createTime:data.data.data.createdAt,
          updateTime:data.data.data.updatedAt,
          interest:data.data.data.interest,
          description:data.data.data.description
        });
        const tableList = data.data.data.courses?.map((item:any, index:number)=>{
          return{
            id:index,
            name:item.name,
            type:item.type?.map((item:any, index:number) =>{return <p key={index}>{item.name}</p>}),
            joinTime:item.courseDate
          }
        })
        setTableData(tableList)
      }
      stuDetail();
    }
    },[router.isReady])

  return(
    <LayoutDB>
        <Row align='top'>
          <Space align="start" size={30}>
          <Card  style={{ width: 500, textAlign:"center"}} bordered={true}>
              <Meta
                avatar={
                <Avatar size={50} 
                icon={<UserOutlined />} 
                style={{margin:'0 0 0 15px'}}
                />
              } 
                style={{margin:'4px', padding:'0 40%'}}
              />
              <Divider/>
              <Row gutter={[16,24]}>
              <Col className="gutter-row" span={12}>
                <Meta
                  title="Name"
                  description={stuCardData.name}
                  style={{display:'grid'}}
                  />
               </Col>
               <Col className="gutter-row" span={12}>
                <Meta
                  title="Age"
                  description={stuCardData.age}
                  style={{display:'grid'}}
                  />
               </Col>
               <Col className="gutter-row" span={12}>
                <Meta
                  title="Email"
                  description={stuCardData.email}
                  style={{display:'grid'}}
                  />
               </Col>
               <Col className="gutter-row" span={12}>
                <Meta
                  title="Phone"
                  description={stuCardData.phone}
                  style={{display:'grid'}}
                  />
               </Col>
               </Row>
                <Meta
                  title="Address"
                  description={stuCardData.address}
                  style={{display:'grid'}}
                  />
            </Card>


            <Card  style={{ width: 1100 }}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="About" key="1">
                <Descriptions labelStyle={{fontWeight:'bold'}}>
                <Descriptions.Item contentStyle={titleStyle}>Information</Descriptions.Item>
                  <br/>
                  <br/>
                  <Descriptions.Item label="Education" >{stuCardData.education}</Descriptions.Item>
                  <br/>
                  <br/>
                  <Descriptions.Item label="Area">{stuCardData.area}</Descriptions.Item>
                  <br/>
                  <br/>
                  <Descriptions.Item label="Gender">{stuCardData.gender}</Descriptions.Item>
                  <br/>
                  <br/>
                  <Descriptions.Item label="Member Period">{stuCardData.memberStartAt}-{stuCardData.memberEndAt}</Descriptions.Item>
                  <br/>
                  <br/>
                  <Descriptions.Item label="Type">{stuCardData.type}</Descriptions.Item>
                  <br/>
                  <br/>
                  <Descriptions.Item label="Create Time">{stuCardData.createTime}</Descriptions.Item>
                  <br/>
                  <br/>
                  <Descriptions.Item label="Update Time">{stuCardData.updateTime}</Descriptions.Item>
                  <br/>
                  <br/>
                <Descriptions.Item contentStyle={titleStyle}>Interesting</Descriptions.Item>
                  <br/>
                  <br/>
                  <div>
                    {stuCardData.interest?.map((item,index)=> 
                    {return <Button key={index} 
                    style={{color:'salmon', backgroundColor: 'papayawhip', opacity: 1}}>{item}</Button>})}
                  </div>
                   
                  <br/>
                  <br/>
                  <Descriptions.Item contentStyle={titleStyle}>Descriptions</Descriptions.Item>
                  <br/>
                  <br/>
                  <Descriptions.Item >{stuCardData.description}</Descriptions.Item>
                  </Descriptions>
                </TabPane>

                <TabPane tab="Courses" key="2">
                  <Table columns={columns} dataSource={tableData} />
                </TabPane>
              </Tabs>
            </Card>
          </Space>
          </Row>
          
      </LayoutDB>
  )
  
}
