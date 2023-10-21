// websocket

import CryptoJS from "crypto-js";
import { base64 } from "base64-js";
const APPID = "d9975a5a";
const API_SECRET = "ZWRhNWVlZTMyZTMyN2RlNjU3ZmMxMjVj";
const API_KEY = "93644b74d4b368c48aa251e086c4a5cc";
const BASE_URL = "wss://spark-api.xf-yun.com/v1.1/chat";
const getWebSocketUrl = {
  author() {
    let apiKey = API_KEY;
    let apiSecret = API_SECRET;
    let url = BASE_URL;
    let host = location.host;
    let date = new Date().toUTCString();
    let algorithm = "hmac-sha256";
    let headers = "host date request-line";
    let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`;
    let signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
    let signature = CryptoJS.enc.Base64.stringify(signatureSha);
    let authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
    let authorization = btoa(authorizationOrigin);
    url = `${url}?authorization=${authorization}&date=${date}&host=${host}`;
    return url;
  },
};
// WebSocketService.js

class WebSocketService {
  constructor(data) {
    this.websocket = new WebSocket(getWebSocketUrl.author());
    this.messageFragments = []; //处理消息分片的数据帧
    this.chatMessage = [];
    this.status = "";
    this.websocket.onopen = () => {
      console.log("WebSocket连接已打开");
      this.WebSocketSend(data);
    };
    this.websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      let format = data.payload.choices.text;
      this.status = data.header.status;
      this.messageFragments.push(format);
      this.appendMessage(format);
      // 先检测消息完整性，如果消息完整直接处理？
      // if (this.messageIsComplete()) {
      //   this.handleCompleteMessage();
      // }
    };
    this.websocket.onclose = () => {
      console.log("WebSocket连接已关闭");
    };

    this.websocket.onerror = (error) => {
      console.error("WebSocket发生错误:", error);
    };
  }

  appendMessage(data) {
    // 处理接收到的数据
  }
  // 检测消息完整性
  messageIsComplete() {
    return this.status === 2 && this.messageFragments.length > 0;
  }
  // 合并数据以构建完整消息
  handleCompleteMessage() {
    // console.log("合并与构建完整消息");
    const combinedPayload = this.messageFragments.join("");
    this.appendMessage(combinedPayload);
  }
  // 发送数据包
  WebSocketSend(message) {
    let params = {
      header: {
        app_id: APPID,
        uid: "fd3f47e4-d",
      },
      parameter: {
        chat: {
          domain: "general",
          temperature: 0.5,
          max_tokens: 1024,
        },
      },
      payload: {
        message: {
          text: [
            {
              role: "user",
              content: message,
            },
          ],
        },
      },
    };
    this.websocket.send(JSON.stringify(params));
  }
  // 手动关闭
  close() {
    this.websocket.close();
  }
}

export default WebSocketService;
