import React from "react";
import { WhiteBlock } from "../white-block";
import FormInput from "../form-components/FormInput";

interface Props {
    className?: string
}

const CheckoutPersonalForm: React.FC<Props> = ({className}) => {
  return (
    <WhiteBlock title="2. Персональная информация" className={className}>
      <div className="grid grid-cols-2 gap-4">
        <FormInput name="firstName" placeholder="Имя" className="text-base" />
        <FormInput name="lastName" placeholder="Фамилия" className="text-base" />
        <FormInput name="email" placeholder="Email" className="text-base" />
        <FormInput name={"phone"} className="text-base" placeholder="Телефон" />
      </div>
    </WhiteBlock>
  );
};

export default CheckoutPersonalForm;
