import { tv } from "tailwind-variants";


export const typography = tv({
    slots: {
      h1: 'text-xl text-gray-900 font-primary font-medium',
      bodyPrimary: 'text-sm font-medium text-gray-600',
    },
  });
  
  type Typography<T = any> = React.FC<
  {
    children: React.ReactNode;
    className?: string;
  } & T
>;
const { h1, bodyPrimary } = typography();

export const H1: Typography = ({ className, children }) => <h1 className={h1({ className })}>{children}</h1>;

export const BodyPrimary: Typography = ({className, children}) => <p className={bodyPrimary({className})}>{children}</p>