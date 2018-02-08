/* 纵向列表 */
<template>
<div class="titlelis-vertical">
    <div class="list-top">
        <el-checkbox v-model="checked" class="checked-btn"></el-checkbox>
        <div class="img-list">
            <img src="http://59.41.223.232:8088/g1/M00/00012001/20180130/rBA4tFpwNRCIK6-ZAAAOENa5BLIAAEGIQJpeZwAAA4o155.jpg" />
            <p>抓拍图片</p>
        </div>
        <div class="img-list">
            <img src="http://59.41.223.232:8088/g1/M00/00012001/20180130/rBA4tFpwNRCIK6-ZAAAOENa5BLIAAEGIQJpeZwAAA4o155.jpg" />
            <p>抓拍图片</p>
        </div>
    </div>
    <div class="list-con">
        <p class="list-p">
            <label>姓名:</label>
            <span>张三</span>
        </p>
        <p class="list-p">
            <label>姓名:</label>
            <span>张三</span>
        </p>
        <p class="list-p">
            <label>姓名:</label>
            <span>张三</span>
        </p>
        <p class="list-p">
            <label>姓名:</label>
            <span>张三</span>
        </p>
        <p>
            <label>姓名:</label>
            <span>张三</span>
        </p>
    </div>
</div>
</template>

<script>
export default {
    data: function(){
        return {
            checked: false
        }
    }

}
</script>

<style lang="scss">
@import '../assets/css/standard.scss';
.titlelis-vertical{
    color: $fontColor;
    width: 180px;
    text-align: left;
    border: 1px solid $borderColor;
    padding: 10px 12px 18px 12px;
    .list-top{
        position: relative;
        .checked-btn{
            position: absolute;
            top:4px;
            left: 0;
        }
        text-align: center;
        .img-list{
            display: inline-block;
            margin: 0 2px;
            img{
                width: 60px;
                height: 78px;
            }
            p{
                font-size: 13px;
                margin: 5px 0;
            }
        }
        .score{
            display: inline-block;
            background: #ac3a17;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            font-size: 13px;
            position: absolute;
        }
    }
    .list-con{
        .list-p{
             &:not(:last-child){
                margin: 0 0 5px;
            }
        }
    }
}

</style>

