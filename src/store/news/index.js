import models from "../../interface/Models.js";

let store = {
  namespaced: true,
  state: {

  },
  actions: {
    //报名列表
    async newsSave({state}, param){
      let info = await models.getModel("newsSave").get(param)
      return info
    },
    async newsList({state}, param){
      let info = await models.getModel("newsList").post(param)
      return info
    },
  }
}


export default store
