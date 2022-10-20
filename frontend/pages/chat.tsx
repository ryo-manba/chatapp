import { Stack, Button } from "@mui/material";
import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";

type Message = {
  sender: string;
  room: string;
  message: string;
};

const showList = (list: string[]) => {
  return list.map((item) => <li>{item}</li>);
};

const socket = io("http://localhost:3000/chat");
const Chat = () => {
  const [text, setText] = useState("");
  const [textList, setTextList] = useState<string[]>([]);

  // receive a message from the server
  useEffect(() => {
    socket.on("eventsClient", (data) => {
      console.log("Get client", data);
      setTextList((MessageList) => [...MessageList, data]);
    });
  }, []);

  // 接続、及び再接続時に発生する
  socket.on("connect", () => {
    console.log("Connected");
  });
  // 切断時に発生する
  socket.on("disconnect", () => {
    console.log("Disconnected");
  });

  // send a message to the server
  const sendMessage = () => {
    console.log("send: message");
    socket.emit("events", text);
    setText("");
  };

  return (
    <>
      <h1>Chat app</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={sendMessage}>メッセージを送信する</button>

      <p>
        <strong>Talk</strong>
      </p>
      <hr />
      <ul>{showList(textList)}</ul>
    </>
  );
};

export default Chat;
