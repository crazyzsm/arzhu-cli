const axios = require('axios');
axios.interceptors.request.use(config=>{
    config.headers ["cookie"]="experimentation_subject_id=eyJfcmFpbHMiOnsibWVzc2FnZSI6IklqaG1OR1ZrTVdSbExUUXlZakl0TkRNM055MWlZV1F6TFROak4yVTNNVE15WkdOa1pTST0iLCJleHAiOm51bGwsInB1ciI6ImNvb2tpZS5leHBlcmltZW50YXRpb25fc3ViamVjdF9pZCJ9fQ%3D%3D--baf7d066bc7497e5b23d1246a1cf70d3743d1f5b; sidebar_collapsed=false; event_filter=all; _gitlab_session=a81c4aa512db7a5a9a5792751438c93b; SL_G_WPT_TO=zh; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1; SESSION=NDc5OTdiMDEtMGVlMS00MmRiLWEzNzItNmY0NTUwYWNjODU3"
    return config
})
axios.interceptors.response.use(response=>{
    return response.data;
})
module.exports = axios;