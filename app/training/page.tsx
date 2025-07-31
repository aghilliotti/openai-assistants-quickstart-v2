'use client';
import React, { useState } from 'react';
export default function TrainingPage() {
  const [selected, setSelected] = useState('price');
  const [response, setResponse] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const prompt = `You're an AI leasing coach. A prospect says: "${objections[selected]}". The consultant replies: "${response}". Score the reply (1-10) in Clarity, Empathy, Confidence, and Likelihood to Lease. Then provide one brief coaching tip.`;

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [{ role: 'user', content: prompt }] }),
    });

    const data = await res.json();
    setResult(data.message?.content || 'No response');
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-teal-50 p-6 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl space-y-6 border border-blue-100">
        <h1 className="text-3xl font-bold text-blue-900">AI Leasing Coach</h1>

        <div>
          <label className="block text-blue-800 font-medium mb-1">Choose an Objection:</label>
          <select
            className="block w-full border border-blue-200 rounded-xl px-4 py-2 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {Object.entries(objections).map(([key, val]) => (
              <option key={key} value={key}>{val}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-blue-800 font-medium mb-1">Your Response:</label>
          <textarea
            className="w-full border border-blue-200 rounded-xl px-4 py-2 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-xl transition"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Evaluating...' : 'Submit Response'}
        </button>

        {result && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-blue-800">
            <h2 className="font-semibold mb-2">AI Feedback:</h2>
            <pre className="whitespace-pre-wrap text-sm font-mono">{result}</pre>
          </div>
        )}
      </div>
    </main>
  );
}


