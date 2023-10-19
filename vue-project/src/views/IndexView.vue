
<template>
    <div class="container">
        <div class="left-panel">
            <ul>
                <li :class="[item.role]" v-for="item in chatMessages" :key="item.id">
                    {{ item.content }}
                </li>
            </ul>
        </div>
        <div class="right-panel">
            <input v-model="inputText" @keyup.enter="sendMessage" />
            <button @click="sendMessage">提交</button>
        </div>
    </div>
</template>

<script>
import { ref, onUnmounted } from 'vue';
import WebSocketService from '../utils/websocket';
export default {
    setup() {
        const chatMessages = ref([]);
        const inputText = ref('你好？');
        const websocket = ref('');
        const partialMessage = ref('')

        // 点击发送事件
        // 用户数据
        const sendMessage = () => {
            const data = inputText.value;
            chatMessages.value.push({ content: data, role: 'user' })
            websocket.value = new WebSocketService(data);
            websocket.value.onMessage = onMessage;
            inputText.value = "";
        };
        // ai
        const onMessage = (data) => {
            let format = data.payload.choices.text;
            format.forEach(reply => {
                // 将分片消息逐步合并
                partialMessage.value += reply.content + ' ';
                // 如果消息是完整的，添加到chatMessages数组中
                const combinedReply = {
                    role: 'assistant',
                    content: partialMessage.value,

                }
                chatMessages.value.push(combinedReply)
                partialMessage.value = ''
            })

        };

        onUnmounted(() => {
            websocket.value.close();
        });

        return {
            chatMessages,
            inputText,
            sendMessage,
            partialMessage


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
