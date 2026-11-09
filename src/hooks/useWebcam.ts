import { useState, useEffect, useRef, useCallback } from 'react';
import { generateMockPortrait } from '../utils/mockData';

export type CameraStatus = 'idle' | 'requesting' | 'ready' | 'denied' | 'simulated';

export function useWebcam() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [status, setStatus] = useState<CameraStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMirrored, setIsMirrored] = useState(true);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  // Stop current stream
  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  // Initialize or re-initialize stream
  const startCamera = useCallback(async () => {
    stopStream();
    setStatus('requesting');
    setErrorMessage(null);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setStatus('simulated');
      setErrorMessage('MediaDevices API not supported. Switched to Studio Simulator.');
      return;
    }

    try {
      const constraints: MediaStreamConstraints = {
        audio: false,
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(() => {});
          setStatus('ready');
        };
      } else {
        setStatus('ready');
      }
    } catch (err: unknown) {
      const error = err as Error;
      console.warn('Camera permission or device error:', error);
      setStatus('simulated');
      setErrorMessage(
        error.name === 'NotAllowedError'
          ? 'Camera permission denied. Studio Simulator active.'
          : 'Camera device unavailable. Studio Simulator active.'
      );
    }
  }, [facingMode, stopStream]);

  // Flip camera (front / back)
  const toggleFacingMode = useCallback(() => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  }, []);

  // Toggle mirror
  const toggleMirror = useCallback(() => {
    setIsMirrored((prev) => !prev);
  }, []);

  // Force simulated mode
  const switchToSimulated = useCallback(() => {
    stopStream();
    setStatus('simulated');
  }, [stopStream]);

  // Capture snapshot
  const capturePhoto = useCallback(
    (shotIndex: number, cssFilter = 'none'): string => {
      // If simulated or video not ready, generate high quality mock portrait
      if (status === 'simulated' || !videoRef.current || videoRef.current.videoWidth === 0) {
        return generateMockPortrait(shotIndex);
      }

      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      const vWidth = video.videoWidth || 1280;
      const vHeight = video.videoHeight || 720;

      canvas.width = vWidth;
      canvas.height = vHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return generateMockPortrait(shotIndex);

      ctx.save();
      // Apply CSS filter to canvas
      if (cssFilter && cssFilter !== 'none') {
        ctx.filter = cssFilter;
      }

      // Handle mirror horizontally
      if (isMirrored) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      ctx.restore();

      return canvas.toDataURL('image/jpeg', 0.95);
    },
    [status, isMirrored]
  );

  useEffect(() => {
    startCamera();
    return () => {
      stopStream();
    };
  }, [startCamera, stopStream]);

  return {
    videoRef,
    status,
    errorMessage,
    isMirrored,
    facingMode,
    startCamera,
    switchToSimulated,
    toggleMirror,
    toggleFacingMode,
    capturePhoto,
  };
}
