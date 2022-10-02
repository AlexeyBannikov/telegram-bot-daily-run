const TelegramApi = require('node-telegram-bot-api');
const { appOption } = require('./options');

const token = '';

const bot = new TelegramApi(token, { polling: true });

const appMap = {};

const startApp = async (chatId) => {
  return bot.sendMessage(chatId, 'Ты сегодня бегал?', appOption);
};

const start = () => {
  let count;
  appMap[count] = 0;

  bot.setMyCommands([
    { command: '/start', description: 'Начальное приветствие' },
    { command: '/letsgo', description: 'Начать работу над собой' },
  ]);

  bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const interval = () => {
      setInterval(() => startApp(chatId), 1000 * 60 * 60 * 24);
    };

    if (text === '/start') {
      await bot.sendSticker(
        chatId,
        'https://tlgrm.eu/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/192/1.webp',
      );

      return bot.sendMessage(chatId, 'Добро пожаловать');
    }
    if (text === '/letsgo') {
      interval();
      return startApp(chatId);
    }

    return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй ещё раз');
  });

  bot.on('callback_query', async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    appMap[chatId] = data;

    if (data === '0') {
      await bot.sendMessage(
        chatId,
        `К сожалению ты прервал свою полосу беговых дней! Всего было - ${appMap[count]}`,
      );
      appMap[count] = 0;
    } else {
      appMap[count] += 1;
      console.log(appMap[count]);

      return bot.sendMessage(chatId, `Красава! Ты бегаешь уже ${appMap[count]} день`);
    }
  });
};

start();
