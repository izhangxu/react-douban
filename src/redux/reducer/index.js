import Immutable from "immutable";
import { GET_MOVIES_REQUEST, GET_MOVIES_SUCCESS,SWITCH_MOVIE_TAB, CACHE_MOVIE_TAB, RECOVER_MOVIE_TAB,TOGGLE_SCROLL_STATUS } from "../action/index";

const defaultState = Immutable.fromJS({ data: {}, isFetching: false });
const defaultMovieTab = Immutable.fromJS({movieTabIndex: 1, cacheMovieTabIndex: -1});

export const fetchData = (state = defaultState, action = {}) => {
	switch (action.type) {
		case GET_MOVIES_REQUEST:
			return state.set('isFetching', true);
		case GET_MOVIES_SUCCESS:
			if (action.start) {
				return Immutable.Map({
					data: state.get('data').concat(action.json),
					isFetching: false
				});
			}
			return Immutable.Map({
				data: action.json,
				isFetching: false
			});
		default:
			return state;
	}
};

export const movieTab = (state = defaultMovieTab, action = {}) => {
	switch (action.type) {
		case SWITCH_MOVIE_TAB:
			return state.set('movieTabIndex', action.index);
		case CACHE_MOVIE_TAB:
			const movieIndex = state.get('movieTabIndex') || 1;
			return state.set('cacheMovieTabIndex', movieIndex);
		case RECOVER_MOVIE_TAB:
			const cacheMovieIndex = state.get('cacheMovieTabIndex') || 1;
			return Immutable.Map({
				movieTabIndex: cacheMovieIndex,
				cacheMovieTabIndex: -1
			});
		default:
			return state;
	}
};

export const scrollStatus = (state = {}, action = {})=> {
	switch(action.type) {
		case TOGGLE_SCROLL_STATUS:
			state.disabled = action.status;
			return state;
		default:
			return state;
	}
};