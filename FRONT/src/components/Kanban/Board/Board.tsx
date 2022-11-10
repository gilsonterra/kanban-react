import { useState } from "react";
import styled from "styled-components";
import Column from "../Column/Column";
import CardComponent from "../Card/Card";
import { ListaEnum, ModeEnum, Card } from "../../../types/Card";

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
      id: "1",
      titulo: "Primeiro",
      conteudo: " alksdjflkasjdfl kksadjf lksadj",
      lista: ListaEnum.ToDo,
    },
    {
      id: "2",
      titulo: "Segundo",
      conteudo: " alksdjflkasjdfl kksadjf lksadj",
      lista: ListaEnum.ToDo,
    },
    {
      id: "3",
      titulo: "Teste",
      conteudo: " alksdjflkasjdfl kksadjf lksadj",
      lista: ListaEnum.Doing,
    },
    {
      id: "4",
      titulo: "Teste",
      conteudo: " alksdjflkasjdfl kksadjf lksadj",
      lista: ListaEnum.Done,
    },
  ]);

  const cardsTodo = cards.filter((item) => item.lista === ListaEnum.ToDo);
  const cardsDoing = cards.filter((item) => item.lista === ListaEnum.Doing);
  const cardsDone = cards.filter((item) => item.lista === ListaEnum.Done);

  const onNew = (card?: Card | null) => {
    setCards((oldValues) => [...oldValues, { ...card, lista: ListaEnum.ToDo }]);
  };

  const onEdit = (card?: Card) => {
    setCards((oldValues) =>
      oldValues.map((item) => (item.id === card?.id ? { ...card } : item))
    );
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

  return (
    <Container>
      <Column title="Novo">
        <CardComponent mode={ModeEnum.NEW} onNew={onNew} />
      </Column>
      <Column title="To Do" total={cardsTodo.length}>
        {cardsTodo.map((card) => (
          <CardComponent
            key={card.id}
            card={card}
            onDelete={onDelete}
            onEdit={onEdit}
            onRight={(card) => onChangeList(ListaEnum.Doing, card)}
          />
        ))}
      </Column>
      <Column title="Doing" total={cardsDoing.length}>
        {cardsDoing.map((card) => (
          <CardComponent
            key={card.id}
            card={card}
            onDelete={onDelete}
            onEdit={onEdit}
            onLeft={(card) => onChangeList(ListaEnum.ToDo, card)}
            onRight={(card) => onChangeList(ListaEnum.Done, card)}
          />
        ))}
      </Column>
      <Column title="Done" total={cardsDone.length}>
        {cardsDone.map((card) => (
          <CardComponent
            key={card.id}
            card={card}
            onDelete={onDelete}
            onEdit={onEdit}
            onLeft={(card) => onChangeList(ListaEnum.Doing, card)}
          />
        ))}
      </Column>
    </Container>
  );
};

export default Kanban;
