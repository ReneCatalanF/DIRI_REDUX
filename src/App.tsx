import { useState } from 'react'
import { MenuItem } from './entites/entities';
import Foods from './components/Foods';
import React from 'react';
import './App.css'

export const foodItemsContext = React.createContext<MenuItem[]>([]);

function App() {
  const [isChooseFoodPage, setIsChooseFoodPage] = useState(false);

  const [menuItems] = useState<MenuItem[]>([
    {
      "id": 1,
      "name": "Hamburguesa de Pollo",
      "quantity": 40,
      "desc": "Hamburguesa de pollo frito - … y mayonesa",
      "price": 24,
      "image": "Hamburg.jpg"
    },
    {
      "id": 2,
      "name": "Hamburguesa de Vacuno",
      "quantity": 50,
      "desc": "Hamburguesa de Vacuno frito - … con tomate y mayonesa",
      "price": 26,
      "image": "Hamburg.jpg"
    },
    {
      "id": 3,
      "name": "Hamburguesa de Cerdo",
      "quantity": 60,
      "desc": "Hamburguesa de Cerdo frito - … con tomate y mayonesa",
      "price": 26,
      "image": "Hamburg.jpg"
    },
    {
      "id": 4,
      "name": "Hamburguesa de Hormiga",
      "quantity": 70,
      "desc": "Hamburguesa de Hormiga frita - … con tomate y mayonesa",
      "price": 26,
      "image": "Hamburg.jpg"
    },
  ]);

  return (
    <foodItemsContext.Provider value={menuItems}>
    <div className="App">
      <button className="toggleButton" onClick={() =>
        setIsChooseFoodPage(!isChooseFoodPage)}>
        {isChooseFoodPage ? "Disponibilidad" : "Pedir Comida"}
      </button>
      <h3 className="title">Comida Rápida Online</h3>
      {!isChooseFoodPage && (
        <>
          <h4 className="subTitle">Menús</h4>
          <ul className="ulApp">
            {menuItems.map((item) => {
              return (
                <li key={item.id} className="liApp">
                  <p>{item.name}</p><p>#{item.quantity}</p>
                </li>
              );
            })}
          </ul>
        </>
      )}
      {isChooseFoodPage && <Foods foodItems={menuItems}></Foods>}
    </div>
    </foodItemsContext.Provider>
  )
}

export default App
