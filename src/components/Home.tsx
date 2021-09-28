import {
  DragDropContext,
  DropResult,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";
import React, { useState } from "react";
import {
  findAndRemoveWithId,
  insertWithIdAndIndex,
  updateItemList,
} from "../utilities/listItem";

import { Button } from "./buttons/button";
import { ListItem } from "./ListItem";
import classNames from "classnames";
import { fakeItems } from "./fakeData";

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

const MAIN_ID = "main";

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

  const handleReorder = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    if (destination.droppableId === draggableId) return;

    const itemsCopy = [...items];
    const foundItem = findAndRemoveWithId(itemsCopy, draggableId);

    console.log("inserting to", destination.droppableId, destination.index);

    if (!foundItem) return;
    insertWithIdAndIndex(
      { id: MAIN_ID, item: "", subitems: itemsCopy },
      foundItem,
      destination.droppableId,
      destination.index
    );

    setItems(itemsCopy);
  };

  return (
    <div className={containerStyles}>
      <h3 className="text-3xl font-bold my-5">Header</h3>
      <Button text="Add Item" onClick={() => createItem()} />
      <DragDropContext onDragEnd={handleReorder}>
        <div>
          <Droppable droppableId={MAIN_ID}>
            {(droppableProvided: DroppableProvided) => (
              <div
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
                className="h-screen"
              >
                <div className="flex flex-col gap-1">
                  {items.map((item, index) => (
                    <ListItem
                      key={item.id}
                      item={item}
                      order={index}
                      setItem={setItem}
                      setItemEditing={setEditing}
                      editedItem={isEditing}
                    />
                  ))}
                </div>
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};
