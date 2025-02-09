import { createSlice } from '@reduxjs/toolkit';
import { MenuItem } from '../entites/entities';



const initialState: { items: MenuItem[] } = {
    items: [
        {
            id: 1,
            name: "Hamburguesa de Pollo",
            quantity: 40,
            desc: "Hamburguesa de pollo frito - … y mayonesa",
            price: 24,
            image: "Hamburg.jpg"
        },
        {
            id: 2,
            name: "Hamburguesa de Vacuno",
            quantity: 50,
            desc: "Hamburguesa de Vacuno frito - … con tomate y mayonesa",
            price: 26,
            image: "Hamburg.jpg"
        },
        {
            id: 3,
            name: "Hamburguesa de Cerdo",
            quantity: 60,
            desc: "Hamburguesa de Cerdo frito - … con tomate y mayonesa",
            price: 26,
            image: "Hamburg.jpg"
        },
        {
            id: 4,
            name: "Hamburguesa de Hormiga",
            quantity: 70,
            desc: "Hamburguesa de Hormiga frita - … con tomate y mayonesa",
            price: 26,
            image: "Hamburg.jpg"
        },
    ],
};

const HamburguesaSlice = createSlice({
    name: 'Tienda_Comida',
    initialState,
    reducers: {
        actualizarCantidad: (state, action) => {
            const { id, quantity } = action.payload;
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === id ? { ...item, quantity } : item
                ),
            };
        },
    },
});

export const { actualizarCantidad } = HamburguesaSlice.actions;
export default HamburguesaSlice.reducer;