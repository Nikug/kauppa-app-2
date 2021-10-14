import React, { useState } from "react";
import classNames from "classnames";
import clonedeep from "lodash.clonedeep";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  findAndRemoveWithId,
  updateItemList,
  addNewItem,
} from "../utilities/listItem";
import { Button } from "./buttons/button";
import { fakeItems } from "./fakeData";
import { FolderContainer } from "./FolderContainer";

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

  const handleEditing = (folderId: string | null, itemId: string | null) => {
    setEditing(itemId);
  };

  const handleReorder = (result: DndResult) => {
    const { source, target, sourceIndex, targetIndex } = result;
    if (!target || !source) return;
    if (target === source) return;

    // setItems((prev) => {
    //   const itemsCopy = clonedeep(prev);
    //   const foundItem = findAndRemoveWithId(itemsCopy, source);

    //   if (!foundItem) return itemsCopy;
    //   insertWithIdAndIndex(
    //     { id: MAIN_ID, item: "", subitems: itemsCopy },
    //     foundItem,
    //     target,
    //     targetIndex
    //   );
    //   return itemsCopy;
    // });
  };

  return (
    <div className={containerStyles}>
      <h3 className="text-3xl font-bold my-5">Header</h3>
      <Button text="Add Item" onClick={() => createFolder()} />
      <div className="h-screen border">
        <DndProvider backend={HTML5Backend}>
          <FolderContainer
            createItem={createItem}
            reorder={handleReorder}
            folders={folders}
            setItem={setItem}
            setEditing={handleEditing}
            editedItem={isEditing}
          />
        </DndProvider>
      </div>
    </div>
  );
};
