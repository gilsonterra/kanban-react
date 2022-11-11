import { BsChevronLeft, BsChevronRight, BsTrashFill } from "react-icons/bs";
import styled, { keyframes } from "styled-components";
import { Card, ModeEnum } from "../../../types/Card";
import Button, { ButtonCircle } from "../../Form/Button/Button";
import CardAction from "../CardAction/CardAction";
import { marked } from "marked";
import Loading from "../../Form/Loading/Loading";

const DEFAULT_CARD_VALUE = { titulo: "", conteudo: "" };

const textAnimation = keyframes`
  from {
    opacity: .6;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContainerLoading = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.label`
  font-size: 1.2rem;
  font-weight: 600;
  color: #4e5561;
  word-wrap: break-word;
  line-height: 1.5rem;
  padding: 5px;
  animation: ${textAnimation} linear 300ms;
`;

const Description = styled.div`
  color: #4e5561;
  font-size: 1rem;
  word-wrap: break-word;
  line-height: 1.5rem;
  padding: 5px;
  animation: ${textAnimation} linear 200ms;
`;

interface CardViewProps {
  card?: Card;
  mode?: ModeEnum;
  loading?: boolean;
  onDelete?: (card?: Card) => void;
  onLeft?: (card?: Card) => void;
  onRight?: (card?: Card) => void;
}

const CardView = ({
  card = DEFAULT_CARD_VALUE,
  loading = false,
  onDelete,
  onLeft,
  onRight,
}: CardViewProps) => {
  const descriptionMarkdown = marked.parse(card?.conteudo || "");

  return (
    <Container>
      <Title>{card?.titulo}</Title>
      <Description dangerouslySetInnerHTML={{ __html: descriptionMarkdown }} />
      <CardAction>
        {loading ? (
          <ContainerLoading>
            <Loading /> Carregando...
          </ContainerLoading>
        ) : (
          <>
            <ButtonCircle
              title="Voltar Card"
              onClick={() => onLeft && onLeft(card)}
              disabled={!onLeft}
            >
              <BsChevronLeft />
            </ButtonCircle>
            <Button
              title="Excluir Card"
              onClick={() => onDelete && onDelete(card)}
              disabled={!onDelete}
            >
              <BsTrashFill />
            </Button>
            <ButtonCircle
              title="Avançar Card"
              onClick={() => onRight && onRight(card)}
              disabled={!onRight}
            >
              <BsChevronRight />
            </ButtonCircle>
          </>
        )}
      </CardAction>
    </Container>
  );
};

export default CardView;
