/* eslint-disable no-unused-expressions */
/* eslint-disable functional/no-expression-statement */
import React from 'react';
import { useSelector } from 'react-redux';
import { useGetMessagesQuery } from '../../services/messagesApi.js';
import Spinner from '../Spinner/Spinner.jsx';
import ChatForm from './ChatForm';
import ChatHeader from './ChatHeader';
import Messages from './Messages';

const Chat = () => {
  const { data: messages = [], isLoading } = useGetMessagesQuery();
  const currentChanel = useSelector((state) => state.channel);
  const currentMessages = messages.filter((message) => message.channelId === currentChanel.id);
  const userName = useSelector((state) => state.auth.username);

  isLoading ? <Spinner /> : null;

  return (
    <>
      <ChatHeader currentChanel={currentChanel} currentMessages={currentMessages} />
      <Messages currentMessages={currentMessages} />
      <ChatForm currentChanel={currentChanel} userName={userName} />
    </>
  );
};

export default Chat;
