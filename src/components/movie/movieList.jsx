import React, {Component} from 'react';
import { is, fromJS} from 'immutable';


class MovieItem extends Component {

	shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }

	render() {
		let {title, newDirectors, newCasts, genres, rating, images} = this.props;
		return (
	        <div className="row">
	            <div className="y_img">
	                <img src={images.small} alt="" />
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

	shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }

    render() {
    	return (
    		<div className="y_list">
    		{
    			this.props.list.map((item, index) => {
    				return <MovieItem key={index} {...item} index={index}/>
    			})
    		}
		    </div>
    	)
    }
}