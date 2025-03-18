let cart = [];

/** Add item to cart */
export const addToCart = (req, res) => {
  const { product, quantity } = req.body;
  if (!product || !quantity) {
    return res.status(400).json({ message: 'Product and quantity are required' });
  }

  const newItem = { id: cart.length + 1, product, quantity };
  cart.push(newItem);
  res.status(201).json({ message: 'Item added to cart', cart });
};

/** Get cart */
export const getCart = (req, res) => {
  res.status(200).json({ cart });
};

/** Remove item from cart */
export const removeFromCart = (req, res) => {
  const { id } = req.params;
  cart = cart.filter((item) => item.id != id);
  res.status(200).json({ message: 'Item removed from cart', cart });
};
