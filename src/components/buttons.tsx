import useWindowSize from "../hooks/useWindowSize";
import { ReactComponent as Loading } from "../assets/icons/Loading.svg"
import { ChildrenHelperProps } from "../@types/global";

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
  iconRule?: (width: number) => boolean;
}

export function ButtonGroup({ orientation = BUTTON_GROUP_ORIENTATION.HORIZONTAL, children, className}: ButtonGroupProps) {
  return (
    <div className={`inline-flex ${orientation === BUTTON_GROUP_ORIENTATION.VERTICAL ? "flex-col" : "flex-row"} gap-1 ${className && className}`}>
      {children}
    </div>
  );
}

export function Button({ children, small, useIconRule = true, iconRule, loading, ...props }: ButtonProps) {
  return (
    <button {...props} className={`flex justify-center items-center gap-1 bg-violet-300 hover:bg-violet-400 text-white font-bold ${small ? "py-[2px] px-4" : "py-2 px-4"} rounded`}>
      {loading && <Loading className="animate-spin" />}
      <ChildrenHelper iconRule={iconRule} useIconRule={useIconRule}>
        {children}
      </ChildrenHelper>
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

Button.Danger = ({ children, small, useIconRule = true, iconRule, loading, ...props }: ButtonProps) => {
  return (
    <button {...props} className={`flex items-center gap-1 bg-red-300 hover:bg-red-400 disabled:bg-red-400 disabled:cursor-not-allowed text-white font-bold ${small ? "py-[2px] px-4" : "py-2 px-4"} rounded`}>
      {loading && <Loading className="animate-spin" />}
      <ChildrenHelper iconRule={iconRule} useIconRule={useIconRule}>
        {children}
      </ChildrenHelper>
    </button>
  );
}

Button.Outline = ({ children, small, useIconRule = true, iconRule, loading, ...props }: ButtonProps) => {

  return (
    <button {...props} className={`flex items-center gap-1 bg-transparent text-violet-300 hover:text-violet-400 font-bold ${small ? "py-[2px] px-4" : "py-2 px-4"} rounded border border-violet-300 hover:border-violet-400`}>
      {loading && <Loading className="animate-spin" />}
      <ChildrenHelper iconRule={iconRule} useIconRule={useIconRule}>
        {children}
      </ChildrenHelper>
    </button>
  );
}

Button.Terciary = ({ children, small, useIconRule = true, iconRule, loading, ...props }: ButtonProps) => {

  return (
    <button {...props} className={`flex items-center gap-1 bg-transparent text-violet-300 hover:text-violet-400 font-bold ${small ? "py-[2px] px-4" : "py-2 px-4"} rounded`}>
      {loading && <Loading className="animate-spin" />}
      <ChildrenHelper iconRule={iconRule} useIconRule={useIconRule}>
        {children}
      </ChildrenHelper>
    </button>
  );
}

Button.Success = ({ children, small, useIconRule = true, iconRule, loading, ...props }: ButtonProps) => {
  return (
    <button {...props} className={`flex items-center gap-1 bg-emerald-400 hover:bg-emerald-500 disabled:bg-emerald-500 disabled:cursor-not-allowed text-white font-bold ${small ? "py-[2px] px-4" : "py-2 px-4"} rounded`}>
      {loading && <Loading className="animate-spin" />}
      <ChildrenHelper iconRule={iconRule} useIconRule={useIconRule}>
        {children}
      </ChildrenHelper>
    </button>
  );
}

function ChildrenHelper({ children, iconRule, useIconRule }: ChildrenHelperProps) {
  const windowSize = useWindowSize();

  // If iconRule is provided, use it instead of the default useIconRule
  const useIconRuleValue = iconRule ? iconRule(windowSize.width) : windowSize.width <= 375;

  // If useIconRule is true, use the first child as the icon when the window size is small
  const childrenValue = (useIconRule && useIconRuleValue && children) ? children[0 as keyof typeof children] : children;

  return childrenValue as JSX.Element;
}
