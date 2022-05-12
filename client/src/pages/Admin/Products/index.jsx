import { useEffect, useMemo } from "react";
import {
  useQuery,
  useQueryClient,
  useMutation,
  useInfiniteQuery
} from "react-query";
import { deleteProduct, fetchProduct } from "../../../api";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Flex,
  Box,
  Text
} from "@chakra-ui/react";

function Products() {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products")
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useInfiniteQuery("admin:products", fetchProduct, {
    getNextPageParam: (lastPage, pages) => {
      const morePagesExist = lastPage?.length === 12;
      if (!morePagesExist) return;

      return pages.length + 1;
    }
  });

  if (status == "loading") return "Loading...";

  if (status == "error") return "An error has occurred: " + error.message;

  return (
    <Flex flexDir="column" mt="10px" gap="10px" w="100%" maxW="800px">
      <Flex justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="semibold">
          Products
        </Text>
        <Link to="new">
          <Button colorScheme="green">New</Button>
        </Link>
      </Flex>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Price</Th>
              <Th>Created At</Th>
              <Th isNumeric={true}>Action</Th>
            </Tr>
          </Thead>
          {data.pages?.map((page, key) => (
            <Tbody key={key}>
              {page.map((item) => (
                <Tr key={item._id}>
                  <Td>{item.title}</Td>
                  <Td>{item.price}$</Td>
                  <Td>{moment(item.createdAt).format("DD/MM/YYYY")}</Td>
                  <Td isNumeric="true">
                    <Link to={item._id}>
                      <Button colorScheme="green" size="sm" mr={3}>
                        Edit
                      </Button>
                    </Link>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => deleteMutation.mutate(item._id)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          ))}
        </Table>
      </TableContainer>
      <Button
        w="250px"
        mx='auto'
        colorScheme="blue"
        onClick={fetchNextPage}
        disabled={!hasNextPage || isFetchingNextPage}
        mt={5}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </Button>
    </Flex>
  );
}

export default Products;
