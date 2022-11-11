const BASE_URL = "http://localhost:5000";
const LOGINData = {
  login: "letscode",
  senha: "lets@123",
};
const TOKEN_NAME = "TOKEN";

export const login = async (): Promise<string | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(LOGINData),
    });

    return response.json();
  } catch (e) {
    console.warn(e);
    alert("Erro ao fazer login!");
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_NAME);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_NAME);
};

export const authentication = async () => {
  const token = await login();

  if (!token) {
    alert("Erro ao fazer autenticação!");
    return;
  }

  localStorage.setItem(TOKEN_NAME, token);
};
