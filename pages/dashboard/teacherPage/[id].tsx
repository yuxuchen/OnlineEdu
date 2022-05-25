import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getTeacher } from '../../../api/teacherListApi';
import { Card, Row, Col, Avatar, Divider, Space, Table, Tabs, Button } from 'antd';
import LayoutDB from '../../LayoutDB'
import { UserOutlined } from '@ant-design/icons';
import { Descriptions, Rate } from 'antd'

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
    title: 'Start Time',
    dataIndex: 'startTime',
  },
  {
    title: 'Create Time',
    dataIndex: 'createTime',
  },
  {
    title: 'Enjoy',
    dataIndex: 'joinTime',
  },
];

export default function DetailT() {
  const router = useRouter(); 
  const [tableData, setTableData] = useState({
    id:1,
    name:'',
    startTime:'',
    createTime:'',
    enjoy:''
  })
  const [teaCardData, setTeaCardData] = useState({
    name:'',
    country:'',
    email:'',
    phone:'',
    address:'',
    birthday:'',
    gender:'',
    createTime:'',
    updateTime:'',
    skills:[],
    description:''
  })
  const [starValue, setStarValue] = useState(0);

    useEffect(()=>{
      if(router.isReady){
      const id:any = router.query.id;
      console.log(router.query.id)
      const teaDetail = async ()=>{
        const data = await getTeacher(id);
        console.log(data.data.data);
        setTeaCardData({
            name:data.data.data.name,
            country:data.data.data.country,
            email:data.data.data.email,
            phone:data.data.data.phone,
            address:data.data.data.address,
            birthday:data.data.data.birthday,
            gender:data.data.data.gender,
            createTime:data.data.data.createdAt,
            updateTime:data.data.data.updatedAt,
            skills:data.data.data.skills,
            description:data.data.data.description
        });
        const tableList = data.data.data.courses?.map((item:any, index:number)=>{
          return{
            id:index,
            name:item.name,
            startTime:item.startTime,
            createTime:item.createTime,
            enjoy:item.enjoy
          }
        })
        setTableData(tableList)
      }
      teaDetail();
    }
    },[router.isReady])

  return(
    <LayoutDB type='teacher'>
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
                  description={teaCardData.name}
                  style={{display:'grid'}}
                  />
               </Col>
               <Col className="gutter-row" span={12}>
                <Meta
                  title="Country"
                  description={teaCardData.country}
                  style={{display:'grid'}}
                  />
               </Col>
               <Col className="gutter-row" span={12}>
                <Meta
                  title="Email"
                  description={teaCardData.email}
                  style={{display:'grid'}}
                  />
               </Col>
               <Col className="gutter-row" span={12}>
                <Meta
                  title="Phone"
                  description={teaCardData.phone}
                  style={{display:'grid'}}
                  />
               </Col>
               </Row>
                <Meta
                  title="Address"
                  description={teaCardData.address}
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
                  <Descriptions.Item label="Birthday" span={2}>{teaCardData.birthday}</Descriptions.Item>
                  <br/>
                  <Descriptions.Item label="Gender" span={2}>{teaCardData.gender}</Descriptions.Item>
                  <br/>
                  <Descriptions.Item label="Create Time" span={2}>{teaCardData.createTime}</Descriptions.Item>
                  <br/>
                  <Descriptions.Item label="Update Time" span={2}>{teaCardData.updateTime}</Descriptions.Item>
                  <br/>
                  <Descriptions.Item contentStyle={titleStyle} span={2}>Interesting</Descriptions.Item>
                  <br/>
                  <Descriptions.Item span={2}>
                      <div>
                      {teaCardData.skills?.map((item:any, index)=>{
                        return(
                        <span key={index}>
                            {item.name ? <span className="ant-rate-text">{item.name}</span> : 'Unknown'}
                            <Rate tooltips={item.name} onChange={setStarValue} value={item.level} />
                            <br/>
                        </span>)
                        })}
                      </div>
                  </Descriptions.Item>
                  <br/>
                  <Descriptions.Item contentStyle={titleStyle} span={2}>Descriptions</Descriptions.Item>
                  <br/>
                  <Descriptions.Item >{teaCardData.description}</Descriptions.Item>
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
