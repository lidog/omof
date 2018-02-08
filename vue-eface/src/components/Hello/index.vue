<template>
  <div :class="$style.hello">
    <img src="./images/hello.gif" />
    我是一个组件
  </div>
</template>

<script>
export default {
  name: 'Hello'
}
</script>

// 使用css module
<style module>
.hello {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
