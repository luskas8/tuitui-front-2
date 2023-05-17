import useWindowSize from "../hooks/useWindowSize";

export enum BUTTON_GROUP_ORIENTATION {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical"
};

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: BUTTON_GROUP_ORIENTATION;
  children: React.ReactNode;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  small?: boolean;
}

export function ButtonGroup({ orientation = BUTTON_GROUP_ORIENTATION.HORIZONTAL, children, className}: ButtonGroupProps) {
  return (
    <div className={`inline-flex ${orientation === BUTTON_GROUP_ORIENTATION.VERTICAL ? "flex-col" : "flex-row"} gap-1 ${className && className}`}>
      {children}
    </div>
  );
}

export function Button({ children, small, ...props }: ButtonProps) {
  const windowSize = useWindowSize();

  return (
    <button {...props} className={`flex items-center gap-1 bg-blue-200 hover:bg-violet-200 text-black font-bold ${small ? "py-[2px] px-4" : "py-2 px-4"} rounded`}>
      {(windowSize.width <= 375 && children) ? children[0 as keyof typeof children] : children}
    </button>
  );
}

Button.Default = ({ children, ...props }: ButtonProps) => {
  return (
    <button {...props} >
      {children}
    </button>
  );
}

Button.Danger = ({ children, small, ...props }: ButtonProps) => {
  const windowSize = useWindowSize();

  return (
    <button {...props} className={`flex items-center gap-1 bg-red-400 hover:bg-red-500 text-white font-bold ${small ? "py-[2px] px-4" : "py-2 px-4"} rounded`}>
      {(windowSize.width <= 375 && children) ? children[0 as keyof typeof children] : children}
    </button>
  );
}

Button.Outline = ({ children, small, ...props }: ButtonProps) => {
  const windowSize = useWindowSize();

  return (
    <button {...props} className={`flex items-center gap-1 bg-transparent text-violet-400 hover:text-violet-600 font-bold ${small ? "py-[2px] px-4" : "py-2 px-4"} rounded border border-violet-400 hover:border-violet-600`}>
      {(windowSize.width <= 375 && children) ? children[0 as keyof typeof children] : children}
    </button>
  );
}
