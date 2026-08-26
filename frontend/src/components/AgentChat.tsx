import { useState } from 'react';
import api from '../api/axios';

interface Props {
  levelId: number;
}

export default function AgentChat({ levelId }: Props) {
  const [messages, setMessages] = useState<{ from: 'user' | 'agent'; text: string }[]>([]);
  const [input, setInput] = useState('');

  const sendHint = async () => {
    try {
      const res = await api.get(`/agent/hint?levelId=${levelId}`);
      const hint = res.data;
      setMessages(prev => [...prev, { from: 'agent', text: hint }]);
    } catch (error) {
      setMessages(prev => [...prev, { from: 'agent', text: 'No pude obtener pista' }]);
    }
  };

  const sendQuestion = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: 'user', text: input }]);
    // Simulación de respuesta (puedes mejorar)
    setMessages(prev => [...prev, { from: 'agent', text: 'Revisa la sintaxis de tu código y asegúrate de que el método devuelva el tipo correcto.' }]);
    setInput('');
  };

  return (
    <div className="bg-gray-800 rounded p-4">
      <div className="flex gap-2">
        <button onClick={sendHint} className="bg-blue-600 px-3 py-1 rounded">Pedir pista</button>
        <input className="flex-1 bg-gray-700 px-2 py-1 rounded" placeholder="Pregunta al agente..." value={input} onChange={e => setInput(e.target.value)} />
        <button onClick={sendQuestion} className="bg-purple-600 px-3 py-1 rounded">Enviar</button>
      </div>
      <div className="mt-2 max-h-40 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className={`text-sm p-1 ${msg.from === 'agent' ? 'text-blue-300' : 'text-green-300'}`}>
            <strong>{msg.from === 'agent' ? '🤖 Agente' : '👤 Tú'}:</strong> {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}