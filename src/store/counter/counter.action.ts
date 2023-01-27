import store from '@store';
import { decrement, increment } from './counter.slice';

export const incrementCounter =  () => store.dispatch(increment());
export const decrementCounter =  () => store.dispatch(decrement());
