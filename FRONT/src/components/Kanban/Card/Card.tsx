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
  BsArrowCounterclockwise,
  BsFillCheckCircleFill,
  BsPlusCircleFill,
  BsCheckCircleFill,
} from "react-icons/bs";
import Button from "../../Form/Button/Button";
import { Card } from "../../../types/Card";
import Loading from "../../Form/Loading/Loading";
import CardFormEdit from "../CardFormEdit/CardFormEdit";

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

interface CardProps {
  mode?: ModeEnum;
  loading?: boolean;
  card?: Card;
  onSubmit?: (card?: Card) => void;
  onClickLeft?: (card?: Card) => void;
  onClickRight?: (card?: Card) => void;
  onClickDelete?: (card?: Card) => void;
}

const CardComponent = ({
  mode = ModeEnum.VIEW,
  loading = false,
  card = { titulo: "", conteudo: "" },
  onSubmit,
  onClickLeft,
  onClickRight,
  onClickDelete,
}: CardProps) => {
  const [cardMode, setCardMode] = useState(mode);

  const handleSubmit = (card?: Card) => {
    if (!card?.titulo || !card.conteudo) {
      alert("Campos obrigatórios");
    } else {
      onSubmit && onSubmit(card);
    }
  };

  return (
    <Container>
      {cardMode === ModeEnum.VIEW ? (
        <>
          <ButtonEdit onClick={() => setCardMode(ModeEnum.EDIT)}>
            <BsPencilFill />
          </ButtonEdit>
          <CardView title={card?.titulo} description={card?.conteudo}>
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
        <CardForm card={card} onSubmit={handleSubmit}>
          {loading ? (
            <Button disabled>
              <Loading /> Carregando...
            </Button>
          ) : (
            <Button type="submit">
              <BsPlusCircleFill /> Adicionar
            </Button>
          )}
        </CardForm>
      )}
    </Container>
  );
};

export default CardComponent;
