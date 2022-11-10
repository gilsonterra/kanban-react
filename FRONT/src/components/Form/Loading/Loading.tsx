import styled, { keyframes } from "styled-components";

const spin = keyframes`
    to { transform: rotate(360deg);}
`;

const Loading = styled.div`
  height: 20px;
  width: 20px;
  border: 2px solid rgba(244, 245, 246, 0.1);
  border-left-color: #4e5561;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export default Loading;
