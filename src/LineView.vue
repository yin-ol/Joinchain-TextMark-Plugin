<!-- <template>

    <div class="line" v-for="ipModel, key in lineModel">

        <label>{{ key }}</label>
        <input type="text" :value="ipModel">
    </div>
</template> -->

<template>
    <table>
        <tr v-for="ipModel, key in lineModels[index]">
            <td>{{ key }}</td>
            <td>
                <input type="text" :value="ipModel.value" v-on:input="onInput($event, ipModel)" />
            </td>
            <td><button @click="fillAllValueByKey(ipModel.key, ipModel.value)">批量</button></td>
        </tr>
    </table>
    <hr title="单页">
    <div>
        <button type="button" @click="asyncData(index)">同步</button>
        <button type="button" @click="checkAndFill">检查校验</button>
        <button type="button" @click="clickSaveBtn">保存</button>
    </div>
</template>
<script>
import { computed } from '@vue/reactivity';
import { saveButton, lineModels, saveInputValue } from './lib/dom';
import { keys } from './lib/type';

export default {
    props: {
        index: Number
    },
    setup() {
        return {
            lineModels,
        }
    },
    methods: {
        asyncData(index) {
            if (index) {
                keys.forEach((key) => {
                    let ipModel = lineModels[index][key]
                    ipModel.value = ipModel.input.value
                })
            } else {// 全部更新
                for (let l = 0; l < lineModels.length; l++) {
                    keys.forEach((key) => {
                        let ipModel = lineModels[index][key]
                        ipModel.value = ipModel.input.value
                    })
                }
            }

        },
        onInput(e, ipModel) {
            // saveInputValue(model, e.target.value)
            ipModel.value = e.target.value
            console.log("oninput", e);
        },
        fillAllValueByKey(key, value) {
            lineModels.forEach((model) => {
                model[key].value = value
            })
        },
        checkAndFill() {
            for (let i = 0; i < lineModels.length; i++) {
                this.asyncData(i)
                keys.forEach((key) => {
                    let ipModel = lineModels[i][key]
                    ipModel.value = ipModel.value.trim()
                    // 填充空白
                    if (!ipModel.value || ipModel.value.length == 0) {
                        ipModel.value = '-'
                    }
                    if (key === "单价" || key === "数量" || key === "总价") {
                        if (ipModel.value === '-') {

                        } else if (/\d+万/.test(ipModel.value)) {
                            let numStr = ipModel.value.substring(0, ipModel.value.length - 1)
                            ipModel.value = (parseFloat(numStr) * 10000).toString()
                        } else if (/\d+/.test(ipModel.value)) {
                            ipModel.value = parseFloat(ipModel.value).toString()
                        } else {
                            alert(`第${i}页【${key}】数据格式不规范`)
                        }
                        // if (ipModel.value.endsWith(".0")) {
                        //     ipModel.value = ipModel.value.substring(0, ipModel.value.length - 2)
                        // } else if (ipModel.value.endsWith(".00")) {
                        //     ipModel.value = ipModel.value.substring(0, ipModel.value.length - 3)
                        // }
                    }
                })
            }

        },
        clickSaveBtn() {
            saveButton.click()
        },
        // 修改新表单内容
        setValueByKey(key, value) {
            this.lineModels[this.index][key].value = value
        }
    }

}
</script>
<style scoped="true">
/* .line {
    display: flex;
    flex-direction: row;
}
.line input{
    flex-grow: 1;
 } */
table {
    padding: 6px;
}
</style>