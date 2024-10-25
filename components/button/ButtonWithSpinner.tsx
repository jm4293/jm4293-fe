'use client';

import { MouseEventHandler } from 'react';
import { ClipLoader } from 'react-spinners';

interface IButtonWithSpinnerProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  text: string;
  disabled: boolean;
  bgColor: 'blue' | 'green' | 'red' | 'gray' | 'sky';
  type: 'button' | 'submit' | 'reset';
}

const classNames = {
  blue: 'bg-blue-400 hover:bg-blue-500 disabled:bg-blue-400',
  green: 'bg-green-400 hover:bg-green-500 disabled:bg-green-400',
  red: 'bg-red-400 hover:bg-red-500 disabled:bg-red-400',
  gray: 'bg-gray-400 hover:bg-gray-500 disabled:bg-gray-400',
  sky: 'bg-sky-400 hover:bg-sky-500 disabled:bg-sky-400',
};

export default function ButtonWithSpinner({
  onClick,
  text,
  disabled,
  bgColor,
  type = 'button',
}: IButtonWithSpinnerProps) {
  const buttonClass = classNames[bgColor];

  return (
    <button className={`${buttonClass}`} type={type} onClick={onClick} disabled={disabled}>
      {disabled ? <ClipLoader size={15} color="#FFFFFF" /> : text}
    </button>
  );
}
