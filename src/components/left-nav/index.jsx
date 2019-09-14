import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";
import { connect } from "react-redux";

import { setHeaderTitle } from "../../redux/actions";
import logo from "../../assets/images/logo.png";
import "./index.less";
import menuList from "../../config/menuConfig";

const { SubMenu } = Menu;

class LeftNav extends Component {
    /*
        根据指定的menu数据组成<MenuItem>和<SunMenu>的数组
        map + 函数递归
     */

    // 判断当前用户是否有item对应的权限
    hasAuth = item => {
        const user =this.props.user;
        const menus = user.role.menus;
        //得到当前用户的所有权限
        //1.如果当前用户是admin
        //2.如果item为公开的
        //3.当前用户有次item权限
        if (
            user.username === "admin" ||
            item.public ||
            menus.indexOf(item.key) !== -1
        ) {
            return true;
        } else if (item.children) {
            //4.如果当前用户的某个字节点的权限，当前item页应该显示
            const cItem = item.children.find(
                cItem => menus.indexOf(cItem.key) !== -1
            );
            return !!cItem;
        }

        return false;
    };

    getMenuNode = menuList => {
        const path = this.props.location.pathname;
        return menuList.map(item => {
            //判断当前用户是否有item对应的权限
            if (this.hasAuth(item)) {
                if (!item.children) {
                    //找到path对应的item，更新headerTitle状态，值是item的title
                    if(item.key===path || path.indexOf(item.key)===0){
                        this.props.setHeaderTitle(item.title)
                    }
                    return (
                        <Menu.Item key={item.key}>
                            <NavLink
                                to={item.key}
                                onClick={() =>
                                    this.props.setHeaderTitle(item.title)
                                }
                            >
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
            } else {
                return false;
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
export default connect(
    state => ({user:state.user}),
    { setHeaderTitle }
)(withRouter(LeftNav));

/*
    2个问题
    1）默认选中对应的MenuItem
    2)有可能需要默认打开<SubMenu>:访问的是某个二级菜单项对应的path
 */
