import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";

import logo from "../../assets/images/logo.png";
import "./index.less";
import menuList from "../../config/menuConfig";

const { SubMenu } = Menu;

class LeftNav extends Component {
    /*
        根据指定的menu数据组成<MenuItem>和<SunMenu>的数组
        map + 函数递归
     */
    getMenuNode = menuList => {
        const path = this.props.location.pathname;
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <NavLink to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </NavLink>
                    </Menu.Item>
                );
            } else {
                /*
                    判断当前Item的key是否是我需要的openkey
                    查找item的所有children中Item中的key，看是否有一个根请求的path匹配
                 */
                const cItem = item.children.find(
                    cItem => path.indexOf(cItem.key) === 0
                );
                if (cItem) {
                    this.openkey = item.key;
                }
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNode(item.children)}
                    </SubMenu>
                );
            }
        });
    };

    /*
        第一卒render()之后执行一次
        执行异步任务:发ajax请求，启动定时器

     */
    // componentDidMount(){

    // }
    /*
        第一次render前执行一次
        为第一次render()做一些同步的准备工作
     */
    componentWillMount() {
        this.menuNodes = this.getMenuNode(menuList);
    }

    render() {
        // 得到当前请求路径, 作为选中菜单项的key
        let selectKey = this.props.location.pathname; // /product/xxx
        if (selectKey.indexOf("/product") === 0) {
            selectKey = "/product";
        }
        return (
            <div className="left-nav">
                <NavLink className="left-nav-link" to="/home">
                    <img src={logo} alt="" />
                    <h1>后台管理</h1>
                </NavLink>
                {/*
                defaultSelectdKeys:总是根据第一次指定的key进行显示
                selectedkeys:总是根据最新的key进行显示
                 */}
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[selectKey]}
                    defaultOpenKeys={[this.openkey]}
                >
                    {this.menuNodes}
                    {/*<Menu.Item key="/home">
                        <NavLink to="/home">
                            <Icon type="home" />
                            <span>首页</span>
                        </NavLink>
                    </Menu.Item>
                    <SubMenu
                        key="products"
                        title={
                            <span>
                                <Icon type="mail" />
                                <span>商品</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/category">
                            <NavLink to="/category">
                                <Icon type="folder-open" />
                                <span>品类管理</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/product">
                            <NavLink to="/product">
                                <Icon type="home" />
                                <span>商品管理</span>
                            </NavLink>
                        </Menu.Item>
                    </SubMenu> */}
                </Menu>
            </div>
        );
    }
}

/*
向外暴露 使用高阶组件withRouter()来包装非路由组件
高阶组件LeftNav传递3个特别属性：history/location/match
结果：LeftNav可以操作路由相关的语法
*/
export default withRouter(LeftNav);

/*
    2个问题
    1）默认选中对应的MenuItem
    2)有可能需要默认打开<SubMenu>:访问的是某个二级菜单项对应的path
 */
