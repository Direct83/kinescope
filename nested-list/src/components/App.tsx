import React, { useCallback } from "react";
import { useNestedList } from "../hooks/useNestedList";
import { NestedList } from "./organisms";

export const App: React.FC = () => {
  const { data, addChild, deleteItem } = useNestedList({
    id: "root",
    name: "Главный родитель",
    children: [],
  });

  const handleAddChild = useCallback(
    (parentId: string) => {
      const newName = prompt("Введите имя нового элемента:");
      if (!newName) return;

      const newItem = {
        id: Date.now().toString(),
        name: newName,
        children: [],
      };

      addChild(parentId, newItem);
    },
    [addChild]
  );

  const handleDeleteItem = useCallback(
    (itemId: string) => {
      if (itemId === "root") {
        alert("Нельзя удалить основного родителя!");
        return;
      }
      deleteItem(itemId);
    },
    [deleteItem]
  );

  return (
    <NestedList
      data={data}
      onAddChild={handleAddChild}
      onDeleteItem={handleDeleteItem}
    />
  );
};
