import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Column from "../Column/Column";
import CardComponent from "../Card/Card";
import { ListaEnum, ModeEnum, Card } from "../../../types/Card";
import { authentication } from "../../../services/loginService";
import { getAll, post, put, remove } from "../../../services/cardService";

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: calc(100vh - 80px);
  overflow-x: auto;
`;

const Kanban = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loadingNew, setLoadingNew] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState<string[]>([]);

  const isCardLoading = (id?: string): boolean =>
    !!loadingEdit.find((item) => item === id);

  const cardsTodo = cards.filter((item) => item.lista === ListaEnum.ToDo);
  const cardsDoing = cards.filter((item) => item.lista === ListaEnum.Doing);
  const cardsDone = cards.filter((item) => item.lista === ListaEnum.Done);

  const onNew = async (card?: Card | null) => {
    try {
      setLoadingNew(true);

      await post({ ...card });
      await fetchCards();
    } catch (e) {
      alert(`Erro ao cadastrar um card! ${e}`);
      console.error(e);
    } finally {
      setLoadingNew(false);
    }
  };

  const onEdit = async (card?: Card) => {
    const id = card?.id;

    try {
      if (!id) {
        throw new Error(`Para editar o card o Id é obrigatório!`);
      }

      setLoadingEdit((oldValues) => [...oldValues, id]);

      await put(id, { ...card });
      await fetchCards();
    } catch (e) {
      alert(`Erro ao editar um card! ${e}`);
      console.error(e);
    } finally {
      setLoadingEdit((oldValues) => oldValues.filter((i) => i !== id));
    }
  };

  const onChangeList = (lista: ListaEnum, card?: Card) => {
    onEdit({ ...card, lista });
  };

  const onDelete = async (card?: Card) => {
    const id = card?.id;
    try {
      if (!id) {
        throw new Error(`Para remover o card o Id é obrigatório!`);
      }

      setLoadingEdit((oldValues) => [...oldValues, id]);
      await remove(id);
      await fetchCards();
    } catch (e) {
      alert(`Erro ao deletar o card: ${id}! ${e}`);
      console.error(e);
    } finally {
      setLoadingEdit((oldValues) => oldValues.filter((i) => i !== id));
    }
  };

  const fetchCards = useCallback(async () => {
    const cards = await getAll();
    setCards(cards);
  }, []);

  const initAuthentication = useCallback(async () => {
    await authentication();
    await fetchCards();
  }, [fetchCards]);

  useEffect(() => {
    initAuthentication();
  }, [initAuthentication]);

  return (
    <Container>
      <Column title="Novo">
        <CardComponent mode={ModeEnum.NEW} onNew={onNew} loading={loadingNew} />
      </Column>
      <Column title="To Do" total={cardsTodo.length}>
        {cardsTodo.map((card) => (
          <CardComponent
            key={card.id}
            card={card}
            loading={isCardLoading(card?.id)}
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
            loading={isCardLoading(card?.id)}
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
            loading={isCardLoading(card?.id)}
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
