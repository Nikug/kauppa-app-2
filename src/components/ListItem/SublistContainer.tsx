import { ListItem } from ".";
import classNames from "classnames";
import { Droppable } from "react-beautiful-dnd";
import { DndTypes } from "../Home";
import AnimateHeight from "react-animate-height";

const containerClasses = () =>
  classNames("block", "min-h-16", "flex", "flex-col", "flex-shrink-0");
const COLLAPSE_ANIMATION_DURATION = 150;

interface Props {
  folderId: string;
  items?: ListItem[];
  editedItem: string | null;
  collapsed: boolean;
  setItem(folderId: string, itemId: string, value: string): void;
  setEditing(itemId: string | null): void;
}

export const SublistContainer = (props: Props) => {
  const { folderId, collapsed, items, editedItem, setItem, setEditing } = props;

  return items ? (
    <Droppable droppableId={folderId} type={DndTypes.item}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <AnimateHeight
            duration={COLLAPSE_ANIMATION_DURATION}
            height={collapsed ? 0 : "auto"}
            easing="ease-out"
          >
            <div className={containerClasses()}>
              {items.map((item, index) => (
                <ListItem
                  key={item.id}
                  folderId={folderId}
                  item={item}
                  order={index}
                  editedItem={editedItem}
                  setItem={setItem}
                  setEditing={setEditing}
                />
              ))}
              {provided.placeholder}
            </div>
          </AnimateHeight>
        </div>
      )}
    </Droppable>
  ) : null;
};
