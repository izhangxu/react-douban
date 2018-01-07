import React, { Component } from "react";
import { connect } from "react-redux";
import { is, fromJS } from "immutable";
import * as action from "../../redux/action/index";

export default mySeting => {
    let seting = {
        name: "", //应用唯一id表示
        url: "", //请求地址
        params: {}, //发送给服务器的数据
        component: <div /> //数据回调给的组件
    };

    for (let key in mySeting) {
        seting[key] = mySeting[key];
    }

    class Index extends Component {
        static defaultProps = { seting };

        componentDidMount() {
            //获取数据
            if (this.props.seting.url) {
                // this.props.fetchMovies(
                //     this.props.seting.url,
                //     this.props.seting.params
                // );
            }
        }

        shouldComponentUpdate(nextProps, nextState) {
            if (nextProps.state.get("isFetching")) {
                return false;
            }
            return (
                !is(fromJS(this.props), fromJS(nextProps)) ||
                !is(fromJS(this.state), fromJS(nextState))
            );
        }

        render() {
            return (
                <this.props.seting.component
                    {...this.props}
                    state={this.props.state.toJS()}
                />
            );
        }
    }

    //mapStateToProps and mapDispatchToProps
    return connect(state => {
        return {
            state: state.fetchData,
        };
    }, action)(Index); //连接redux
};
