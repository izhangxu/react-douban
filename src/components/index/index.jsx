import React, { Component } from "react";
import template from "../common/template";
import MovieList from '../movie/movieList'
import Footer from '../footer'

class Index extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            moviesData: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            const data = nextProps.state.data;
            this.setState({
                moviesData: data
            })
        }
    }

    render() {
        return (
            <div className="wrap y_bg01">
                <div className="y_txtBox">
                    <div className="t1">电影免费查 新片随时议</div>
                </div>
                <div className="y_inpuBox">
                    <div className="y_searchBox">
                        <div className="y_search">
                            <input className="y_inp" />
                            <input type="button" value="查   找" className="y_btn" />
                        </div>
                    </div>
                </div>
                <div className="y_section">
                    <div className="y_tit">即将上映</div>
                    <div style={{margin: '0 10px'}}>
                        {
                            this.state.moviesData.length ? <MovieList list={this.state.moviesData}/> : null
                        }
                        <div style={{height: "47px"}} />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default template({
    name: 'index',
    component: Index,
    url: '/v2/movie/coming_soon',
    params: {
        count: 10
    }
});
