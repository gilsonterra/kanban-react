import { FormEvent, useState } from "react";
import {
  BsArrowCounterclockwise,
  BsCheckCircleFill,
  BsChevronLeft,
  BsChevronRight,
  BsPencilFill,
  BsPlusCircleFill,
  BsTrashFill,
} from "react-icons/bs";
import styled from "styled-components";
import { Card as CardData, ModeEnum } from "../../../types/Card";
import Button, { ButtonCircle } from "../../Form/Button/Button";
import Input from "../../Form/Input/Input";
import TextArea from "../../Form/TextArea/TextArea";
import CardAction from "../CardAction/CardAction";
import CardView from "../CardView/CardView";

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

const DEFAULT_CARD_VALUE = { titulo: "", conteudo: "" };

interface CardNewModeProps {
  card?: CardData;
  onSubmit?: (card?: CardData) => void;
}

const CardNewMode = ({
  card = DEFAULT_CARD_VALUE,
  onSubmit,
}: CardNewModeProps) => {
  const [localCard, setLocalCard] = useState<CardData>(card);
  const isValidForm = localCard.titulo && localCard.conteudo;

  const handleLocalCardChange = (name: keyof CardData, value: string) =>
    setLocalCard((oldValues) => ({ ...oldValues, [name]: value }));

  const handleAddNewCard = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit && onSubmit(localCard);
    setLocalCard(DEFAULT_CARD_VALUE);
  };

  return (
    <form onSubmit={handleAddNewCard}>
      <Input
        value={localCard.titulo}
        onChange={(e) => handleLocalCardChange("titulo", e.target.value)}
        placeholder="Título"
        maxLength={40}
      />
      <TextArea
        value={localCard.conteudo}
        onChange={(e) => handleLocalCardChange("conteudo", e.target.value)}
        placeholder="Descrição"
      />
      <CardAction>
        <Button type="submit" disabled={!isValidForm}>
          <BsPlusCircleFill /> Adicionar
        </Button>
      </CardAction>
    </form>
  );
};

interface CardViewModeProps {
  card?: CardData;
  mode?: ModeEnum;
  onDelete?: (card?: CardData) => void;
  onLeft?: (card?: CardData) => void;
  onRight?: (card?: CardData) => void;
}

const CardViewMode = ({
  card = DEFAULT_CARD_VALUE,
  onDelete,
  onLeft,
  onRight,
}: CardViewModeProps) => {
  return (
    <CardView title={card?.titulo} description={card?.conteudo}>
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
    </CardView>
  );
};

interface CardEditModeProps {
  card?: CardData;
  onSubmit?: (card?: CardData) => void;
  onReset?: () => void;
}

const CardEditMode = ({
  card = DEFAULT_CARD_VALUE,
  onSubmit,
  onReset,
}: CardEditModeProps) => {
  const [localCard, setLocalCard] = useState<CardData>(card);
  const isValidForm = localCard.titulo && localCard.conteudo;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit && onSubmit(localCard);
  };

  const handleLocalCardChange = (name: keyof CardData, value: string) =>
    setLocalCard((oldValues) => ({ ...oldValues, [name]: value }));

  return (
    <form onSubmit={handleSubmit} onReset={onReset}>
      <Input
        value={localCard.titulo}
        onChange={(e) => handleLocalCardChange("titulo", e.target.value)}
        placeholder="Título"
        maxLength={40}
      />
      <TextArea
        value={localCard.conteudo}
        onChange={(e) => handleLocalCardChange("conteudo", e.target.value)}
        placeholder="Descrição"
      />
      <CardAction>
        <Button type="reset">
          <BsArrowCounterclockwise /> Cancelar
        </Button>
        <Button type="submit" disabled={!isValidForm}>
          <BsCheckCircleFill /> Salvar
        </Button>
      </CardAction>
    </form>
  );
};

interface CardProps {
  card?: CardData;
  mode?: ModeEnum;
  onNew?: (card?: CardData) => void;
  onEdit?: (card?: CardData) => void;
  onDelete?: (card?: CardData) => void;
  onLeft?: (card?: CardData) => void;
  onRight?: (card?: CardData) => void;
}

const Card = ({
  mode = ModeEnum.VIEW,
  card = DEFAULT_CARD_VALUE,
  onNew,
  onEdit,
  onDelete,
  onLeft,
  onRight,
}: CardProps) => {
  const [localMode, setLocalMode] = useState(mode);
  const isModeView = localMode === ModeEnum.VIEW;
  const isModeNew = localMode === ModeEnum.NEW;

  return (
    <Container>
      {isModeView ? (
        <>
          <ButtonEdit onClick={() => setLocalMode(ModeEnum.EDIT)}>
            <BsPencilFill />
          </ButtonEdit>
          <CardViewMode
            card={card}
            onDelete={onDelete}
            onLeft={onLeft}
            onRight={onRight}
          />
        </>
      ) : isModeNew ? (
        <CardNewMode card={card} onSubmit={onNew} />
      ) : (
        <CardEditMode
          card={card}
          onSubmit={(card) => {
            onEdit && onEdit(card);
            setLocalMode(ModeEnum.VIEW);
          }}
          onReset={() => setLocalMode(ModeEnum.VIEW)}
        />
      )}
    </Container>
  );
};

export default Card;
