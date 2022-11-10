import { useState } from "react";
import { BsArrowCounterclockwise, BsCheckCircleFill } from "react-icons/bs";
import { Card } from "../../../types/Card";
import Button from "../../Form/Button/Button";
import CardForm from "../CardForm/CardForm";

interface CardFormEditProps {
  card?: Card;
}

const CardFormEdit = ({ card }: CardFormEditProps) => {
  const [cardData, setCardData] = useState<Card>(card || {});
  const handleSubmit = (card?: Card) => {
    console.log('FormEdit', card, cardData);
    setCardData({ ...card });
  };

  return (
    <CardForm card={cardData} onSubmit={handleSubmit}>
      <Button type="reset">
        <BsArrowCounterclockwise /> Cancelar
      </Button>
      <Button type="submit">
        <BsCheckCircleFill /> Salvar
      </Button>
    </CardForm>
  );
};

export default CardFormEdit;
