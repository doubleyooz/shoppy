"use client";

import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CSSProperties, useState } from "react";
import { FormResponse } from "../../common/interfaces/form-response.interface";
import createProduct from "../actions/create-product";
import { CloudUpload } from "@mui/icons-material";

interface CreateProductModalProps {
  open: boolean;
  onClose: () => void;
}

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const fileInputStyles: CSSProperties = {
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
};

export default function CreateProductModal({
  open,
  onClose,
}: CreateProductModalProps) {
  const [response, setResponse] = useState<FormResponse>();
  const [filename, setFilename] = useState("");

  const handleClose = () => {
    setResponse(undefined);
    onClose();
    setFilename("");
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={styles}>
        <form
          className="w-full max-w-xs"
          action={async (formData) => {
            const response = await createProduct(formData);

            setResponse(response);
            if (!response.error) handleClose();
          }}
        >
          <Stack spacing={2}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              required
              helperText={response?.error}
              error={!!response?.error}
            />
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              required
              helperText={response?.error}
              error={!!response?.error}
            />

            <TextField
              name="price"
              label="Price"
              variant="outlined"
              type="number"
              required
              helperText={response?.error}
              error={!!response?.error}
            />
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUpload />}
            >
              Upload File
              <input
                type="file"
                name="image"
                style={fileInputStyles}
                onChange={(e) =>
                  e.target.files && setFilename(e.target.files[0].name)
                }
              ></input>
            </Button>
            <Typography>{filename}</Typography>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
