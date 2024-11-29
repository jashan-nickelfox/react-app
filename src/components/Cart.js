import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "../features/cart/cartSlice";
import { Box, Typography, List, ListItem, ListItemText, IconButton, Button} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 5,
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "Background"
      }}
    >
      <Box display= "flex" justifyContent="center">
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      </Box>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <List>
          {cartItems.map((item) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  color="error"
                  onClick={() => dispatch(removeItem({ id: item.id }))}
                >
                  <DeleteIcon />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              <ListItemText
                primary={item.name}
                secondary={`Price: $${item.price.toFixed(
                  2
                )} | Quantity: ${item.quantity}`}
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() =>
                    dispatch(updateQuantity({ id: item.id, change: -1 }))
                  }
                  disabled={item.quantity === 1}
                >
                  -
                </Button>
                <Typography
                  variant="body1"
                  sx={{ mx: 1, minWidth: "15px", textAlign: "center" }}
                >
                  {item.quantity}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() =>
                    dispatch(updateQuantity({ id: item.id, change: 1 }))
                  }
                  disabled={item.quantity === 5}
                >
                  +
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
      {cartItems.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: ${calculateTotal().toFixed(2)}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Checkout
          </Button>
        </>
      )}
    </Box>
  );
}
