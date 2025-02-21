import React, { useRef, useEffect } from 'react';
import leoProfanity from 'leo-profanity';

const Messages = ({ currentMessages }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView();
    }
  }, [currentMessages]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {currentMessages.map((message) => (
        <div className="text-break mb-2" key={message.id} ref={inputRef}>
          <b>{message.username}</b>
          {': '}
          { leoProfanity.clean(message.body)}
        </div>
      ))}
    </div>
  );
};
export default Messages;
