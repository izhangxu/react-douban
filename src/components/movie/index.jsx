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
            movieTabIndex: 1,
            cacheMovieTabIndex: 1
        };
        this.getIndex = this.getIndex.bind(this);
    }

    getIndex(index) {
        if (this.state.movieTabIndex && this.state.movieTabIndex === index) {
            return true;
        }
        return false;
    }

    switchMovieTab(index) {
        if (!index) return;
        if (this.state.movieTabIndex !== index) {
            this.setState({
                movieTabIndex: index,
                cacheMovieTabIndex: index
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
                                onClick={e => this.switchMovieTab(index, e)}
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
        this.setState({
            movieSearchClear: val ? true : false
        });
        if (val) {
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
                <MovieSearch />
                <div className="y_section" style={{ marginTop: "46px" }}>
                    <MovieTab />
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
