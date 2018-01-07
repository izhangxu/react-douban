import React, { Component } from "react";
import { Link } from "react-router";
import classNames from "classnames";

export default class tabBar extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            footerData: [
                {
                    txt: "首页",
                    name: "index",
                    className: "footer_icon_01"
                },
                {
                    txt: "电影",
                    name: "movie",
                    className: "footer_icon_02"
                },
                {
                    txt: "我的",
                    name: "admin",
                    className: "footer_icon_03"
                }
            ]
        };
        this.getPath = this.getPath.bind(this);
    }

    getPath(p) {
        let sPath = window.location.pathname;
        if (sPath === '/') sPath += 'index';
        return sPath.split('/').find(ele => ele === p);
    }

    render() {
        return (
            <div className="y_toolbar">
                {this.state.footerData.map((item, index) => {
                    const iClass = classNames(item.className, { on: this.getPath(item.name) });
                    return (
                        <div className="y_row" key={index}>
                            <Link to={"/" + item.name}>
                                <i className={iClass} />
                                <div className="txt"> {item.txt} </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        );
    }
}
