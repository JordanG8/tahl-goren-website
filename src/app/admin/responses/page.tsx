"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminResponsesPage() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [responses, setResponses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // We'll use a simple password from environment variables if possible, 
  // or a hardcoded one for this specific request if the user didn't provide one.
  // Ideally this should be server-side, but for a quick "easily accessible" link,
  // this is a functional middle ground.
  const checkPassword = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/responses?pwd=${password}`);
      if (res.ok) {
        const data = await res.json();
        setResponses(data.responses);
        setIsAuthorized(true);
      } else {
        setError("סיסמה שגויה או שגיאה בגישה לנתונים.");
      }
    } catch (err) {
      setError("שגיאה בחיבור לשרת.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans" dir="rtl">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">כניסת מנהל</h1>
          <form onSubmit={checkPassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">סיסמה</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="הכנס סיסמה..."
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            >
              {isLoading ? "מתחבר..." : "כניסה"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">פניות מהאתר</h1>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsAuthorized(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              התנתקות
            </button>
            <Link 
              href="/"
              className="text-blue-600 hover:underline"
            >
              חזרה לאתר
            </Link>
          </div>
        </div>

        {responses.length === 0 && (
          <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
            אין פניות כרגע.
          </div>
        )}

        <div className="grid gap-6">
          {responses.map((res) => (
            <div key={res.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex justify-between items-start mb-4 border-b pb-2">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{res.name}</h2>
                  <p className="text-sm text-gray-500">
                    {new Date(res.created_at).toLocaleString('he-IL')}
                  </p>
                </div>
                <div className="text-left" dir="ltr">
                  <p className="text-blue-600 font-medium">{res.phone}</p>
                  <p className="text-gray-600">{res.email}</p>
                </div>
              </div>
              <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {res.message}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
