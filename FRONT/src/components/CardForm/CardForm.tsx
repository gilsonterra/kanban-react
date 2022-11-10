import { FormEvent, useState } from "react";
import styled from "styled-components";
import {
  BsPlusCircleFill,
  BsCheckCircleFill,
  BsArrowCounterclockwise,
} from "react-icons/bs";
import { Card, ModeEnum } from "../../types/Card";
import CardAction from "../CardAction/CardAction";
import Button from "../Button/Button";
import Loading from "../Loading/Loading";

const InputTitle = styled.input`
  height: 40px;
  width: 100%;
  border: solid 1px #4e5561;
  margin-bottom: 2px;
  font-size: 1rem;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 5px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
`;

const TextAreaDescription = styled.textarea`
  height: 90px;
  width: 100%;
  border: solid 1px #4e5561;
  margin-bottom: 2px;
  font-size: 1rem;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 5px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
`;

interface CardFormProps {
  onSubmit?: (card?: Card | null) => void;
  onReset?: () => void;
  loading?: boolean;
  mode: ModeEnum.NEW | ModeEnum.EDIT;
  card?: Card | null;
}

const CardForm = ({
  onSubmit,
  onReset,
  mode,
  loading = false,
  card,
}: CardFormProps) => {
  const [data, setData] = useState<Card | null| undefined>(card);

  const handleChange = (name: string, value: string) =>
    setData((oldValues) => ({ ...oldValues, [name]: value }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit && onSubmit(data);
  };

  const handleReset = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setData(data);
    onReset && onReset();
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <InputTitle
        disabled={loading}
        value={data?.titulo}
        onChange={(e) => handleChange("titulo", e.target.value)}
        placeholder="Título"
      />
      <TextAreaDescription
        disabled={loading}
        value={data?.conteudo}
        onChange={(e) => handleChange("conteudo", e.target.value)}
        placeholder="Descrição"
      />
      <CardAction>
        {loading ? (
          <Button disabled>
            <Loading /> Carregando...
          </Button>
        ) : mode === ModeEnum.NEW ? (
          <Button type="submit">
            <BsPlusCircleFill /> Adicionar
          </Button>
        ) : (
          <>
            <Button type="reset">
              <BsArrowCounterclockwise /> Cancelar
            </Button>
            <Button type="submit">
              <BsCheckCircleFill /> Salvar
            </Button>
          </>
        )}
      </CardAction>
    </form>
  );
};

export default CardForm;
