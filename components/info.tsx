"use client";

import { Product } from "@/types";
import Currency from "./ui/currency";
import { ShoppingCart } from "lucide-react";
import Button from "./ui/button";
import useCart from "@/hooks/use-cart";
import { MouseEventHandler } from "react";
import { useForm,FieldValues } from "react-hook-form";
import Counter from "./Counter";


interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  
  const {setValue,watch,}= useForm<FieldValues>({defaultValues:{quantity: 1,}})
    const quantity = watch('quantity')
    const setCustomValue= (id:string ,value: number) => {
      setValue(id, value ,{
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
      })
  }

  const cart = useCart();
  const onAddtoCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <p className="text-lg text-neutral-500">{data.category.name}</p>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold"> Size: </h3>
          <div>{data?.size?.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold"> Color: </h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: data?.color?.value }}
          />
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold"> Description: </h3>
          <div className="text-lg">{data?.description}</div>
        </div>
      </div>

      <Counter 
                value={quantity}
                onChange ={(value:number)=> setCustomValue('quantity',value)}
                />

      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={onAddtoCart} className="flex items-center gap-x-2">
          Add to Cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;
