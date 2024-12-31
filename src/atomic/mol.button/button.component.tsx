import { buttonStyle } from "./button.style";

type ButtonVariant = "primary" | "danger";
interface ButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  onClick?: () => void;
  rightIcon?: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={buttonStyle({ variant: props.variant })}
      onClick={props.onClick}
    >
      {props.children}
      {props.rightIcon && props.rightIcon}
    </button>
  );
};
