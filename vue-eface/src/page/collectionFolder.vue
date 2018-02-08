<!--
 * @Author wenyujian
 * @version 2018-02-02
 * @description 收藏夹页面
 -->

 <template>
   <div class="collection-folder">
       <ul class="clearfix collection-body">
           <li class="fl" v-for="(item, index) in collectonData" :key="index" @click="selectFolder(item.id)">
               <span class="file" :class="selectedId == item.id ?'active': ''"><img :src="cardImg"/></span>
                <p>{{item.name}}</p>
           </li>
           <li class="fl" @click="addCollection">
               <span class="icon-add add"></span>
           </li>
       </ul>
       <div class="collection-footer">
           <el-button type="primary" @click="confirmBtn">确定</el-button>
           <el-button @click="cancelbtn">取消</el-button>
       </div>
   </div>
 </template>
 

 <script>
 import cardImg from 'components/cardCheckbox/file.png';
 export default {
   props:{

   },
   data: function(){
       return{
           cardImg,
           collectonData: [{
               id: 1,
               name: 'ddd'
           },
           {
               id: 2,
               name: 'dddd'
           }],
           selectedId: -1
       }
   },
   methods: {
       addCollection: function(){
            this.$prompt(' ', '我的收藏夹', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPlaceholder: '请输入收藏夹名称',
                inputPattern:  /\S/,
                inputErrorMessage: '收藏夹名称不能为空'
            }).then(({ value }) => {
                let item = {
                    id: 2,
                    name: value
                }
                this.collectonData.push(item);

                this.$message({
                    type: 'success',
                    message: '你的收藏夹名称为: ' + value
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
            });
       },
       confirmBtn: function(){  // 确定按钮
            this.$emit('collectionConfirm', this.selectedId);
       },
       cancelbtn: function(){  // 取消按钮
            this.$emit('collectionCancel');
       },
       selectFolder: function(id){    // 选择收藏夹
            this.selectedId = id;
       }
   }
 }
 </script>
 

 <style lang="scss">
 @import "../assets/css/standard.scss"; 

 .collection-folder{
    .collection-body{
        min-height: 210px;
        overflow-y: auto;
         li{
             width: 70px;
             padding: 10px;
             img{
                 width: 58px;
                 height: auto;
             }
                  
            .icon-add{
                color: #ddd;
                font-size: 38px;
                border: 1px dashed #ddd;
                position: relative;
                padding: 20px 18px;
                top: 18px;

            }
            p{
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
         }
     }
     .collection-footer{
         border-top: 1px dashed #ddd;
         padding: 10px;
         .el-button{
             padding: 6px 10px;
         }
     }
    .file{
        padding: 8px 5px 0 5px;
        display: inline-block;
        box-sizing: border-box;
        width: 70px;
        height: 64px;
         border:  1px solid transparent;
        &.active{
            border:  1px solid #96a6a9;
        }
     }
 }
 .collection-folder .collection-footer{
         padding-bottom: 0;
     }
 </style>
 