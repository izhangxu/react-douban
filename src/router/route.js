import React, { Component } from "react";
import {
	Router,
	Route,
	Redirect,
	IndexRoute,
	browserHistory
} from "react-router";
import index from "../components/index";

class Roots extends Component {
	render() {
		return <div> {this.props.children} </div>;
	}
}

const movie = (location, cb) => {
	require.ensure(
		[],
		require => {
			cb(null, require("../components/movie").default);
		},
		"movie"
	);
};

const admin = (location, cb) => {
	require.ensure(
		[],
		require => {
			cb(null, require("../components/admin").default);
		},
		"admin"
	);
};

const detail = (location, cb) => {
	require.ensure(
		[],
		require => {
			cb(null, require("../components/detail").default);
		},
		"detail"
	);
};

const RouteConfig = (
	<Router history={browserHistory}>
		<Route path="/" component={Roots}>
			<IndexRoute component={index} />
			<Route path="movie" getComponent={movie} />
			<Route path="admin" getComponent={admin} />
			<Route path="detail/:id" getComponent={detail} />
			<Redirect from="*" to="/" />
		</Route>
	</Router>
);

export default RouteConfig;
