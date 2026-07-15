"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Authentication is handled server-side by middleware (HTTP Basic Auth) before
// this page is ever served, so there is no client-side password form here.
// The browser prompts for credentials on navigation and reuses them for the
// same-origin fetch below.
export default function AdminResponsesPage() {
  const [responses, setResponses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/responses", { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`status ${res.status}`);
        }
        const data = await res.json();
        if (!cancelled) setResponses(data.responses ?? []);
      } catch {
        if (!cancelled) setError("שגיאה בטעינת הנתונים. נסו לרענן את העמוד.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">פניות מהאתר</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            חזרה לאתר
          </Link>
        </div>

        {isLoading && (
          <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
            טוען פניות...
          </div>
        )}

        {error && (
          <div className="bg-white p-8 rounded-lg shadow text-center text-red-500">
            {error}
          </div>
        )}

        {!isLoading && !error && responses.length === 0 && (
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
                    {new Date(res.created_at).toLocaleString("he-IL")}
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
              {res.source_page && (
                <div className="mt-3 pt-3 border-t text-xs text-gray-400">
                  דף מקור: <span className="font-mono" dir="ltr">{res.source_page}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
