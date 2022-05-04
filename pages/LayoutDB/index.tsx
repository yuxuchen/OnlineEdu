import React, {ReactNode} from 'react'
import Link from 'next/link';
import SideMenu from '../../components/layoutComponents/SideMenu'
import TopHeader from '../../components/layoutComponents/TopHeader';
import { Layout, Breadcrumb, AutoComplete } from 'antd';
import StudentList from '../dashboard/studentPage';


const { Content} = Layout;


export default function DLayout({ children }: { children?: ReactNode }){
  
  return( 
    
  <Layout>
      <TopHeader/>
     <Layout>
        <SideMenu/>
        <Layout style = {{ padding: '0 24px 24px'}}>
         <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
            <Breadcrumb.Item>Student</Breadcrumb.Item>
            <Breadcrumb.Item>Student List</Breadcrumb.Item>
         </Breadcrumb>
          <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            overflow:"auto",
          }}>
              <main>{children}</main>
          </Content>
      </Layout>
    </Layout>
  </Layout>
  
  )

}
