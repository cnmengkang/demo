<template>
  <div class="aboutViews">
    <div class="left">
      <div class="user">{{ inputValue }}</div>
    </div>
    <div class="right">
      <input type="text" v-model="inputValue" />
      <button @click="sendMessage">发送</button>
      <button @click="close">close</button>
    </div>
  </div>
</template>

<script setup>
import wsService from "../utils/wsService";
import { ref } from "vue";
const ws = new wsService("wss://javascript.info/article/websocket/demo/hello");
const inputValue = ref("你好？");
function sendMessage() {
  // ws.value.send(inputValue.value);
  console.log(ws);
}
function close() {
  ws.close();
}
</script>
<style scoped></style>
