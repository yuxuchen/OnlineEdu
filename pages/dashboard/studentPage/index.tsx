import { Table, Space, Button, Popconfirm, message, Modal, Form, Select, Input } from 'antd'
import React, {useState} from 'react';
import { useEffect } from 'react';
import {formatDistanceToNow, fromUnixTime} from 'date-fns';
import DLayout from '../../LayoutDB';
import {getStudentList, deleteStudent, addStudent, editStudent} from '../../../api/studentListApi'
import Link from 'next/link';

export default function StudentList(){
    
    const [data, setData]= useState([]);
    const [totalPages, setTotalPages] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [form] = Form.useForm();
    const {Search} = Input;

    
     useEffect(() => {
        getStudentList(1).then(function(res){
            console.log(res.data.data.students);
            setData(res.data.data.students);
            setTotalPages(res.data.data.total);
            })
        }
     ,[]);   
    const onSearch = value => console.log(value);
    const showAddModal = () =>{
        setAddModalVisible(true);
    }
    const handleAddOk = ()=>{
        setAddModalVisible(false);
        form.validateFields().then((values:any)=>{
            addStudentItem(values)
            console.log(values)
        }).catch((err)=>{
            console.log(err);
        })
    }
    const handleAddCancel = ()=>{
        setAddModalVisible(false);

    }
    const handleEditOk = ()=>{
        setEditModalVisible(false);
        form.validateFields().then((values:any)=>{
            editStudentItem(values)
            console.log(values)
        }).catch((err)=>{
            console.log(err);
        })
    }
    const handleEditCancel = ()=>{
        setEditModalVisible(false);
    }

    const {Option} = Select;

    const onFinish = async (values: any) => {
        console.log('Success:', values.name);
      };
    
    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };

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
    
    function editStudentItem(item: any){
        console.log(item.name, item.country, item.email, item.studentType)
        editStudent(item.name, item.country, item.email, item.studentType);
        getStudentList(currentPage).then(function(res){
            setData(res.data.data.students);
        });
        message.success('edit');
    }
    function addStudentItem(item: any){
        console.log(item.name, item.country, item.email, item.studentType)
        addStudent(item.name, item.country, item.email, item.studentType);
        getStudentList(currentPage).then(function(res){
            setData(res.data.data.students);
            setTotalPages(res.data.data.total);
        });
        message.success('Added');
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
            render: (text: any) => 
            <Link 
            href={`/dashboard/studentPage/${text}`}>
                <a>{text}</a>
            </Link>
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
                      setEditModalVisible(true)
                  }}>
                      Edit
                  </Button>
                  
                  <Popconfirm 
                    title='Are you sure to delete?'
                    onConfirm={() => {
                    confirmDelete(item);
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
            <Button type='primary' onClick={showAddModal}>
                + Add
            </Button>
            <Space direction="vertical" style={{ float:'right' }}>
              <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />
            </Space>
            <Modal forceRender
                title='Add student'
                getContainer={false} 
                visible={addModalVisible} 
                onOk={handleAddOk} 
                okText='Add'
                onCancel={handleAddCancel}
            >
            <Form {...layout} 
                form = {form} 
                name = 'control-hooks' 
                onFinish={onFinish}
        >
            <Form.Item name='name' label='Name' rules = {[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name='email' label='Email' rules = {[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name='country' label='Area' rules = {[{required: true}]}>
                <Select>
                    <Option value="China">China</Option>
                    <Option value='Australia'>Australia</Option>
                    <Option value='America'>America</Option>
                </Select>
            </Form.Item>
            <Form.Item name='studentType' label='Student Type' rules = {[{required: true}]}>
                <Select>
                    <Option value='1'>developer</Option>
                    <Option value='2'>tester</Option>
                </Select>
            </Form.Item>
        </Form>
            </Modal>
            <Modal title='Edit student' 
                  visible={editModalVisible} 
                  onCancel={handleEditCancel}
                  onOk={handleEditOk} 
                  okText='Update'
                  mask={false}
                  >
                <Form {...layout} 
            form = {form} 
            name = 'control-hooks' 
            onFinish={onFinish}
        >
            <Form.Item name='name' label='Name' rules = {[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name='email' label='Email' rules = {[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name='country' label='Area' rules = {[{required: true}]}>
                <Select>
                    <Option value="China">China</Option>
                    <Option value='Australia'>Australia</Option>
                    <Option value='America'>America</Option>
                </Select>
            </Form.Item>
            <Form.Item name='studentType' label='Student Type' rules = {[{required: true}]}>
                <Select>
                    <Option value='1'>developer</Option>
                    <Option value='2'>tester</Option>
                </Select>
            </Form.Item>
        </Form>
            </Modal>
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
