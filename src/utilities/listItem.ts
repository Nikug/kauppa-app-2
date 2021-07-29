export const updateItemList = (
  items: ListItem[],
  ids: string[],
  value: string
) => {
  let currentList: ListItem[] | undefined = items;
  let foundItem: ListItem | undefined = undefined;

  for (let i = ids.length - 1; i >= 0; i--) {
    if (!currentList) break;

    foundItem = currentList.find((item) => item.id === ids[i]);
    if (!foundItem) break;

    if (i !== 0) {
      currentList = foundItem?.subitems;
    } else {
      foundItem.item = value;
    }
  }

  return items;
};

export const findWithId = (
  items: ListItem[],
  id: string
): ListItem | undefined => {
  const found = items.find((item) => item.id === id);
  if (found) {
    return found;
  } else {
    return items.reduce((_: ListItem | undefined, item) => {
      return item.subitems ? findWithId(item.subitems, id) : undefined;
    }, undefined);
  }
};

export const findAndRemoveWithId = (
  items: ListItem[],
  id: string,
  index: number
): ListItem | undefined => {
  const foundItem = items[index];
  if (foundItem?.id === id) {
    items.splice(index, 1);
    return foundItem;
  } else {
    return items.reduce((_: ListItem | undefined, item) => {
      return item.subitems
        ? findAndRemoveWithId(item.subitems, id, index)
        : undefined;
    }, undefined);
  }
};

export const insertWithId = (
  items: ListItem[],
  item: ListItem,
  targetId: string,
  index: number
): ListItem[] => {
  for (let i = 0, limit = items.length; i < limit; i++) {
    if (items[i]?.id === targetId) {
      console.log("Found target", items[i]);
      if (items[i].subitems) {
        items.splice(index, 0, item);
      } else {
        items[i].subitems = [item];
      }
      return items;
    } else {
      if (items[i]?.subitems) {
        items[i].subitems = insertWithId(
          items[i].subitems ?? [],
          item,
          targetId,
          index
        );
        return items;
      }
    }
  }
  return items;
};

// Find the item
// Remove the item from its parent's list
// Add the item to its new parent's list

// Get list
// Check if item is in the list
// If in the list, get the item from the list and remove it from the list
// Else check sub list
