import { reactive, watch } from "vue";
import { LineModel } from "./type";
export var lineModels = []
export var linesWrapperDom = document.body
export var addButton = null
export var copyButton = null
export var saveButton = null
// 最顶级
export var detailWrapper = null
// 多个list
export var listWrappers = null
export var btnWrapper = null
export var ctrlBtnWrapper = null

export function insertCss(css) {
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else if (typeof PRO_addStyle != "undefined") {
        PRO_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            heads[0].appendChild(node);
        } else {
            // no head yet, stick it whereever
            document.documentElement.appendChild(node);
        }
    }
}
// 查找出基础的必要的节点
export function findNessDom() {
    detailWrapper = document.querySelector(".detail-wrapper")
    listWrappers = document.querySelectorAll(".detail-wrapper>.list")
    btnWrapper = document.querySelector(".detail-wrapper .btn-wrapper")
    // 按钮行
    ctrlBtnWrapper = document.querySelector(".list .name")
    // UE: onload
    return unsafeWindow.UE && detailWrapper && listWrappers && listWrappers.length > 0 && btnWrapper && ctrlBtnWrapper
}

export function bindLinesWrapper() {
    lineModels = reactive([])
    addButton = ctrlBtnWrapper.querySelector(".el-button--primary.text-yellow")
    copyButton = ctrlBtnWrapper.querySelector(".el-button--success.text-yellow")
    saveButton = btnWrapper.querySelector(".btn.el-button--primary")
    // 监听数据行添加
    linesWrapperDom = document.querySelector(".detail-wrapper .unit_list");
    linesWrapperDom.addEventListener("DOMNodeInserted", (e) => {
        if (e.relatedNode == linesWrapperDom && e.target.className.includes("item-box")) {
            addLine(e.target);
        }
    });
    // 将当前数据行录入
    let existLines = linesWrapperDom.querySelectorAll(".item-box");
    for (let i = existLines.length - 1; i >= 0; i--) {
        addLine(existLines[i]);
    }
}

const osOption = {
    // attributeFilter: ['fetchsuggestions'],
    attributes: true,
    // characterData: true,
    // childList: true
};
// 监听具体数据行的修改
export function addLine(lineDom) {
    let model = reactive(new LineModel(lineDom))
    lineModels.push(model)
    // 删除
    lineDom.addEventListener("DOMNodeRemoved", (e) => {
        if (e.target != lineDom)
            return;
        const children = linesWrapperDom.children
        for (let i = 0; i < children.length; i++) {
            let child = children[i]
            if (child == lineDom) {
                // 倒序删除，因为反过来的
                lineModels.splice(children.length - i - 1, 1);
            }
        }

    });
    // 绑定原版input dom数据
    let inputs = lineDom.querySelectorAll(".input-list input");
    inputs.forEach(input => {
        let inputModel = model[input.placeholder]
        input.addEventListener("input", (e) => {
            inputModel.value = input.value;
        });
        watch(inputModel, function() {
            saveInputValue(inputModel)
        })
    });
}
// 根据数据更新原表单
export function saveInputValue(inputModel, value) {
    if (value) {
        inputModel.value = value
    } else {
        value = inputModel.value
    }
    inputModel.input.value = value
    inputModel.input.dispatchEvent(new Event('input'))
}