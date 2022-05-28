import React, {useState } from 'react'
import DLayout from '../../LayoutDB'
import { Card, Avatar, Button, List, Skeleton, Divider, Image, Row, Col } from 'antd';
import { getCourseList } from '../../../api/courseListApi';
import { useEffect } from 'react';
import Link from 'next/link';
import { HeartTwoTone } from '@ant-design/icons';


interface DataType {
    name?: '';
    star?: 0;
    createdAt?: string;
    duration?:'';
    teacherName?:'';
    maxStudents?:'';
    loading: boolean;
  }

const count=16;

export default function AllCourses() {
    const [courseData, setCourseData] = useState<DataType[]>([]);
    const [list, setList] = useState<DataType[]>([]);
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    
    useEffect(
        ()=>{
            getCourseList(1,count).then(
                function(res){
                    setInitLoading(false);
                    setCourseData(res.data.data.courses);
                    setList(res.data.data.courses);
                }
            )
        },[]
        )

    const onLoadMore = () => {
        setLoading(true);
        setList(
            courseData.concat([...new Array(count)].map(() => ({ loading: true,}))),
        );
        getCourseList(1,count).then(
            function(res){
                const newData = courseData.concat(res.data.data.courses)
                setCourseData(newData);
                setList(newData);
                setLoading(false);
                window.dispatchEvent(new Event('resize'));
            }
        )
    }

    const loadMore = 
    !initLoading && !loading ? (
        <div
        style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
            <Button onClick={onLoadMore}>loading more</Button>
        </div>
    ) : null

  return (
      <DLayout type='ACourse'>
          <List
          grid={{ gutter:16, column:4}}
          dataSource={list}
          loading = {initLoading}
          loadMore = {loadMore}
          split={true}
          renderItem={item => (
              <List.Item>
                  <Skeleton avatar title={false} loading={initLoading}>
                  <Card
                style={{ width: 400 }}
                bordered={true}
                cover={
                    <Image 
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    alt="Picture of the author"
                    width={400}
                    height={400}/>
                  }
            >
                <Row >
                  <Col span={12} style={{fontWeight:'bold'}}>
                      <p>{item.name}</p>
                  </Col>
                </Row>
                <Row >
                  <Col span={12}>
                      <p>{item.createdAt}</p>
                  </Col>
                  <Col span={12} style={{textAlign:"right" }}>
                      <p><HeartTwoTone twoToneColor="#eb2f96"/> {item.star}</p>
                  </Col>
                </Row>
                <Row >
                  <Col span={12}>
                      <p>Duration:</p>
                  </Col>
                  <Col span={12} style={{textAlign:"right" }}>
                      <p>{item.duration} years</p>
                  </Col>
                </Row>
                <Row >
                  <Col span={12}>
                      <p>Teacher:</p>
                  </Col>
                  <Col span={12} style={{textAlign:"right" }}>
                      <p>{item.teacherName}</p>
                  </Col>
                </Row>
                <Row >
                  <Col span={12}>
                      <p><Avatar src="https://joeschmoe.io/api/v1/random" />Student Limit:</p>
                  </Col>
                  <Col span={12} style={{textAlign:"right" }}>
                      <p>{item.maxStudents}</p>
                  </Col>
                </Row>
                <Link href='/dashboard/coursePage/[id]' as={`/dashboard/coursePage/${item.id}`} >
                  <Button type='primary' style={{textAlign:'center'}}>Read More</Button>
                </Link>
                    </Card>
                    </Skeleton>
              </List.Item>
          )}
          >
          </List>
    </DLayout>
    
  )
}
