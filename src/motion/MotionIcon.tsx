import React from 'react';
import { ArrowDownLeft, ArrowUpRight, Check, Target } from 'lucide-react';

const icons = {
  increase: ArrowUpRight,
  decrease: ArrowDownLeft,
  confirmed: Check,
  goal: Target,
};

/** SVG paths keep the motion identical across system fonts and emoji sets. */
export const MotionIcon = ({ name }: { name: keyof typeof icons }) => {
  const Icon = icons[name];
  return (
    <Icon
      aria-hidden="true"
      focusable="false"
      size="1em"
      strokeWidth={2}
      style={{ display: 'inline-block', verticalAlign: '-0.15em', flexShrink: 0 }}
    />
  );
};
