import MonacoEditor from '@monaco-editor/react';

interface Props {
  value: string;
  onChange: (value: string | undefined) => void;  // permitimos undefined
}

export default function CodeEditor({ value, onChange }: Props) {
  return (
    <MonacoEditor
      height="400px"
      language="java"
      value={value}
      onChange={onChange}
      theme="vs-dark"
      options={{ minimap: { enabled: false } }}
    />
  );
}