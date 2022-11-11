import { render, screen, fireEvent } from "@testing-library/react";
import Board from "./Board";

const MOCK_CARD = {
  id: "uuid",
  titulo: "string",
  conteudo: "string",
  lista: "ToDo",
};

jest.mock("../../../services/loginService", () => {
  return {
    authentication: jest.fn(() => Promise.resolve("TOKEN")),
  };
});

jest.mock("../../../services/cardService", () => {
  return {
    getAll: () => new Promise(() => [MOCK_CARD, MOCK_CARD, MOCK_CARD]),
    post: () => new Promise(() => MOCK_CARD),
    put: () => new Promise(() => MOCK_CARD),
    remove: () => new Promise(() => [MOCK_CARD, MOCK_CARD, MOCK_CARD]),
  };
});

beforeAll(() => {
  jest.spyOn(window, "fetch");
  jest.spyOn(window, "alert");
  jest.useFakeTimers();
});

afterAll(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
});

test("Render columns in Board", () => {
  render(<Board />);

  const columnNew = screen.getByText("Novo");
  expect(columnNew).toBeInTheDocument();

  const columnTodo = screen.getByText("To Do");
  expect(columnTodo).toBeInTheDocument();

  const columnDoing = screen.getByText("Doing");
  expect(columnDoing).toBeInTheDocument();

  const columnDone = screen.getByText("Done");
  expect(columnDone).toBeInTheDocument();
});

test("New card", async () => {
  render(<Board />);

  const btnAdd = screen.getByText("Adicionar");
  expect(btnAdd).toBeInTheDocument();
  expect(btnAdd).toBeDisabled();

  const titleText = "Test Title";
  const descriptionText = "This is a *example*";

  const inputTitle = screen.getByPlaceholderText("Título") as HTMLInputElement;
  expect(inputTitle).toBeInTheDocument();

  fireEvent.change(inputTitle, { target: { value: titleText } });
  expect(inputTitle.value).toBe(titleText);

  const textareaDescription = screen.getByPlaceholderText(
    "Descrição"
  ) as HTMLTextAreaElement;
  expect(textareaDescription).toBeInTheDocument();

  fireEvent.change(textareaDescription, { target: { value: descriptionText } });
  expect(textareaDescription.value).toBe(descriptionText);

  expect(btnAdd).toBeEnabled();
  fireEvent.click(btnAdd);

  expect(screen.getByText("Carregando...")).toBeInTheDocument();
});
