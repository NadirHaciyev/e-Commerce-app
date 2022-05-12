import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Box,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { Formik, FieldArray, Field } from "formik";
import { createProduct } from "../../../api";
import { useMutation, useQueryClient } from "react-query";

function New() {
  const queryClient = useQueryClient();

  const newProductMutation = useMutation(createProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products")
  });

  const toast = useToast();

  return (
    <Flex flexDir="column" width="100%" maxW="700px" mt={15} gap={5}>
      <Heading fontSize="2xl" color="green">
        Add new product
      </Heading>
      <Formik
        initialValues={{ title: "", price: "", description: "", photos: [] }}
        onSubmit={async (values) => {
          const newValues = {
            ...values,
            photos: JSON.stringify(values.photos)
          };
          newProductMutation.mutate(newValues, {
            onSuccess: () => {
              toast({
                title: `Success`,
                status: "success",
                isClosable: true,
                duration: 1000,
                position: "top"
              });
            },
            onError: () => {
              toast({
                title: `Error`,
                status: "error",
                isClosable: true,
                duration: 1000,
                position: "top"
              });
            }
          });
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting, handleBlur }) => (
          <form onSubmit={handleSubmit}>
            <FormControl>
              <Flex flexDir="column" gap="10px">
                <Box>
                  <FormLabel>Title</FormLabel>
                  <Input
                    onChange={handleChange}
                    placeholder="Title"
                    name="title"
                    disabled={isSubmitting}
                    onBlur={handleBlur}
                  />
                </Box>

                <Box>
                  <FormLabel>Description</FormLabel>
                  <Input
                    onChange={handleChange}
                    placeholder="description"
                    name="description"
                    disabled={isSubmitting}
                    onBlur={handleBlur}
                  />
                </Box>

                <Box>
                  <FormLabel>Price</FormLabel>
                  <Input
                    onChange={handleChange}
                    placeholder="price"
                    name="price"
                    disabled={isSubmitting}
                    onBlur={handleBlur}
                  />
                </Box>

                <Box>
                  <FormLabel>Photos</FormLabel>
                  <FieldArray
                    name="photos"
                    render={(arrayHelpers) => (
                      <Flex flexDir="column" gap="10px">
                        {values.photos &&
                          values.photos.map((photo, index) => (
                            <Flex gap={3} key={index}>
                              <Input
                                name={`photos.${index}`}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                value={photo}
                                placeholder="Please add a photo link"
                                onBlur={handleBlur}
                              />
                              <Button
                                colorScheme="red"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                Remove
                              </Button>
                            </Flex>
                          ))}
                        <Button
                          colorScheme="facebook"
                          w="200px"
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add Photo
                        </Button>
                      </Flex>
                    )}
                  />
                </Box>

                <Button colorScheme="green" type="submit">
                  Create
                </Button>
              </Flex>
            </FormControl>
          </form>
        )}
      </Formik>
    </Flex>
  );
}

export default New;
