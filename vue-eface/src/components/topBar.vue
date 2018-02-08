/****  页面头部导航 ****/
1、调用： 
	<top-bar>
		<div slot="left">左边插槽</div>
		<div slot="right">右边插槽</div>
        <div slot="center">中间插槽</div>
	</top-bar>
2、通信： 无
/****  组件说明   ****/

<style lang='scss'>
.top-bar{
        z-index: 2;
	    height: 62px;
	    line-height: 60px;
	    font-size: 14px;
	    color: rgba(0,0,0,.65);
	    border-bottom: 1px solid #e6e9f0;
        background: #f6f8fb;
        text-align: center;
        .left{
            margin-left: 10px;
        }
        .right{
            margin-right: 10px;
        }
        .center{
            
        }
	}
</style>

<style lang='scss' scoped>
	.top-bar{
	 	width: 100%;
	    position: fixed;
	    top: 0;
	    left: 0;
	    -webkit-user-select: none;
	    -moz-user-select: none;
	    -ms-user-select: none;
        user-select: none;

		.left{
			display: inline-block;
			float: left;
		}
		.right{
            display: inline-block;
            float: right;
        }
        .center{
           
        }

		&:after{
			content:'';
			width: 100%;
			height: 0;
			clear: both;
		}
	}
</style>


<template>
 	<div class="top-bar clearfix">
		<div class="left">
			<slot name="left"></slot>
		</div>
		<div class="right">
			<slot name="right"></slot>
		</div>
         <div class="center">
			<slot name="center"></slot>
		</div>
	</div>
</template>

<script>
export default {
}
</script>