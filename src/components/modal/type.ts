import { ReactNode } from 'react';

export type TModalProps = {
  title: string;
  numericTitleStyle?: boolean;
  onClose: () => void;
  children?: ReactNode;
};
