import styled from "styled-components";

export const Button = styled.button`
  padding: 10px;
  width: 100%;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border: none;
  border-radius: 10px;
  transition: all 200ms;
  &:disabled {
    cursor: not-allowed;
  }
  &:not([disabled]) {
    cursor: pointer;
  }
  &:not([disabled]):active {
    transform: scale(0.96);
  }
  &:not([disabled]):hover {
    background-color: #ccc;
  }
`;

export const ButtonCircle = styled(Button)`
  font-size: 1rem;
  height: 40px;
  width: 40px;
  border-radius: 50%;  
  padding: 10px;  
`;

export default Button;
