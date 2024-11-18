import { FC } from "react";
import { RevertIcon, XMarkIcon } from "./icons";

type ButtonProps = React.ComponentProps<"button">;

export const ExpandButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="text-gray-900 hover:text-gray-600 transition-colors flex items-center justify-center"
      {...props}
    >
      {children}
    </button>
  );
};

export const DeleteButton: FC<Omit<ButtonProps, "children">> = (props) => {
  return (
    <button
      className="text-red-800 hover:text-red-600 transition-colors flex items-center justify-center"
      {...props}
    >
      <XMarkIcon />
    </button>
  );
};

export const RevertButton: FC<Omit<ButtonProps, "children">> = (props) => {
  return (
    <button
      className="text-blue-800 hover:text-blue-600 transition-colors flex items-center justify-center"
      {...props}
    >
      <RevertIcon />
    </button>
  );
};
