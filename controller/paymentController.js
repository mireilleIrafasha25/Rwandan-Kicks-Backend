/** Fake Payment Processing */
export const fakePayment = (req, res) => {
    const { amount, paymentMethod } = req.body;
  
    if (!amount || !paymentMethod) {
      return res.status(400).json({ message: 'Amount and payment method are required' });
    }
  
    res.status(200).json({
      message: 'Payment successful',
      transactionId: `TXN-${Math.floor(Math.random() * 100000)}`,
      amount,
      paymentMethod,
      status: 'completed',
    });
  };
  