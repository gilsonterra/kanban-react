import { BsKanban } from 'react-icons/bs';
import styled from "styled-components";

const Title = styled.h1`  
  display: flex;
  justify-content: center;
  gap: 5px;
  align-items: center;
  color: #4e5561;  
  font-size: 2rem;
  margin: 10px;
`;

const Container = styled.header`
  position: absolute;
  margin: 0 auto;  
  width: 100%;
  padding: 10px;  
`

const Header = () => {
  return (
    <Container>
      <nav>
        <Title>
          <BsKanban /> Kanban
        </Title>
      </nav>
    </Container>
  );
};

export default Header;
