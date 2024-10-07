import { useCallback, useState } from "react";
import { ListItem } from "../types";

export const useNestedList = (initialData: ListItem) => {
  const [data, setData] = useState<ListItem>(initialData);

  const addChild = useCallback((parentId: string, newItem: ListItem) => {
    const addItem = (items: ListItem[]): ListItem[] => {
      return items.map((item) => {
        if (item.id === parentId) {
          return { ...item, children: [...item.children, newItem] };
        } else if (item.children.length > 0) {
          return { ...item, children: addItem(item.children) };
        }
        return item;
      });
    };

    setData((prevData) => {
      if (prevData.id === parentId) {
        return { ...prevData, children: [...prevData.children, newItem] };
      } else {
        return { ...prevData, children: addItem(prevData.children) };
      }
    });
  }, []);

  const deleteItem = useCallback((itemId: string) => {
    const removeItem = (items: ListItem[]): ListItem[] => {
      return items
        .filter((item) => item.id !== itemId)
        .map((item) => ({
          ...item,
          children: removeItem(item.children),
        }));
    };

    setData((prevData) => ({
      ...prevData,
      children: removeItem(prevData.children),
    }));
  }, []);

  return { data, addChild, deleteItem };
};
