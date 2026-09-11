import MonacoEditor from '@monaco-editor/react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function CodeEditor({ value, onChange }: Props) {
  return (
    <MonacoEditor
      height="100%"
      width="100%"
      language="java"
      value={value}
      onChange={(val) => onChange(val || '')}
      theme="vs-dark"
      options={{ 
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        padding: { top: 20 }
      }}
    />
  );
}
