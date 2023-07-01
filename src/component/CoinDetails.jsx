import React, { useEffect, useState } from 'react'
import { Box, Container, HStack, Radio, RadioGroup, VStack, Text, Image, Stat, StatLabel, StatNumber, StatArrow, StatHelpText, Badge, Progress } from '@chakra-ui/react';
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import { server } from '../index';
import axios from 'axios';
import ErrorComponent from './ErrorComponent';

const CoinDetails = () => {

  const params = useParams()
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id]);

  if (error) return <ErrorComponent message={"Error While Fetching Coins"} />;


  return <Container maxW={"container.xl"}>
    {
      loading ? (
      <Loader />
      ) : (
        <>
        <Box width={"full"} borderWidth={1}>
        </Box>


        <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={0.7}>
              Last Updated on {Date().split("G")[0] }
            </Text>
            <Image 
            src={coins.image.large}
            w={"16"}
            h={"16"}
            objectFit={"contain"}
            />
            <Stat>
              <StatLabel>{coins.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coins.market_data.current_price[currency]}</StatNumber>
              <StatHelpText>
              <StatArrow type={coins.market_data.price_change_percentage_24h > 0
                ?"increase":
                "decrease"
                }
                />
              {coins.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
<Badge fontSize={"2xl"}
    bgColor={"blackAlpha.800"}
    color={"white"}>
    {`#${coins.market_cap_rank}`}
</Badge>
<CustomBar 
high={`${currencySymbol}${coins.market_data.high_24h[currency]}`} 
low={`${currencySymbol}${coins.market_data.low_24h[currency]}`}/>
        <Box>
          <Item title = {"Max Supply"} value={coins.market_data.max_supply}/>
          <Item title = {"Circulating Supply"} value={coins.market_data.circulating_supply}/>
          <Item title = {"Market Capital"} value={`${currencySymbol}${coins.market_data.market_cap[currency]}`}/>
          <Item title = {"All time Low"} value={`${currencySymbol}${coins.market_data.atl[currency]}`}/>
          <Item title = {"All time High"} value={`${currencySymbol}${coins.market_data.ath[currency]}`}/>
        </Box>
          </VStack>
        </>
      )
    }
  </Container> 
};

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);
const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
);
export default CoinDetails;