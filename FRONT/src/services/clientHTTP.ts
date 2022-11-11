import { getToken } from "./loginService";

export const clientHTTP = async (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<Response | undefined> => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("Token não encontrado! Tenta logar novamente.");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    return fetch(input, { headers, ...init });
  } catch (e) {
    alert(e);
    console.error(e);
  }
};
