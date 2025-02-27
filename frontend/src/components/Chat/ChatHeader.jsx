import React from 'react';
import { useTranslation } from 'react-i18next';

const ChatHeader = ({ channelName = '', value }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{`# ${channelName}`}</b>
      </p>
      <span className="text-muted">{t('chat.counter.count', { count: value })}</span>
    </div>
  );
};

export default ChatHeader;
