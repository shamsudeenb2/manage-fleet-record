// // 'use client';
// // import { useState, useEffect, useRef } from 'react';
// // import { CheckCircle, Fingerprint, Loader2, RefreshCcw, XCircle } from 'lucide-react';

// // export default function FingerprintCapture() {
// //   const [reader, setReader] = useState<any>(null);
// //   const [status, setStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
// //   const [message, setMessage] = useState('Connect your scanner to begin');
// //   const [fingerprintPreview, setFingerprintPreview] = useState<string | null>(null);

// //   useEffect(() => {
// //     const initReader = async () => {
// //       try {
// //         // Fix: Dynamic import to avoid SSR "is not a module" error
// //         const { FingerprintReader } = await import('@digitalpersona/fingerprint');
// //         const fpReader = new FingerprintReader();
        
// //         fpReader.on('DeviceConnected', () => {
// //           setStatus('idle');
// //           setMessage('Scanner Ready');
// //         });
        
// //         fpReader.on('DeviceDisconnected', () => {
// //           setStatus('error');
// //           setMessage('Scanner Disconnected');
// //         });

// //         fpReader.on('SamplesAcquired', async (data: any) => {
// //           setStatus('success');
// //           setMessage('Capture Successful!');
// //           const sample = data.samples[0];
// //           setFingerprintPreview(sample); // Assumes base64 for preview

// //           await fetch('/api/drivers/biometrics', {
// //             method: 'POST',
// //             body: JSON.stringify({ driverId: '123', fingerprint: sample }),
// //           });
// //         });

// //         setReader(fpReader);
// //       } catch (err) {
// //         console.error("Failed to load SDK:", err);
// //         setMessage("Requires DigitalPersona Lite Client installed on Windows.");
// //       }
// //     };

// //     initReader();
// //     return () => reader?.stopAcquisition();
// //   }, []);

// //   const handleStart = async () => {
// //     const { SampleFormat } = await import('@digitalpersona/fingerprint');
// //     setStatus('scanning');
// //     setMessage('Place your finger firmly on the sensor...');
// //     reader?.startAcquisition(SampleFormat.Raw);
// //   };

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
// //       <div className={`relative p-6 rounded-full transition-all duration-500 ${
// //         status === 'scanning' ? 'bg-blue-100 animate-pulse' : 
// //         status === 'success' ? 'bg-green-100' : 'bg-slate-100'
// //       }`}>
// //         {status === 'success' ? (
// //           <CheckCircle className="w-16 h-16 text-green-600" />
// //         ) : (
// //           <Fingerprint className={`w-16 h-16 ${status === 'scanning' ? 'text-blue-600' : 'text-slate-400'}`} />
// //         )}
// //       </div>

// //       <h2 className="mt-6 text-xl font-semibold text-slate-800">Fingerprint Enrollment</h2>
// //       <p className="text-slate-500 text-center max-w-xs mt-2">{message}</p>

// //       <div className="mt-8 flex gap-4">
// //         {status === 'idle' || status === 'error' ? (
// //           <button onClick={handleStart} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-200">
// //             Start Scanning
// //           </button>
// //         ) : status === 'scanning' ? (
// //           <button disabled className="flex items-center gap-2 bg-slate-200 text-slate-500 px-8 py-3 rounded-xl font-medium cursor-not-allowed">
// //             <Loader2 className="animate-spin w-4 h-4" />
// //             Waiting for finger...
// //           </button>
// //         ) : (
// //           <button onClick={() => setStatus('idle')} className="flex items-center gap-2 border border-slate-300 hover:bg-white px-8 py-3 rounded-xl font-medium transition-all">
// //             <RefreshCcw className="w-4 h-4" />
// //             Scan Another
// //           </button>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }


// 'use client';
// import { useState, useEffect } from 'react';
// import { Fingerprint, CheckCircle, Loader2, RefreshCcw } from 'lucide-react';
// import DashboardLayout from '@/components/layout/Dashboard';
// import { useParams, useRouter } from "next/navigation";
// import { motion } from "framer-motion";

// export default function FingerprintCapture() {
//   const [status, setStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
//   const [message, setMessage] = useState('Initializing scanner...');
//   const [reader, setReader] = useState<any>(null);
//   const router = useRouter();
//   const { id } = useParams() as { id: string };

//   useEffect(() => {
//     // Wait for the CDN script to load
//     const checkSDK = setInterval(() => {
//       if (typeof window !== 'undefined' && (window as any).Fingerprint) {
//         clearInterval(checkSDK);
//         initReader();
//       }
//     }, 500);

//     const initReader = () => {
//       try {
//         const { FingerprintReader } = (window as any).Fingerprint;
//         const fpReader = new FingerprintReader();
        
//         fpReader.onDeviceConnected = () => {
//           setStatus('idle');
//           setMessage('Scanner Ready');
//         };
        
//         fpReader.onSamplesAcquired = async (data: any) => {
//           console.log("Data:", data.samples[0]);
//           const fingerprintData = data.samples[0];

//           const response = await fetch("/api/auth/users/driver/fingerprint", {
//           method: 'POST',
//           body: JSON.stringify({ 
//             driverId: id, // Dynamically get your driver ID
//             fingerprint: fingerprintData 
//           }),
//         });

//       if (response.ok) {
//           setStatus('success');
//           setMessage('Fingerprint Captured!');
//           router.push("/drivers"); // your drivers list
//           return;
//       }
//       else setStatus('error');
//     };

//         setReader(fpReader);
//         setMessage('Scanner Connected');
//       } catch (err) {
//         setMessage('Lite Client or WebSDK Agent missing on this PC.');
//       }
//     };

//     return () => clearInterval(checkSDK);
//   }, []);

//   const startScan = () => {
//     if (!reader) return;
//     const { SampleFormat } = (window as any).Fingerprint;
//     setStatus('scanning');
//     setMessage('Place finger on the scanner...');
//     reader.startAcquisition(SampleFormat.Raw);
//   };

//   return (
//     <>
//     <DashboardLayout>
//     <div className="flex flex-col items-center p-10 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-md mx-auto mt-10">
//       <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="w-full max-w-3xl">
//       <div className={`p-8 rounded-full transition-all duration-700 ${
//         status === 'scanning' ? 'bg-blue-50 scale-110 shadow-inner' : 
//         status === 'success' ? 'bg-green-50' : 'bg-slate-50'
//       }`}>
//         {status === 'success' ? (
//           <CheckCircle className="w-20 h-20 text-green-500" />
//         ) : (
//           <Fingerprint className={`w-20 h-20 ${status === 'scanning' ? 'text-blue-500 animate-pulse' : 'text-slate-300'}`} />
//         )}
//       </div>

//       <div className="text-center mt-8">
//         <h2 className="text-2xl font-bold text-slate-800">Biometric Enrollment</h2>
//         <p className={`mt-2 font-medium ${status === 'error' ? 'text-red-500' : 'text-slate-500'}`}>
//           {message}
//         </p>
//       </div>

//       <button 
//         onClick={startScan}
//         disabled={status === 'scanning'}
//         className="mt-10 w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold hover:opacity-90 transition-all disabled:opacity-50 flex justify-center items-center gap-3"
//       >
//         {status === 'scanning' ? <Loader2 className="animate-spin" /> : <RefreshCcw size={18} />}
//         {status === 'scanning' ? 'Waiting...' : 'Start New Scan'}
//       </button>
//       </motion.div>
//     </div>
//     </DashboardLayout>
//     </>
//   );
// }

// src/app/admin/drivers/capture-fingerprint/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";

type ScanStatus = "idle" | "connecting" | "ready" | "scanning" | "success" | "error";

export default function FingerprintCapturePage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [status, setStatus] = useState<ScanStatus>("connecting");
  const [message, setMessage] = useState("Initializing scanner…");
  const [reader, setReader] = useState<any>(null);
  const [capturedData, setCapturedData] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // ── Initialize DigitalPersona SDK ─────────────────────────────────────────
  useEffect(() => {
    const checkSDK = setInterval(() => {
      if (typeof window !== "undefined" && (window as any).Fingerprint) {
        clearInterval(checkSDK);
        initReader();
      }
    }, 500);

    // Timeout after 10s if SDK never loads
    const timeout = setTimeout(() => {
      clearInterval(checkSDK);
      if (status === "connecting") {
        setStatus("error");
        setMessage("SDK not found. Ensure DigitalPersona Lite Client is installed on this PC.");
      }
    }, 10000);

    function initReader() {
      try {
        const { FingerprintReader } = (window as any).Fingerprint;
        const fpReader = new FingerprintReader();

        fpReader.onDeviceConnected = () => {
          setStatus("ready");
          setMessage("Scanner connected and ready");
        };

        fpReader.onDeviceDisconnected = () => {
          setStatus("error");
          setMessage("Scanner disconnected. Please reconnect and try again.");
        };

        fpReader.onSamplesAcquired = async (data: any) => {
          const fingerprintData = data.samples[0];
          setCapturedData(fingerprintData);
          setStatus("success");
          setMessage("Fingerprint captured successfully!");
          setAttempts((a) => a + 1);

          // Auto-save
          await saveFingerprint(fingerprintData);
        };

        fpReader.onErrorOccurred = (error: any) => {
          setStatus("error");
          setMessage(`Scanner error: ${error?.message ?? "Unknown error"}`);
        };

        setReader(fpReader);
        setStatus("ready");
        setMessage("Scanner ready — press Start Scan");
      } catch (err: any) {
        setStatus("error");
        setMessage("Failed to initialize scanner. Check Lite Client installation.");
      }
    }

    return () => {
      clearInterval(checkSDK);
      clearTimeout(timeout);
    };
  }, []);

  async function saveFingerprint(data: string) {
    setSaving(true);
    try {
      const res = await fetch("/api/auth/users/driver/fingerprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ driverId: id, fingerprint: data }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        toast.success("Fingerprint saved successfully");
        setTimeout(() => router.push("/drivers"), 1800);
      } else {
        toast.error(json?.message ?? "Failed to save fingerprint");
        setStatus("ready");
        setMessage("Save failed — you can retry or skip.");
      }
    } catch {
      toast.error("Network error saving fingerprint");
      setStatus("ready");
      setMessage("Save failed — you can retry or skip.");
    } finally {
      setSaving(false);
    }
  }

  function startScan() {
    if (!reader) {
      setStatus("error");
      setMessage("Scanner not initialized. Refresh and try again.");
      return;
    }
    try {
      const { SampleFormat } = (window as any).Fingerprint;
      setStatus("scanning");
      setMessage("Place your finger firmly on the sensor…");
      reader.startAcquisition(SampleFormat.Raw);
    } catch (err: any) {
      setStatus("error");
      setMessage("Failed to start scan. " + (err?.message ?? ""));
    }
  }

  function reset() {
    setCapturedData(null);
    setStatus("ready");
    setMessage("Ready for new scan");
  }

  const statusConfig: Record<ScanStatus, { bg: string; ring: string; emoji: string; textColor: string }> = {
    connecting: { bg: "#1C2330",     ring: "#3E6B8C",  emoji: "⏳", textColor: "#71717a" },
    ready:      { bg: "#0D1F0D",     ring: "#5C9669",  emoji: "🖐",  textColor: "#4ade80" },
    idle:       { bg: "#0D1F0D",     ring: "#5C9669",  emoji: "🖐",  textColor: "#4ade80" },
    scanning:   { bg: "#0D1A2D",     ring: "#3E6B8C",  emoji: "🔍", textColor: "#60a5fa" },
    success:    { bg: "#0D1F0D",     ring: "#5C9669",  emoji: "✅", textColor: "#4ade80" },
    error:      { bg: "#1F0D0D",     ring: "#8C3E3E",  emoji: "❌", textColor: "#f87171" },
  };

  const cfg = statusConfig[status];

  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right" />
      <div className="min-h-screen bg-[#0D1117] text-white flex flex-col" style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}>

        {/* ── HEADER ── */}
        <div className="border-b border-white/[0.06] bg-[#0D1117]/80 backdrop-blur">
          <div className="max-w-xl mx-auto px-6 py-4 flex items-center gap-4">
            <button onClick={() => router.back()} className="text-zinc-500 hover:text-white transition-colors text-lg">←</button>
            <div>
              <h1 className="text-base font-bold tracking-wider">Biometric Enrollment</h1>
              <p className="text-xs text-zinc-500 mt-0.5">Fingerprint capture for driver registration</p>
            </div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md space-y-5"
          >
            {/* Scanner visual */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-2xl p-8 flex flex-col items-center gap-6">

              {/* Fingerprint icon with status ring */}
              <div className="relative">
                <motion.div
                  animate={status === "scanning" ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="w-32 h-32 rounded-full flex items-center justify-center"
                  style={{
                    background: cfg.bg,
                    boxShadow: `0 0 0 3px ${cfg.ring}40, 0 0 0 6px ${cfg.ring}15`,
                  }}
                >
                  <span className="text-6xl select-none">{cfg.emoji}</span>
                </motion.div>

                {/* Pulse ring when scanning */}
                {status === "scanning" && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2"
                    style={{ borderColor: cfg.ring }}
                    animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  />
                )}
              </div>

              {/* Status text */}
              <div className="text-center space-y-1">
                <p className="text-sm font-semibold" style={{ color: cfg.textColor }}>{message}</p>
                {attempts > 0 && (
                  <p className="text-[10px] text-zinc-600">Scan {attempts} completed</p>
                )}
              </div>

              {/* Scan button */}
              <AnimatePresence mode="wait">
                {status === "scanning" ? (
                  <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-xs text-[#3E6B8C]">
                    <div className="w-4 h-4 border-2 border-[#3E6B8C] border-t-transparent rounded-full animate-spin" />
                    Waiting for finger placement…
                  </motion.div>
                ) : status === "connecting" ? (
                  <motion.div key="connecting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-xs text-zinc-500">
                    <div className="w-4 h-4 border-2 border-zinc-600 border-t-transparent rounded-full animate-spin" />
                    Connecting to scanner…
                  </motion.div>
                ) : status === "success" && saving ? (
                  <motion.div key="saving" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-xs text-[#5C9669]">
                    <div className="w-4 h-4 border-2 border-[#5C9669] border-t-transparent rounded-full animate-spin" />
                    Saving fingerprint…
                  </motion.div>
                ) : status === "success" ? (
                  <motion.div key="success" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-2">
                    <p className="text-[10px] text-zinc-500">Redirecting to drivers list…</p>
                    <button
                      type="button"
                      onClick={reset}
                      className="px-4 py-2 rounded-lg text-xs border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
                    >
                      Scan Again
                    </button>
                  </motion.div>
                ) : (
                  <motion.button
                    key="start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    type="button"
                    onClick={status === "error" ? reset : startScan}
                    //disabled={status === "connecting"}
                    className="px-8 py-3 rounded-xl text-sm bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {status === "error" ? "Retry" : "Start Scan"}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Instructions */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Instructions</h3>
              {[
                { n: "1", text: "Ensure the DigitalPersona scanner is connected to this PC" },
                { n: "2", text: "Click 'Start Scan' and place the driver's right index finger firmly on the sensor" },
                { n: "3", text: "Hold still until the scan completes — it takes about 2 seconds" },
                { n: "4", text: "The fingerprint will be saved automatically after a successful scan" },
              ].map((item) => (
                <div key={item.n} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#C8A96E]/20 text-[#C8A96E] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    {item.n}
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Skip option */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => router.push("/drivers")}
                className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors underline underline-offset-2"
              >
                Skip fingerprint capture — register later
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
