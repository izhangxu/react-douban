import fetch from 'fetch-jsonp';
import utils from '../../libs/utils'

export const GET_MOVIES_REQUEST = 'GET_MOVIES_REQUEST'
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS'
export const GET_MOVIES_FAILURE = 'GET_MOVIES_FAILURE'
export const SWITCH_MOVIE_TAB = 'SWITCH_MOVIE_TAB'
export const CACHE_MOVIE_TAB = 'CACHE_MOVIE_TAB'
export const RECOVER_MOVIE_TAB = 'RECOVER_MOVIE_TAB'
export const TOGGLE_SCROLL_STATUS = 'TOGGLE_SCROLL_STATUS'


// 1.获取数据分为2个部分
// 获取电影列表
// 获取单个电影或者人物
// 2.action 之后再写 reducer
// 
// 3.先完成首页及列表页渲染
// 再完成路由渲染

const getMoviesRequest = path => {
	return {
		type: GET_MOVIES_REQUEST,
		path
	}
};

const getMoviesSuccess = (path, json, start) => {
	return {
		type: GET_MOVIES_SUCCESS,
		path,
		json,
		start
	}
};

export const fetchMovies = (path, params) => {
	const url = 'http://api.douban.com' + path + utils.paramType(params);
	const start = params.start;
	return dispatch => {
		dispatch(getMoviesRequest(path));
		return fetch(url, {
				'mode': 'cors',
				'Content-Type': 'application/json'
			})
			.then(response => {
				if (response.ok) {
					response.json().then(data => {
						if (data.total > 0 || data.date) {
							data = data.subjects;
							data = data.map(item => item.subject ? item.subject : item);
							data.forEach(item => {
								if (item.casts.length) {
									item.newCasts = item.casts.map(ele => ele.name);
									item.newCasts = item.newCasts.join('、');
								}
								if (item.directors.length) {
									item.newDirectors = item.directors.map(ele => ele.name);
									item.newDirectors = item.newDirectors.join('、');
								}
							});
							return dispatch(getMoviesSuccess(path, data, start))
						}
					});
				}
			})
			.catch(error => console.log(error))
	}
}

export const switchMovieTab = (index)=> {
	return {
		type: SWITCH_MOVIE_TAB,
		index
	}
}

export const cacheMovieTab = ()=> {
	return {
		type: CACHE_MOVIE_TAB
	}
}

export const recoverMovieTab = ()=> {
	return {
		type: RECOVER_MOVIE_TAB
	}
}

export const toggleScrollStatus = (status)=> {
	return {
		type: TOGGLE_SCROLL_STATUS,
		status
	}
};