import React from 'react';
import leoProfanity from 'leo-profanity';

const Messages = ({ username, body }) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    {': '}
    { leoProfanity.clean(body)}
  </div>
);

export default Messages;
