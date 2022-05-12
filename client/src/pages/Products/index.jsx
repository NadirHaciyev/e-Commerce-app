import { Grid, Button } from "@chakra-ui/react";
import React from "react";
import { useInfiniteQuery } from "react-query";
import { fetchProduct } from "../../api";
import Card from "../../components/Card";

function Products() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useInfiniteQuery("products", fetchProduct, {
    getNextPageParam: (lastPage, pages) => {
      const morePagesExist = lastPage?.length === 12;
      if (!morePagesExist) return;

      return pages.length + 1;
    }
  });

  if (status == "loading") return "Loading...";

  if (status == "error") return "An error has occurred: " + error.message;

  return (
    <Grid justifyItems="center" mt={10} gap="2.5rem">
      {data.pages.map((page, key) => {
        return (
          <Grid
            key={key}
            templateColumns="repeat(4, 1fr)"
            justifyItems="center"
            gap={10}
          >
            {page.map((item) => {
              return <Card key={item._id} item={item} />;
            })}
          </Grid>
        );
      })}
      <Button
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
    </Grid>
  );
}

export default Products;
