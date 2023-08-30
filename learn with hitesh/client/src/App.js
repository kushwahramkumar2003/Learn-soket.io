import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import "./App.css";

const socket = io("http://localhost:5000");
const userName = nanoid(4);
const App = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [myMessage, setMyMessage] = useState([]);
  const [friendMessage, setFriendMessage] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
    console.log(socket);
  }, [chat]);

  return (
    <div className=" w-[100%] h-[100%] flex-wrap justify-center content-center text-center my-6 mx-10 text-white">
      <h1 className="flex-wrap content-center justify-center text-3xl font-bold text-center">
        Chatty App
      </h1>
      {chat.map((payload, index) => {
        return (
          <p key={index}>
            {payload.message} : <span>id: {payload.userName}</span>
          </p>
        );
      })}
      <form onSubmit={sendChat}>
        <input
          className="p-1 font-bold rounded-md bg-zinc-500"
          type="text"
          name="chat"
          placeholder="send text"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
        />
        <button
          type="submit"
          className="px-2 py-1 font-bold duration-150 bg-teal-800 rounded-lg hover:bg-sky-950"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default App;
