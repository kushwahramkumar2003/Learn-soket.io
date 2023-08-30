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
  }, [chat]);

  return (
    <div className=" w-[100%] h-[100%] flex-wrap justify-center content-center text-center my-6 mx-10 text-white">
      <h1 className="text-3xl font-bold justify-center flex-wrap content-center text-center">
        Chatty App
      </h1>
      {chat.map((payload, index) => {
        return (
          <p
            key={index}
            className={`${
              payload.userName == userName ? "float-left" : "float-right"
            } flex-wrap flex-col`}
          >
            {payload.message} : <span>id: {payload.userName}</span>
          </p>
        );
      })}
      <form onSubmit={sendChat}>
        <input
          className="p-1 rounded-md font-bold bg-zinc-500"
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
          className="bg-teal-800 px-2 py-1 rounded-lg hover:bg-sky-950 duration-150 font-bold"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default App;
