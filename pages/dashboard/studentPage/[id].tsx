import React from 'react'
import {Card, Row, Col, Avatar, Divider } from 'antd';
import LayoutDB from '../../LayoutDB'
import { UserOutlined } from '@ant-design/icons';

export default function Detail() {
  return(
    <LayoutDB>
        <Row align='top'>
            <Col span={18} push={8}>
            <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 1100 }}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
            </Col>
            <Col span={6} pull={18}>
            <Card  style={{ width: 500 }}>
            <Avatar size="large" icon={<UserOutlined />} />
            <Divider/>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
            </Col>
          </Row>
      </LayoutDB>
  )
  
}
