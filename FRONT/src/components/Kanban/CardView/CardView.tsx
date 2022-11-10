import styled from "styled-components";
import { Card } from "../../../types/Card";
import CardAction from "../CardAction/CardAction";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.label`
  font-size: 1.2rem;
  font-weight: 600;
  color: #4e5561;
  word-wrap: break-word;
  line-height: 1.5rem;
  padding: 5px;
`;

const Description = styled.p`
  color: #4e5561;
  font-size: 1rem;
  word-wrap: break-word;
  line-height: 1.5rem;
  padding: 5px;
`;

interface CardViewProps {
  title?: string;
  description?: string;
  children?: JSX.Element | JSX.Element[] | undefined | null;
}

const CardView = ({ title, description, children }: CardViewProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <CardAction>{children}</CardAction>
    </Container>
  );
};

export default CardView;
