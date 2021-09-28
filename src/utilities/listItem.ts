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
  rootItem: ListItem,
  item: ListItem,
  target: string,
  index: number
): void => {
  if (rootItem.id === target) {
    if (rootItem.subitems) {
      rootItem.subitems.splice(index, 0, item);
    } else {
      rootItem.subitems = [item];
    }
    return;
  }
  if (!rootItem.subitems) return;
  for (const subItem of rootItem.subitems) {
    insertWithIdAndIndex(subItem, item, target, index);
  }
};
