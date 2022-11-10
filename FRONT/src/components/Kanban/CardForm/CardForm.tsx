import { FormEvent, useEffect, useState } from "react";
import { Card } from "../../../types/Card";
import Input from "../../Form/Input/Input";
import TextArea from "../../Form/TextArea/TextArea";
import CardAction from "../CardAction/CardAction";

interface CardFormProps {
  children?: JSX.Element | JSX.Element[];
  disabled?: boolean;
  card?: Card;
  onSubmit?: (card?: Card) => void;
  onReset?: () => void;
}

const CardForm = ({
  disabled = false,  
  card = { titulo: "", conteudo: "" },
  children,
  onSubmit,
  onReset,
}: CardFormProps) => {
  const [cardData, setCardData] = useState(card);

  const handleChange = (name: keyof Card, value: string) => {
    setCardData((oldValues) => ({ ...oldValues, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('HandleSubmit', cardData)
    onSubmit && onSubmit({...cardData});
  };

  const handleReset = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onReset && onReset();
  };

  useEffect(() => {
    setCardData(card);
  }, [card]);

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <Input
        disabled={disabled}
        value={cardData.titulo}
        onChange={(e) => handleChange("titulo", e.target.value)}
        placeholder="Título"
        maxLength={40}
      />
      <TextArea
        disabled={disabled}
        value={cardData.conteudo}
        onChange={(e) => handleChange("conteudo", e.target.value)}
        placeholder="Descrição"
      />
      <CardAction>{children}</CardAction>
    </form>
  );
};

export default CardForm;
