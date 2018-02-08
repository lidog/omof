/****  操作条 ****/
1、调用：
	<operation-bar
        :isChecked="isChecked"
        :operationBtns="operationBtns"
        @handleTopBar="handleTopBar"
        @handleAllChecked="handleAllChecked">
    </operation-bar>
2、通信：
    (1)父》子：
        isChecked: 是否显示全选按钮
        handleTopBar: 操作条数据
    (2)子》父
        @handleAllChecked(checked): 是否全选
        @handleTopBar(key): 监听点击了那个操作按钮
/****  组件说明   ****/

<template>
  <div class="operation-bar clearfix">
    <div class="fl left">
        <el-checkbox v-model="checked" v-if="isChecked" @change="handleAllChecked">全部</el-checkbox>
        <el-button-group>
            <el-button
                v-for="(lItem, index) in operationBtns.left" :key="index"
                :icon="lItem.icon"
                @click="handleTopBar(lItem.key)"
                >{{lItem.text}}
            </el-button>
        </el-button-group>
    </div>
    <div class="fr right">
        <el-button class="searchBut"
            v-for="(rItem, index) in operationBtns.right" :key="index"
            :icon="rItem.icon+' line'"
            @click="handleTopBar(rItem.key)"
           >{{rItem.text}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        isChecked: {
            type: Boolean
        },
        operationBtns: {
            type: Object
        }
    },
    components: {

    },
    data: function(){
        return {
            checked: false
        }
    },
    methods: {
        handleTopBar: function(key){
            this.$emit('handleTopBar', key);
        },
        handleAllChecked: function(){   //是否全选
            this.$emit('handleAllChecked', this.checked);
        }
    }
}
</script>

<style lang="scss">
@import '../assets/css/standard.scss';
.operation-bar{
    height: 56px;
    .el-checkbox{
        margin-right: 14px;
    }
    .left,.right{
        line-height: 56px;
    }
    .el-button{
        padding: 4px 18px;
        cursor: pointer;
        font-size: 12px;
    }
    .el-button [class*=el-icon-]+span{
        font-size: 12px;
    }
    .el-button:not(:last-child){
        margin-right: 10px;
    }
    .el-button{
        background: transparent;
        color: $activeColor;
        border-color: $activeColor;
        border-radius: 0;
        span{
            position: relative;
            top: -2px;
        }
    }
    .right{
        .line{
            position: relative;
            padding-right: 10px;
            &:after{
                content: '';
                position: absolute;
                top: -6px;
                bottom: -4px;
                right: 0;
                width: 1px;
                background: $activeColor;
            }
        }
        .el-button {
            padding: 4px 14px;
            position: relative;
            top: 2px;
            [class*=el-icon-] + span{
                margin-left: 10px;
            }
            span{
                padding-left: 6px;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.left,.right{
    height: 100%;
}
</style>

