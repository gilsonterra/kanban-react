import styled from "styled-components";

const TextArea = styled.textarea`
  height: 120px;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  border: solid 1px #4e5561;
  margin-bottom: 2px;
  font-size: 1rem;
  padding: 5px;
  border-radius: 5px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  
  &:disabled {
    cursor: not-allowed;
  }
`;

export default TextArea;
