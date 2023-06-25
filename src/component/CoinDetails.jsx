import React, { useEffect, useState } from 'react'
import { Box, Container, HStack, Radio, RadioGroup, VStack, Text, Image, Stat, StatLabel, StatNumber, StatArrow, StatHelpText } from '@chakra-ui/react';
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
              <StatNumber>{currencySymbol}{coins.market_data.current_price[currency]}</StatNumber>
              <StatHelpText>
              <StatArrow type='decrease'/>
              {coins.market_data.price_change_percentage_24th}%
              </StatHelpText>
            </Stat>

          </VStack>
        </>
      )
    }
  </Container> 
}

export default CoinDetails;