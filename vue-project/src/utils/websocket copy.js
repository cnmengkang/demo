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
class WebSocketService {
    constructor() {
        this.socket = new WebSocket(getWebSocketUrl.author());
        this.app_id = APPID
        this.messageHandlers = [];
    }
    // 建立连接
    connect(message) {
        this.socket.addEventListener('open', () => {
            console.log('success')
            this.WebSocketSend(message)
        });

        this.socket.addEventListener('message', (event) => {
            this.resultMessage(event.data);
        });

        this.socket.addEventListener('close', () => {
            console.log('close')
        });

        this.socket.addEventListener('error', (error) => {
            console.error('WebSocket error:', error);
        });
    }
    // 发送数据包
    WebSocketSend(message) {
        let params = {
            "header": {
                "app_id": this.app_id,
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
        this.socket.send(JSON.stringify(params));
    }
    // 成功接受数据
    resultMessage(message) {
        let jsonParse = JSON.parse(message);
        let textContent = jsonParse.payload.choices.text[0].content;
        this.messageHandlers.forEach((handler) => {
            handler(textContent);
        });
    }
    addMessageHandler(handler) {
        this.messageHandlers.push(handler);
    }
}

export default WebSocketService;
