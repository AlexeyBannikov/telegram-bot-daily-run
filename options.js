module.exports = {
  appOption: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: 'Да', callback_data: '1' },
          { text: 'Нет', callback_data: '0' },
        ],
      ],
    }),
  },
};
