// websocket

import CryptoJS from 'crypto-js';
import { base64 } from 'base64-js';
const APPID = 'd9975a5a';
const API_SECRET = 'ZWRhNWVlZTMyZTMyN2RlNjU3ZmMxMjVj';
const API_KEY = '93644b74d4b368c48aa251e086c4a5cc';
const baseUrl = {
    aa() {
        let apiKey = API_KEY;
        let apiSecret = API_SECRET;
        let url = 'wss://spark-api.xf-yun.com/v1.1/chat'
        let host = location.host
        let date = new Date().toUTCString();
        let algorithm = 'hmac-sha256'
        let headers = 'host date request-line'
        let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`
        let signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
        let signature = CryptoJS.enc.Base64.stringify(signatureSha)
        let authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
        let authorization = btoa(authorizationOrigin)
        url = `${url}?authorization=${authorization}&date=${date}&host=${host}`
        return url
    }
}
class WebSocketService {
    constructor(url) {
        this.url = url;
        this.socket = null;
        this.connected = false;
        this.messageQueue = [];
        this.messageHandlers = [];
    }

    connect() {
        this.socket = new WebSocket(this.url);

        this.socket.addEventListener('open', () => {
            this.connected = true;
            this.sendQueuedMessages();
        });

        this.socket.addEventListener('message', (event) => {
            this.handleMessage(event.data);
        });

        this.socket.addEventListener('close', () => {
            this.connected = false;
        });

        this.socket.addEventListener('error', (error) => {
            console.error('WebSocket error:', error);
        });
    }

    send(message) {
        if (this.connected) {
            this.socket.send(message);
        } else {
            this.messageQueue.push(message);
        }
    }

    sendQueuedMessages() {
        while (this.messageQueue.length > 0) {
            const message = this.messageQueue.shift();
            this.send(message);
        }
    }

    handleMessage(message) {
        this.messageHandlers.forEach((handler) => {
            handler(message);
        });
    }

    addMessageHandler(handler) {
        this.messageHandlers.push(handler);
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
        }
    }
}

export default WebSocketService;

