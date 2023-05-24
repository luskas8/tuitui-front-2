import useWindowSize from "../hooks/useWindowSize";
import { Link as RRDLink, LinkProps as RRDLinkProps} from "react-router-dom";

export enum LINK_GROUP_ORIENTATION {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
  AUTO = "auto"
};

interface LinkGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: LINK_GROUP_ORIENTATION;
  children: React.ReactNode;
}

interface LinkProps extends RRDLinkProps {
  children: React.ReactNode;
  small?: boolean;
  useIconRule?: boolean;
  iconRule?: (width: number) => boolean;
}

interface ChildrenHelperProps {
  children: React.ReactNode;
  useIconRule?: boolean;
  iconRule?: (width: number) => boolean;
}

export function ButtonGroup({ orientation = LINK_GROUP_ORIENTATION.HORIZONTAL, children, className}: LinkGroupProps) {
  const windowSize = useWindowSize();
  let orientationClassName = (orientation === LINK_GROUP_ORIENTATION.VERTICAL ? "flex-col" : "flex-row");

  if (orientation === LINK_GROUP_ORIENTATION.AUTO && windowSize.width <= 375) {
    orientationClassName = "flex-col";
  } else {
    orientationClassName = "flex-row";
  }
  return (
    <div className={`inline-flex ${orientationClassName} gap-1 ${className && className}`}>
      {children}
    </div>
  );
}

export function Link({ children, small, useIconRule = true, iconRule, ...props }: LinkProps) {
  return (
    <RRDLink {...props} className={`flex items-center gap-1 bg-violet-300 hover:bg-violet-400 text-white font-bold ${small ? "py-[2px] px-4" : "py-2 px-4"} rounded`}>
      <ChildrenHelper iconRule={iconRule} useIconRule={useIconRule}>
        {children}
      </ChildrenHelper>
    </RRDLink>
  );
}

Link.Default = ({ children, ...props }: LinkProps) => {
  return (
    <RRDLink {...props} >
      {children}
    </RRDLink>
  );
}

Link.Danger = ({ children, small, useIconRule = true, iconRule, ...props }: LinkProps) => {
  return (
    <RRDLink {...props} className={`flex items-center gap-1 bg-red-300 hover:bg-red-400 text-white font-bold ${small ? "py-[2px] px-4" : "py-2 px-4"} rounded`}>
      <ChildrenHelper iconRule={iconRule} useIconRule={useIconRule}>
        {children}
      </ChildrenHelper>
    </RRDLink>
  );
}

Link.Outline = ({ children, small, useIconRule = true, iconRule, ...props }: LinkProps) => {

  return (
    <RRDLink {...props} className={`flex justify-center gap-1 bg-transparent text-violet-400 hover:text-violet-600 font-bold ${small ? "py-[2px] px-4" : "py-2 px-4"} rounded border border-violet-400 hover:border-violet-600`}>
      <ChildrenHelper iconRule={iconRule} useIconRule={useIconRule}>
        {children}
      </ChildrenHelper>
    </RRDLink>
  );
}

Link.Terciary = ({ children, small, useIconRule = true, iconRule, ...props }: LinkProps) => {
  return (
    <RRDLink {...props} className={`flex justify-center gap-1 bg-transparent text-violet-400 hover:text-violet-600 font-bold ${small ? "py-[2px] px-4" : "py-2 px-4"} rounded`}>
      <ChildrenHelper iconRule={iconRule} useIconRule={useIconRule}>
        {children}
      </ChildrenHelper>
    </RRDLink>
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
