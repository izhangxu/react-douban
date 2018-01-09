import React, { Component } from "react";
import template from "../common/template";
import { Link } from "react-router";
import utils from '../../libs/utils'

class Detail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            movieDetail: {}
        };
    }

    componentWillMount() {
        const {id} = this.props.routeParams;
        this.props.fetchMovies('/v2/movie/subject/' + id);
    }

    shouldComponentUpdate(nextProps) {
        if (!nextProps.state.data[0]) {
            return false;
        }
        return true;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            let data = nextProps.state.data[0];
            if (data) {
                data.newCasts = data.casts.map(k => k.name);
                data.newCasts = data.newCasts.join("、");
                data.newDirectors = data.directors.map(k => k.name);
                data.newDirectors = data.newDirectors.join("、");
                data.newCountries = data.countries.join("、");
            }
            this.setState({
                movieDetail: data
            });
        }
    }

    getImg(url) {
        return utils.handleImageUrl(url);
    }

    render() {
        const { movieDetail } = this.state;
        return (
            <div className="page">
                {movieDetail.id ? (
                    <div className="card">
                        <h1 className="title">{movieDetail.title}</h1>
                        <section className="subject-info">
                            <div className="right">
                                <p>
                                    <img
                                        width="90"
                                        src={this.getImg(movieDetail.images.medium)}
                                        alt={movieDetail.title}
                                        className="cover"
                                    />
                                </p>
                            </div>
                            <div className="left">
                                <p className="rating">
                                    {movieDetail.rating.average ? (
                                        <span>
                                            <em className="rating-stars" />
                                            <strong>
                                                {movieDetail.rating.average}
                                            </strong>
                                        </span>
                                    ) : null}
                                    <span>
                                        {movieDetail.reviews_count}人评价
                                    </span>
                                    {/*<span v-if="collected == true"><i className="collect-on" @click="collectMovie"></i>已收藏</span>*/}
                                    {/*<span v-else="collected == false"><i className="collect" @click="collectMovie"></i>收藏</span>*/}
                                </p>
                                <p className="meta">
                                    上z映时间-{movieDetail.year}，上映地点-{movieDetail.newCountries}
                                    {
                                        movieDetail.newDirectors
                                        ? '，导演-' + movieDetail.newDirectors
                                        : ''
                                    }{
                                        movieDetail.newCasts 
                                        ? '，主演-' + movieDetail.newCasts 
                                        : ''
                                    }
                                </p>
                            </div>
                        </section>
                        {movieDetail.summary ? (
                            <section className="subject-intro">
                                <h2>{movieDetail.title}的剧情简介</h2>
                                <div className="bd">
                                    <p>{movieDetail.summary}</p>
                                </div>
                            </section>
                        ) : null}
                        {movieDetail.genres ? (
                            <section className="subject-genres">
                                <h2>电影类型</h2>
                                <p>
                                    {movieDetail.genres.map((item, index) => (
                                        <span key={index}>{item}</span>
                                    ))}
                                </p>
                            </section>
                        ) : null}
                        {movieDetail.directors.length ? (
                            <section className="subject-casts">
                                <h2>导演</h2>
                                <div className="casts-wrap">
                                    {movieDetail.directors.map((item, index) => {
                                        return (
                                            <div
                                                className="casts-item"
                                                key={index}
                                            >
                                                <Link
                                                    to={"/celebrity/" + item.id}
                                                >
                                                    <img
                                                        src={this.getImg(item.avatars.medium)}
                                                        width="90"
                                                        height="120"
                                                        alt=""
                                                    />
                                                    <p className="name">
                                                        姓名：{item.name}
                                                    </p>
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        ) : null}
                        {movieDetail.casts.length ? (
                            <section className="subject-casts">
                                <h2>主演列表</h2>
                                <div className="casts-wrap">
                                    {movieDetail.casts.map((item, index) => {
                                        return (
                                            <div
                                                className="casts-item"
                                                key={index}
                                            >
                                                <Link
                                                    to={"/celebrity/" + item.id}
                                                >
                                                    <img
                                                        src={this.getImg(item.avatars.medium)}
                                                        width="90"
                                                        height="120"
                                                        alt=""
                                                    />
                                                    <p className="name">
                                                        姓名：{item.name}
                                                    </p>
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        ) : null}
                    </div>
                ) : null}
            </div>
        );
    }
}

export default template({
    name: "detail",
    component: Detail,
    url: ''
    // url: "/v2/movie/subject/" + window.location.pathname.split('/')[2]
});
