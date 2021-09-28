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

export const findAndRemoveWithId = (
  items: ListItem[],
  target: string
): ListItem | null => {
  const foundIndex = items.findIndex((item) => item.id === target);
  if (foundIndex === -1) {
    for (const subItem of items) {
      if (!subItem.subitems) continue;
      const result = findAndRemoveWithId(subItem.subitems, target);
      if (result) return result;
    }
  } else {
    const [foundItem] = items.splice(foundIndex, 1);
    return foundItem;
  }
  return null;
};

export const insertWithIdAndIndex = (
  items: ListItem[],
  item: ListItem,
  target: string,
  index: number
): void => {
  for (const subItem of items) {
    if (subItem.id === target) {
      if (subItem.subitems == null) {
        subItem.subitems = [item];
      } else {
        subItem.subitems.splice(index, 0, item);
      }
      return;
    } else {
      if (!item.subitems) continue;
      insertWithIdAndIndex(item.subitems, item, target, index);
    }
  }
};
