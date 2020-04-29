import axios from "axios";

var baseConfig = {
	timeout: 100000
}

var CancelToken = axios.CancelToken;

var request = function (config) {
	var cancel;
	const instance = axios.create({
		...baseConfig,
		cancelToken: new CancelToken(function executor(c) {
			cancel = c
		})
	})

	return {
		promise: instance.request(config),
		cancel
	}
}



export default request
