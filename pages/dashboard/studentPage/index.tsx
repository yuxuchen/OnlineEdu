import { Table, Space, Button, Popconfirm, message } from 'antd'
import React, {useState} from 'react';
import { useEffect } from 'react';
import {formatDistanceToNow} from 'date-fns';
import DLayout from '../../LayoutDB';
import {getStudentList, deleteStudent} from '../../../api/studentListApi'

export default function StudentList(){
    
    const [data, setData]= useState([]);
    const [totalPages, setTotalPages] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [visibleOfAddStu, setVisibleOfAddStu] = useState(false);
    const [visibleOfEditStu, setVisibleOfEditStu] = useState(false);
    
     useEffect(() => {
        getStudentList(1).then(function(res){
            console.log(res.data.data.students);
            setData(res.data.data.students);
            setTotalPages(res.data.data.total);
            })
        }
     ,[]);   
    
    
    function pageChange(page: number){
        getStudentList(page).then(function(res){
            setData(res.data.data.students);
            setTotalPages(res.data.data.total);
        })
    }

    function confirmDelete(item: any){
        deleteStudent(item.id);
        getStudentList(currentPage).then(function(res){
            setData(res.data.data.students);
            setTotalPages(res.data.data.total);
        });
        message.success('Deleted');
    }

    const columns =[
        {
            title:'No.',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title:'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: any) => <a>{text}</a>
        },
        {
            title:'Area',
            dataIndex: 'country',
            key: 'area',
        },
        {
            title:'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title:'Selected Curriculum',
            dataIndex: 'courses',
            key:'courses',
            render:(courses:any) => 
            (
            <span>
                {courses.map((course:any) => 
                {return <div key={course.name}>{course.name}</div>})}
            </span>
            )
        },
        {
            title:'Student Type',
            dataIndex: 'type',
            key:'studentType',
            render: (type:any) => <div>{type?.name}</div>
        },
        {
            title:'Join Time',
            dataIndex: 'createdAt',
            key:'createdAt',
            render: (createdAt:any) =>{
                const date = Date.parse(createdAt);
                const res = formatDistanceToNow(date,{addSuffix: true});
                return <div>{res}</div>
            }
        },
        {
            title:'Action',
            key: 'action',
            render: (item: any) =>(
                <Space size = 'middle'> 
                  <Button 
                  type='link'
                  onClick = {() => {
                      setVisibleOfEditStu(true)
                  }}>
                      Edit
                  </Button>

                  <Popconfirm 
                    title='Are you sure to delete?'
                    onConfirm={() => {
                    deleteStudent(item);
                }}
                >
                    <Button type='primary' danger>Delete</Button>
                  </Popconfirm>
                </Space>
            )
        },
    ]
    
    return (
          <DLayout>
           <Table 
        columns={columns} 
        rowKey={'key'}
        dataSource={data}
        pagination={
            {pageSize:12,
            total: totalPages,
            onChange: (page) => {
                pageChange(page);
                setCurrentPage(page);
            }
            }}
        />
       </DLayout>
    )

}
