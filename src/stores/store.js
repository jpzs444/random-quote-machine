import { configureStore, createSlice } from '@reduxjs/toolkit';

const quoteSlice = createSlice({
  name: 'quote',
  initialState: { value: { quoteText: "", quoteAuthor: "" } },
  reducers: {
    generate: (state, action) => {
      state.value = action.payload;
    },
  }
})

export const { generate } = quoteSlice.actions;

export const store = configureStore({
  reducer: {
    quote: quoteSlice.reducer, 
  }
})