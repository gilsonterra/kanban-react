import { FormEvent, useState } from "react";
import {
  BsPlusCircleFill,
  BsCheckCircleFill,
  BsArrowCounterclockwise,
} from "react-icons/bs";
import { Card, ModeEnum } from "../../../types/Card";
import CardAction from "../CardAction/CardAction";
import Button from "../../Form/Button/Button";
import Loading from "../../Form/Loading/Loading";
import Input from "../../Form/Input/Input";
import TextArea from "../../Form/TextArea/TextArea";

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
  const [data, setData] = useState<Card | null | undefined>(card);

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
      <Input
        disabled={loading}
        value={data?.titulo}
        onChange={(e) => handleChange("titulo", e.target.value)}
        placeholder="Título"
      />
      <TextArea
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
