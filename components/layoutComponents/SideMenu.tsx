import React, {useState} from 'react'
import Link from 'next/link';
import { Layout, Menu } from 'antd';
import { 
    DashboardOutlined,
    UserOutlined, 
    TeamOutlined, 
    DeploymentUnitOutlined, 
    ReadOutlined, 
    MessageOutlined, 
    HomeOutlined  
  } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(false)
      const {SubMenu} = Menu

      const toggle = () => {
        setCollapsed(true);
      }
  return (
    <Sider width={200} className="site-layout-background" trigger={null} collapsible collapsed={collapsed} >
        <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}>
          <Menu.Item key='1' icon={<DashboardOutlined />}>
          <Link href={{pathname:"../dashboard/CMSPage"}}>Overview</Link>
          </Menu.Item>
        <SubMenu key='/dashboard/studentPage' icon={<UserOutlined />} title='Student'>
            <Menu.Item key='2' icon={<TeamOutlined />}>
            <Link href={{pathname:"/dashboard/studentPage"}}>Student List</Link>
            </Menu.Item>
        </SubMenu>
        <SubMenu key='/dashboard/teacherPage' icon={<DeploymentUnitOutlined />} title='Teacher'>
          <Menu.Item key='3' icon={<TeamOutlined />}>
          <Link href={{pathname:"/dashboard/teacherPage"}}>Teacher List</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key='/dashboard/coursePage' icon={<ReadOutlined />} title='Course'>
          <Menu.Item key='4' icon={<DeploymentUnitOutlined />}>
            <Link href={{pathname:"/dashboard/coursePage"}}>All Course</Link>
          </Menu.Item>
          <Menu.Item key='5' icon={<DeploymentUnitOutlined />}>
            <Link href={{pathname:"/dashboard/coursePage/AddCourses"}}>Add Course</Link>
          </Menu.Item>
          <Menu.Item key='6' icon={<DeploymentUnitOutlined />}>
            <Link href={{pathname:"/dashboard/coursePage/EditCourses"}}>edit Course</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key='/dashboard/message' icon={<DashboardOutlined />}>
          Message
        </Menu.Item>
        </Menu>
      </Sider>
  )
}
