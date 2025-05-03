"use client";
import { CheckoutSidebar } from "@/shared/components/shared/checkout-sidebar";
import { Container } from "@/shared/components/shared/container";
import { Title } from "@/shared/components/shared/Title";
import { useCart } from "@/shared/hooks/use-cart";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import CheckoutCart from "@/shared/components/shared/checkout/CheckoutCart";
import CheckoutPersonalForm from "@/shared/components/shared/checkout/CheckoutPersonalForm";
import CheckoutAdressForm from "@/shared/components/shared/checkout/CheckoutAdressForm";
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from "@/shared/constants/checkout-form-schema";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const [submitting, setSubmitting] = React.useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      phone: "",
      address: "",
      firstName: "",
      lastName: "",
      comment: "s",
    },
  });

  const { items, totalAmount, loading, removeCartItem, updateItemQuantity } =
    useCart();
  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);

      const url = await createOrder(data);

      toast.error("Заказ успешно оформлен! 📝 Переход на оплату... ", {
        icon: "✅",
      });

      if (url) {
        location.href = url;
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error("Не удалось создать заказ", {
        icon: "❌",
      });
    }
  };

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа "
        size="xl"
        className="font-extrabold mb-8"
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* {"Левая часть"} */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                items={items}
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                loading={loading}
              />

              <CheckoutPersonalForm />

              <CheckoutAdressForm />
            </div>

            {/* {"Правая часть"} */}
            <div className="w-[450px]">
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
};

export default CheckoutPage;
