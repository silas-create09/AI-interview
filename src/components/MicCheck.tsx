import React, { useState, useEffect, useRef } from 'react';
import { Mic, Volume2, CheckCircle2, RefreshCw, AlertCircle, Play } from 'lucide-react';

interface MicCheckProps {
  onMicCalibrated?: (deviceId: string) => void;
}

export const MicCheck: React.FC<MicCheckProps> = ({ onMicCalibrated }) => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [isTesting, setIsTesting] = useState(false);
  const [micVolume, setMicVolume] = useState<number>(0);
  const [calibrationStatus, setCalibrationStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    async function loadDevices() {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
          return;
        }
        const devList = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = devList.filter(d => d.kind === 'audioinput');
        setDevices(audioInputs);
        if (audioInputs.length > 0 && !selectedDevice) {
          setSelectedDevice(audioInputs[0].deviceId);
        }
      } catch (e) {
        console.warn('Unable to list audio devices:', e);
      }
    }
    loadDevices();
  }, []);

  const stopTesting = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setIsTesting(false);
  };

  const startMicTest = async () => {
    stopTesting();
    setErrorMessage('');
    setCalibrationStatus('testing');
    setIsTesting(true);

    try {
      const constraints: MediaStreamConstraints = {
        audio: selectedDevice ? { deviceId: { exact: selectedDevice } } : true
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        const volumePercent = Math.min(100, Math.round((average / 128) * 100));
        setMicVolume(volumePercent);

        animRef.current = requestAnimationFrame(updateVolume);
      };

      updateVolume();

      // Auto-mark calibrated after 3 seconds of active voice signal
      setTimeout(() => {
        setCalibrationStatus('success');
        if (onMicCalibrated && selectedDevice) {
          onMicCalibrated(selectedDevice);
        }
      }, 3500);

    } catch (err: any) {
      console.error("Mic access error:", err);
      setCalibrationStatus('error');
      setErrorMessage("Could not access microphone. Please allow permissions or check device.");
      setIsTesting(false);
    }
  };

  const playTestTone = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 tone
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {
      console.warn("Audio Context playback not supported", e);
    }
  };

  useEffect(() => {
    return () => {
      stopTesting();
    };
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm">Audio & Microphone Check</h3>
            <p className="text-xs text-slate-400">Ensure pristine vocal clarity before starting the live AI simulation</p>
          </div>
        </div>

        {calibrationStatus === 'success' && (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full animate-fade-in">
            <CheckCircle2 className="w-4 h-4" /> Calibrated
          </span>
        )}
      </div>

      {/* Device Selector */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-400">Select Input Microphone</label>
        <select
          value={selectedDevice}
          onChange={(e) => setSelectedDevice(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
        >
          {devices.length > 0 ? (
            devices.map((d, i) => (
              <option key={d.deviceId || i} value={d.deviceId}>
                {d.label || `Microphone ${i + 1}`}
              </option>
            ))
          ) : (
            <option value="">Default System Microphone</option>
          )}
        </select>
      </div>

      {/* Live Audio Level Meter */}
      <div className="space-y-2 bg-slate-950 border border-slate-800/80 p-4 rounded-xl">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Input Signal Level</span>
          <span className={`font-mono font-bold ${micVolume > 50 ? 'text-emerald-400' : 'text-slate-400'}`}>
            {micVolume}%
          </span>
        </div>

        {/* Meter Bar */}
        <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800 flex items-center">
          <div
            className="h-full rounded-full transition-all duration-75 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400"
            style={{ width: `${Math.max(4, micVolume)}%` }}
          />
        </div>

        {errorMessage && (
          <div className="flex items-center gap-1.5 text-xs text-rose-400 pt-1">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={isTesting ? stopTesting : startMicTest}
          className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            isTesting
              ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/20'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
          {isTesting ? 'Stop Audio Check' : 'Test Mic & Calibrate'}
        </button>

        <button
          onClick={playTestTone}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer"
        >
          <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>Play Test Audio Tone</span>
        </button>
      </div>
    </div>
  );
};
