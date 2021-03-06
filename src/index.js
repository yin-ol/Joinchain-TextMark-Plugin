import { reactive, createApp } from "vue"
import FixedMenu from "./FixedMenu.vue"
import { bindLinesWrapper, findNessDom } from "./lib/dom";
import { hookAjax } from "./js/ajax";
function main() {
    // 重复运行判断，主要是防止开发插件和测试用户脚本混乱
    if (unsafeWindow.tmRun) {
        console.warn("已阻止重复运行脚本！请检查是否开启了多个脚本");
        return;
    }
    unsafeWindow.tmRun = true
    // 插入样式
    // 拦截ajax
    hookAjax()
    // 等待加载完成
    let loopCount = 0
    let loopId = setInterval(function name(params) {
        if (loopCount++ > 10) {
            clearInterval(loopId)
            alert("等待页面加载超时，即将自动刷新页面")
            window.location.reload()
        }
        if (findNessDom()) {
            createFixedWrapper()
            // 绑定页面
            bindLinesWrapper()
            // 创建悬浮菜单
            createFixedMenu()
            disableUeditor()
            clearInterval(loopId)
        }
    }, 1000)
}


function createFixedWrapper() {
    let detailWrapper = document.querySelector(".detail-wrapper")
    let listWrappers = document.querySelectorAll(".detail-wrapper>.list")
    let btnWrapper = document.querySelector(".detail-wrapper .btn-wrapper")

    let newWrapper = document.createElement("div")
    let fillEmptyBtn = document.createElement("button")
    btnWrapper.appendChild(fillEmptyBtn)
    fillEmptyBtn.outerHTML = `<button type="button" class="el-button btn el-button--success el-button--small"><span>填充-空白</span></button>`
    fillEmptyBtn = btnWrapper.lastChild // outerHTML改变之后不是同一个对象，重新引用
    fillEmptyBtn.addEventListener("click", function () {
        let inputList = document.querySelectorAll(".list input[placeholder]")
        for (let i = 0; i < inputList.length; i++) {
            let node = inputList[i]
            if (!node.value || node.value.length == 0) {
                node.value = "-"
                node.dispatchEvent(new Event('input'))
            }
        }
    })

    newWrapper.className = "fixed_new_panel"
    for (var i = 0; i < listWrappers.length; i++) {
        newWrapper.appendChild(listWrappers[i])
    }

    newWrapper.appendChild(btnWrapper)
    detailWrapper.appendChild(newWrapper)
    detailWrapper.style.paddingBottom = `${newWrapper.clientHeight}px`
    // 自动移除修改定位影响的弹窗遮罩
    document.body.addEventListener("DOMNodeInserted", function (e) {
        if (e.relatedNode == document.body && e.target.className && e.target.className.includes("v-modal")) {
            e.target.remove()
        }

    })
}
// 找到富文本编辑器并且禁止编辑
function disableUeditor() {
    let editorOut = document.querySelector(".ueditor-wrapper div[id^=editor]")
    let ueditor = UE.getEditor(editorOut.id)
    ueditor.ready(function () {
        ueditor.setDisabled()
    })
}

function createFixedMenu() {
    const menuNode = document.createElement("div")
    menuNode.id = "fixed_menu"
    document.body.appendChild(menuNode)
    let app = createApp(FixedMenu)
    app.mount(menuNode)
}

main()
