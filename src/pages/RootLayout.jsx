import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Layout } from "antd";
import HeaderComponent from "../components/header/HeaderComponent";
import MenuComponent from "../components/navbar/MenuComponent";
const { Header, Content, Footer, Sider } = Layout;
const siderStyle = {
  textAlign: "center",
  lineHeight: 120 + "px",
  color: "#fff",
  height: "100vh",
  position: "sticky",
  left: 0,
  top: 0,
  bottom: 0,
  backgroundColor: "var(--color-surface-100)",
};
const headerStyle = {
  position: "sticky",
  top: "0",
  zIndex: "1",
  width: "100%",
  padding: "0em",
};
const footerStyle = {
  textAlign: "center",
  backgroundColor: "var(--color-surface-100)",
  color: "#fff",
};
const RootLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={siderStyle}
      >
        <MenuComponent />
      </Sider>
      <Layout
        style={{
          background: "var(--color-surface-200)",
        }}
      >
        <Header style={headerStyle}>
          <HeaderComponent />
        </Header>
        <Content
          style={{
            marginTop: "0em",
            minHeight: "100vh",
          }}
        >
          <Outlet />
        </Content>
        <Footer style={footerStyle}>
          © Copyright{new Date().getFullYear()} MAKEL - (4.64) -
          www.makel.com.tr
        </Footer>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
