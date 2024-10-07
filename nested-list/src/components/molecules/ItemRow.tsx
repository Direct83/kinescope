import React, { FC, memo } from "react";
import styled from "styled-components";
import { ItemName, Button } from "../atoms";

const Row = styled.div`
  display: flex;
  align-items: center;
`;

interface ItemRowProps {
  name: string;
  onAddChild: () => void;
  onDeleteItem?: () => void;
  isRoot?: boolean;
}

export const ItemRow: FC<ItemRowProps> = memo(
  ({ name, onAddChild, onDeleteItem, isRoot = false }) => {
    return (
      <Row>
        <ItemName>{name}</ItemName>
        <Button onClick={onAddChild}>Добавить наследника</Button>
        {!isRoot && onDeleteItem && (
          <Button onClick={onDeleteItem}>Удалить</Button>
        )}
      </Row>
    );
  }
);
