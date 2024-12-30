import { ButtonMinHeight } from "@atomic/obj.constants";
import { tv } from "tailwind-variants";

export const buttonStyle = tv({
    base: `min-h-[${ButtonMinHeight}] p-md rounded-lg font-medium`,
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
  