import React from 'react';
import logoAsset from '@/assets/trinova-logo.png.asset.json';

interface TrinovaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white' | 'dark';
  className?: string;
  showSubtitle?: boolean;
}

export const TrinovaLogo: React.FC<TrinovaLogoProps> = ({
  size = 'md', variant = 'default', className = '', showSubtitle = true,
}) => (
  <span className={`trinova-logo trinova-logo--${size} ${variant === 'white' ? 'trinova-logo--on-dark' : ''} ${showSubtitle ? '' : 'trinova-logo--name-only'} ${className}`}>
    <img src={logoAsset.url} alt="Trinova Wellness Centre" width={1920} height={562} />
  </span>
);
