import { FormEvent, useState } from "react";
import { BsArrowCounterclockwise, BsCheckCircleFill } from "react-icons/bs";
import { Card } from "../../../types/Card";
import Button from "../../Form/Button/Button";
import Input from "../../Form/Input/Input";
import TextArea from "../../Form/TextArea/TextArea";
import CardAction from "../CardAction/CardAction";

const DEFAULT_CARD_VALUE = { titulo: "", conteudo: "" };

interface CardFormEditProps {
  card?: Card;
  onSubmit?: (card?: Card) => void;
  onReset?: () => void;
}

const CardEditMode = ({
  card = DEFAULT_CARD_VALUE,
  onSubmit,
  onReset,
}: CardFormEditProps) => {
  const [localCard, setLocalCard] = useState<Card>(card);
  const isValidForm = localCard.titulo && localCard.conteudo;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit && onSubmit(localCard);
  };

  const handleLocalCardChange = (name: keyof Card, value: string) =>
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

export default CardEditMode;