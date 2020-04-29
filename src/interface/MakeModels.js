import request from "./Request.js";
import {
	each
} from "lodash";


var requestFactory = {};

var MakeModels = {
	create(Models, option) {
		return {
			getModel(modelName) {
				var model = Models[modelName];
				var types = ["get", "post", "options", "delete", "put"];
				var _request;
				var axiosConfig = {
					baseURL: option.requestUrl,
					url: model.url,
					headers: {
						...model.headers
					}
				};
				// if(model.format){
				// 	axiosConfig.transformResponse = model.format;
				// }
				_request = function (type, param) {
					if (model.sync && requestFactory[modelName]) {
						requestFactory[modelName].cancel(modelName + " request canceled");
						delete requestFactory[modelName];
					}
					var config = {
						...axiosConfig,
						method: type,
						data: param
					}
					if (model.formData) {
						var formData = new FormData();
						each(config.data, (val, key) => {
							formData.append(key, val)
						})
						config.data = formData;
					}
					if (type == "get" || type == "delete") {
						config.params = param;
						config.data = {};
					}
					return new Promise((rs, rj) => {
						var {
							promise,
							cancel
						} = request(config);
						requestFactory[modelName] = {
							cancel
						};
						promise
							.then(response => {
								delete requestFactory[modelName];
								rs(response)
							})
							.catch(e => {
								delete requestFactory[modelName];
							})
					})
				}
				var ret = {};
				each(types, type => {
					ret[type] = function (param) {
						return _request(type, param);
					}
				})
				return ret
			}
		}
	}
}

export default MakeModels
