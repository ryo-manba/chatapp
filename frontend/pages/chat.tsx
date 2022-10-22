import { Stack, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { css } from "@emotion/react";

type Message = {
  sender: string;
  message: string;
  room?: string;
};

type ChatRoom = {
  name: string;
  type: boolean;
  auther: string;
};

const showMessage = (list: Message[]) => {
  return list.map((item) => (
    <li>
      <strong>{item.sender}: </strong>
      {item.message}
    </li>
  ));
};

const socket = io("http://localhost:3000/chat");
const Chat = () => {
  const [text, setText] = useState("");
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");

  const [messages, setMessage] = useState<Message[]>([]);

  // get user name
  useEffect(() => {
    const name = String(window.prompt("ユーザー名を入力してください"));
    setUser(name);
  }, []);

  // receive a message from the server
  useEffect(() => {
    socket.on("receiveClient", (data: Message) => {
      console.log("Get client", data.message);
      setMessage((msgs) => [...msgs, data]);
    });
  }, []);

  useEffect(() => {
    socket.on("joinedRoom", (room: string) => {
      // rooms[room] = true
    });
  }, []);
  useEffect(() => {
    socket.on("leftRoom", (room: string) => {
      // rooms[room] = false
    });
  }, []);

  // send a message to the server
  const sendMessage = () => {
    console.log("send: message");
    const message = { sender: user, message: text, room: "" };
    socket.emit("message", message);
    setText("");
  };

  const createChatRoom = () => {
    console.log("[DEBUG] create ChatRoom");
    const room = {
      name: "コーヒースタンド",
      type: true,
      author: "admin",
    };
    socket.emit("createRoom", room);
    console.log("[DEBUG] finish create ChatRoom");
  };

  return (
    <>
      <h1>Chat app</h1>
      <hr />
      <p>
        <strong>Name: </strong>
        {user}
      </p>
      <TextField
        id="standard-basic"
        label="メッセージを入力してください"
        variant="standard"
        size="small"
        onChange={(e) => setText(e.target.value)}
        style={{ width: 250 }}
      />
      <Button onClick={sendMessage} variant="contained">
        送信する
      </Button>
      <Button onClick={createChatRoom} variant="contained">
        チャットルームを作成する
      </Button>
      <p>
        <strong>Talk Room</strong>
      </p>
      <ul>{showMessage(messages)}</ul>
    </>
  );
};

export default Chat;
