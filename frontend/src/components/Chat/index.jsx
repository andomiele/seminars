import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetMessagesQuery } from '../../services/messagesApi.js';
import Spinner from '../Spinner/Spinner.jsx';
import ChatForm from './ChatForm';
import ChatHeader from './ChatHeader';
import Message from './Message.jsx';
import { selectCurrentChannel } from '../../services/channelsApi.js';
import { selectUsername } from '../../redux/slices/authSlice.js';
import { selectCurrentChannelId } from '../../redux/slices/selectorsUi.js';

const Chat = () => {
  const { data: messages = [], isLoading } = useGetMessagesQuery();
  const currentChannelId = useSelector(selectCurrentChannelId);
  const channel = useSelector(selectCurrentChannel);
  const currentMessages = messages.filter((message) => message.channelId === currentChannelId);
  const userName = useSelector(selectUsername);

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollTo({
        top: inputRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [channel, messages.length]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="d-flex flex-column h-100">
      <ChatHeader channelName={channel?.name} value={currentMessages.length} />
      <div ref={inputRef} id="messages-box" className="chat-messages overflow-auto px-5 ">
        {currentMessages.map(({ id, username, body }) => (
          <Message key={id} username={username} body={body} />
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <ChatForm channelId={currentChannelId} username={userName} />
      </div>
    </div>
  );
};

export default Chat;
