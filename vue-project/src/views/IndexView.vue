<template>
  <div class="wrapper">
    <div :class="[item.role]" v-for="item in chatMessages" :key="item.id">
      <div class="wrapper-text flex">
        <el-avatar
          shape="square"
          :size="36"
          :src="item.role == 'user' ? squareUrl : circleUrl"
        ></el-avatar>
        <div class="auto" v-html="parseMarkdown(item.content)"></div>
      </div>
    </div>
    <div class="wrapper-footer">
      <div class="wrapper-send flex">
        <el-input v-model="inputText" @keyup.enter="sendMessage" />
        <el-button @click="sendMessage">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import WebSocketService from "../utils/websocket";
import MarkdownIt from "markdown-it";
export default {
  setup() {
    const chatMessages = ref([]);
    const inputText = ref("你好？");
    const websocket = ref("");
    const squareUrl = ref(
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    );
    const circleUrl = ref(
      "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    );
    // 用户数据
    const sendMessage = () => {
      const data = inputText.value;
      chatMessages.value.push({ content: data, role: "user" });
      websocket.value = new WebSocketService(data);
      websocket.value.appendMessage = appendMessage;
      inputText.value = "";
    };
    const appendMessage = (data) => {
      chatMessages.value.push({ role: "assistant", content: data });
    };
    const parseMarkdown = (text) => {
      const md = new MarkdownIt();
      return md.render(text);
    };
    return {
      chatMessages,
      inputText,
      sendMessage,
      parseMarkdown,
      squareUrl,
      circleUrl,
    };
  },
};
</script>
<style>
.wrapper{
  height: 100vh;
}
p{
  margin-bottom: 15px;
}
.wrapper-text {
  margin: 0 auto;
  max-width: 48rem;
}
.wrapper-footer{
  position: flex;
  bottom: 0px;
}
.auto{

}
.wrapper-send {

}
.flex {
  display: flex;
  flex-wrap: nowrap;
  gap: 15px;
  padding: 15px 0px;
}

.user {
  color: #000;
  font-weight: bold;
  font-size: 16px;
  background-color: #fff;
}

.assistant {
  background-color: #eee;
  font-weight: bold;
  font-size: 16px;
}
</style>
