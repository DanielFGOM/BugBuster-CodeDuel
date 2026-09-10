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
      setMessages(prev => [...prev, { from: 'agent', text: res.data }]);
    } catch (error) {
      setMessages(prev => [...prev, { from: 'agent', text: 'No pude obtener pista' }]);
    }
  };

  const sendQuestion = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: 'user', text: input }]);
    setMessages(prev => [...prev, { from: 'agent', text: 'Revisa la sintaxis de tu código y asegúrate de que el método devuelva el tipo correcto.' }]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full p-4 bg-white">
      <div className="flex gap-2 mb-3">
        <button onClick={sendHint} className="bg-[#F0973D] hover:bg-[#e0862d] text-[#17233B] px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">Pedir pista</button>
        <input 
          className="flex-1 bg-gray-50 border border-[#E7E4DC] px-3 py-1.5 rounded-lg text-sm outline-none focus:border-[#2E4A78]" 
          placeholder="Pregunta al agente..." 
          value={input} 
          onChange={e => setInput(e.target.value)} 
        />
        <button onClick={sendQuestion} className="bg-[#2E4A78] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#1E304F] transition-colors">Enviar</button>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar text-sm">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-2 rounded-lg ${msg.from === 'agent' ? 'bg-blue-50 text-[#2E4A78] ml-2' : 'bg-gray-100 text-gray-700 mr-2 text-right'}`}>
            <strong className="text-[10px] uppercase block opacity-60">{msg.from === 'agent' ? '🤖 Agente' : '👤 Tú'}</strong>
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}
