import { reactive, watch } from "vue"

export const key = {
    中标单位: "中标单位",
    中标单位联系方式: "中标单位联系方式",
    招标单位: "招标单位",
    招标单位联系方式: "招标单位联系方式",
    项目编号: "项目编号",
    标的名称: "标的名称",
    品牌: "品牌",
    规格型号: "规格型号",
    单位: "单位",
    数量: "数量",
    单价: "单价",
    总价: "总价"
}
export const keys = [
    "中标单位",
    "中标单位联系方式",
    "招标单位",
    "招标单位联系方式",
    "项目编号",
    "标的名称",
    "品牌",
    "规格型号",
    "单位",
    "数量",
    "单价",
    "总价"
]
export class LineModel {
    中标单位 = "中标单位"
    中标单位联系方式 = "中标单位联系方式"
    招标单位 = "招标单位"
    招标单位联系方式 = "招标单位联系方式"
    项目编号 = "项目编号"
    标的名称 = "标的名称"
    品牌 = "品牌"
    规格型号 = "规格型号"
    单位 = "单位"
    数量 = "数量"
    单价 = "单价"
    总价 = "总价"
    constructor(lineDom) {
        let inputs = lineDom.querySelectorAll(".input-list input")
        inputs.forEach(input => {
            let key = input.placeholder
            const model = reactive(new InputModel(input))
            this[key] = model
        });
    }
}
export class InputModel {
    key = ""
    value = ""
    input = document.body

    constructor(input) {
        this.key = input.placeholder
        this.value = input.value
        this.input = input
    }
}
