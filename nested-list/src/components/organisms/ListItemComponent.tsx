import React, { FC, memo, useCallback } from "react";
import styled from "styled-components";
import { ItemRow } from "../molecules";
import { ListItem } from "../../types";

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

interface ListItemComponentProps {
  item: ListItem;
  onAddChild: (parentId: string) => void;
  onDeleteItem: (itemId: string) => void;
}

export const ListItemComponent: FC<ListItemComponentProps> = memo(
  ({ item, onAddChild, onDeleteItem }) => {
    const handleAddChild = useCallback(() => {
      onAddChild(item.id);
    }, [onAddChild, item.id]);

    const handleDeleteItem = useCallback(() => {
      onDeleteItem(item.id);
    }, [onDeleteItem, item.id]);

    return (
      <ItemContainer>
        <ItemRow
          name={item.name}
          onAddChild={handleAddChild}
          onDeleteItem={handleDeleteItem}
        />
        {item.children.length > 0 &&
          item.children.map((child) => (
            <ListItemComponent
              key={child.id}
              item={child}
              onAddChild={onAddChild}
              onDeleteItem={onDeleteItem}
            />
          ))}
      </ItemContainer>
    );
  }
);
