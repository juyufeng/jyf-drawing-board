(function (win, doc) {

	var topics = {
		_all: []
	};
	var _allList = [];

	/*
	 * 判断一个对象是否为数组
	 * */
	var isArray = function (obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	};

	/*
	 * 判断一个元素是否在数组中
	 * */
	var inArray = function (item, arr) {
		// 不是数组则跳出
		if (!isArray(arr)) {
			return false;
		}
		// 遍历是否在数组中
		for (var i = 0, k = arr.length; i < k; i++) {
			if (item == arr[i]) {
				return true;
			}
		}
		return false;
	};

	// 循环检测是否有all事件需要被执行
	var loopCheck = function (topic) {
		if (!inArray(topic, _allList)) {
			return;
		}
		var _all = topics._all;
		for (var i = 0; i < _all.length; i++) {
			var temp = _all[i];
			if (temp && inArray(topic, _all[i].events) && !inArray(topic, _all[i].finished)) {
				_all[i].finished.push(topic);
			}
			if (temp && _all[i].events.length == _all[i].finished.length) {
				var callbackInfo = [];
				for (var j = 0; j < _all[i].events.length; j++) {
					var _topic = _all[i].events[j];
					callbackInfo.push(topics[_topic].info);
				}
				var callback = _all[i].callback;
				if (callback) {
					callback.apply(this, callbackInfo);
				}
			}
		}
	};

	var events = {
		on: function (topic, listener) {
			// 如果没有创建,则创建一个topic对象
			if (!topics[topic]) {
				topics[topic] = { queue: [], result: 0, info: null };
			}

			// 添加监听器到队列中
			var index = topics[topic].queue.push(listener) - 1;

			// 提供移除topic的句柄(对象)
			return (function (topic, index) {
				return {
					off: function () {
						delete topics[topic].queue[index];
					}
				};
			})(topic, index);
		},
		emit: function (topic, info) {
			// 如果 topic 不存在,或者队列中没有监听器,则 return
			if (!topics[topic] || !topics[topic].queue.length) return;

			// 将数据缓存至变量
			topics[topic].result = 1;
			topics[topic].info = info;

			// 通过循环 topics 队列, 触发事件
			var items = topics[topic].queue;
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				if (item) {
					item(info || {});
				}
			}

			loopCheck(topic);

		},
		all: function () {
			var args = arguments, eventArr = [], callback;
			for (var i = 0; i < args.length; i++) {
				var event = args[i];
				if (typeof event == "string" && !inArray(event, eventArr)) {
					eventArr.push(event);
					_allList.push(event);
				} else if (isArray(event)) {
					for (var j = 0; j < event.length; j++) {
						if (typeof event[j] == "string" && !inArray(event[j], eventArr)) {
							eventArr.push(event[j]);
							_allList.push(event[j]);
						}
					}
				}
			}

			// 取出回调方法
			if (typeof args[args.length - 1] == "function") {
				callback = args[args.length - 1];
			}

			var allEvent = {
				events: eventArr,
				finished: [],
				callback: callback
			};

			var index = topics._all.push(allEvent) - 1;

			// 提供移除topic的句柄(对象)
			return (function (topic, index) {
				return {
					off: function () {
						delete topic[index];
					}
				};
			})(topics._all, index);
		},
		debug: function () {
			if (console && console.log) console.log(topics);
		}
	};

	win.eventbus = events;

})(window, document);