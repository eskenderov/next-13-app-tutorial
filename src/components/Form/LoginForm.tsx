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
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

export const LoginForm = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      loading: false,
      submitError: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("This field is required"),
      password: Yup.string()
        .required("This field is require")
        .min(6, "Password must be at least 6 characters"),
    }),
    validateOnChange: true,
    onSubmit: async (values, helpers) => {
      const { email, password } = values;
      helpers.setFieldValue("loading", true);
      try {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res?.ok) {
          router.refresh();
          router.back();
        } else {
          // #toast
        }
        helpers.setFieldValue("submitError", "");
      } catch (error: any) {
        helpers.setStatus({ success: false });
        helpers.setFieldValue(
          "submitError",
          error.response?.data?.detail || error.message
        );
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
          Login
        </Button>

        <Text fontSize="sm">
          If you don&apos;t have an account, please&nbsp;
          <Link style={{ textDecoration: "underline" }} href="/auth/sign-up">
            Sign up
          </Link>
        </Text>
      </Box>
    </form>
  );
};
