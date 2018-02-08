<template>
<div class="address-tree" v-clickoutside="handleClickOutSide">
    <el-input
        placeholder="请选择地址"
        suffix-icon="el-icon-arrow-down"
        v-model="InputAddress"
        @focus="handleTagShow">
    </el-input>

    <el-collapse-transition>
            <el-tabs type="border-card" class="address-box"
                     v-model="activeTag" @tab-click="handleTagClick"
                    :class="isTagShow ? 'tagShow': 'tagHide'">

                <el-tab-pane :label="headerTitle[0].text"
                    :name="headerTitle[0].key">
                    <ul class="address-detail clearfix" v-if="activeTag == headerTitle[0].key">
                        <li class="fl"
                            v-for="pItem in addressData.data" :key="pItem.id"
                            @click="selectedProvice(pItem)">
                            {{pItem.text}}
                        </li>
                    </ul>
                    <div class="footer-btns-right">
                        <el-button type="primary" plain @click="confirmBtn">确定</el-button>
                        <el-button plain @click="cancelbtn">清除</el-button>
                    </div>
                </el-tab-pane>

                <el-tab-pane :label="headerTitle[1].text" :name="headerTitle[1].key" :disabled="firstCity">
                    <ul class="address-detail clearfix">
                        <li class="fl"
                            v-for="cityItem in sCityData.ChildNodes" :key="cityItem.id"
                            @click="selectedCity(cityItem)">
                            {{cityItem.text}}
                        </li>
                    </ul>
                    <div class="footer-btns-right">
                        <el-button type="primary" plain @click="confirmBtn">确定</el-button>
                        <el-button plain @click="cancelbtn">清除</el-button>
                    </div>
                </el-tab-pane>

                <el-tab-pane :label="headerTitle[2].text" :name="headerTitle[2].key" :disabled="firstCountry">
                    <ul class="address-detail clearfix">
                        <li class="fl"
                            v-for="countryItem in sCountryData.ChildNodes" :key="countryItem.id"
                            @click="selectedCountry(countryItem)">
                            {{countryItem.text}}
                        </li>
                    </ul>
                    <div class="footer-btns-right">
                        <el-button type="primary" plain @click="confirmBtn">确定</el-button>
                        <el-button plain @click="cancelbtn">清除</el-button>
                    </div>
                </el-tab-pane>

        </el-tabs>
    </el-collapse-transition>

</div>

</template>

<script>

    import clickoutside from  '../assets/js/clickOutside.js'

export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data: function(){
        return {
            headerTitle:[{
                key: 'province',
                text: '省份'
            },{
                key: 'city',
                text: '城市'
            },{
                key: 'country',
                text: '区县'
            }],
            isTagShow: false,
            InputAddress: '',
            addressTextArray: [],
            activeTag: 'province',
            addressData: [],
            sProviceId:'',    // 被选择的省份
            sCityId:'',    // 被选择的城市
            sCountryId:'',    // 被选择的县区
            sCityData: {ChildNodes:[]},  // 被选择的省份数据
            sCountryData: {ChildNodes:[]},   //被选择的县级数据
            firstCity: true,
            firstCountry: true
        }
    },
    watch: {

    },
    directives: {
        clickoutside
    },
    methods: {
        handleClickOutSide(e){
            var arr = e.path,is = false;
            for (var i = 0; i < arr.length; i++) {
                var obj = arr[i];
                if(Util.hasClass(obj,'address-tree')){
                    is = true;
                }
            }
            if(!is){
                this.isTagShow = false;
            }
        },
        handleTagClick: function(key){

        },
        selectedProvice: function(item){  //选择省份
            this.sProviceId = item.id;
            this.sCityData = item;
            this.activeTag = this.headerTitle[1].key;
            this.addressTextArray[0] = item.text;
            this.firstCity = false;

            // 防止选择了县区/城市，又选择省份的bug
            this.sCountryData = {ChildNodes:[]};
            this.addressTextArray.length = 1;

            this.InputAddress = this.addressTextArray.join(' > ');
        },
        selectedCity: function(item){  //选择城市
            this.sCityId = item.id;
            this.sCountryData =item;
            this.activeTag = this.headerTitle[2].key;
            this.addressTextArray[1] = item.text;
            this.firstCountry = false;

            // 防止选择了县区，又选择城市的bug
            this.addressTextArray.length = 2;

             this.InputAddress = this.addressTextArray.join(' > ');
        },
        selectedCountry: function(item){  //选择县区
            this.sCountryId = item.id;
            this.activeTag = this.headerTitle[2].key;
            this.addressTextArray[2] = item.text;
            this.InputAddress = this.addressTextArray.join(' > ');

            // 结束选择
        },
        confirmBtn: function(){ //确定选择地址
            this.isTagShow = false;

            this.$emit('addressSelect',this.addressTextArray);
        },
        cancelbtn: function(){  // 清除选择按钮
            this.isTagShow = false;
            // 清空选择数据
            this.InputAddress = '';
            this.addressTextArray = [];
            this.activeTag = 'province';
            this.sProviceId = '';    // 被选择的省份
            this.sCityId = '';    // 被选择的城市
            this.sCountryId = '';    // 被选择的县区
            this.sCityData = {ChildNodes:[]};  // 被选择的省份数据
            this.sCountryData =  {ChildNodes:[]};   //被选择的县级数据
        },
        handleTagShow: function(){
            this.isTagShow = true;
        }
    },
    created: function(){
        this.addressData = this.data;
    }
}
</script>

<style lang="scss">
@import "../assets/css/standard.scss";
.address-tree{
    position: relative;
    min-width:320px;
    .address-box{
        position: absolute;
        left: 0;
        top:30px;
        z-index: 1000;
        min-width: 430px;
        max-height: 300px;
        overflow-y: auto;
        font-size: 13px;
        border-radius: 5px;

        .el-tabs__header.is-top{
            position: absolute;
            width: 100%;
            top:0;
            left: 0;
        }
        .el-tabs__content{
            position: absolute;
            top:40px;
            bottom: 0;
            left: 0;
            overflow-y: scroll;
            overflow-x: hidden;
        }

    }
    .tagShow{
        height: 500px;
        display: block;
    }
    .tagHide{
        height: 0;
        display: none;
    }
    .tab-box{
        width: 100%;
    }
    .address-detail{
        width: 100%;
        li{

           width: 33.33%;
            text-align: left;
            line-height: 30px;
            cursor: pointer;
            &:hover{
                color: $activeColor;
            }
            &.active{
                color: $activeColor;
            }
        }
    }
    .is-disabled{
        opacity: 0.5;
        filter:alpha(opacity=50);
        cursor: no-drop;
    }
    .el-button{
        padding:3px 5px;
    }
}
</style>


