import React from 'react';
import styled from 'styled-components';
import Image1 from '../assets/istic.jpeg';
import Image2 from '../assets/Shlotkhol.png';
import Image3 from '../assets/Shlotzrok.png';


const CarouselWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-top: -10px; 
`;

const Image = styled.img`
  border-radius: 10px;
  margin: 0 10px; /* Adjust margin between images */
  ${({ id }) => id === 'image2' && `
    width: 109px;
    height: 299px;
  `}
  ${({ id }) => id === 'image3' && `
    width: 109px;
    height: 299px;
  `}
  ${({ id }) => id === 'image1' && `
    width: 770px;
    height: 263px;
    animation: opaImage 5s ease-in-out infinite alternate; /* Apply animation to Image1 */
  `}
   ${({ id }) => id === 'image4' && `
    width: 770px;
    height: 263px;
  `}
`;



const Carousel = () => {
  return (
    <CarouselWrapper>
      <Image src={Image3} alt="Image 1" id="image3" />
      <Image src={Image1} alt="Image 2" id="image1" />
      <Image src={Image2} alt="Image 3" id="image2" />
    </CarouselWrapper>
  );
};

export default Carousel;
