import useWindowSize from "../hooks/useWindowSize";
import { ReactComponent as Loading } from "../assets/icons/Loading.svg"

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
  loading?: boolean;
  useIconRule?: boolean;
}

export function ButtonGroup({ orientation = BUTTON_GROUP_ORIENTATION.HORIZONTAL, children, className}: ButtonGroupProps) {
  return (
    <div className={`inline-flex ${orientation === BUTTON_GROUP_ORIENTATION.VERTICAL ? "flex-col" : "flex-row"} gap-1 ${className && className}`}>
      {children}
    </div>
  );
}

export function Button({ children, small, useIconRule = true, ...props }: ButtonProps) {
  const windowSize = useWindowSize();

  return (
    <button {...props} className={`flex items-center gap-1 bg-violet-300 hover:bg-violet-400 text-white font-bold ${small ? "py-[2px] px-4" : "py-2 px-4"} rounded`}>
      {(useIconRule && windowSize.width <= 375 && children) ? children[0 as keyof typeof children] : children}
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

Button.Danger = ({ children, small, useIconRule = true, loading, ...props }: ButtonProps) => {
  const windowSize = useWindowSize();

  return (
    <button {...props} className={`flex items-center gap-1 bg-red-300 hover:bg-red-400 disabled:bg-red-400 disabled:cursor-not-allowed text-white font-bold ${small ? "py-[2px] px-4" : "py-2 px-4"} rounded`}>
      {loading && <Loading className="animate-spin" />}
      {(useIconRule && windowSize.width <= 375 && children) ? children[0 as keyof typeof children] : children}
    </button>
  );
}

Button.Outline = ({ children, small, useIconRule = true, ...props }: ButtonProps) => {
  const windowSize = useWindowSize();

  return (
    <button {...props} className={`flex items-center gap-1 bg-transparent text-violet-300 hover:text-violet-400 font-bold ${small ? "py-[2px] px-4" : "py-2 px-4"} rounded border border-violet-300 hover:border-violet-400`}>
      {(useIconRule && windowSize.width <= 375 && children) ? children[0 as keyof typeof children] : children}
    </button>
  );
}

Button.Terciary = ({ children, small, useIconRule = true, ...props }: ButtonProps) => {
  const windowSize = useWindowSize();

  return (
    <button {...props} className={`flex items-center gap-1 bg-transparent text-violet-300 hover:text-violet-400 font-bold ${small ? "py-[2px] px-4" : "py-2 px-4"} rounded`}>
      {(useIconRule && windowSize.width <= 375 && children) ? children[0 as keyof typeof children] : children}
    </button>
  );
}

Button.Success = ({ children, small, useIconRule = true, loading, ...props }: ButtonProps) => {
  const windowSize = useWindowSize();

  return (
    <button {...props} className={`flex items-center gap-1 bg-emerald-400 hover:bg-emerald-500 disabled:bg-emerald-500 disabled:cursor-not-allowed text-white font-bold ${small ? "py-[2px] px-4" : "py-2 px-4"} rounded`}>
      {loading && <Loading className="animate-spin" />}
      {(useIconRule && windowSize.width <= 375 && children) ? children[0 as keyof typeof children] : children}
    </button>
  );
}
