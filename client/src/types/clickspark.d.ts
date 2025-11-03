// Provide a specific module declaration for the local ClickSpark JS file
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

// Also allow importing ClickSpark without the extension
declare module './components/ClickSpark' {
  import * as React from 'react';
  const ClickSpark: React.FC<Record<string, unknown>>;
  export default ClickSpark;
}

// Fallback: treat any imported .jsx file as a React component to avoid TS errors
declare module '*.jsx' {
  import * as React from 'react';
  const Component: React.FC<Record<string, unknown>>;
  export default Component;
}
