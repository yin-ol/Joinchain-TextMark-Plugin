这是一个油猴脚本，用于众成医疗标注工作，不知道的请无视这个项目

推荐用[新版edge浏览器](https://www.microsoft.com/zh-cn/edge)或者[chrome浏览器](README.md)来运行，chrome51以上版本，其他浏览器不一定能兼容

## 普通用户使用方法：
1. 先安装tampermonkey，根据浏览器选择下载地址：[edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)、[chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo), 没有科学上网工具的建议使用edge浏览器
2. 安装完浏览器插件后[点击链接](https://yhf-static.oss-cn-hangzhou.aliyuncs.com/tm/Joinchain/script.user.js)安装脚本，然后就可以打开网站进行标注工作了



## 开发者：
通过以上方式安装完成脚本之后，在油猴里找到// @require ....bundle.js并将地址修改为file:///你的本地脚本项目路径/dist/bundle.js

然后在项目文件夹下运行```npm install & npm dev```就可以进行调试了

## TODO
删除 webpack-dev-server