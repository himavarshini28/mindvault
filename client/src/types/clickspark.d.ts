declare module './components/ClickSpark.jsx' {
  import * as React from 'react';
  const ClickSpark: React.FC<{
    sparkColor?: string;
    sparkSize?: number;
    sparkRadius?: number;
    sparkCount?: number;
    duration?: number;
    easing?: string;
    extraScale?: number;
    children?: React.ReactNode;
  }>;
  export default ClickSpark;
}

declare module './components/ClickSpark' {
  import * as React from 'react';
  const ClickSpark: React.FC<Record<string, unknown>>;
  export default ClickSpark;
}

declare module '*.jsx' {
  import * as React from 'react';
  const Component: React.FC<Record<string, unknown>>;
  export default Component;
}
