import {
  Container,
  Box,
  Text,
  FormLabel,
  Input,
  Button
} from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import { fetchLogin } from "../../../api";
import { useQuery } from "react-query";
import { useAuth } from "../../../context/Auth";
import { createBrowserHistory } from "history";
import { useNavigate } from "react-router-dom";

function Login() {
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: async (values) => {
      try {
        const responseLogin = await fetchLogin(values);
        logIn(responseLogin);
        navigate('/')
      } catch {}
    }
  });

  return (
    <Container mt="10" centerContent>
      <Box>
        <Text
          as="h2"
          mb="5"
          textAlign="center"
          fontSize="22"
          fontWeight="bold"
          color="#333"
        >
          Sign In
        </Text>

        <form onSubmit={handleSubmit}>
          <Box mb="5">
            <FormLabel>E-mail</FormLabel>
            <Input onChange={handleChange} type="email" name="email" />
          </Box>
          <Box mb="5">
            <FormLabel>Password</FormLabel>
            <Input onChange={handleChange} type="password" name="password" />
          </Box>
          <Button width="100%" colorScheme="blue" type="submit">
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
