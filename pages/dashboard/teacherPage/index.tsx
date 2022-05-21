import { Table, Space, Button, Popconfirm, message, Modal, Form, Select, Input, Search } from 'antd'
import React, {useState} from 'react';
import { useEffect } from 'react';
import {formatDistanceToNow, fromUnixTime} from 'date-fns';
import DLayout from '../../LayoutDB';
import {getTeacherList, deleteTeacher, addTeacher, editTeacher} from '../../../api/teacherListApi'

export default function TeacherList(){
    
    const [data, setData]= useState([]);
    const [totalPages, setTotalPages] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [form] = Form.useForm();
    const {Search} = Input;
    const onSearch = value => console.log(value);
    
     useEffect(() => {
        getTeacherList(1).then(function(res){
            console.log(res.data.data.teachers);
            setData(res.data.data.teachers);
            setTotalPages(res.data.data.total);
            })
        }
     ,[]);   
    
    const showAddModal = () =>{
        setAddModalVisible(true);
    }
    const handleAddOk = ()=>{
        setAddModalVisible(false);
        form.validateFields().then((values:any)=>{
            addTeacherItem(values)
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
            editTeacherItem(values)
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
        getTeacherList(page).then(function(res){
            setData(res.data.data.teachers);
            setTotalPages(res.data.data.total);
        })
    }

    function confirmDelete(item: any){
        deleteTeacher(item.id);
        getTeacherList(currentPage).then(function(res){
            setData(res.data.data.teachers);
            setTotalPages(res.data.data.total);
        });
        message.success('Deleted');
    }
    
    function editTeacherItem(item: any){
        console.log(item.name, item.country, item.phone, item.skills, item.email)
        editTeacher(item.name, item.country, item.phone, item.skills, item.email);
        getTeacherList(currentPage).then(function(res){
            setData(res.data.data.teachers);
        });
        message.success('edit');
    }
    function addTeacherItem(item: any){
        console.log(item.name, item.country, item.phone, item.skills, item.email)
        addTeacher(item.name, item.country, item.phone, item.skills, item.email);
        getTeacherList(currentPage).then(function(res){
            setData(res.data.data.teachers);
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
            title:'Skill',
            dataIndex: 'skills',
            key:'skills',
            render:(skills:any) => 
            (
            <span>
                {skills.map((skill:any) => 
                {return <div key={skill.name}>{skill.name}</div>})}
            </span>
            )
        },
        {
            title:'Course Amount',
            dataIndex: 'courseAmount',
            key:'courseAmount',
        },
        {
            title:'Phone',
            dataIndex: 'phone',
            key:'phone',
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
          <DLayout type='teacher'>
            <Button type='primary' onClick={showAddModal}>
                + Add
            </Button>
            <Space direction="vertical" style={{ float:'right' }}>
              <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />
            </Space>
            <Modal forceRender
            title='Add teacher'
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
            <Form.Item name='studentType' label='Teacher Type' rules = {[{required: true}]}>
                <Select>
                    <Option value='1'>developer</Option>
                    <Option value='2'>tester</Option>
                </Select>
            </Form.Item>
        </Form>
            </Modal>
            <Modal title='Edit teacher' 
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
            <Form.Item name='country' label='Country' rules = {[{required: true}]}>
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
