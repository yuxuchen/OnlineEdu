import React, {ReactNode, useState} from 'react'
import Link from 'next/link';
import SideMenu from '../../components/layoutComponents/SideMenu'
import TopHeader from '../../components/layoutComponents/TopHeader';
import { Layout, Breadcrumb } from 'antd';


const { Content} = Layout;

export default function DLayout(props:any){
  let {children, type} = props
  const routesStu = [
    {
      path: '/dashboard/CMSPage',
      breadcrumbName: 'CMS MANAGER SYSTEM',
    },
    {
      path: '',
      breadcrumbName: 'Student',
    },
    {
      path: '/dashboard/studentPage',
      breadcrumbName: 'Student List',
    },
    {
      path: '',
      breadcrumbName: 'Detail',
    },
  ];
  const routesTea = [
    {
      path: '/dashboard/CMSPage',
      breadcrumbName: 'CMS MANAGER SYSTEM',
    },
    
    {
      path: '',
      breadcrumbName: 'Teacher',
    },
    {
      path: '/dashboard/teacherPage',
      breadcrumbName: 'Teacher List',
    },
    {
      path: '',
      breadcrumbName: 'Detail',
    },
  ];
  
  function itemRender(route:any, params:any, routes:any, paths:any) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link href={route.path}>{route.breadcrumbName}</Link>
    );
  }
  
  let navigate = (type === 'student' ? 
   
    <Breadcrumb style={{ margin: "16px 0" }} itemRender={itemRender} routes={routesStu} />
    : 
   <Breadcrumb style={{ margin: "16px 0" }} itemRender={itemRender} routes={routesTea} />)
   
  return( 
  <Layout>
      <TopHeader/>
     <Layout>
        <SideMenu/>
        <Layout style = {{ padding: '0 24px 24px'}}>
        {navigate}
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
