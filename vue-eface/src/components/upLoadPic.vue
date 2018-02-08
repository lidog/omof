<!--
 * @Author lizhenhua
 * @version 2017-08-10
 * @description 上传图片
 -->
<template>
    <div class="pic-box">
        <div class="left">
            <input class="left-input" type="file" ref="upLoad" @change="upload">
            <span>点击上传照片</span>
        </div>
        <div class="tools">
            <span class="icon"></span>
        </div>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {}
        },
        methods:{
            upload(){
                let dom = this.$refs.upLoad;
                this.$emit('hasUpload',dom.files[0])
            }
        }
    }
</script>
<style lang="scss">
    @import '../assets/css/standard.scss';
    .pic-box{
        margin:p(40) 0;
        text-align: left;
        .left{
            position: relative;
            text-align: center;
            display: inline-block;
            width: p(204);
            height: p(264);
            border: p(2) solid $cardfontColor;
            color:$activeColor;
            font-size: p(24);
            line-height: p(380);
            cursor: pointer;
            background: url("../assets/images/pic-box.png") no-repeat 0 0;
            background-size: cover;
            .left-input{
                display: inline-block;
                position: absolute;
                width: 100%;
                height: 100%;
                top:0;
                left: 0;
                opacity: 0;
            }

        }
        .tools{
            display: inline-block;
            border: 1px solid $cardfontColor;
            border-left: none;
            border-top-right-radius: p(6);
            border-bottom-right-radius: p(6);
            width: p(58);
            vertical-align: top;
            text-align: center;
            margin-left: p(-8);
            .icon{
                display: inline-block;
                width: 100%;
                height: p(57);
                background: url("../assets/images/page-icon.png") no-repeat p(-146) p(-340) ;
                background-size:p(835) p(679);
                cursor: pointer;
            }
        }
    }
</style>
