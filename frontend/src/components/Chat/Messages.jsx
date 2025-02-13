/* eslint-disable no-unused-expressions */
/* eslint-disable functional/no-expression-statement */
import React, { useRef, useEffect } from 'react';
import leoProfanity from 'leo-profanity';

const Messages = ({ currentMessages }) => {
  leoProfanity.add(leoProfanity.getDictionary('en'));
  leoProfanity.add(leoProfanity.getDictionary('ru'));

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current ? inputRef.current.scrollIntoView() : null;
  }, [currentMessages]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {currentMessages.map((message) => (
        <div
          className="text-break mb-2"
          key={message.id}
          ref={inputRef}
        >
          <b>{message.username}</b>
          {': '}
          { leoProfanity.clean(message.body)}
        </div>
      ))}
    </div>
  );
};
export default Messages;
