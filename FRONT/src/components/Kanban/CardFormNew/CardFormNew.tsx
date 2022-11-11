import { FormEvent, useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { Card, ListaEnum } from "../../../types/Card";
import Button from "../../Form/Button/Button";
import Input from "../../Form/Input/Input";
import TextArea from "../../Form/TextArea/TextArea";
import CardAction from "../CardAction/CardAction";
import styled from "styled-components";
import Loading from "../../Form/Loading/Loading";

const DEFAULT_CARD_VALUE = { titulo: "", conteudo: "" };

const Hint = styled.span`
  font-size: 0.8rem;
  color: #b3aeae;
  padding: 5px 0;
`;

const ContainerTextArea = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface CardFormNewProps {
  card?: Card;
  loading?: boolean;
  onSubmit?: (card?: Card) => void;
}

const CardFormNew = ({
  card = DEFAULT_CARD_VALUE,
  loading = false,
  onSubmit,
}: CardFormNewProps) => {
  const [localCard, setLocalCard] = useState<Card>(card);
  const isValidForm = localCard.titulo && localCard.conteudo;

  const handleLocalCardChange = (name: keyof Card, value: string) =>
    setLocalCard((oldValues) => ({ ...oldValues, [name]: value }));

  const handleAddNewCard = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit && onSubmit({ ...localCard, lista: ListaEnum.ToDo });
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
      <ContainerTextArea>
        <TextArea
          value={localCard.conteudo}
          onChange={(e) => handleLocalCardChange("conteudo", e.target.value)}
          placeholder="Descrição"
        />
        <Hint>Use markdown para formatar seu texto!</Hint>
      </ContainerTextArea>
      <CardAction>
        <Button type="submit" disabled={!isValidForm || loading}>
          {loading ? (
            <>
              <Loading /> Carregando...
            </>
          ) : (
            <>
              <BsPlusCircleFill /> Adicionar
            </>
          )}
        </Button>
      </CardAction>
    </form>
  );
};

export default CardFormNew;
