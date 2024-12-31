import type { ReactNode } from "react";
import { cardStyle } from "./card.component.style";
import { cn } from "@utils";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn( cardStyle().base(), className)}>
      {children}
    </div>
  );
};

type CardSectionProps = {
  children: ReactNode;
  className?: string;
};

export const CardHeader = ({ children, className }: CardSectionProps) => {
  return <div className={cn(cardStyle().header(), className)}>{children}</div>;
};

export const CardBody = ({ children, className }: CardSectionProps) => {
  return <div className={cn(cardStyle().body(), className)}>{children}</div>;
};

export const CardFooter = ({ children, className }: CardSectionProps) => {
  return <div className={cn(cardStyle().footer(), className)}>{children}</div>;
};
