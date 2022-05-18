import React, {Fragment, useState} from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
    Navigate
} from "react-router-dom";
import { Layout } from 'antd';
import MenuTop from '../components/Admin/MenuTop';
import MenuSider from '../components/Admin/MenuSider';
import Singin from '../pages/Admin/SignIn/Singin';


import './LayoutAdmin.scss';


const LayoutAdmin = (props) => {
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const { Header, Footer, Sider, Content } = Layout;

    const {routes} = props;

    const user = null; 


    if(!user){
        return(               
            <Routes>
                <Route path="/login" element={ <Singin />} />
                <Route path="/" element={<Navigate replace to="/admin/login" />} />
            </Routes>        
        )
    }

    return (
        <Layout>
            <MenuSider menuCollapsed={menuCollapsed} />
            <Layout className="layout-admin">
                <Header className="layout-admin__header">
                    <MenuTop  
                        menuCollapsed={menuCollapsed}
                        setMenuCollapsed={setMenuCollapsed} 
                    />
                </Header>
                <Content className="layout-admin__content" >
                    {/* <LoadRouters routes={routes} /> */}
                </Content>
                <Footer className="layout-admin__footer">Arturo Camargo Valenzuela</Footer>
            </Layout>
        </Layout>
        // <Fragment>
        //     <Layout>
        //         <Header>Header</Header>
        //         <Content>Content</Content>
        //         <Footer>Footer</Footer>
        //     </Layout>
        // </Fragment>        
    )
}

function LoadRouters({routes}){
    console.log(routes[1].path);

    return (
        routes.map((route, index) => {
            <Route 
                key={index}
                path={route.path}
                exac={route.exac}
                element={route.component}
            />

            
        })
    );
}


export default LayoutAdmin;