import { forwardRef, MouseEvent, ReactNode } from 'react';

const styles = {
  button: 'font-sans px-6 py-4  rounded-full text-white  transition-colors duration-200 ease-in-out',
  enabled: 'bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700',
  disabled: 'bg-gray-300 pointer-events-none cursor-not-allowed',
};

type Props = {
  children: ReactNode;
  onClick?: (event: MouseEvent) => void;
  type?: 'button' | 'reset' | 'submit' | 'link';
  href?: string;
  disabled?: boolean;
};

export const Button = forwardRef<HTMLElement, Props>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ children, onClick, href, disabled = false, type = 'button' }, _ref) => {
    if (type === 'link') {
      return (
        <a href={href} className={[styles.button, disabled ? styles.disabled : styles.enabled].join(' ')}>
          {children}
        </a>
      );
    }

    return (
      <button
        disabled={disabled}
        className={[styles.button, disabled ? styles.disabled : styles.enabled].join(' ')}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    );
  }
);
