import SendIcon from '@mui/icons-material/Send';
import styled from "styled-components";
import { mobile } from '../responsive';

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top:10vh;
`;
const Title = styled.h4`
  font-size: 50px;
  margin-bottom: 20px;
  color:#292626;
  font-family: 'Roboto Condensed', sans-serif;
  @media screen and (max-width:485px) {
    font-size: 40px;
  }
`;

const Desc = styled.div`
  font-size: 24px;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({textAlign:'center'})}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({width:'80%'})}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <SendIcon />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;