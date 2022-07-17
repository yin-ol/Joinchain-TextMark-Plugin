import { proxy, unProxy } from "ajax-hook";

var autoExtraInfoHandler = null;
export var baseInfo = {};
var autoExtraInfo = {};
export function hookAjax() {
    proxy({
        //请求成功后进入
        onResponse: (response, handler) => {
            try {
                // console.log(response.config.url)
                if (response.config.url.startsWith("/bid/bid_auto_extra_info?")) {
                    // 填充信息
                    hookAutoExtraInfo(response, handler)
                } else if (response.config.url.startsWith("/bid/bid_base_info")) {
                    // 基本信息
                    baseInfo = JSON.parse(response.response)
                    console.log("baseInfo", baseInfo.content_url)
                } else if(baseInfo.content_url && response.config.url === baseInfo.content_url) {
                    // 富文本
                }
                
            } catch (e) {
                console.error("ajax hook", e);
            } finally {
                handler.next(response)
            }
        }
    }, unsafeWindow)
}
// 自动填充
function hookAutoExtraInfo(response, handler) {
    // todo
    autoExtraInfoHandler = handler
    autoExtraInfo = JSON.parse(response.response);
    autoExtraInfo.tenderee_tel = [111111]
    response.response = JSON.stringify(autoExtraInfo)
    console.log(autoExtraInfo);
}