import Immutable from "immutable";
import { GET_MOVIES_REQUEST, GET_MOVIES_SUCCESS } from "../action/index";

const defaultState = Immutable.fromJS({ data: {}, isFetching: false });

export const fetchData = (state = defaultState, action = {}) => {
	switch (action.type) {
		case GET_MOVIES_REQUEST:
			return state.set('isFetching', true);
		case GET_MOVIES_SUCCESS:
			return Immutable.Map({
				data: action.json,
				isFetching: false
			}); 
		default:
			return state;
	}
};
