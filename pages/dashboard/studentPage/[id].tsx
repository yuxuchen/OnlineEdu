import React from 'react'
import {Card, Row, Col, Avatar, Divider, Space } from 'antd';
import LayoutDB from '../../LayoutDB'
import { BoldOutlined, UserOutlined } from '@ant-design/icons';
import { Descriptions } from 'antd'

const {Meta, Grid} = Card;
const gridStyle = {
  width: '25%',
  textAlign: 'center',
};
const avatarStyle ={
  margin:'4px', 
  textAlign:"center",
}
export default function Detail() {
  return(
    <LayoutDB>
        <Row align='top'>
          <Space align="start" size={30}>
          <Card  style={{ width: 500, textAlign:"center"}}>
              <Meta
                avatar={
                <Avatar size={50} 
                icon={<UserOutlined />} 
                style={{margin:'0 0 0 15px'}}
                />
              } 
                style={{margin:'4px', padding:'0 45%'}}
              />
            <Grid>
                <Meta
                  title="Age"
                  description="23"/>
              </Grid>
            </Card>

            <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 1100 }}>
              <Grid >
                <Meta
                  title="Age"
                  description="23"
                />
              </Grid>
            
              <Meta
                title="Age"
                description="23"
              />
            </Card>
          </Space>
          </Row>
      </LayoutDB>
  )
  
}
