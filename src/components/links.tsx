import useWindowSize from "../hooks/useWindowSize";
import { Link as RRDLink, LinkProps as RRDLinkProps} from "react-router-dom";

export enum LINK_GROUP_ORIENTATION {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical"
};

interface LinkGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: LINK_GROUP_ORIENTATION;
  children: React.ReactNode;
}

interface LinkProps extends RRDLinkProps {
  children: React.ReactNode;
  small?: boolean;
}

export function ButtonGroup({ orientation = LINK_GROUP_ORIENTATION.HORIZONTAL, children, className}: LinkGroupProps) {
  return (
    <div className={`inline-flex ${orientation === LINK_GROUP_ORIENTATION.VERTICAL ? "flex-col" : "flex-row"} gap-1 ${className && className}`}>
      {children}
    </div>
  );
}

export function Link({ children, small, ...props }: LinkProps) {
  const windowSize = useWindowSize();

  return (
    <RRDLink {...props} className={`flex items-center gap-1 bg-blue-200 hover:bg-violet-200 text-black font-bold ${small ? "py-[2px] px-4" : "py-2 px-4"} rounded`}>
      {(windowSize.width <= 375 && children) ? children[0 as keyof typeof children] : children}
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

Link.Danger = ({ children, small, ...props }: LinkProps) => {
  const windowSize = useWindowSize();

  return (
    <RRDLink {...props} className={`flex items-center gap-1 bg-red-400 hover:bg-red-500 text-white font-bold ${small ? "py-[2px] px-4" : "py-2 px-4"} rounded`}>
      {(windowSize.width <= 375 && children) ? children[0 as keyof typeof children] : children}
    </RRDLink>
  );
}

Link.Outline = ({ children, small, ...props }: LinkProps) => {
  const windowSize = useWindowSize();

  return (
    <RRDLink {...props} className={`flex items-center gap-1 bg-transparent text-violet-400 hover:text-violet-600 font-bold ${small ? "py-[2px] px-4" : "py-2 px-4"} rounded border border-violet-400 hover:border-violet-600`}>
      {(windowSize.width <= 375 && children) ? children[0 as keyof typeof children] : children}
    </RRDLink>
  );
}
