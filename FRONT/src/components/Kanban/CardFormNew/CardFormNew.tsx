import { FormEvent, useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { Card } from "../../../types/Card";
import Button from "../../Form/Button/Button";
import Input from "../../Form/Input/Input";
import TextArea from "../../Form/TextArea/TextArea";
import CardAction from "../CardAction/CardAction";
import { v4 } from "uuid";

const DEFAULT_CARD_VALUE = { titulo: "", conteudo: "" };

interface CardFormNewProps {
  card?: Card;
  onSubmit?: (card?: Card) => void;
}

const CardFormNew = ({
  card = DEFAULT_CARD_VALUE,
  onSubmit,
}: CardFormNewProps) => {
  const [localCard, setLocalCard] = useState<Card>(card);
  const isValidForm = localCard.titulo && localCard.conteudo;

  const handleLocalCardChange = (name: keyof Card, value: string) =>
    setLocalCard((oldValues) => ({ ...oldValues, [name]: value }));

  const handleAddNewCard = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit && onSubmit({...localCard, id: v4() });
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

export default CardFormNew;
