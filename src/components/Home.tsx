import classNames from "classnames";
import clonedeep from "lodash.clonedeep";
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  findAndRemoveWithId,
  insertWithIdAndIndex,
  updateItemList,
} from "../utilities/listItem";
import { Button } from "./buttons/button";
import { fakeItems } from "./fakeData";
import { ListContainer } from "./ListContainer";

export const MAIN_ID = "main";

const containerStyles = classNames(
  "xl:w-1/3",
  "lg:w-1/2",
  "md:w-2/3",
  "sm:w-3/4",
  "w-full",
  "mx-auto",
  "px-1",
  "sm:px-0"
);

export const Home = () => {
  const [items, setItems] = useState<ListItem[]>(fakeItems);
  const [uniqueId, setUniqueId] = useState<number>(-1);
  const [isEditing, setEditing] = useState<string | null>(null);

  const getUniqueId = () => {
    const newId = uniqueId;
    setUniqueId((prev) => prev - 1);
    return newId;
  };

  const createItem = () => {
    const newItem = {
      id: getUniqueId().toString(),
      item: "",
    };
    setItems((prev) => [...prev, newItem]);
    setEditing(newItem.id);
  };

  const setItem = (ids: string[], value: string) => {
    setItems((prev) => updateItemList(prev, ids, value));
  };

  const handleReorder = (result: DndResult) => {
    const { source, target, sourceIndex, targetIndex } = result;
    if (!target || !source) return;
    if (target === source) return;

    setItems((prev) => {
      const itemsCopy = clonedeep(prev);
      const foundItem = findAndRemoveWithId(itemsCopy, source);

      if (!foundItem) return itemsCopy;
      insertWithIdAndIndex(
        { id: MAIN_ID, item: "", subitems: itemsCopy },
        foundItem,
        target,
        targetIndex
      );
      return itemsCopy;
    });
  };

  return (
    <div className={containerStyles}>
      <h3 className="text-3xl font-bold my-5">Header</h3>
      <Button text="Add Item" onClick={() => createItem()} />
      <div className="h-screen border">
        <DndProvider backend={HTML5Backend}>
          <ListContainer
            reorder={handleReorder}
            items={items}
            setItem={setItem}
            setItems={setItems}
            setEditing={setEditing}
            isEditing={isEditing}
          />
        </DndProvider>
      </div>
    </div>
  );
};
