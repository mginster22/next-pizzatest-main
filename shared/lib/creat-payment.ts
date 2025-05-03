import axios from 'axios';

interface Props {
  description: string;
  orderId: number;
  amount: number;
}

export async function createPayment(details: Props) {
  const { data } = await axios.post(
    'https://www.privat24.ua/rd/send_qr/liqpay_static_qr/payment_2637029943.4a1807cc2464a70cfe9f18808df79029e0f85c33cfd6d3d84ac6dff3d12d0b5a',
    {
      amount: {
        value: details.amount.toString(),
        currency: 'UAH',
      },
      capture: true,
      description: details.description,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: 'redirect',
        return_url: process.env.LIQPAY_CALLBACK_URL,
      },
    },
    {
      auth: {
        username: process.env.YOOKASSA_STORE_ID as string,
        password: process.env.YOOKASSA_API_KEY as string,
      },
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': Math.random().toString(36).substring(7),
      },
    },
  );

  return data;
}
