import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Column from "../Column/Column";
import CardComponent from "../Card/Card";
import { ListaEnum, ModeEnum, Card } from "../../../types/Card";
import { getAll, post, put, remove } from "../../../services/cardService";
import { authentication } from "../../../services/loginService";

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: calc(100vh - 80px);
  overflow-x: auto;
`;

const Kanban = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const cardsTodo = cards.filter((item) => item.lista === ListaEnum.ToDo);
  const cardsDoing = cards.filter((item) => item.lista === ListaEnum.Doing);
  const cardsDone = cards.filter((item) => item.lista === ListaEnum.Done);

  const onNew = async (card?: Card | null) => {
    try {
      await post({ ...card });
      fetchCards();
    } catch (e) {
      alert(`Erro ao cadastrar um card! ${e}`);
      console.error(e);
    }
  };

  const onEdit = async (card?: Card) => {
    try {
      if(!card?.id){
        throw new Error(`Para editar o card o Id é obrigatório!`);
      }

      await put(card?.id, { ...card });
      fetchCards();
    } catch (e) {
      alert(`Erro ao editar um card! ${e}`);
      console.error(e);
    }
  };

  const onChangeList = (lista: ListaEnum, card?: Card) => {
    onEdit({...card, lista });
  };

  const onDelete = async (card?: Card) => {
    try {
      if(!card?.id){
        throw new Error(`Para remover o card o Id é obrigatório!`);
      }

      await remove(card.id);
      fetchCards();
    } catch (e) {
      alert(`Erro ao deletar o card: ${card?.id}! ${e}`);
      console.error(e);
    }    
  };

  const fetchCards = useCallback(async () => {
    const cards = await getAll();
    setCards(cards);
  }, []);

  useEffect(() => {
    authentication().then(() => fetchCards());
  }, [fetchCards]);

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
