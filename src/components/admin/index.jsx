import React, { Component } from 'react';
import template from "../common/template";
import Footer from '../footer'

class Admin extends Component {
    render() {
        return (
            <div className="wrap">
                <div className="ty_header">
                    <div className="ty_head">
                        <img className="ty_img" src="../../assets/logo.png" alt=""/>
                    </div>
                    <div className="ty_bac" />
                </div>
                <div className="ty_main_list">
                    <div className="ty_list">
                        <div className="ty_list_tit clearfix">
                            <div className="tl">123</div>
                            <div className="tr car">已收藏</div>
                        </div>
                        <div className="ty_list_de clearfix">
                            <div className="tl">123</div>
                            <div className="tr y_i ty_icon_right" />
                        </div>
                    </div>
                </div>
                <div className="ty_noOrder">
                    <div className="ty_noOrder_text">没有收藏记录</div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default template({
    name: 'admin',
    component: Admin
});
