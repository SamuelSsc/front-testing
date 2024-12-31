import { tv, VariantProps } from "tailwind-variants";

export const typography = tv({
  slots: {
    h1: "text-xl text-gray-900 font-primary font-medium",
    bodyPrimary: "text-sm font-medium text-gray-600",
  },
});

type Typography<T = any> = React.FC<
  {
    children: React.ReactNode;
    className?: string;
  } & T
>;
const { h1, bodyPrimary } = typography();

export const H1: Typography = ({ className, children }) => (
  <h1 className={h1({ className })}>{children}</h1>
);

export const BodyPrimary: Typography = ({ className, children }) => (
  <p className={bodyPrimary({ className })}>{children}</p>
);

export const input = tv({
  base: ["text-neutral-xstrong font-primary"],
  variants: {
    type: {
      label: "block font-medium mb-xs text-neutral-xstrong text-2xs leading-md",
      value: "font-medium text-neutral-xstrong text-xs leading-md",
      caption: "mt-xs block text-2xs text-neutral-xstrong font-regular",
    },
  },
});

type InputVariants = VariantProps<typeof input> & { htmlFor?: string };

interface InputLabelProps extends InputVariants {
  isRequired?: boolean;
}

export const InputLabel: Typography<InputLabelProps> = ({
  htmlFor,
  className,
  children,
}) => (
  <label className={input({ type: "label", className })} htmlFor={htmlFor}>
    {children}
  </label>
);
