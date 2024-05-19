import { useState, useEffect } from "react";
import { Container, VStack, Text, HStack, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStockData = async (query) => {
    setLoading(true);
    setError(null);
    try {
      // Replace with actual API call
      const response = await fetch(`https://api.example.com/stocks?query=${query}`);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (query.trim() !== "") {
      fetchStockData(query);
    }
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl" fontWeight="bold">
          TW Stock Search
        </Text>
        <HStack width="100%">
          <Input placeholder="Enter stock symbol" value={query} onChange={(e) => setQuery(e.target.value)} />
          <Button leftIcon={<FaSearch />} colorScheme="teal" onClick={handleSearch}>
            Search
          </Button>
        </HStack>
        {loading && <Spinner />}
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        {data && (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Symbol</Th>
                <Th>Name</Th>
                <Th>Price</Th>
                <Th>Change</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((stock) => (
                <Tr key={stock.symbol}>
                  <Td>{stock.symbol}</Td>
                  <Td>{stock.name}</Td>
                  <Td>{stock.price}</Td>
                  <Td color={stock.change >= 0 ? "green.500" : "red.500"}>{stock.change}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
