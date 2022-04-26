import React,{useState} from 'react'
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    BellOutlined,
  } from '@ant-design/icons';

  
  

const { Header} = Layout;

export default function TopHeader() {
    const [collapsed, setCollapsed] = useState(false)

      const toggle = () => {
        setCollapsed(!collapsed);
      }

      const menu = (
        <Menu>
            <Menu.Item>manager</Menu.Item>
            <Menu.Item>student</Menu.Item>
         <Menu.Item danger>a danger item</Menu.Item>
        </Menu>
      );

  return (
      <Header className="header">
          <div className = 'logo' style={{float: 'left', color: "rgb(228, 232, 238)"}} > CMS</div>
          <Button
            type="text"
            onClick={toggle}
            style={{
              marginBottom: 16,
              color: "rgb(228, 232, 238)",
              marginLeft: 25,
            }}
          >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Button>
          <div style={{float: 'right'}}>
           <span><Avatar size={35} icon={<BellOutlined />}/> </span>
           <Dropdown overlay={menu}>
              <Avatar size={35} icon={<UserOutlined />} />
           </Dropdown>
            
            </div>
      </Header>
  )
}
