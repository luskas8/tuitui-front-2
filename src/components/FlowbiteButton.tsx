import { type ComponentProps, type ReactNode } from 'react';
import type {
  FlowbiteBoolean,
  FlowbiteColors,
  FlowbiteGradientColors,
  FlowbiteGradientDuoToneColors,
  FlowbiteSizes,
} from './Flowbite';

import { DeepPartial } from '.';

export interface PositionInButtonGroup {
  none: string;
  start: string;
  middle: string;
  end: string;
}

export interface FlowbiteButtonTheme {
  base: string;
  fullSized: string;
  color: FlowbiteColors;
  disabled: string;
  isProcessing: string;
  spinnerSlot: string;
  gradient: ButtonGradientColors;
  gradientDuoTone: ButtonGradientDuoToneColors;
  inner: FlowbiteButtonInnerTheme;
  label: string;
  outline: FlowbiteButtonOutlineTheme;
  pill: FlowbiteBoolean;
  size: ButtonSizes;
}

export interface FlowbiteButtonInnerTheme {
  base: string;
  position: PositionInButtonGroup;
  outline: string;
}

export interface FlowbiteButtonOutlineTheme extends FlowbiteBoolean {
  color: ButtonOutlineColors;
  pill: FlowbiteBoolean;
}

export interface ButtonColors
  extends Pick<FlowbiteColors, 'dark' | 'failure' | 'gray' | 'info' | 'light' | 'purple' | 'success' | 'warning'> {
  [key: string]: string;
}

export interface ButtonGradientColors extends FlowbiteGradientColors {
  [key: string]: string;
}

export interface ButtonGradientDuoToneColors extends FlowbiteGradientDuoToneColors {
  [key: string]: string;
}

export interface ButtonOutlineColors extends Pick<FlowbiteColors, 'gray'> {
  [key: string]: string;
}

export interface ButtonSizes extends Pick<FlowbiteSizes, 'xs' | 'sm' | 'lg' | 'xl'> {
  [key: string]: string;
}

export interface ButtonProps extends Omit<ComponentProps<'button'>, 'color' | 'ref'> {
  color?: keyof FlowbiteColors;
  fullSized?: boolean;
  gradientDuoTone?: keyof ButtonGradientDuoToneColors;
  gradientMonochrome?: keyof ButtonGradientColors;
  href?: string;
  target?: string;
  isProcessing?: boolean;
  processingLabel?: string;
  processingSpinner?: ReactNode;
  label?: ReactNode;
  outline?: boolean;
  pill?: boolean;
  positionInGroup?: keyof PositionInButtonGroup;
  size?: keyof ButtonSizes;
  theme?: DeepPartial<FlowbiteButtonTheme>;
}
