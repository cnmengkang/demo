// websocket

import CryptoJS from 'crypto-js';
import { base64 } from 'base64-js';
const APPID = 'd9975a5a';
const API_SECRET = 'ZWRhNWVlZTMyZTMyN2RlNjU3ZmMxMjVj';
const API_KEY = '93644b74d4b368c48aa251e086c4a5cc';
const getWebSocketUrl = {
    author() {
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
        return url;
    }
}
// WebSocketService.js

class WebSocketService {
    constructor(data) {
        this.websocket = new WebSocket(getWebSocketUrl.author());

        this.websocket.onopen = () => {
            console.log('WebSocket连接已打开');
            this.WebSocketSend(data)
        };

        this.websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.onMessage(data);

        };

        this.websocket.onclose = () => {
            console.log('WebSocket连接已关闭');
        };

        this.websocket.onerror = (error) => {
            console.error('WebSocket发生错误:', error);
        };
    }

    onMessage(data) {
        // 处理接收到的数据
    }

    // 发送数据包
    WebSocketSend(message) {
        let params = {
            "header": {
                "app_id": APPID,
                "uid": "fd3f47e4-d"
            },
            "parameter": {
                "chat": {
                    "domain": "general",
                    "temperature": 0.5,
                    "max_tokens": 1024
                }
            },
            "payload": {
                "message": {
                    "text": [

                        {
                            "role": "user",
                            "content": message
                        }
                    ]
                }
            }
        }
        this.websocket.send(JSON.stringify(params));
    }
    // 手动关闭
    close() {
        this.websocket.close();
    }
}

export default WebSocketService;

