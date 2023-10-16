<template>
    <div>
        <button @click="connectWebSocket">连接</button>
        <button @click="disconnectWebSocket">关闭连接</button>
        <input v-model="message" @keyup.enter="sendMessage" placeholder="Enter a message">
        <button @click="sendMessage">提交</button>
        <ul>
            <li v-for="msg in messages" :key="msg.id">{{ msg.text }}</li>
        </ul>
    </div>
</template>

<script>
import WebSocketService from '../utils/websocket'; // 请替换为实际的文件路径

export default {
    data() {
        return {
            websocket: null,
            message: '',
            messages: [],
        };
    },
    methods: {
        connectWebSocket() {
            this.websocket = new WebSocketService(); // 替换为实际的 WebSocket 地址
            this.websocket.connect();
            this.websocket.addMessageHandler(this.handleMessage);
        },
        disconnectWebSocket() {
            if (this.websocket) {
                this.websocket.disconnect();
            }
        },
        sendMessage() {
            this.websocket.send(this.message);
            this.messages.push({ id: Date.now(), text: `You: ${this.message}` });
            this.message = '';
        },
        handleMessage(message) {
            this.messages.push({ id: Date.now(), text: message });
        },
    },
}
</script>
