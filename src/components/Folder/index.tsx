import classNames from "classnames";
import { SublistContainer } from "../ListItem/SublistContainer";
import { Draggable } from "react-beautiful-dnd";
import { IconButton } from "../buttons/IconButton";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import { CollapseButton } from "../buttons/CollapseButton";

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
    setEditing,
    createItem,
    toggleCollapse,
  } = props;

  return (
    <div>
      <Draggable draggableId={folder.id} index={order}>
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
              <p {...provided.dragHandleProps}>{folder.name}</p>
              <div className="flex gap-2">
                <IconButton
                  icon={<PlusIcon />}
                  onClick={() => createItem(folder.id)}
                />
                <CollapseButton
                  collapsed={folder.collapsed}
                  onClick={() => toggleCollapse(folder.id)}
                />
              </div>
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
