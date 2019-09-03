import React, { Component } from "react";
import { Modal } from "antd";
import { withRouter } from "react-router-dom";

import LinkButton from '../link-button';
import { reqWeather } from "../../api";
import { formateDate } from "../../utils/dateUtils";
import menuList from "../../config/menuConfig";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import "./index.less";

class Header extends Component {
    state = {
        currentTime: formateDate(Date.now()),
        dayPictureUrl: "", //图片url
        weather: "" //天气文本
    };

    /*
        退出登陆 
    */
    logout = () => {
        Modal.confirm({
            title: "确认退出嘛",
            onOk: () => {
                console.log("OK");
                //确定后,删除用户信息
                //local中的
                storageUtils.removeUser();
                //内存中的
                memoryUtils.user = {};
                //跳转到登陆界面
                this.props.history.replace("/login");
            },
            onCancel() {
                console.log("Cancel");
            }
        });
    };

    /*
        根据当前请求的path得到相应的title
    */
    getTitle = () => {
        const path = this.props.location.pathname;
        let title = "";
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title;
            } else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key === path);
                if (cItem) {
                    title = cItem.title;
                }
            }
        });
        return title;
    };

    /*
        获取天气信息
     */
    getWeather = async () => {
        const {dayPictureUrl,weather} = await reqWeather("杭州");
        //更新状态
        this.setState({
            dayPictureUrl,
            weather
        })
    };

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState({
                currentTime: formateDate(Date.now())
            });
        }, 1000);
        //发jsonp请求获取天气信息
        this.getWeather()

    }
    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        const { currentTime,dayPictureUrl,weather } = this.state;
        const user = memoryUtils.user;
        //得到当前显示的title
        const title = this.getTitle();
        return (
            <div className="header">
                <div className="header-top">
                    欢迎 ,&nbsp;{user.username}&nbsp;
                    {//组件的标签体作为标签的children属性传入
                        <LinkButton onClick={this.logout}>退出</LinkButton>
                    } 
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img
                            src={dayPictureUrl}
                            alt="weather"
                        />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Header);
