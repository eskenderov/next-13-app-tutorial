"use client";
import { objectNotEmpty } from "@/services/utils";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

export const SignUpForm = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "tom@mail.ru",
      password: "123456",
      username: "tom",
      loading: false,
      submitError: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(50, "Username must be no more than 50 characters")
        .required("This field is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("This field is required"),
      password: Yup.string()
        .required("This field is require")
        .min(6, "Password must be at least 6 characters"),
    }),
    validateOnChange: true,
    onSubmit: async (values, helpers) => {
      helpers.setFieldValue("loading", true);
      try {
        const { username, email, password } = values;
        const res = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        });
        if (res.ok) {
          helpers.setFieldValue("submitError", "");
          helpers.setFieldValue("email", "");
          helpers.setFieldValue("password", "");
          helpers.setFieldValue("username", "");
          router.push("/auth/sign-in");
        } else {
          const response = await res.json();
          let fetchError: any = new Error("Create User Error");
          fetchError.name = "ApiUserError";
          fetchError.status = res.status;
          fetchError.message = response.message;
          throw fetchError;
        }
      } catch (error: any) {
        helpers.setStatus({ success: false });
        helpers.setFieldValue("submitError", error.message);
        helpers.setSubmitting(false);
      } finally {
        helpers.setFieldValue("loading", false);
      }
    },
  });

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={formik.handleSubmit}
      className="form"
    >
      {/* username field */}
      <FormControl
        isRequired
        maxWidth={300}
        isInvalid={!!(formik.errors?.username && formik.touched.username)}
      >
        <FormLabel>Username</FormLabel>
        <Input
          placeholder="Username"
          value={formik.values.username}
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="off"
        />
        {!!(formik.errors?.username && formik.touched.username) && (
          <FormErrorMessage>{formik.errors?.username}</FormErrorMessage>
        )}
      </FormControl>

      {/* email field */}
      <FormControl
        isRequired
        maxWidth={300}
        isInvalid={!!(formik.errors?.email && formik.touched.email)}
      >
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Email"
          value={formik.values.email}
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="off"
        />
        {!!(formik.errors?.email && formik.touched.email) && (
          <FormErrorMessage>{formik.errors?.email}</FormErrorMessage>
        )}
      </FormControl>

      {/* password field */}
      <FormControl
        isRequired
        maxWidth={300}
        isInvalid={!!(formik.errors?.password && formik.touched.password)}
      >
        <FormLabel>Password</FormLabel>
        <Input
          placeholder="Password"
          value={formik.values.password}
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="off"
        />
        {!!(formik.errors?.password && formik.touched.password) && (
          <FormErrorMessage>{formik.errors?.password}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={!!formik.values?.submitError}>
        <FormErrorMessage>{formik.values?.submitError}</FormErrorMessage>
      </FormControl>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Button
          isLoading={formik.values.loading}
          type="submit"
          variant="solid"
          colorScheme="blue"
          isDisabled={
            formik.touched.email &&
            formik.touched.password &&
            objectNotEmpty(formik.errors)
          }
        >
          Sign up
        </Button>

        <Text fontSize="sm">
          If you don&apos;t have an account, please&nbsp;
          <Link style={{ textDecoration: "underline" }} href="/auth/sign-in">
            Sign in
          </Link>
        </Text>
      </Box>
    </form>
  );
};
