import { BsChevronLeft, BsChevronRight, BsTrashFill } from "react-icons/bs";
import styled from "styled-components";
import { Card, ModeEnum } from "../../../types/Card";
import Button, { ButtonCircle } from "../../Form/Button/Button";
import CardAction from "../CardAction/CardAction";
import { marked } from 'marked';

const DEFAULT_CARD_VALUE = { titulo: "", conteudo: "" };

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.label`
  font-size: 1.2rem;
  font-weight: 600;
  color: #4e5561;
  word-wrap: break-word;
  line-height: 1.5rem;
  padding: 5px;
`;

const Description = styled.div`
  color: #4e5561;
  font-size: 1rem;
  word-wrap: break-word;
  line-height: 1.5rem;
  padding: 5px;
`;

interface CardViewProps {
  card?: Card;
  mode?: ModeEnum;
  onDelete?: (card?: Card) => void;
  onLeft?: (card?: Card) => void;
  onRight?: (card?: Card) => void;
}

const CardView = ({
  card = DEFAULT_CARD_VALUE,
  onDelete,
  onLeft,
  onRight,
}: CardViewProps) => {

  const descriptionMarkdown = marked.parse(card?.conteudo || '');

  return (
    <Container>
      <Title>{card?.titulo}</Title>
      <Description dangerouslySetInnerHTML={{__html: descriptionMarkdown}}></Description>
      <CardAction>
        <ButtonCircle onClick={() => onLeft && onLeft(card)} disabled={!onLeft}>
          <BsChevronLeft />
        </ButtonCircle>
        <Button onClick={() => onDelete && onDelete(card)} disabled={!onDelete}>
          <BsTrashFill />
        </Button>
        <ButtonCircle
          onClick={() => onRight && onRight(card)}
          disabled={!onRight}
        >
          <BsChevronRight />
        </ButtonCircle>
      </CardAction>
    </Container>
  );
};

export default CardView;
