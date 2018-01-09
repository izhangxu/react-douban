import React, {Component} from 'react';
import { is, fromJS} from 'immutable';
import utils from '../../libs/utils'
import {browserHistory} from 'react-router';

class MovieItem extends Component {

	shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }

    getImg(url) {
    	return utils.handleImageUrl(url);
    }

    handleLink(id, e) {
    	browserHistory.push(`/detail/${id}`);
    }

	render() {
		let {title, newDirectors, newCasts, genres, rating, images, id} = this.props;
		return (
	        <div className="row" onClick={e=>this.handleLink(id, e)}>
	            <div className="y_img">
	                <img src={this.getImg(images.small)} alt="" />
	            </div>
	            <div className="y_txt">
	                <div className="t1">{title}</div>
	                <div className="t2">导演：{newDirectors}</div>
	                <div className="t2">主演：{newCasts}</div>
	                <div className="t3">{genres.join(',')}</div>
	            </div>
	            <div className="y_yue">{rating.average}分</div>
	        </div>
		)
	}
};

export default class MovieList extends Component{

	constructor(props) {
		super(props);
		this.state = {
			list: []
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }

    componentWillMount() {
    	let { list } = this.props;
    	list = list.map(item => item.subject ? item.subject : item);
		list.forEach(item => {
			if (item.casts.length) {
				item.newCasts = item.casts.map(ele => ele.name);
				item.newCasts = item.newCasts.join('、');
			}
			if (item.directors.length) {
				item.newDirectors = item.directors.map(ele => ele.name);
				item.newDirectors = item.newDirectors.join('、');
			}
		});
		this.setState({
			list: list
		})
    }

    render() {
    	return (
    		<div className="y_list">
    		{
    			this.state.list.map((item, index) => {
    				return <MovieItem key={index} {...item} index={index}/>
    			})
    		}
    		{this.props.children}
		    </div>
    	)
    }
}