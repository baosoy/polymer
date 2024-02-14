import { ButtonHTMLAttributes } from "react";

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  return (
    <button
      className={[
        "w-full bg-white active:bg-lime-300 transform active:translate-y-1 text-gray-600 font-medium py-2 px-4 rounded-lg border hover:bg-lime-300 disabled:hover:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
      ].join(" ")}
      {...props}
    />
  );
};

export default Button;
