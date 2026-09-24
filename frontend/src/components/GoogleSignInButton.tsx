import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useAuth } from '../hooks/useAuth';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          renderButton: (parent: HTMLElement, options: {
            theme?: string;
            size?: string;
            width?: string | number;
            text?: string;
            shape?: string;
          }) => void;
        };
      };
    };
  }
}

const GOOGLE_SCRIPT_ID = 'google-identity-services';
const GOOGLE_SCRIPT_SRC = 'https://accounts.google.com/gsi/client';

export default function GoogleSignInButton() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

  useEffect(() => {
    if (!clientId || !buttonRef.current) return;

    let cancelled = false;

    const renderGoogleButton = () => {
      if (cancelled || !buttonRef.current || !window.google?.accounts?.id) return;

      window.google.accounts.id.initialize({
        client_id: clientId,
        auto_select: false,
        cancel_on_tap_outside: true,
        callback: async response => {
          setLoading(true);
          try {
            const res = await api.post('/auth/google', { credential: response.credential });
            login(res.data);
            toast.success('¡Bienvenido a BugBuster!');
            navigate('/game');
          } catch (error: any) {
            const message = error?.response?.data;
            toast.error(typeof message === 'string' ? message : 'No se pudo iniciar sesión con Google');
          } finally {
            setLoading(false);
          }
        }
      });

      buttonRef.current.innerHTML = '';
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'large',
        width: 320,
        text: 'continue_with',
        shape: 'rectangular'
      });
    };

    const existingScript = document.getElementById(GOOGLE_SCRIPT_ID) as HTMLScriptElement | null;
    if (existingScript) {
      if (window.google?.accounts?.id) {
        renderGoogleButton();
      } else {
        existingScript.addEventListener('load', renderGoogleButton, { once: true });
      }
    } else {
      const script = document.createElement('script');
      script.id = GOOGLE_SCRIPT_ID;
      script.src = GOOGLE_SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.onload = renderGoogleButton;
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (existingScript) {
        existingScript.removeEventListener('load', renderGoogleButton);
      }
    };
  }, [clientId]);

  if (!clientId) {
    return null;
  }

  return (
    <div className="space-y-2">
      {loading && (
        <div className="text-center text-[11px] text-gray-500">Verificando cuenta de Google...</div>
      )}
      <div ref={buttonRef} className="flex justify-center min-h-[40px]" />
    </div>
  );
}
