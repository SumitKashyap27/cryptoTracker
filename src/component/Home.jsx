import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import {Carousel} from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';

const Home = () => {
  return <Box>
    <MyCarousel/>

  </Box>
}

const MyCarousel = ()=>(
  <Carousel 
  autoPlay
  infiniteLoop
  interval={1500}
  showArrows={true}
  showThumbs={true}
  showStatus={false} 
  >
    <Box>
      <Image 
        w={"full"}
        h={"full"}
        objectFit={"fill"}
        src={img1} 
        filter={"grayscale(1)"} />
    </Box>
    <Box>
      <Image 
        src={img2}         
        w={"full"}
        h={"full"}
        objectFit={"fill"}
        filter={"grayscale(1)"} />
    </Box>
  </Carousel>
)

export default Home