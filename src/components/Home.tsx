import React, { useState } from "react";

import { ListItem } from "./ListItem";

export const Home = () => {
  const [items, setItems] = useState<ListItem[]>([]);
  const [uniqueId, setUniqueId] = useState<number>(-1);

  const getUniqueId = () => {
    const newId = uniqueId;
    setUniqueId((prev) => prev - 1);
    return newId;
  };

  const createItem = () => {
    const newItem = {
      id: getUniqueId().toString(),
      order: items.length,
      item: "aaas",
    };
    setItems((prev) => [...prev, newItem]);
  };

  console.log(items);

  return (
    <div>
      <h3 className="text-3xl font-bold my-5">Header</h3>
      <button
        className="bg-blue-400 py-2 px-4 rounded shadow"
        onClick={() => createItem()}
      >
        Add Item
      </button>
      <div>
        {items.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
