"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Key, FolderOpen, Terminal, Check, Copy } from "lucide-react";
import { apiRequest } from "@/lib/auth";
import { GATEWAY_URL } from "@/lib/constants";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState("");
  const [project, setProject] = useState<any>(null);
  const [apiKey, setApiKey] = useState("");
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const createProject = async () => {
    if (!projectName.trim()) return;
    setCreating(true);
    setError("");
    try {
      const res = await apiRequest("/projects", {
        method: "POST",
        body: JSON.stringify({ name: projectName }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }
      setProject(data);
      setStep(2);
    } finally {
      setCreating(false);
    }
  };

  const generateKey = async () => {
    setCreating(true);
    try {
      const res = await apiRequest(`/projects/${project.id}/keys`, {
        method: "POST",
        body: JSON.stringify({ name: "My first key", rateLimit: 60 }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }
      setApiKey(data.key);
      setStep(3);
    } finally {
      setCreating(false);
    }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      num: 1,
      label: "Create project",
      icon: <FolderOpen className="w-4 h-4" />,
    },
    { num: 2, label: "Generate key", icon: <Key className="w-4 h-4" /> },
    { num: 3, label: "Make a request", icon: <Terminal className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-8">
          <Key className="w-6 h-6 text-indigo-600" />
          <span className="font-semibold text-xl text-gray-900">GateKey</span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Let&apos;s get you set up
          </h1>
          <p className="text-gray-500 mt-1">3 steps to your first API key</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  step === s.num
                    ? "bg-indigo-600 text-white"
                    : step > s.num
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                }`}
              >
                {step > s.num ? <Check className="w-3 h-3" /> : s.icon}
                {s.label}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-8 h-px ${step > s.num ? "bg-green-300" : "bg-gray-200"}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-8">
          {/* Step 1 — Create project */}
          {step === 1 && (
            <div>
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
                <FolderOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                Create your first project
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Projects help you organize your API keys. Each project can have
                multiple keys.
              </p>

              {error && (
                <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && createProject()}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                  placeholder="My App"
                  autoFocus
                />
              </div>

              <button
                onClick={createProject}
                disabled={creating || !projectName.trim()}
                className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                {creating ? "Creating..." : "Create project →"}
              </button>
            </div>
          )}

          {/* Step 2 — Generate key */}
          {step === 2 && (
            <div>
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
                <Key className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                Generate your first API key
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Your key will be shown once. Store it securely — we never show
                it again.
              </p>

              <div className="bg-indigo-50 rounded-lg p-4 mb-6">
                <p className="text-sm font-medium text-indigo-900">
                  {project?.name}
                </p>
                <p className="text-xs text-indigo-600 mt-0.5">
                  Project created successfully
                </p>
              </div>

              <button
                onClick={generateKey}
                disabled={creating}
                className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                {creating ? "Generating..." : "Generate API key →"}
              </button>
            </div>
          )}

          {/* Step 3 — Make a request */}
          {step === 3 && (
            <div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                <Terminal className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                Your API key is ready
              </h2>
              <p className="text-sm text-red-600 font-medium mb-4">
                ⚠ Copy this key now. It will not be shown again.
              </p>

              {/* Key display */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center gap-3 mb-6">
                <code className="text-sm text-gray-800 flex-1 break-all font-mono">
                  {apiKey}
                </code>
                <button
                  onClick={() => copy(apiKey)}
                  className="shrink-0 text-gray-400 hover:text-indigo-600 transition-colors"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Code snippets */}
              <p className="text-sm font-medium text-gray-700 mb-3">
                Make your first request:
              </p>

              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-xs text-gray-400 mb-1.5 font-medium">
                    curl
                  </p>
                  <div className="bg-gray-900 rounded-lg p-3 flex items-start gap-3">
                    <code className="text-green-400 text-xs flex-1 break-all whitespace-pre-wrap">
                      {`curl -H "X-API-Key: ${apiKey}" ${GATEWAY_URL}/service-a/data`}
                    </code>
                    <button
                      onClick={() =>
                        copy(
                          `curl -H "X-API-Key: ${apiKey}" ${GATEWAY_URL}/service-a/data`,
                        )
                      }
                      className="shrink-0 text-gray-500 hover:text-white"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-1.5 font-medium">
                    JavaScript
                  </p>
                  <div className="bg-gray-900 rounded-lg p-3 flex items-start gap-3">
                    <code className="text-green-400 text-xs flex-1 break-all whitespace-pre-wrap">
                      {`fetch("${GATEWAY_URL}/service-a/data", {
  headers: { "X-API-Key": "${apiKey}" }
})`}
                    </code>
                    <button
                      onClick={() =>
                        copy(
                          `fetch("${GATEWAY_URL}/service-a/data", {\n  headers: { "X-API-Key": "${apiKey}" }\n})`,
                        )
                      }
                      className="shrink-0 text-gray-500 hover:text-white"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push("/dashboard")}
                className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Go to dashboard →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
