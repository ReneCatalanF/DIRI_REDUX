import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { MenuItem, TimeData, Pedido } from '../entites/entities';
import { foodItemsContext } from "../App";
import './FoorOrder.css';
import ima from '../images/Hamburg.jpg';
import logger from "../services/logging";
import fetchData from "../services/FetchTime";
import { db } from "../services/FirebaseStorage";
import { push, ref } from "firebase/database";

interface FoodOrderProps {
    food: MenuItem;
    onReturnToMenu: MouseEventHandler<HTMLButtonElement> | undefined;
}
function FoodOrder(props: FoodOrderProps) {
    if (props.food.quantity <= 0) {
        throw new Error('Ya no quedan hamburguesas ' + props.food.name + ' ,tenemos ' + props.food.quantity + ' ahora mismo');
    }

    //Para traer la fecha actual
    const [timeData, setTimeData] = useState<TimeData | undefined>({ "timeZone": "", "dateTime": "" });
    //const [loading, setLoading] = useState<boolean | undefined>(undefined);

    const [quantity, setQuantity] = useState(1);
    const [selectquantity, setSelectQuantity] = useState(0);

    const menuItems: MenuItem[] = useContext(foodItemsContext)

    const [isOrder, setisOrder] = useState<boolean | undefined>(undefined);
    const [excede, setExcede] = useState<boolean>(false);

    const _timeZone: string = 'Europe/Amsterdam';

    const handleClick = async () => {


        const itemEncontrado = menuItems.find((item: MenuItem) => item.id === props.food.id);

        if (itemEncontrado) {
            try {
                setTimeData(await fetchData(_timeZone, setTimeData, setisOrder));

                itemEncontrado.quantity = itemEncontrado.quantity - quantity;


                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                logger.error("Error en fetchData: ");
                return;
            }
        } else {
            logger.warn("No se encontró el item con id: " + props.food.id);
        }


    };

    const handleExcede = () => {
        logger.debug("Entendido el excede");
        setSelectQuantity(0)
        setExcede(false);
        setisOrder(false);

    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //logger.debug("Se cambia cantidad de hamburguesas a solciitar");
        const inputValue = event.target.value;
        const parsedQuantity = parseInt(inputValue, 10); // Convierte a número

        if (!isNaN(parsedQuantity)) { // Verifica si la conversión fue exitosa

            if (parsedQuantity < props.food.quantity - 1) {
                //logger.info("Se convierte OK a numero: " + parsedQuantity + " y nuevo precio actualizado: " + props.food.price * parsedQuantity);
                setSelectQuantity(0);
                setExcede(false);
                setQuantity(parsedQuantity);
            } else {
                //logger.error("Se excede cantidad máxima que se puede solicitar");
                setSelectQuantity(parsedQuantity);
                setExcede(true);
            }

        } else if (inputValue === "") {
            //logger.error("Error al convertir numero, se vuelve 0");
            setQuantity(0); // Permite borrar el input y volver a 0
        }
    };

    const crearPedido = async () => {
        let pedido: Pedido | null = null;
        pedido = {
            "fecha": timeData!.dateTime.toString(),
            "id_menu": props.food.id,
            "nombre_menu": props.food.name,
            "cantidad": quantity,
            "precio_total": (props.food.price * quantity)
        };

        if (pedido) {
            console.log("Pedido listo para enviar:", pedido);
            const itemsRef = ref(db, "pedidos");
            await push(itemsRef, pedido);
            //logger.info("Aqui esta el nuevo pedido: " + pedido.id_menu + " " + pedido.nombre_menu + " " + pedido.fecha + " " + pedido.cantidad + " " + pedido.precio_total);
        }
        //setExcede(false);


    }


    useEffect(() => {
        if (isOrder === false && timeData) {
          async function realizarPedido() {
            try {
              await crearPedido();
              setExcede(false);
            } catch (error) {
              console.error('Error al crear pedido:', error);
            }
          }
          realizarPedido();
        }
      }, [crearPedido, isOrder, timeData]);

    return (
        <>
            {isOrder === true ? (
                <p>Realizando petición de datos...</p>
            ) : isOrder === false && timeData ? (
                <div>
                    {//crearPedido();
                    }
                    <h4>Pedido realizado</h4>
                    <p>Hora actual: {timeData.dateTime}</p>
                </div>
            ) : isOrder === false && !timeData ? (
                <p>No se pudieron obtener los datos.</p>
            ) : null}

            {excede === true && (
                <div>
                    <h4>Excedes la cantidad total de hamburguesas que puedes pedir: {props.food.quantity - 1}
                        y estas ingresando {selectquantity}</h4>
                    <button onClick={() =>
                        handleExcede()}>Entendido</button>
                </div>
            )}
            <div>
                <img
                    className="foodImg"
                    src={ima}
                    alt={props.food.name}
                />
                <h5>Nombre: </h5>
                <p>{props.food.name}</p>
                <h5>Precio: </h5>
                <p>{props.food.price * quantity}</p>
                <h5>Cantidad total que se puede pedir: </h5>
                <p>{props.food.quantity - 1}</p>
                <br />
                <div>
                    <label>Cantidad a ordenar: </label>
                    <input
                        data-testid="foodPriceF"
                        type="number"
                        id="cantidad"
                        className="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min="0"
                    />
                    <button onClick={async () => {
                        await handleClick();
                        //crearPedido();
                    }
                    }>Ordenar</button>
                </div>
                <button onClick={props.onReturnToMenu}>Volver al menú</button>
            </div >
        </>
    );
};
export default FoodOrder;