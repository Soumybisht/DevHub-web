// utils/socket.js
import io from "socket.io-client";
import { BASE_URL } from "../constants/BASE_URL";

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(BASE_URL, { withCredentials: true });
  }
  return socket;
};
