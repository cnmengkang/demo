<template>
    <div>
        <!-- <button @click="connectWebSocket">连接</button> -->
        <input v-model="message" @keyup.enter="sendMessage">
        <button @click="sendMessage">提交</button>
        <div class="box">
            <div class="left">
                <p v-for="(item, index) in user" :key="index">
                    {{ item.content }}
                </p>
            </div>
            <div class="right">
                <p v-for="(item, index) in messages" :key="index">
                    {{ item.content }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import WebSocketService from '../utils/websocket'; // 请替换为实际的文件路径
export default {
    data() {
        return {
            websocket: null,
            message: '你好?',
            messages: [],
            user: []
        };
    },
    methods: {
        sendMessage() {
            this.websocket = new WebSocketService();
            this.websocket.connect(this.message);
            this.websocket.addMessageHandler(this.resultMessage);
            this.user.push({ role: 'user', content: `You: ${this.message}` });
        },
        resultMessage(message) {
            this.messages.push({ role: 'dd', content: `AI: ${message}` });
        }
    },
}
</script>