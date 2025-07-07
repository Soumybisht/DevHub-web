import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../constants/BASE_URL";
import { getSocket } from "../utils/socket";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUserName, setTargetUserName] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const socket = getSocket(); // Persistent socket
  const prevRoomRef = useRef(null);
  const messageEndRef = useRef(null);

  // Fetch target user name
  const fetchTargetUserName = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/" + targetUserId, {
        withCredentials: true,
      });
      setTargetUserName(`${res.data.firstName} ${res.data.lastName}`);
    } catch (err) {
      console.error("Could not fetch target user name");
    }
  };

  // Fetch chat messages
  const fetchChatMessages = async () => {
    try {
      const res = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      const chatMessages = res?.data?.messages.map((msg) => {
        const { senderId, text, createdAt } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          senderId: senderId?._id,
          text,
          time: createdAt || new Date().toISOString(),
        };
      });
      setMessages(chatMessages);
    } catch (err) {
      console.error("Failed to fetch messages", err.message);
    }
  };

  // Scroll to bottom
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch target user & messages on route param change
  useEffect(() => {
    fetchTargetUserName();
    fetchChatMessages();
  }, [targetUserId]);

  // Join chat room and handle messages
  useEffect(() => {
    if (!userId || !targetUserId) return;

    const roomId = [userId, targetUserId].sort().join("$");

    // Leave previous room
    if (prevRoomRef.current && prevRoomRef.current !== roomId) {
      socket.emit("leaveChat", { roomId: prevRoomRef.current });
    }

    // Join new room
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    prevRoomRef.current = roomId;

    // Only handle messages from active chat partner
    const handleMessage = ({ firstName, lastName, text, senderId, receiverId, time }) => {
  if (
    (senderId === targetUserId && receiverId === userId) ||
    (senderId === userId && receiverId === targetUserId)
  ) {
    setMessages((prev) => [
      ...prev,
      { firstName, lastName, text, time, senderId },
    ]);
  } else {
    console.log(`Ignored message from ${firstName} (not in chat view)`);
  }
};


    socket.on("messageReceived", handleMessage);

    return () => {
      socket.off("messageReceived", handleMessage);
    };
  }, [userId, targetUserId]);

  // Send message
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage.trim(),
    });

    setNewMessage("");
  };

  const formatTime = (isoTime) => {
    const date = new Date(isoTime);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 text-2xl text-center border-b border-gray-600">
        Chat with {targetUserName || "..."}
      </h1>

      <div className="flex-1 overflow-y-scroll p-5">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              "chat " +
              (user._id === msg.senderId ? "chat-end" : "chat-start")
            }
          >
            <div className="chat-header">
              {`${msg.firstName} ${msg.lastName}`}
              <time className="text-xs opacity-50 ml-2">
                {formatTime(msg.time)}
              </time>
            </div>
            <div className="chat-bubble">{msg.text}</div>
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>

      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        />
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
