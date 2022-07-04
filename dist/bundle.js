/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function() {

eval("function main() {\n  if (unsafeWindow.tmRun) {\n    return;\n  }\n\n  unsafeWindow.tmRun = true; // let detail = document.querySelector(\".detail-wrapper\")\n  // console.log(detail);\n\n  addEventListener('load', onload);\n}\n\nfunction onload(e) {\n  var detailWrapper = document.querySelector(\".detail-wrapper\");\n  var listWrappers = document.querySelectorAll(\".detail-wrapper>.list\");\n  var btnWrapper = document.querySelector(\".detail-wrapper .btn-wrapper\");\n  var newWrapper = document.createElement(\"div\");\n  var fillEmptyBtn = document.createElement(\"button\");\n  btnWrapper.appendChild(fillEmptyBtn);\n  fillEmptyBtn.outerHTML = \"<button type=\\\"button\\\" class=\\\"el-button btn el-button--success el-button--small\\\"><span>\\u586B\\u5145-\\u7A7A\\u767D</span></button>\";\n  fillEmptyBtn = btnWrapper.lastChild; // outerHTML改变之后不是同一个对象，重新引用\n\n  fillEmptyBtn.addEventListener(\"click\", function () {\n    var inputList = document.querySelectorAll(\".list input[placeholder]\");\n\n    for (var _i = 0; _i < inputList.length; _i++) {\n      var node = inputList[_i];\n\n      if (node.value.length == 0) {\n        node.value = \"-\";\n      }\n    }\n  });\n  newWrapper.className = \"fixed\";\n\n  for (var i = 0; i < listWrappers.length; i++) {\n    newWrapper.appendChild(listWrappers[i]);\n  }\n\n  newWrapper.appendChild(btnWrapper);\n  detailWrapper.appendChild(newWrapper);\n  newWrapper.style.position = \"fixed\";\n  newWrapper.style.zIndex = 10;\n  newWrapper.style.left = 0;\n  newWrapper.style.right = 0;\n  newWrapper.style.bottom = 0;\n  newWrapper.style.backgroundColor = \"rgb(224 224 224 / 85%)\";\n  newWrapper.style.padding = \"15px\";\n  detailWrapper.style.paddingBottom = \"\".concat(newWrapper.clientHeight, \"px\"); // 自动移除修改定位影响的弹窗遮罩\n\n  document.body.addEventListener(\"DOMNodeInserted\", function (e) {\n    if (e.relatedNode == document.body && e.target.className && e.target.className.includes(\"v-modal\")) {\n      e.target.remove();\n    }\n  });\n  disableUeditor();\n} // 找到富文本编辑器并且禁止编辑\n\n\nfunction disableUeditor() {\n  var editorOut = document.querySelector(\".ueditor-wrapper div[id^=editor]\");\n  var ueditor = UE.getEditor(editorOut.id);\n  ueditor.ready(function () {\n    ueditor.setDisabled();\n  });\n}\n\nmain();\n\n//# sourceURL=webpack://joinchain-textmark-plugin/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;