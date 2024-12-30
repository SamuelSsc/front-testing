import { ButtonHeight } from "@atomic/obj.constants";
import { tv } from "tailwind-variants";

export const buttonStyle = tv({
    base: `h-[${ButtonHeight}] px-md py-sm rounded-2xl font-medium`,
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary/80",
        danger: "bg-red-500 text-white hover:bg-red-600/80",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  });
  