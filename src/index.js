function main() {
    if (unsafeWindow.tmRun) {
        return;
    }
    unsafeWindow.tmRun = true

    // let detail = document.querySelector(".detail-wrapper")
    // console.log(detail);
    addEventListener('load', onload)

}

function onload(e) {
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
            if (node.value.length == 0) {
                node.value = "-"
            }
        }
    })

    newWrapper.className = "fixed"
    for (var i = 0; i < listWrappers.length; i++) {
        newWrapper.appendChild(listWrappers[i])
    }

    newWrapper.appendChild(btnWrapper)
    detailWrapper.appendChild(newWrapper)
    newWrapper.style.position = "fixed"
    newWrapper.style.zIndex = 10
    newWrapper.style.left = 0
    newWrapper.style.right = 0
    newWrapper.style.bottom = 0
    newWrapper.style.backgroundColor = "rgb(224 224 224 / 85%)"
    newWrapper.style.padding = "15px"
    detailWrapper.style.paddingBottom = `${newWrapper.clientHeight}px`
    // 自动移除修改定位影响的弹窗遮罩
    document.body.addEventListener("DOMNodeInserted", function (e) {
        if (e.relatedNode == document.body && e.target.className && e.target.className.includes("v-modal")) {
            e.target.remove()
        }

    })

    disableUeditor()
}
// 找到富文本编辑器并且禁止编辑
function disableUeditor() {
    let editorOut = document.querySelector(".ueditor-wrapper div[id^=editor]")
    let ueditor = UE.getEditor(editorOut.id)
    ueditor.ready(function () {
        ueditor.setDisabled()
    })
}

main()