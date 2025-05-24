import classNames from "classnames";
import "./button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={classNames("Button", className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
