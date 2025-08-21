import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';
import { patchData } from '../lib/patchClient';

const token = process.env.TELEGRAM_BOT_TOKEN!;
const bot = new TelegramBot(token, { polling: true });

type Field = 'bankName' | 'receiver' | 'cardNumber';
const fields: Field[] = ['bankName', 'receiver', 'cardNumber'];

type UserSession = {
  hasStarted: boolean;
  field?: Field;
  data: Record<Field, string>;
  updateAllStep?: number;
  tempData?: Partial<Record<Field, string>>;
};

const userState = new Map<number, UserSession>();

bot.onText(/\/ping/, (msg) => {
  bot.sendMessage(msg.chat.id, '🏓 Pong!');
});

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    const res = await fetch(`${process.env.API_URL}/api/seed`, { method: 'POST' });
    const result = await res.json();

    if (!res.ok) {
      bot.sendMessage(chatId, `❌ Seeding failed: ${result.error}.`);
      return;
    }

    userState.set(chatId, {
      hasStarted: true,
      data: {
        bankName: result.bankName,
        receiver: result.receiver,
        cardNumber: result.cardNumber,
      },
    });

    bot.sendMessage(chatId, [
      `✅ Seeded ${result.count} record.`,
      `🏦 Bank Name: ${result.bankName}`,
      `👤 Receiver: ${result.receiver}`,
      `💳 Card Number: ${result.cardNumber}`,
    ].join('\n'));
  } catch (err: any) {
    bot.sendMessage(chatId, `⚠️ Error: ${err.message}`);
  }
});

bot.onText(/\/update/, (msg) => {
  const chatId = msg.chat.id;
  const state = userState.get(chatId);

  if (!state?.hasStarted) {
    bot.sendMessage(chatId, '❗️ Please run /start first to initialize the data.');
    return;
  }

  userState.set(chatId, { ...state, field: undefined });

  bot.sendMessage(chatId, '🛠 What field do you want to update?', {
    reply_markup: {
      inline_keyboard: fields.map((f) => [{
        text: f.replace(/^\w/, c => c.toUpperCase()),
        callback_data: `update:${f}`,
      }]),
    },
  });
});

bot.onText(/\/uall/, (msg) => {
  const chatId = msg.chat.id;
  const state = userState.get(chatId);

  if (!state?.hasStarted) {
    bot.sendMessage(chatId, '❗️ Please run /start first to initialize the data.');
    return;
  }

  userState.set(chatId, {
    ...state,
    updateAllStep: 0,
    tempData: {},
    field: undefined,
  });

  bot.sendMessage(chatId, `✏️ Please enter the new ${fields[0]}:`);
});

bot.on('callback_query', async (query) => {
  const chatId = query.message?.chat.id!;
  const state = userState.get(chatId);

  if (!state?.hasStarted) {
    bot.sendMessage(chatId, '❗️ Please run /start first to initialize the data.');
    return;
  }

  const data = query.data;
  if (!data?.startsWith('update:')) return;

  const field = data.split(':')[1] as Field;
  userState.set(chatId, { ...state, field });

  const currentValue = state.data[field] ?? 'N/A';
  bot.sendMessage(chatId, `✏️ Current ${field}: ${currentValue}\nPlease send the new value:`);
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (!text || text.startsWith('/')) return;

  const state = userState.get(chatId);
  if (!state) return;

  if (state.updateAllStep !== undefined) {
    const step = state.updateAllStep;
    const field = fields[step];
    const tempData = { ...state.tempData, [field]: text };

    if (step < fields.length - 1) {
      userState.set(chatId, {
        ...state,
        updateAllStep: step + 1,
        tempData,
      });

      bot.sendMessage(chatId, `✏️ Please enter the new ${fields[step + 1]}:`);
    } else {
      try {
        const payload = { id: 1, ...tempData };
        await patchData(payload);

        const updatedData = { ...state.data, ...tempData };
        userState.set(chatId, {
          hasStarted: true,
          data: updatedData,
        });

        bot.sendMessage(chatId, `✅ All fields updated successfully.`);
        bot.sendMessage(chatId, [
          `📦 Current Data:`,
          `🏦 Bank Name: ${updatedData.bankName}`,
          `👤 Receiver: ${updatedData.receiver}`,
          `💳 Card Number: ${updatedData.cardNumber}`,
        ].join('\n'));
      } catch (err: any) {
        bot.sendMessage(chatId, `❌ Update failed: ${err.message}`);
      }
    }

    return;
  }

  if (state.field) {
    const field = state.field;
    const newValue = text;

    try {
      const payload = { id: 1, [field]: newValue };
      await patchData(payload);

      const updatedData = { ...state.data, [field]: newValue };
      userState.set(chatId, {
        hasStarted: true,
        data: updatedData,
        field: undefined,
      });

      bot.sendMessage(chatId, `✅ Updated ${field} to "${newValue}".`);
      bot.sendMessage(chatId, [
        `📦 Current Data:`,
        `🏦 Bank Name: ${updatedData.bankName}`,
        `👤 Receiver: ${updatedData.receiver}`,
        `💳 Card Number: ${updatedData.cardNumber}`,
      ].join('\n'));
    } catch (err: any) {
      bot.sendMessage(chatId, `❌ Update failed: ${err.message}`);
    }
  }
});
