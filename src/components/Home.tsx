import React, { useCallback, useState } from "react";
import classNames from "classnames";
import {
  updateItemList,
  addNewItem,
  reorderItems,
} from "../utilities/listItem";
import { Button } from "./buttons/button";
import { fakeItems } from "./fakeData";
import { Folder } from "./Folder";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

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
  const [folders, setFolders] = useState<ItemFolder[]>(fakeItems);
  const [uniqueId, setUniqueId] = useState<number>(-1);
  const [isEditing, setEditing] = useState<string | null>(null);

  const getUniqueId = () => {
    const newId = uniqueId;
    setUniqueId((prev) => prev - 1);
    return newId;
  };

  const createFolder = () => {
    const newFolder: ItemFolder = {
      id: getUniqueId().toString(),
      name: "New folder",
      items: [],
    };
    setFolders((prev) => [...prev, newFolder]);
  };

  const createItem = (folderId: string) => {
    const newItem = {
      id: getUniqueId().toString(),
      item: "",
    };
    setFolders((prev) => addNewItem(prev, folderId, newItem));
    setEditing(newItem.id);
  };

  const setItem = (folderId: string, itemId: string, value: string) => {
    setFolders((prev) => updateItemList(prev, folderId, itemId, value));
  };

  const moveCard = useCallback((result: DropResult) => {
    if (result.destination == null) return;
    setFolders((prev) =>
      reorderItems(
        prev,
        result.source.droppableId,
        result.source.index,
        result.destination?.droppableId,
        result.destination?.index
      )
    );
  }, []);

  return (
    <div className={containerStyles}>
      <h3 className="text-3xl font-bold my-5">Header</h3>
      <Button text="Add Item" onClick={() => createFolder()} />
      <div className="h-screen border">
        <DragDropContext onDragEnd={moveCard}>
          {folders.map((folder) => (
            <Folder
              createItem={createItem}
              key={folder.id}
              folder={folder}
              setItem={setItem}
              setEditing={setEditing}
              editedItem={isEditing}
            />
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};
