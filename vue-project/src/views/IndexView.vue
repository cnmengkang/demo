<template>
    <div class="container">
        <div class="left-panel">
            <ul>
                <li :class="[item.role]" v-for="item in messages" :key="item.id">{{ item.content }}</li>

            </ul>
        </div>
        <div class="right-panel">
            <input v-model="inputText" @keyup.enter="sendMessage" />
            <button @click="sendMessage">提交</button>
        </div>
    </div>
</template>

<script>
import { ref, onUnmounted, computed } from 'vue';
import WebSocketService from '../utils/websocket';

export default {
    setup() {
        const messages = ref([]);
        const inputText = ref('你好？');
        const websocket = ref('');

        // 点击发送事件
        // 用户数据
        const sendMessage = () => {
            const data = inputText.value;
            messages.value.push({ id: Date.now(), role: 'user', content: data })
            websocket.value = new WebSocketService(data);
            websocket.value.onMessage = onMessage;
        };
        // ai
        const onMessage = (data) => {
            let format = data.payload.choices.text[0];
            messages.value.push(format);
        };
        // 处理结果数据

        onUnmounted(() => {
            websocket.value.close();
        });
        return {
            messages,
            inputText,
            sendMessage,

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
