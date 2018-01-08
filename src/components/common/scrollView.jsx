import React, { Component } from "react";
import BScroll from 'better-scroll'

export default class scrollView extends Component {
	static defaultProps = {
		/**
		 * 1 滚动的时候会派发scroll事件，会截流。
		 * 2 滚动的时候实时派发scroll事件，不会截流。
		 * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
		 */
		probeType: 1,
		/**
		 * 点击列表是否派发click事件
		 */
		click: true,
		/**
		 * 是否开启横向滚动
		 */
		scrollX: false,
		/**
		 * 是否派发滚动事件
		 */
		listenScroll: false,
		/**
		 * 列表的数据
		 */
		data: null,
		/**
		 * 是否派发滚动到底部的事件，用于上拉加载
		 */
		pullup: false,
		/**
		 * 是否派发顶部下拉的事件，用于下拉刷新
		 */
		pulldown: false,
		/**
		 * 是否派发列表滚动开始的事件
		 */
		beforeScroll: false,
		/**
		 * 当数据更新后，刷新scroll的延时。
		 */
		refreshDelay: 20
	};

	componentDidMount() {
		this._initScroll()
	}

	_initScroll() {
		this.scroll = new BScroll(this.wrapper, {
			probeType: this.props.probeType,
			click: this.props.click,
			scrollX: this.props.scrollX
		});

		// 是否派发滚动事件
		if (this.props.listenScroll) {
			this.scroll.on("scroll", pos => {
				this.props.scroll(pos);
			});
		}

		// 是否派发滚动到底部事件，用于上拉加载
		if (this.props.pullup) {
			this.scroll.on("scrollEnd", () => {
				// 滚动到底部
				if (this.scroll.y <= this.scroll.maxScrollY + 10) {
					this.props.pullup();
				}
			});
		}

		// 是否派发顶部下拉事件，用于下拉刷新
		if (this.props.pulldown) {
			this.scroll.on("touchend", pos => {
				// 下拉动作
				if (pos.y > 50) {
					this.props.pulldown();
				}
			});
		}

		// 是否派发列表滚动开始的事件
		if (this.props.beforeScroll) {
			this.scroll.on("beforeScrollStart", () => {
				this.props.beforeScroll();
			});
		}
	}

	disable() {
		// 代理better-scroll的disable方法
		this.scroll && this.scroll.disable();
	}

	enable() {
		// 代理better-scroll的enable方法
		this.scroll && this.scroll.enable();
	}

	refresh() {
		// 代理better-scroll的refresh方法
		this.scroll && this.scroll.refresh();
	}

	scrollTo() {
		// 代理better-scroll的scrollTo方法
		this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
	}

	scrollToElement() {
		// 代理better-scroll的scrollToElement方法
		this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props !== nextProps) {
			this.refresh()
		}
	}

	render() {
		return (
			<div className="wrapper" ref={dom => (this.wrapper = dom)}>
				{this.props.children}
			</div>
		);
	}
}
