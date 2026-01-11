declare module 'json-to-var' {
  const tokenizer: {
    toJs: (inputs: any[]) => string;
    toScss: (inputs: any[]) => string;
    makeFile: (directory: string, filename: string, content: string) => void;
  };
  export default tokenizer;
} 