import React from 'react';
import { useSelector } from 'react-redux';
import { useGetMessagesQuery } from '../../services/messagesApi.js';
import Spinner from '../Spinner/Spinner.jsx';
import ChatForm from './ChatForm';
import ChatHeader from './ChatHeader';
import Messages from './Messages';
import { selectCurrentChannel } from '../../services/channelsApi.js';
import { selectUsername } from '../../redux/slices/authSlice.js';
import { selectCurrentChannelId } from '../../redux/slices/selectorsUi.js';

const Chat = () => {
  const { data: messages = [], isLoading } = useGetMessagesQuery();
  const currentChanelId = useSelector(selectCurrentChannelId);
  const currentChanel = useSelector(selectCurrentChannel);
  const currentMessages = messages.filter((message) => message.channelId === currentChanelId);
  const userName = useSelector(selectUsername);

  console.log(currentChanel)

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <ChatHeader currentChanel={currentChanel} currentMessages={currentMessages} />
      <Messages currentMessages={currentMessages} />
      <ChatForm currentChanel={currentChanel} userName={userName} />
    </>
  );
};

export default Chat;
