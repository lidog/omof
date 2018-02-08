<template>
 <div class="test">
    <addressTree @addressSelect="addressSelect" :data="addressData"></addressTree>
 </div>

 </template>

<script>
import addressData  from 'assets/js/address.js';
import addressTree  from 'components/addressTree';
 export default {
   components: {
     addressTree
   },
   data: function(){
     return {
       addressData: {}
     }
   },
   methods: {
     addressSelect: function(msg){
       console.log(msg)
     }
   },
   created: function(){
     this.addressData = addressData;
   }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.test{
  padding: 30px;
}
</style>
