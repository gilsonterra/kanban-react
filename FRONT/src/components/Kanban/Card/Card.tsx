import { useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import styled from "styled-components";
import { Card as CardData, ModeEnum } from "../../../types/Card";
import { ButtonCircle } from "../../Form/Button/Button";
import CardFormNew from "../CardFormNew/CardFormNew";
import CardFormEdit from "../CardFormEdit/CardFormEdit";
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
          <CardView
            card={card}
            onDelete={onDelete}
            onLeft={onLeft}
            onRight={onRight}
          />
        </>
      ) : isModeNew ? (
        <CardFormNew card={card} onSubmit={onNew} />
      ) : (
        <CardFormEdit
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
