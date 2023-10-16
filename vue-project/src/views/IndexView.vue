<template>
    <div>
        <p @click="doSend">111111111</p>
    </div>
</template>

<script>
export default {
    mounted() {


    },
    methods: {
        doSend() {
            // this.$websocket.send('Hello, WebSocket Server!');
            console.log(new Date().toUTCString())

        }

    }

}
</script>
