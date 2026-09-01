import MonacoEditor from '@monaco-editor/react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function CodeEditor({ value, onChange }: Props) {
  const handleChange = (val: string | undefined) => {
    onChange(val || ''); // si es undefined, lo convertimos a string vacío
  };

  return (
    <MonacoEditor
      height="400px"
      language="java"
      value={value}
      onChange={handleChange}
      theme="vs-dark"
      options={{ minimap: { enabled: false } }}
    />
  );
}