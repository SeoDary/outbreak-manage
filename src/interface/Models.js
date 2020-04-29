import MakeModels from "./MakeModels.js";
import configs from "../project.config.js";
import index from "./api/index.js";
import article from "./api/article.js"
import build from './api/build.js'


var Models = {
	...index,
	...article,
	...build,
	getMessage:{//获取所有求助信息
		url:'admin/get-message'
	}
};

Models = MakeModels.create(Models, {
	requestUrl: configs.requestUrl
});




export default Models
