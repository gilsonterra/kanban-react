import { Card } from "../types/Card";
import { clientHTTP } from "./clientHTTP";

const BASE_URL = "http://localhost:5000/cards";

export const getAll = async (): Promise<Card[]> => {
  const response = await clientHTTP(`${BASE_URL}`);
  return (response?.json() || []) as Card[];
};

export const post = async (payload: Omit<Card, 'id'>): Promise<Card> => {
  const response = await clientHTTP(`${BASE_URL}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return (response?.json() || []) as Card;
};

export const put = async (uuid: string, payload: Card): Promise<Card> => {
  const response = await clientHTTP(`${BASE_URL}/${uuid}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  return (response?.json() || []) as Card;
};

export const remove = async (uuid: string): Promise<Card[]> => {
  const response = await clientHTTP(`${BASE_URL}/${uuid}`, {
    method: 'DELETE'
  });

  return (response?.json() || []) as Card[];
};