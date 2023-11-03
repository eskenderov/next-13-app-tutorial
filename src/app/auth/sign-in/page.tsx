import { LoginForm } from "@/components/Form/LoginForm";
import { Box, Heading, Text } from "@chakra-ui/react";

const SignInPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "500px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 3,
        backgroundColor: "#fff",
        borderRadius: "12px",
        margin: "20px auto",
      }}
    >
      <Heading as="h3" mb="28px">
        Login
      </Heading>
      <LoginForm />
    </Box>
  );
};

export default SignInPage;
