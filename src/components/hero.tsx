import classNames from 'classnames';
import React from 'react';

interface HeroElementProps {
  children: React.ReactNode;
  className?: string;
}
export const HeroTitle: React.FC<HeroElementProps> = ({
  children,
  className,
}) => {
  return (
    <h1
      className={classNames(
        'text-gradient my-6 text-6xl md:text-8xl',
        className,
      )}
    >
      {children}
    </h1>
  );
};

export const HeroSubtitle = ({ children, className }: HeroElementProps) => {
  return (
    <p
      className={classNames(
        'mb-12 text-lg text-primary-text md:text-xl',
        className,
      )}
    >
      {children}
    </p>
  );
};

interface HeroProps {
  children: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({ children }) => {
  return <div className='text-center '>{children}</div>;
};
export default Hero;
