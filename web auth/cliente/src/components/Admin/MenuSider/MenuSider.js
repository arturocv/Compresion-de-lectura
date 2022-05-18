import React from "react";
import { Link, 
         } 
        from "react-router-dom";
import { Layout, Menu } from "antd";
import {UserOutlined as Icon, MenuOutlined as IconMenu, MessageOutlined as IconMessage} from '@ant-design/icons';
import "./MenuSider.scss";

function MenuSider(props) {
  console.log(props);
  const { menuCollapsed, location } = props;
  const { Sider } = Layout;

  return (
    <Sider className="admin-sider" collapsed={menuCollapsed}>
      <Menu
        theme="dark"
        mode="inline"
        // defaultSelectedKeys={[location.pathname]}
        defaultSelectedKeys={["/admin/users"]}
      >
        {/* <Menu.Item key="/admin">
          <Link to="/admin">
            <Icon type="home" />
            <span className="nav-text">Home</span>
          </Link>
        </Menu.Item> */}
        <Menu.Item key="/admin/users">
          <Link to="/admin/users">
            <Icon type="user" />
            <span className="nac-text">Usuarios</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/menu">
          <Link to="/admin/menu">
            <IconMenu type="menu" />
            <span className="nac-text">Menú</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/courses">
          <Link to="/admin/courses">
            <Icon type="book" />
            <span className="nac-text">Cursos</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/blog">
          <Link to="/admin/blog">
            <IconMessage type="message" />
            <span className="nac-text">Blog</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default MenuSider;
