import { Component } from 'react';
import { Layout, Menu, Icon  } from 'antd';
import Link from 'umi/link';
// Header, Footer, Sider, Content组件在Layout组件模块下
const { Header, Footer, Sider, Content } = Layout;
// 引入子菜单组件
const SubMenu = Menu.SubMenu;
class BasicLayout extends Component {
    render() {
        return (
            <Layout>
                {/*<Sider width={256} style={{ minHeight: '100vh', color: 'white' }}>*/}
                    {/*<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>*/}
                        {/*<Menu.Item key="1">*/}
                            {/*<Icon type="pie-chart" />*/}
                            {/*<span>Helloworld</span>*/}
                        {/*</Menu.Item>*/}
                        {/*<SubMenu*/}
                            {/*key="sub1"*/}
                            {/*title={<span><Icon type="dashboard" /><span>Dashboard</span></span>}*/}
                        {/*>*/}
                            {/*<Menu.Item key="2"><Link to="/dashboard/analysis">分析页</Link></Menu.Item>*/}
                            {/*<Menu.Item key="3"><Link to="/dashboard/monitor">监控页</Link></Menu.Item>*/}
                            {/*<Menu.Item key="4"><Link to="/dashboard/workplace">工作台</Link></Menu.Item>*/}
                        {/*</SubMenu>*/}
                    {/*</Menu>*/}
                {/*</Sider>*/}
                <Header style={{ background: '#fff',padding: 0 }}>
                    <Menu mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                    <Icon type="home" />
                        <span><Link to="/">主页</Link></span>
                    </Menu.Item>
                    <SubMenu
                    key="sub1"
                    title={<span><Icon type="pushpin" /><span>idea</span></span>}
                    >
                    {/*<Menu.Item key="2"><Link to="/demo/drawandguess">你画我猜</Link></Menu.Item>*/}
                    {/*<Menu.Item key="3"><Link to="/dashboard/monitor">复制党之家</Link></Menu.Item>*/}
                    <Menu.Item key="4"><Link to="/demo/colorofimg">调色板</Link></Menu.Item>
                    </SubMenu>
                    </Menu>
                </Header>
                <Layout>

                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>稻花香里说丰年，听取人生经验</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default BasicLayout;