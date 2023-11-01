import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination,  A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const Slider=styled.div`
    width:100%;
    position: relative;
`
const Image = styled.img`
  width:100%;
  height:550px;
  object-fit: cover;
  box-sizing:border-box;
  @media screen and (max-width:485px) {
    height:450px;
  }
`;
const SliderBox=styled.div`
   display:flex;
   width:100%;
   justify-content:space-between;

`
const SliderImages=styled.img`
    padding:5px;
    box-sizing:border-box;
    max-width:130px;
    width:100%;
    height:120px;
    object-fit: cover;
    display:flex;
    border: ${(props) =>props.isSelected&&"1px solid black"};
    @media screen and (max-width:485px) {
        max-width:80px;
        width:100%;
        height:80px;
  }
`
const ArrowLeft=styled.div`
    position:absolute;
    color:#fff;
    top:40%;
    left:5%;
    transform:translateY(-50%);
`
const ArrowRight=styled.div`
    position:absolute;
    color:#fff;
    top:40%;
    right: 5%;
    transform:translateY(-50%);
`

export default function ProductSlider(props) {
    const[currentImage,setCurrentImage]=useState(0)
    const handleImageChange=(index)=>{
        setCurrentImage(index)
    }
    
    const handleClick = (direction) => {
      const totalImages = getTotalImages();
      console.log(totalImages);

  
      if (direction === 'forward') {
        setCurrentImage((prevIndex) => (prevIndex + 1) % totalImages);
      } else if (direction === 'back') {
        setCurrentImage((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
      }
    };
 

  const filtered= props.image&&props.image.filter((element)=>element.color===props.setcolor)
  const filteredimage=filtered&&filtered.map((item)=>(
  item.image
 ))
 const getTotalImages = () => {
  // Calculate the total number of images
  return filteredimage.reduce((total, group) => total + group.length, 0);
};


  return (
    <Slider>
     {filteredimage&&filteredimage.length>0&&
  <Image src={filteredimage[0][currentImage]}/>}

<Swiper modules={[Navigation, Pagination , A11y]}
        effect='coverflow'
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'4'}
      >    
        <SliderBox>
        {filtered&&
  filtered.map((imgGroup) => (
    <div key={imgGroup.color}>
      <h3>Color: {imgGroup.color}</h3>
      {imgGroup.image&&imgGroup.image.map((image, index) => (
        <SwiperSlide key={index}>
          <SliderImages
            src={image}
            isSelected={index === currentImage}
            onClick={() => handleImageChange(index)}
          />
        </SwiperSlide>
      ))}
    </div>
  ))} 
        </SliderBox>
  </Swiper>
         <ArrowRight direction='forward' onClick={()=>handleClick("forward")}>
            <ArrowForwardIosIcon style={{fontSize:35}}/>
         </ArrowRight>
         <ArrowLeft direction='back' onClick={()=>handleClick("back")}>
           <ArrowBackIosIcon style={{fontSize:35}}/>
         </ArrowLeft>
    </Slider>
  )
}
