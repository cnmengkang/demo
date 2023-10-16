#Vue3
###指令Directives
`v-html`
`v-bind`
`v-for`
`v-if`
`v-on`
###动态参数
###修饰符
```
<form @submit.prevent="onSubmit">...</form>
```
###响应式基础
```
import { ref } from 'vue'
const count = ref(0)
<!-- console.log(count.value) 0 -->
```
####声明响应状态
```

<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```
// websocket


/*  一.websocket相关事件
    1.open:连接建立时触发
    2.message：客户端接受请求时触发
    3.error：通信时发生错误时触发
    4.close：连接关闭时触发


    二.websocket相关状态
    0-表示连接尚未建立
    1-表示连接已建立，可以进行通信
    2-表示连接正在进行关闭
    3-表示连接已经关闭或者连接不能打开。

    三.websocket方法
    send:使用连接发送数据
    close：关闭连接
*/