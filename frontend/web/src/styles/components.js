import styled from 'styled-components';
import { theme } from './theme';

export const GlassCard = styled.div`
  background: ${theme.glassmorphism.background};
  backdrop-filter: ${theme.glassmorphism.backdropFilter};
  border: ${theme.glassmorphism.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.lg};
`;

export const Button = styled.button`
  background: ${props => props.variant === 'secondary' 
    ? theme.colors.secondary.main 
    : theme.colors.primary.main};
  color: white;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeights.semibold};
  font-size: ${theme.typography.fontSizes.md};
  transition: ${theme.animation.transition};

  &:hover {
    transform: ${theme.animation.hover.scale};
    box-shadow: ${theme.animation.hover.shadow};
    background: ${props => props.variant === 'secondary' 
      ? theme.colors.secondary.dark 
      : theme.colors.primary.dark};
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSizes.md};
  transition: ${theme.animation.transition};

  &:focus {
    background: rgba(255, 255, 255, 0.2);
    border-color: ${theme.colors.primary.main};
  }

  &::placeholder {
    color: ${theme.colors.text.light};
  }
`;

export const Title = styled.h1`
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeights.bold};
  font-size: ${props => theme.typography.fontSizes[props.size || '3xl']};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.lg};
`;

export const Text = styled.p`
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${props => theme.typography.fontSizes[props.size || 'md']};
  color: ${props => theme.colors.text[props.color || 'secondary']};
  margin-bottom: ${theme.spacing.md};
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justify || 'center'};
  align-items: ${props => props.align || 'center'};
  gap: ${props => theme.spacing[props.gap || 'md']};
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 'auto'};
`;

export const ResponsiveContainer = styled.div`
  width: 100%;
  max-width: ${theme.breakpoints.lg};
  margin: 0 auto;
  padding: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.sm};
  }
`;
