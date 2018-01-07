import React, { Component } from "react";
import template from "../common/template";
import MovieList from "../movie/movieList";
import Footer from "../footer";
import classNames from "classnames";

class MovieTab extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            movieTabData: [
                {
                    txt: "综合"
                },
                {
                    txt: "正在热映"
                },
                {
                    txt: "即将上映"
                },
                {
                    txt: "Top250"
                },
                {
                    txt: "北美票房榜"
                }
            ],
            movieTabIndex: 1
        };
        this.getIndex = this.getIndex.bind(this);
    }

    getIndex(index) {
        if (this.state.movieTabIndex === index) {
            return true;
        }
        return false;
    }

    switchTab(index) {
        if (index && this.state.movieTabIndex !== index) {
            this.props.switchMovieTab(index);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            let index = nextProps.movieTab.movieTabIndex;
            this.setState({
                movieTabIndex: index
            });
        }
    }

    render() {
        const len = this.state.movieTabData.length;
        const w = 100 / len + "%";
        return (
            <div className="txt-slide-wrap">
                <ul>
                    {this.state.movieTabData.map((item, index) => {
                        const liClass = classNames({
                            on: this.getIndex(index)
                        });
                        return (
                            <li
                                key={index}
                                className={liClass}
                                style={{ width: w }}
                                onClick={e => this.switchTab(index, e)}
                            >
                                {item.txt}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

class MovieSearch extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            movieSearchClear: false
        };
    }

    searchMovies(e) {
        const val = e.target.value;
        if (val) {
            this.setState({
                movieSearchClear: true
            });
            this.props.cacheMovieTab();
            this.props.switchMovieTab(0);
        } else {
            this.setState({
                movieSearchClear: false
            });
            this.props.recoverMovieTab();
        }
    }

    render() {
        let inputClass = classNames("y_inp", {
            on: this.state.movieSearchClear
        });
        return (
            <div className="y_shBox">
                <div className="y_search">
                    <input
                        className={inputClass}
                        onChange={e => this.searchMovies(e)}
                    />
                    <button className="y_subtn">清 空</button>
                </div>
            </div>
        );
    }
}

class Movie extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            movieListData: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            let data = nextProps.state.data;
            this.setState({
                movieListData: data
            });
        }
    }

    render() {
        return (
            <div className="wrap">
                <MovieSearch {...this.props} />
                <div className="y_section" style={{ marginTop: "46px" }}>
                    <MovieTab {...this.props} />
                    {this.state.movieListData.length ? (
                        <MovieList list={this.state.movieListData} />
                    ) : null}
                </div>
                <Footer />
            </div>
        );
    }
}

export default template({
    name: "movie",
    component: Movie,
    url: "/v2/movie/in_theaters",
    params: {
        count: 10
    }
});
