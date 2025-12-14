import { ReactNode } from 'react';

export type TModalUIProps = {
  title: string;
  numericTitleStyle: boolean;
  onClose: () => void;
  children?: ReactNode;
};

export type TModalChild = {
  setTitle?: (newTitle: string) => void;
}
