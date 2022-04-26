import { Table, Space, Button, Popconfirm, message } from 'antd'
import React, {useState} from 'react';
import { useEffect } from 'react';
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
            console.log(data);
            setData(res.data.students);
            setTotalPages(res.data.total);
            })
        }
     ,[]);   
    
    
    function pageChange(page: number){
        getStudentList(page).then(function(res){
            setData(res.data.students);
            setTotalPages(res.data.total);
        })
    }

    function confirmDelete(item: any){
        deleteStudent(item.id);
        getStudentList(currentPage).then(function(res){
            setData(res.data.students);
            setTotalPages(res.data.total);
        });
        message.success('Deleted');
    }

    const columns =[
        {
            title:'No.',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title:'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: any) => <a>{text}</a>
        },
        {
            title:'Area',
            dataIndex: 'area',
            key: 'area',
        },
        {
            title:'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title:'SelectedCurriculum',
            dataIndex: 'selectedCurriculum',
            key: 'selectedCurriculum',
        },
        {
            title:'StudentType',
            dataIndex: 'studentType',
            key: 'student type',
        },
        {
            title:'JoinTime',
            dataIndex: 'joinTime',
            key: 'joinTime',
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
            {pageSize:10,
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
