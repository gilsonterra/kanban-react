import { FormEvent, useState } from "react";
import { BsArrowCounterclockwise, BsCheckCircleFill } from "react-icons/bs";
import styled from "styled-components";
import { Card } from "../../../types/Card";
import Button from "../../Form/Button/Button";
import Input from "../../Form/Input/Input";
import Loading from "../../Form/Loading/Loading";
import TextArea from "../../Form/TextArea/TextArea";
import CardAction from "../CardAction/CardAction";

const ContainerLoading = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

const DEFAULT_CARD_VALUE = { titulo: "", conteudo: "" };

interface CardFormEditProps {
  card?: Card;
  loading?: boolean;
  onSubmit?: (card?: Card) => void;
  onReset?: () => void;
}

const CardEditMode = ({
  card = DEFAULT_CARD_VALUE,
  loading = false,
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
        disabled={loading}
        value={localCard.titulo}
        onChange={(e) => handleLocalCardChange("titulo", e.target.value)}
        placeholder="Título"
        maxLength={40}
      />
      <TextArea
        disabled={loading}
        value={localCard.conteudo}
        onChange={(e) => handleLocalCardChange("conteudo", e.target.value)}
        placeholder="Descrição"
      />
      <CardAction>
        {loading ? (
          <ContainerLoading>
            <Loading /> Carregando...
          </ContainerLoading>
        ) : (
          <>
            <Button type="reset">
              <BsArrowCounterclockwise /> Cancelar
            </Button>
            <Button type="submit" disabled={!isValidForm}>
              <BsCheckCircleFill /> Salvar
            </Button>
          </>
        )}
      </CardAction>
    </form>
  );
};

export default CardEditMode;
