import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm, Controller } from "react-hook-form";
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  p: 1,
};

const FormSignIn = () => {
  const [showPassword, setShowPassword] = useState(true);
  let navigate = useNavigate()
 
  const defaultValues = {
    username: "votada",
    password: "123456",
    remember: true,
  };

  const methods = useForm({ defaultValues });

  const {
    setError,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    console.log(data);
    setError("afterSubmit", { message: "server response error" });
    navigate("../", {replace: true});
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={style}>
        <LockIcon sx={{ fontSize: 30, color: "error.main" }}></LockIcon>
      </Box>
      <Box sx={style}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Log In
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                error={!!error}
                helperText={error?.message}
                label="User name"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                type={showPassword ? "text" : "password"}
                error={!!error}
                helperText={error?.message}
                label="PassWord"
                {...field}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="space-between"
          sx={{ my: 2 }}
        ></Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          loading={isSubmitting}
          variant="contained"
          sx={{ bgcolor: "error.main" }}
         
        >
          Sign In
        </LoadingButton>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "error.dark",
            p: 2,
          }}
        >
          <Typography variant="subtitle2" component="div">
            Forget password?
          </Typography>
          <Typography variant="subtitle2" component="div">
            Don't have an account? Sign up
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default FormSignIn;
