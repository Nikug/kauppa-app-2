import { useCallback, useMemo, useState } from "react";
import classNames from "classnames";
import { reorderItems, reorderFolders } from "../utilities/listItem";
import { Button } from "./buttons/button";
import { generateFakeItems } from "./fakeData";
import { Folder } from "./Folder";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

export const MAIN_ID = "main";
export const DndTypes = {
  folder: "folder",
  item: "item",
};

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
  const [folders, setFolders] = useState<FolderContainer>(
    generateFakeItems(2, 3)
  );
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
      collapsed: true,
      items: {},
      itemOrder: [],
    };
    setFolders((prev) => ({
      folders: { ...prev.folders, [newFolder.id]: newFolder },
      folderOrder: [...prev.folderOrder, newFolder.id],
    }));
  };

  const createItem = (folderId: string) => {
    const newItem = {
      id: getUniqueId().toString(),
      item: "",
    };
    setFolders((prev) => {
      const folder = { ...prev.folders[folderId] };
      folder.items = { ...folder.items, [newItem.id]: newItem };
      folder.itemOrder = [...folder.itemOrder, newItem.id];
      folder.collapsed = false;
      return { ...prev, folders: { ...prev.folders, [folderId]: folder } };
    });
    setEditing(newItem.id);
  };

  const setItem = (folderId: string, itemId: string, value: string) => {
    setFolders((prev) => {
      prev.folders[folderId].items[itemId].item = value;
      return prev;
    });
  };

  const moveCard = useCallback((result: DropResult) => {
    if (result.destination == null) return;
    if (result.type === DndTypes.item) {
      setFolders((prev) =>
        reorderItems(
          prev,
          result.source.droppableId,
          result.source.index,
          result.destination?.droppableId,
          result.destination?.index
        )
      );
    }
    if (result.type === DndTypes.folder) {
      setFolders((prev) =>
        reorderFolders(prev, result.source.index, result.destination?.index)
      );
    }
  }, []);

  const toggleCollapse = (folderId: string, collapsed?: boolean) => {
    setFolders((prev) => {
      const newCollapsed =
        collapsed == null ? !prev.folders[folderId].collapsed : collapsed;
      return {
        ...prev,
        folders: {
          ...prev.folders,
          [folderId]: { ...prev.folders[folderId], collapsed: newCollapsed },
        },
      };
    });
  };

  const orderedFolders = useMemo(() => {
    const ordered = folders.folderOrder.map((order) => folders.folders[order]);
    return ordered;
  }, [folders]);

  return (
    <div className={containerStyles}>
      <h3 className="text-3xl font-bold my-5">Header</h3>
      <Button text="Add folder" onClick={() => createFolder()} />
      <div className="h-screen">
        <DragDropContext onDragEnd={moveCard}>
          <Droppable droppableId="main" type={DndTypes.folder}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="h-full"
              >
                {orderedFolders.map((folder, index) => (
                  <Folder
                    createItem={createItem}
                    key={folder.id}
                    order={index}
                    folder={folder}
                    setItem={setItem}
                    setEditing={setEditing}
                    editedItem={isEditing}
                    toggleCollapse={toggleCollapse}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};
