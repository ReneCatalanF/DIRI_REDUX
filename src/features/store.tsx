import { configureStore } from "@reduxjs/toolkit";
import hamburguesaSlice from './sliceHamburguer';


const store = configureStore({
    reducer: {
        storeComidaRapida: hamburguesaSlice,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;