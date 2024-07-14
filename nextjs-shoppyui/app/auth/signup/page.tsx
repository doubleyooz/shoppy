"use client";

import { Button, Link, Stack, TextField } from "@mui/material";
import NextLink from "next/link";
import { useFormState } from "react-dom";
import createUser from "./create-user";

export default function Signup() {
  const [state, formAction] = useFormState(createUser, { error: "" });
  return (
    <form action={formAction} className="w-full max-w-xs">
      <Stack spacing={2}>
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          type="email"
          helperText={state.error}
          error={!!state.error}
        />
        <TextField
          label="Password"
          name="password"
          variant="outlined"
          type="password"
          helperText={state.error}
          error={!!state.error}
        />
        <Button type="submit" variant="contained">
          Signup
        </Button>
        <Link className="self-center" component={NextLink} href="/auth/login">
          Login
        </Link>
      </Stack>
    </form>
  );
}
