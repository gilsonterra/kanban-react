import { useState } from "react";
import styled from "styled-components";
import Column from "../Column/Column";
import CardComponent from "../Card/Card";
import { ListaEnum, ModeEnum, Card } from "../../../types/Card";
import { v4 } from "uuid";

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: calc(100vh - 80px);
  overflow-x: auto;
`;

const Kanban = () => {
  const [cards, setCards] = useState<Card[]>([
    {
      id: v4() + 1,
      titulo: "Primeiro",
      conteudo: " alksdjflkasjdfl kksadjf lksadj",
      lista: ListaEnum.ToDo,
    },
    {
      id: v4() + 2,
      titulo: "Segundo",
      conteudo: " alksdjflkasjdfl kksadjf lksadj",
      lista: ListaEnum.ToDo,
    },
    {
      id: v4() + 3,
      titulo: "Teste",
      conteudo: " alksdjflkasjdfl kksadjf lksadj",
      lista: ListaEnum.Doing,
    },
    {
      id: v4() + 4,
      titulo: "Teste",
      conteudo: " alksdjflkasjdfl kksadjf lksadj",
      lista: ListaEnum.Done,
    },
  ]);

  const cardsTodo = cards.filter((item) => item.lista === ListaEnum.ToDo);
  const cardsDoing = cards.filter((item) => item.lista === ListaEnum.Doing);
  const cardsDone = cards.filter((item) => item.lista === ListaEnum.Done);

  console.log("renderizou Board");

  const onAdd = (card?: Card | null) => {
    setCards((oldValues) => [
      ...oldValues,
      { ...card, id: v4(), lista: ListaEnum.ToDo },
    ]);
  };

  const onChangeList = (lista: ListaEnum, card?: Card) => {
    setCards((oldValues) =>
      oldValues.map((item) =>
        item.id === card?.id ? { ...item, lista } : item
      )
    );
  };

  const onDelete = (card?: Card) => {
    setCards((oldValues) => oldValues.filter((item) => item.id !== card?.id));
  };

  const onSubmit = (card?: Card) => {
    setCards((oldValues) =>
      oldValues.map((item) =>
        item.id === card?.id ? { ...card } : item
      )
    );
  };

  return (
    <Container>
      <Column title="Novo">
        <CardComponent mode={ModeEnum.NEW} onSubmit={onAdd} />
      </Column>
      <Column title="To Do" total={cardsTodo.length}>
        {cardsTodo.map((card) => (
          <CardComponent
            key={card.id}
            card={card}
            onClickRight={(card) => onChangeList(ListaEnum.Doing, card)}
            onClickDelete={onDelete}
            onSubmit={onSubmit}
          />
        ))}
      </Column>
      <Column title="Doing" total={cardsDoing.length}>
        {cardsDoing.map((card) => (
          <CardComponent
            key={card.id}
            card={card}
            onClickLeft={(card) => onChangeList(ListaEnum.ToDo, card)}
            onClickRight={(card) => onChangeList(ListaEnum.Done, card)}
            onClickDelete={onDelete}
            onSubmit={onSubmit}
          />
        ))}
      </Column>
      <Column title="Done" total={cardsDone.length}>
        {cardsDone.map((card) => (
          <CardComponent
            key={card.id}
            card={card}
            onClickLeft={(card) => onChangeList(ListaEnum.Doing, card)}
            onClickDelete={onDelete}
            onSubmit={onSubmit}
          />
        ))}
      </Column>
    </Container>
  );
};

export default Kanban;
