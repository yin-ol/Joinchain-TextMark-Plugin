<template>
    <div class="float_btn" v-if="!showSwitch" @click="toggleSwitch">辅助菜单</div>
    <div class="panel" v-else>
        <ul class="buttons">
            <li>
                <button type="button" @click="toggleSwitch">❌</button>
            </li>


            <li><button type="button">🔧</button></li>
            <li><button type="button">🗑️</button></li>
            <li><button type="button" @click="addTab">➕</button></li>
            <li><button type="button" :disabled="activeTab <= 0 || activeTab > lineMap.length"
                    @click="deleteTab(activeTab)">➖</button></li>
            <li v-for="line, index in lines">
                <button type="button" @click="activeTab = lines.length - index"
                    :class="{ act: activeTab == lines.length - index }">
                    {{ lines.length - index }}
                </button>
            </li>

        </ul>

        <LineView v-if="0 < activeTab && activeTab <= lines.length" :index="activeTab - 1" />

    </div>
</template>

<script>

import { lineModels, addButton, linesWrapperDom } from "./lib/dom";
import { LineModel } from "./lib/type"
import LineView from "./LineView.vue"
export default {
    components: { LineView },
    methods: {
        toggleSwitch() {
            this.showSwitch = !this.showSwitch;
        },
        addTab() {
            this.activeTab = lineModels.length + 1
            addButton.click()

        },
        deleteTab(index) {
            let currentDelBtn = linesWrapperDom.querySelector(`.item-box:nth-last-of-type(${index}) .el-button.delete`)
            if (currentDelBtn) {
                if (this.activeTab >= this.lines.length) {
                    this.activeTab -= 1
                }
                currentDelBtn.click()
            }
        }
    },

    data() {
        return {
            showSwitch: true,
            activeTab: lineModels.length,
            lines: lineModels,
            lineMap: {}
        };
    },
    mounted() {

    }

}
</script>

<style>
.detail .fixed_new_panel .unit_list {
    max-height: 150px;
}
.fixed_new_panel {
    position: fixed;
    background-color: rgba(224, 224, 224, 0.85);
    padding: 15px;
    z-index: 11;
    right: 0;
    bottom: 0;
    left: 0;
}
#fixed_menu {
    position: fixed;
    top: 0;
    right: 0;
    background-color: rgba(224, 224, 224, 0.85);
    z-index: 12;
}

#fixed_menu .float_btn {
    width: 50px;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
}

#fixed_menu .panel {
    width: 350px;
    min-height: 350px;
}

#fixed_menu .panel .buttons button {
    width: 0.5rem;
    height: 0.5rem;
    padding: 0;
    cursor: pointer;
}

#fixed_menu .panel>ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: inline-block;
}

#fixed_menu .panel>ul.buttons li {
    float: left;
}

#fixed_menu .panel>ul.buttons .act {
    background-color: gray;
    color: white;
}
</style>