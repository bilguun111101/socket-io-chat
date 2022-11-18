import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const connectChatServer = () => {
  const socket = io("http://localhost:3000/", {
    transports: ["websocket"],
  });
  return socket;
};
function App() {
  const [IsSendMessage, setSendMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([""]);
  useEffect(() => {
    let socket = connectChatServer();
    socket.emit("chat message", message);
    return () => {
      socket.disconnect();
    };
  }, [IsSendMessage]);

  useEffect(() => {
    let socket = connectChatServer();
    socket.onAny((type, message) => {
      if (message) {
        setMessages((m) => [...m, message]);
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => setSendMessage((e) => !e)}>Ilgeeh</button>
      <ul>
        {messages.map((message) => (
          <li>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
