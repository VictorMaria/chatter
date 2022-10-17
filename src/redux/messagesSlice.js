import { createSlice } from '@reduxjs/toolkit';

const messages = localStorage.getItem('messages');
if (messages === null) {
    localStorage.setItem('messages', JSON.stringify([]));
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    value: JSON.parse(localStorage.getItem('messages')),
  },
  reducers: {
    sendMessage: (state, action) => {
      state.value = [...state.value, action.payload];
      const messages = JSON.parse(localStorage.getItem('messages'));
      messages.push(action.payload);
      localStorage.setItem('messages', JSON.stringify(messages));
    },
    refreshMessages: (state) => {
        state.value = [...(JSON.parse(localStorage.getItem('messages')))];
    }
  },
});

export const { sendMessage, getMessages, refreshMessages } = messagesSlice.actions;

export const selectMessages = (state) => state.messages.value;

export default messagesSlice.reducer;