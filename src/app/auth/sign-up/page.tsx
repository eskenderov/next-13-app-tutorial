import { Box, Heading } from "@chakra-ui/react";

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
      <Heading as="h3">Sign up</Heading>
    </Box>
  );
};

export default SignInPage;
