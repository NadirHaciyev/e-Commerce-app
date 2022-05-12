import { useState, useEffect, createContext, useContext } from "react";

const BasketContext = createContext();

const BasketProvider = ({ children }) => {
  const defaultBasketItems =
    JSON.parse(localStorage.getItem("basket-items")) || [];

  const [basketItems, setBasketItems] = useState(defaultBasketItems);

  useEffect(() => {
    localStorage.setItem("basket-items", JSON.stringify(basketItems));
  }, [basketItems]);

  // Sorted basket items
  const sortedBasketItems = basketItems.sort(function (a, b) {
    return a.addedBasket < b.addedBasket ? 1 : -1;
  });

  const handleIncrease = (data) => {
    setBasketItems((prev) =>
      prev.map((item) => {
        return item._id === data._id
          ? { ...item, amount: item.amount + 1 }
          : item;
      })
    );
  };
  const handleDecrease = (data) => {
    setBasketItems((prev) =>
      prev.map((item) => {
        return item._id === data._id && item.amount > 1
          ? { ...item, amount: item.amount - 1 }
          : item;
      })
    );
  };

  const addToBasket = (data) => {
    if (!findBasketItem(data)) {
      data.addedBasket = new Date().toISOString();
      data.amount = 1;
      setBasketItems((prev) => [...prev, data]);
      return;
    }

    const filtered = basketItems.filter((item) => item._id !== data._id);
    setBasketItems(filtered);
  };

  const findBasketItem = (data) => {
    return basketItems.find((item) => item._id === data._id);
  };

  const values = {
    basketItems,
    setBasketItems,
    addToBasket,
    findBasketItem,
    handleIncrease,
    handleDecrease,
    sortedBasketItems
  };
  return (
    <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
  );
};

const useBasket = () => useContext(BasketContext);

export { useBasket, BasketProvider };
