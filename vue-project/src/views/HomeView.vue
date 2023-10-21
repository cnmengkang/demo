<template>
  <div>
    <ul>
      <li v-for="message in messages" :key="message.id">{{ message.text }}</li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const messages = ref([]); // 存储所有消息

    // 模拟从服务端接收分片消息
    const simulateReceiveChunk = async () => {
      // 模拟异步接收数据
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newChunk = [
        {
          id: messages.value.length + 1,
          text: "Message " + (messages.value.length + 1),
        },
        {
          id: messages.value.length + 2,
          text: "Message " + (messages.value.length + 2),
        },
        // 添加更多分片消息
      ];

      messages.value = [...messages.value, ...newChunk];
      console.log(messages.value)
    };

    onMounted(() => {
      // 模拟开始接收分片消息
      simulateReceiveChunk();
    });

    return {
      messages,
    };
  },
};
</script>
