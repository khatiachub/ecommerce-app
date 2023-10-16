
  import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
  import InstagramIcon from '@mui/icons-material/Instagram';
  import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
  import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
  import PinterestIcon from '@mui/icons-material/Pinterest';
  import RoomIcon from '@mui/icons-material/Room';
  import TwitterIcon from '@mui/icons-material/Twitter';
  import styled from "styled-components";
  import { mobile } from '../responsive';
  import { tablet } from '../tablet';
  
  
  const Container = styled.div`
    display: flex;
    /* background-color:#f5fbfd; */
    justify-content:space-between;
    width:93%;
    margin:0 auto;
    margin-top:15vh;
    ${tablet({justifyContent:'space-between'})};
    @media screen and (max-width:700px) {
      flex-direction:column;
    } 
    @media screen and (min-width:1450px) {
      width:60%;
    }
  `;
  
  const Left = styled.div`
    display: flex;
    flex-direction: column;
  `;
  
  const Logo = styled.h1``;
  
  const Desc = styled.p`
    margin: 20px 0px;
    max-width:300px;
  `;
  
  const SocialContainer = styled.div`
    display: flex;
  `;
  
  const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  `;
  
  const Center = styled.div`
    max-width:300px;
    width:100%;
    padding:0px 20px 0px 20px;
    @media screen and (max-width:975px) {
      display:none;
    }
  `;
  
  const Title = styled.h3`
    margin-bottom: 30px;
    @media screen and (max-width:700px) {
      margin-top:40px;
    }
  `;
  
  const ListWrap=styled.div`
    display:flex;
    justify-content:space-between;
    width:100%;
  `
  const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction:column;
  `;
  
  const ListItem = styled.li`
    margin-bottom: 10px;
    width:105px;
  `;
  
  const Right = styled.div`
    max-width: 320px;
    width:100%;
  `;
  
  const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    @media screen and (min-width:900px) {
      margin-bottom:15px;
    }
  `;
  
  const Payment = styled.img`
      width: 50%;
  `;
  
  const Footer = () => {
    return (
      <Container>
        <Left>
          <Logo>CORAL.</Logo>
          <Desc>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly believable.
          </Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <FacebookOutlinedIcon />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <InstagramIcon />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <TwitterIcon/>
            </SocialIcon>
            <SocialIcon color="E60023">
              <PinterestIcon />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title style={{marginTop:8}}>Useful Links</Title>
          <ListWrap>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Man Fashion</ListItem>
            <ListItem>Woman Fashion</ListItem>
            <ListItem>Accessories</ListItem>
           </List> 
           <List>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
          </List>
          </ListWrap>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <RoomIcon style={{marginRight:"10px"}}/> 622 Dixie Path , South Tobinchester 98336
          </ContactItem>
          <ContactItem>
            <LocalPhoneOutlinedIcon style={{marginRight:"10px"}}/> +995 599-448-832
          </ContactItem>
          <ContactItem>
            <MailOutlineOutlinedIcon style={{marginRight:"10px"}} /> contact@coral.dev
          </ContactItem>
          <Payment style={{marginLeft:1.5}} src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Container>
    );
  };
  
  export default Footer;