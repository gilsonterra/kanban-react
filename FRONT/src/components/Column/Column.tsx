import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  margin: 5px;
  width: 100%;
  min-width: 300px;
  border-radius: 10px;
  background-color: #f4f5f7;
  padding: 15px;
  overflow-y: auto;
`;

const Title = styled.label`
  color: #7d889b;
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0px;
  font-weight: 600;
  font-size: 1.3rem;
  padding: 10px 5px;
`;

const Total = styled.span`
  font-size: 1rem;
  font-style: italic;
`;

interface ColumnProps {
  title: string;
  total?: number;
  children?: JSX.Element | JSX.Element[];
}

const Column = ({ title, total, children }: ColumnProps) => {
  return (
    <Container>
      <Title>
        {title} 
        {total ? <Total>{total}</Total> : <></>}
      </Title>
      {children}
    </Container>
  );
};

export default Column;
