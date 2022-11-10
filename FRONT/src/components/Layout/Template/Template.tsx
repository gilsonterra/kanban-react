import styled from "styled-components";
import Header from "../Header/Header";
import Board from "../../Kanban/Board/Board";

const Main = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;


const Wrapper = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: start;
`;

const Layout = () => {
  return (
    <Main>
      <Header />
      <Wrapper>
        <Board />
      </Wrapper>
    </Main>
  );
};

export default Layout;
