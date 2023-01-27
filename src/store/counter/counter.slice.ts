import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '@store';

const initialState: ICounterState = {
	value:0,
};

const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
        increment : (state) => {
            state.value++;
        },
		
		decrement: (state) => {
            if(state.value > 0) {
            state.value--;
            }
        }
	},
});

export default counterSlice.reducer;

export const { increment,decrement } = counterSlice.actions;

export const getCounterState = (state: AppState): typeof initialState => state.counter;

type ICounterState = {
	value:number;
};
