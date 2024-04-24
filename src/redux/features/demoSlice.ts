import { createSlice } from '@reduxjs/toolkit';

export interface Demo {
  count: number;
}

const initialState: Demo = {
  count: 0,
};

export const demoSlice = createSlice({
  name: 'demo',
  initialState,
  reducers: {
    increment: state => {
      state.count += 1;
    },
    decrement: state => {
      state.count -= 1;
    },

    toHundred: (state, action) => {
      state.count = action.payload;
    },
  },
});
export const { increment, decrement, toHundred } = demoSlice.actions;
export default demoSlice.reducer;
