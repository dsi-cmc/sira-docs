'use client';

import React, { useState } from 'react';

export default function SupportForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Sugestão', message: '' });
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('O seu ticket foi enviado com sucesso! Verifique o seu correio para confirmação.');
        setFormData({ name: '', email: '', subject: 'Sugestão', message: '' });
      } else {
        setStatus('Erro ao enviar o ticket. Por favor, tente mais tarde.');
      }
    } catch (error) {
      setStatus('Ocorreu um erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="support-form-container p-6 border rounded-lg shadow-md bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 my-8">
      <h3 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Formulário de Apoio e Sugestões</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome</label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded border-zinc-300 dark:border-zinc-700 bg-transparent"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Correio Electrónico</label>
          <input
            type="email"
            required
            className="w-full p-2 border rounded border-zinc-300 dark:border-zinc-700 bg-transparent"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tipo de Pedido</label>
          <select
            className="w-full p-2 border rounded border-zinc-300 dark:border-zinc-700 bg-transparent"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          >
            <option value="Sugestão">Sugestão</option>
            <option value="Constrangimento">Constrangimento</option>
            <option value="Suporte Técnico">Suporte Técnico</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mensagem</label>
          <textarea
            required
            rows={5}
            className="w-full p-2 border rounded border-zinc-300 dark:border-zinc-700 bg-transparent"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'A enviar...' : 'Enviar Ticket'}
        </button>
      </form>
      {status && (
        <p className={`mt-4 text-sm ${status.includes('sucesso') ? 'text-green-600' : 'text-red-500'}`}>
          {status}
        </p>
      )}
    </div>
  );
}
