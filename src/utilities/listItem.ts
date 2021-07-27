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
