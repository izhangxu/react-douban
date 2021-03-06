import React, { Component } from "react";
import template from "../common/template";
import ScrollView from "../common/scrollView";
import MovieList from "../movie/movieList";
import Footer from "../footer";
import classNames from "classnames";

// 电影类目切换
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
            this.props.scrollTo(0, 0);
            this.props.fetchMovies("/v2/movie/in_theaters", {
                count: 10
            });
        }
        this.props.toggleScrollStatus(index === 4 ? true : false);
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
// 电影搜索
class MovieSearch extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            movieSearchClear: false,
            movieSearchValue: ''
        };
    }

    searchMovies(e) {
        const val = e.target.value;
        if (val) {
            this.setState({
                movieSearchClear: true,
                movieSearchValue: val
            });
            this.props.fetchMovies("/v2/movie/search", {
                count: 10,
                q: val
            });
            this.props.cacheMovieTab();
            this.props.switchMovieTab(0);
        } else {
            this.setState({
                movieSearchClear: false,
                movieSearchValue: ''
            });
            this.props.recoverMovieTab();
        }
    }

    clearMovies(e) {
        this.props.fetchMovies("/v2/movie/in_theaters", {
            count: 10
        });
        this.setState({
            movieSearchClear: false,
            movieSearchValue: ''
        });
        this.props.recoverMovieTab();
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
                        value={this.state.movieSearchValue}
                    />
                    <button
                        className="y_subtn"
                        onClick={e => this.clearMovies(e)}
                    >
                        清 空
                    </button>
                </div>
            </div>
        );
    }
}
// 电影
class Movie extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 0,
            movieListData: [],
            movieListDataLoading: false,
            movieTabLoading: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            let { data, isFetching } = nextProps.state;
            this.setState({
                movieListData: data,
                movieListDataLoading: isFetching
            });
        }
    }

    pullupCallback() {
        if (!this.props.scrollStatus.disabled) {
            this.setState({
                page: this.state.page + 1
            });
            this.props.fetchMovies("/v2/movie/in_theaters", {
                count: 10,
                start: this.state.page * 10
            });
        }
    }

    scrollTo(x, y) {
        this.scrollViewEle.scrollTo(x, y);
    }

    render() {
        const { disabled } = this.props.scrollStatus;

        return (
            <div className="wrap">
                <MovieSearch {...this.props} />
                <div className="y_section" style={{ marginTop: "46px" }}>
                    <MovieTab
                        {...this.props}
                        scrollTo={this.scrollTo.bind(this)}
                    />
                    {this.state.movieListData.length ? (
                        <ScrollView
                            data="this.state.movieListData"
                            pullup={this.pullupCallback.bind(this)}
                            ref={ele => (this.scrollViewEle = ele)}
                        >
                            <MovieList list={this.state.movieListData}>
                                {this.state.movieListDataLoading &&
                                !disabled ? (
                                    <div className="load">加载中...</div>
                                ) : null}
                            </MovieList>
                        </ScrollView>
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
