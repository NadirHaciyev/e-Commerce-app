import { Button, Container, Icon, Badge } from "@chakra-ui/react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { fetchLogout } from "../../api";
import { BsFillBasket3Fill } from "react-icons/bs";
import { useBasket } from "../../context/BasketContext";

function Navbar() {
  const { user, logedIn, logOut } = useAuth();
  const { basketItems } = useBasket();

  return (
    <Container maxW="1xl" position="sticky" top={0} bg="#fff" zIndex={10}>
      <nav className={styles.navbar}>
        <div className={styles.left}>
          <Link to="/" className={styles.logo}>
            e-Commerce
          </Link>
          <Link to="/" className={styles.products}>
            Products
          </Link>
        </div>
        {logedIn ? (
          <div className={styles.right}>
            <Link to="/basket">
              <Button>
                <Icon aria-label="Basket" w={6} h={6} as={BsFillBasket3Fill} />
                {basketItems.length ? (
                  <Badge
                    position="absolute"
                    transform="translate(13px, -8px)"
                    bg="#dd2917"
                    color="white"
                    fontSize={10}
                    border="1px solid #fff"
                    borderRadius={5}
                    p="3px 6px"
                  >
                    {basketItems.length}
                  </Badge>
                ) : (
                  ""
                )}
              </Button>
            </Link>
            {user?.role === "admin" && (
              <Link to='/admin'>
                <Button>Admin</Button>
              </Link>
            )}
            <Link to="/profile">
              <Button fontSize="xl" fontWeight="medium" _hover={{ bg: "#999" }}>
                Profile
              </Button>
            </Link>
            <Button onClick={logOut} colorScheme="red">
              Log Out
            </Button>
          </div>
        ) : (
          <div className={styles.right}>
            <Link to="/basket">
              <Button>
                <Icon aria-label="Basket" w={6} h={6} as={BsFillBasket3Fill} />
                {basketItems.length ? (
                  <Badge
                    position="absolute"
                    transform="translate(13px, -8px)"
                    bg="#dd2917"
                    color="white"
                    fontSize={10}
                    border="1px solid #fff"
                    borderRadius={5}
                    p="3px 6px"
                  >
                    {basketItems.length}
                  </Badge>
                ) : (
                  ""
                )}
              </Button>
            </Link>
            <Link to="/login">
              <Button colorScheme="blue">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button colorScheme="pink">Sign Up</Button>
            </Link>
          </div>
        )}
      </nav>
    </Container>
  );
}

export default Navbar;
