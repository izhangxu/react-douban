import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import route from "./router/route"; //路由配置
import store from "./redux/store";
import "./styles/app.css";
import "./styles/star.css";

ReactDOM.render(
	<Provider store={store}>{route}</Provider>,
	document.getElementById("root")
);
