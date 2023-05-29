export interface BaseChildrenProps {
  children: React.ReactNode;
}

export interface APIError {
  message: string;
  status: number;
}

export interface ChildrenHelperProps {
  children: React.ReactNode;
  useIconRule?: boolean;
  iconRule?: (width: number) => boolean;
}
