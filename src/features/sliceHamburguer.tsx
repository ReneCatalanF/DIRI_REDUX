import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MenuItem, Pedido } from '../entites/entities';
import { push, ref } from 'firebase/database';
import { db } from '../services/FirebaseStorage';



const initialState: { items: MenuItem[]; loading: boolean; error: unknown } = {
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
    loading: false,
    error: null,
};

//FUNCION ASINCRONA QUE REALIZA LA PETICION A FIREBASE
export const actualizarCantidad = createAsyncThunk('pedidos/crear',
    async ({ menuItem, hora, cantidad }: { menuItem: MenuItem; hora: string; cantidad: number }, { rejectWithValue }) => {
        try {
            //GENERAMOS EL OBJETO PEDIDO A PARTIR DEL MENU, FECHA Y CANTIDAD RECIBIDO
            const pedido: Pedido = {
                fecha: hora,
                id_menu: menuItem.id,
                nombre_menu: menuItem.name,
                cantidad: cantidad,
                precio_total: menuItem.price * cantidad
            };
            //AGREGANDO PEDIDO A FIREBASE
            const itemsRef = ref(db, "pedidos");
            await push(itemsRef, pedido);
            //RETORNAMOS EL PEDIDO PARA RESTARLE LA CANTIDAD AL STORE
            return pedido;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const HamburguesaSlice = createSlice({
    name: 'Tienda_Comida',
    initialState,
    reducers: {
        /*
                actualizarCantidad: (state, action) => {
                    const { id, quantity } = action.payload;
                    return {
                        ...state,
                        items: state.items.map((item) =>
                            item.id === id ? { ...item, quantity } : item
                        ),
                    };
                },*/
    },
    extraReducers: (builder) => {
        builder
            .addCase(actualizarCantidad.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(actualizarCantidad.fulfilled, (state, action) => {
                state.loading = false;
                const menuItemId = action.payload.id_menu;

                // ACTUALIZAMOS LA CANTIDAD DE LA HAMBURGUESA UNA VEZ GUARDADO EL PEDIDO EN FIREBASE
                state.items = state.items.map((item) => {
                    if (item.id === menuItemId) {
                        return { ...item, quantity: item.quantity - action.payload.cantidad };
                    }
                    return item;
                });
            })
            .addCase(actualizarCantidad.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

//export const { actualizarCantidad } = HamburguesaSlice.actions;
export default HamburguesaSlice.reducer;