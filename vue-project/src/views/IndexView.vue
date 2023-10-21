<template>
  <div class="container">
    <div class="left-panel">
      <ul ref="ul">
        <!-- <li :class="[item.role]" v-for="item in chatMessages" :key="item.id">
          <p v-html="item.content"></p>
        </li> -->
      </ul>
    </div>
    <div class="right-panel">
      <input v-model="inputText" @keyup.enter="sendMessage" />
      <button @click="sendMessage">提交</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import WebSocketService from "../utils/websocket";
export default {
  setup() {
    const chatMessages = ref([]);
    const inputText = ref("你好？");
    const websocket = ref("");
    const ul = ref(null);
    let newItem;

    // 用户数据
    const sendMessage = () => {
      const data = inputText.value;
      chatMessages.value.push({ content: data, role: "user" });
      websocket.value = new WebSocketService(data);
      websocket.value.appendMessage = appendMessage;
      inputText.value = "";
    };
    const appendMessage = (data) => {
      newItem += `<div>${data[0].content}</div>`;
      ul.value.appendChild(newItem);
    };

    return {
      chatMessages,
      inputText,
      sendMessage,
      ul,
    };
  },
};
</script>

<style>
.container {
  display: flex;
  height: 100vh;
}

.left-panel {
  flex: 1;
  background-color: #f2f2f2;
  padding: 20px;
  overflow-y: auto;
}

.user {
  color: red;
  background-color: pink;
}

.assistant {
  text-align: left;
}

.right-panel {
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
}

.message {
  margin-bottom: 10px;
}
</style>
