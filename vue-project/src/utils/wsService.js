class wsService {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.initWebSocket();
  }
  // 初始化
  initWebSocket() {
    this.socket = new WebSocket(this.url);
    //建立连接
    this.socket.onopen = (open) => {
      console.log("connect");
    };
    //接收消息
    this.socket.onmessage = (event) => {
      console.log("success", event.data);
    };
    // 连接关闭
    this.socket.onclose = (close) => {
      console.log("close");
    };
    // websocket错误
    this.socket.onerror = (err) => {
      console.log("error", err);
    };
  }
  //   0 —— “CONNECTING”：连接还未建立，
  // 1 —— “OPEN”：通信中，
  // 2 —— “CLOSING”：连接关闭中，
  // 3 —— “CLOSED”：连接已关闭。
  send(message) {
    if (this.checkStatus) {
      console.log("check");
      this.socket.send(message);
    }
  }
  //检测连接状态
  checkStatus() {
    console.log(this.socket.readyState);
    return this.socket && this.socket.readyState === WebSocket.OPEN;
  }
  //   关闭连接
  close() {
    if (this.checkStatus()) {
      this.socket.close();
    }
  }
}
export default wsService;
