'use client';

import React, { useState } from 'react';

const objections = {
  price: "The building across the street is offering two months free and is cheaper overall.",
  comparison: "I’ve toured a few places, just want to compare and I’ll circle back.",
  parking: "I’ve heard parking is a nightmare here — especially for guests.",
};

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
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">AI Leasing Coach</h1>

      <label className="block">
        <span className="text-sm font-semibold">Choose an Objection:</span>
        <select
          className="block w-full border rounded p-2 mt-1"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {Object.entries(objections).map(([key, val]) => (
            <option key={key} value={key}>
              {val}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-semibold">Your Response:</span>
        <textarea
          className="w-full border rounded p-2 mt-1"
          rows={5}
          value={response}
          onChange={(e) => setResponse(e.target.value)}
        />
      </label>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Evaluating...' : 'Submit Response'}
      </button>

      {result && (
        <div className="bg-gray-100 p-4 rounded border">
          <h2 className="font-semibold mb-2">AI Feedback:</h2>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </main>
  );
}

