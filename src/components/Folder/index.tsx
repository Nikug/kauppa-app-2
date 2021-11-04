import { PencilAltIcon, PlusIcon } from "@heroicons/react/outline";
import { useCallback, useRef } from "react";

import { CollapseButton } from "../buttons/CollapseButton";
import { DetectOutsideClick } from "../utilities/DetectOutsideClick";
import { Draggable } from "react-beautiful-dnd";
import { EditView } from "../ListItem/EditView";
import { IconButton } from "../buttons/IconButton";
import { SublistContainer } from "../ListItem/SublistContainer";
import classNames from "classnames";

const folderClasses = (
  isDragging: boolean,
  disabled: boolean,
  collapsed: boolean
) =>
  classNames(
    "shadow",
    "hover:shadow-lg",
    { "border-4": isDragging },
    "border-gray-300",
    "border",
    "rounded",
    { "pb-1": !collapsed }
  );

const folderTitleClasses = (collapsed: boolean) =>
  classNames(
    "shadow",
    "hover:shadow-md",
    "bg-purple-600",
    "text-white",
    "font-extrabold",
    "rounded-t",
    { "rounded-b": collapsed },
    "flex",
    "justify-between",
    "items-center",
    "py-2",
    "px-4"
  );

interface Props {
  folder: ItemFolder;
  order: number;
  disabled?: boolean;
  editedItem: string | null;
  createItem(folderId: string): void;
  setItem(folderId: string, itemId: string, value: string): void;
  setFolderName(folderId: string, name: string): void;
  setEditing(itemId: string | null): void;
  toggleCollapse(folderId: string, collapsed?: boolean): void;
}

export const Folder = (props: Props) => {
  const {
    folder,
    order,
    disabled,
    editedItem,
    setItem,
    setFolderName,
    setEditing,
    createItem,
    toggleCollapse,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditing = (state: boolean) => {
    if (disabled) return;
    state ? setEditing(folder.id) : setEditing(null);
  };

  const handleUpdate = useCallback(() => {
    if (!inputRef) return;
    const newValue = inputRef.current?.value;
    setEditing(null);

    if (newValue === folder.name) return;
    setFolderName(folder.id, newValue ?? "");
  }, [inputRef, setEditing, folder, setFolderName]);

  const isEdited = editedItem === folder.id;

  return (
    <div>
      <Draggable
        draggableId={folder.id}
        index={order}
        isDragDisabled={isEdited}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={folderClasses(
              snapshot.isDragging,
              !!disabled,
              folder.collapsed
            )}
          >
            <div className={folderTitleClasses(folder.collapsed)}>
              {isEdited ? (
                <DetectOutsideClick onOutsideClick={handleUpdate}>
                  <EditView
                    text={folder.name}
                    inputRef={inputRef}
                    handleEditing={handleEditing}
                    handleUpdate={handleUpdate}
                  />
                </DetectOutsideClick>
              ) : (
                <>
                  <p {...provided.dragHandleProps}>{folder.name}</p>
                  <div className="flex gap-2">
                    <IconButton
                      icon={<PencilAltIcon />}
                      onClick={() => handleEditing(true)}
                    />
                    <IconButton
                      icon={<PlusIcon />}
                      onClick={() => createItem(folder.id)}
                    />
                    <CollapseButton
                      collapsed={folder.collapsed}
                      onClick={() => toggleCollapse(folder.id)}
                    />
                  </div>
                </>
              )}
            </div>
            <SublistContainer
              folderId={folder.id}
              items={folder.itemOrder.map((item) => ({
                ...folder.items[item],
              }))}
              editedItem={editedItem}
              setItem={setItem}
              setEditing={setEditing}
              collapsed={folder.collapsed}
            />
          </div>
        )}
      </Draggable>
    </div>
  );
};
