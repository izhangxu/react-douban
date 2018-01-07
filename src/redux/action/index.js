import fetch from 'fetch-jsonp';
import utils from '../../libs/utils'

export const GET_MOVIES_REQUEST = 'GET_MOVIES_REQUEST'
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS'
export const GET_MOVIES_FAILURE = 'GET_MOVIES_FAILURE'



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

const getMoviesSuccess = (path, json) => {
	return {
		type: GET_MOVIES_SUCCESS,
		path,
		json
	}
};

export const fetchMovies = (path, params) => {
	let url = 'http://api.douban.com' + path + utils.paramType(params);
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
							return dispatch(getMoviesSuccess(path, data))
						}
					});
				}
			})
			.catch(error => console.log(error))
	}
}