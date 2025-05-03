import React from "react";
import { WhiteBlock } from "../white-block";
import { FormTextarea } from "../form-components/form-textarea";
import { AdressInput } from "../address-input";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorText } from "../error-text";

interface Props {}

const CheckoutAdressForm: React.FC<Props> = () => {

    const {control}=useFormContext()
  return (
    <WhiteBlock title="3. Адресс доставки">
      <div className="flex flex-col gap-4">
        <Controller  control={control} name='address' render={({field,fieldState}) => <>
        <AdressInput onChange={field.onChange}/>
        {fieldState.error?.message&&<ErrorText text={fieldState.error.message}/>}
        </>} />

        <FormTextarea
          name="comment"
          placeholder="Комментарий к заказу"
          className="text-base"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};

export default CheckoutAdressForm;
