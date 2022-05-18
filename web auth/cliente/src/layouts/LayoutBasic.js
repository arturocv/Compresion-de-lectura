import React, {Fragment} from 'react';
import { Layout } from 'antd';

const LayoutBasic = () => {
    const { Header, Footer, Sider, Content } = Layout;
    
    return (
        <Fragment>
            <Layout>
                <Header>Header</Header>
                <Content>Content</Content>
                <Footer>Footer</Footer>
            </Layout>
        </Fragment>
    )
}

export default LayoutBasic