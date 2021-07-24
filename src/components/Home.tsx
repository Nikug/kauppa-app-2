import React, { useState } from "react";

import { ListItem } from "./ListItem";
import classNames from "classnames";

const containerStyles = classNames(
  "xl:w-1/3",
  "lg:w-1/2",
  "md:w-2/3",
  "sm:w-3/4",
  "w-full",
  "mx-auto"
);

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
      item: "",
    };
    setItems((prev) => [...prev, newItem]);
  };

  const setItem = (id: string, value: string) => {
    setItems((prev) => {
      return prev.map((oldItem): ListItem => {
        return oldItem.id === id ? { ...oldItem, item: value } : oldItem;
      });
    });
  };

  console.log(items);

  return (
    <div className={containerStyles}>
      <h3 className="text-3xl font-bold my-5">Header</h3>
      <button
        className="bg-blue-400 py-2 px-4 rounded shadow"
        onClick={() => createItem()}
      >
        Add Item
      </button>
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <ListItem key={item.id} item={item} setItem={setItem} />
        ))}
      </div>
    </div>
  );
};
