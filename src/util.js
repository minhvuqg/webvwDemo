class PostMessage {
  id = 1;
  handlers = {};

  constructor() {
    window.onMessageReceive = (handleId, error, data) => {
      if (error) {
        this.handlers[handleId].reject(error);
      } else {
        this.handlers[handleId].resolve(data);
      }
      delete this.handlers[handleId];
    };
  }

  sendMessage(handler, data) {
    return new Promise((resolve, reject) => {
      const handleId = "m" + this.id++;
      console.log(handleId);
      this.handlers[handleId] = { resolve, reject };
      window?.webkit?.messageHandlers?.[handler]?.postMessage({
        data: data,
        id: handleId,
      });
    });
  }
}
const postMessage = new PostMessage();
export default postMessage;
