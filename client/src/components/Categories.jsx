import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";
import { mobile } from "../responsive";

const Container = styled.div`
  width:95%;
  margin:0 auto;
  padding-top:20px;
  display:flex;
  justify-content:space-between;
  flex-wrap:wrap;
  @media screen and (max-width:485px) {
    justify-content:center;
  }
  @media screen and (max-width:965px) {
    justify-content:space-around;
  }
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;