import React from "react";
import { ListItemComponent } from "./ListItemComponent";
import { ItemRow } from "../molecules";
import styled from "styled-components";
import { ListItem } from "../../types";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

interface NestedListProps {
  data: ListItem;
  onAddChild: (parentId: string) => void;
  onDeleteItem: (itemId: string) => void;
}

export const NestedList: React.FC<NestedListProps> = ({
  data,
  onAddChild,
  onDeleteItem,
}) => {
  return (
    <AppContainer>
      <h1>Вложенный список</h1>
      <ItemRow
        name={data.name}
        onAddChild={() => onAddChild(data.id)}
        isRoot={true}
      />
      {data.children.map((item) => (
        <ListItemComponent
          key={item.id}
          item={item}
          onAddChild={onAddChild}
          onDeleteItem={onDeleteItem}
        />
      ))}
    </AppContainer>
  );
};
