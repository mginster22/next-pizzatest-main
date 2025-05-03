"use client"
import React from "react";
import { RequiredSymbol } from "../required-symbol";
import { Input } from "../../ui/input";
import { ErrorText } from "../error-text";
import { ClearButton } from "../clear-button";
import {  useFormContext } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

const FormInput: React.FC<Props> = ({
  name,
  label,
  required,
  className,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const value = watch(name);
  const errorText = errors[name]?.message as string;
  const onClickClear = () => {
    setValue(name, "");
  };
  return (
    <div className={className}>
      {label && (
        <p>
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Input
          {...register(name)}
          {...props}
          className="h-10 text-md bg-accent border-1 rounded-2xl"
        />
        {value && <ClearButton onClick={onClickClear} />}
      </div>
      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};

export default FormInput;
