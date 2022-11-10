import { useState } from "react";
import styled from "styled-components";
import { ListaEnum, ModeEnum } from "../../../types/Card";
import { ButtonCircle } from "../../Form/Button/Button";
import CardForm from "../CardForm/CardForm";
import CardView from "../CardView/CardView";
import {
  BsChevronLeft,
  BsChevronRight,
  BsTrashFill,
  BsPencilFill,
} from "react-icons/bs";
import Button from "../../Form/Button/Button";
import { Card } from "../../../types/Card";

const Container = styled.div`
  position: relative;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 4px 9px 14px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const ButtonEdit = styled(ButtonCircle)`
  position: absolute;
  right: 10px;
  top: 10px;
`;

interface Data {
  title?: string;
  description?: string;
}

interface CardProps extends Data {
  mode?: ModeEnum;
  loading?: boolean;
  card?: Card;
  onSubmit?: (card?: Card | null) => void;
  onClickLeft?: (card?: Card) => void;
  onClickRight?: (card?: Card) => void;
  onClickDelete?: (card?: Card) => void;
}

const CardComponent = ({
  mode = ModeEnum.VIEW,
  loading = false,
  card,
  onSubmit,
  onClickLeft,
  onClickRight,
  onClickDelete,
}: CardProps) => {
  const [cardMode, setCardMode] = useState(mode);
  const onEdit = () =>
    setCardMode(cardMode === ModeEnum.VIEW ? ModeEnum.EDIT : ModeEnum.VIEW);

  return (
    <Container>
      {cardMode === ModeEnum.VIEW ? (
        <>
          <ButtonEdit onClick={onEdit}>
            <BsPencilFill />
          </ButtonEdit>
          <CardView card={card}>
            <ButtonCircle
              onClick={() => onClickLeft && onClickLeft(card)}
              disabled={card?.lista === ListaEnum.ToDo}
            >
              <BsChevronLeft />
            </ButtonCircle>
            <Button onClick={() => onClickDelete && onClickDelete(card)}>
              <BsTrashFill />
            </Button>
            <ButtonCircle
              onClick={() => onClickRight && onClickRight(card)}
              disabled={card?.lista === ListaEnum.Done}
            >
              <BsChevronRight />
            </ButtonCircle>
          </CardView>
        </>
      ) : (
        <CardForm
          mode={cardMode}
          card={card}
          onSubmit={onSubmit}
          onReset={onEdit}
          loading={loading}
        />
      )}
    </Container>
  );
};

export default CardComponent;
