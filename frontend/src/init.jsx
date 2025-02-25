import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import leoProfanity from 'leo-profanity';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { addCurrentChannel } from './redux/slices/uiSlice.js';
import { channelsApi } from './services/channelsApi';
import { messagesApi } from './services/messagesApi';
import rollbarConfig from './components/configs/rollbar.js';
import App from './App';
import resources from './locales/index.js';
import store from './redux/store.js';

const init = async (socket) => {
  leoProfanity.add(leoProfanity.getDictionary('en'));
  leoProfanity.add(leoProfanity.getDictionary('ru'));

  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  const listenerNewChannel = (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData(
        'getСhannels',
        undefined,
        (draftChannels) => {
          draftChannels.push(payload);
        },
      ),
    );
  };

  const listenerNewMessage = (payload) => {
    store.dispatch(
      messagesApi.util.updateQueryData(
        'getMessages',
        undefined,
        (draftMessage) => {
          draftMessage.push(payload);
        },
      ),
    );
  };

  const listenerRemoveChannel = (payload) => {
    const state = store.getState();
    if (state.channel.id === payload.id) {
      store.dispatch(addCurrentChannel(state.channel));
    }
    store.dispatch(
      channelsApi.util.updateQueryData(
        'getСhannels',
        undefined,
        (draftChannels) => draftChannels.filter(({ id }) => id !== payload.id),
      ),
    );
  };

  const listenerRenameChannel = (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData(
        'getСhannels',
        undefined,
        (draftChannels) => {
          const channel = draftChannels.find((item) => item.id === payload.id);
          channel.name = payload.name;
          if (channel) {
            channel.name = payload.name;
          }
        },
      ),
    );
  };

  socket.on('newChannel', listenerNewChannel);
  socket.on('removeChannel', listenerRemoveChannel);
  socket.on('renameChannel', listenerRenameChannel);
  socket.on('newMessage', listenerNewMessage);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <RollbarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </RollbarProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
