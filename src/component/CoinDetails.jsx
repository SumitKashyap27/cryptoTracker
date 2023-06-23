import React, { useEffect, useState } from 'react'
import { Box, Container } from '@chakra-ui/react';
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import { server } from '../index';
import axios from 'axios';

const CoinDetails = () => {


  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, []);


  return <Container maxW={"container.xl"}>
    {
      loading ? (
      <Loader />
      ) : (
        <>
        <Box width={""} borderWidth={1}>
          kjvhv
        </Box>
        </>
      )
    }
  </Container>
}

export default CoinDetails;