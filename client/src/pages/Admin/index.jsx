import { NavLink, Outlet } from "react-router-dom";
import { Flex, Button, Box, Container } from "@chakra-ui/react";
import "./style.css";

function Admin() {
  return (
    <Container maxW="7xl">
      <Flex gap={5}>
        <nav className="nav">
          <Flex
            flexDir="column"
            h="calc(100%)"
            gap={3}
            borderRight="1px solid #ccc"
            pt={7}
          >
            <NavLink
              end
              className={({ isActive }) =>
                isActive ? "active nav-link" : "nav-link"
              }
              to="/admin"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "active nav-link" : "nav-link"
              }
              to="order"
            >
              Order
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "active nav-link" : "nav-link"
              }
              to="products"
            >
              Products
            </NavLink>
          </Flex>
        </nav>

        <Outlet />
      </Flex>
    </Container>
  );
}

export default Admin;
