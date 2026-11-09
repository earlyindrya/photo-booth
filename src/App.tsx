import React, { useState } from 'react';
import { StepId, LayoutConfig, CapturedShot, CustomizationSettings } from './types/photobooth';
import { LAYOUT_OPTIONS } from './utils/mockData';
import { Navbar } from './components/Navbar';
import { StartScreen } from './components/screens/StartScreen';
import { FrameLayoutScreen } from './components/screens/FrameLayoutScreen';
import { CameraScreen } from './components/screens/CameraScreen';
import { CustomizeScreen } from './components/screens/CustomizeScreen';
import { DownloadScreen } from './components/screens/DownloadScreen';

const DEFAULT_SETTINGS: CustomizationSettings = {
  theme: 'cream-paper',
  fontStyle: 'serif',
  title: 'things i loved',
  subtitle: '(monthly recap)',
  showDateStamp: true,
  showWatermark: true,
  frameBorderRadius: 10,
  stickers: [
    { id: 'default-1', emoji: '🔴', x: 86, y: 10, size: 22 },
    { id: 'default-2', emoji: '☕', x: 12, y: 92, size: 26 },
  ],
};

export const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<StepId>('start');
  const [selectedLayout, setSelectedLayout] = useState<LayoutConfig>(LAYOUT_OPTIONS[0]);
  const [capturedShots, setCapturedShots] = useState<CapturedShot[]>([]);
  const [customizationSettings, setCustomizationSettings] = useState<CustomizationSettings>(DEFAULT_SETTINGS);

  // Workflow Handlers
  const handleStart = () => {
    setCurrentStep('layout');
  };

  const handleSelectLayout = (layout: LayoutConfig) => {
    if (layout.id !== selectedLayout.id) {
      setSelectedLayout(layout);
      setCapturedShots([]); // Reset shots if layout format changes
    }
  };

  const handleContinueToCamera = () => {
    setCurrentStep('camera');
  };

  const handleAddShot = (shot: CapturedShot) => {
    setCapturedShots((prev) => [...prev, shot]);
  };

  const handleRemoveShot = (id: number) => {
    setCapturedShots((prev) => prev.filter((s) => s.id !== id));
  };

  const handleRetakeAll = () => {
    setCapturedShots([]);
  };

  const handleContinueToCustomize = () => {
    setCurrentStep('customize');
  };

  const handleContinueToDownload = () => {
    setCurrentStep('download');
  };

  const handleBackToEdit = () => {
    setCurrentStep('customize');
  };

  const handleReset = () => {
    setCurrentStep('start');
    setSelectedLayout(LAYOUT_OPTIONS[0]);
    setCapturedShots([]);
    setCustomizationSettings(DEFAULT_SETTINGS);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-zinc-900 flex flex-col font-sans selection:bg-[#8B1E27] selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentStep={currentStep}
        onReset={handleReset}
      />

      {/* Main Step Viewport */}
      <main className="flex-1 w-full">
        {currentStep === 'start' && (
          <StartScreen onStart={handleStart} />
        )}

        {currentStep === 'layout' && (
          <FrameLayoutScreen
            selectedLayout={selectedLayout}
            onSelectLayout={handleSelectLayout}
            onContinue={handleContinueToCamera}
            onBack={() => setCurrentStep('start')}
          />
        )}

        {currentStep === 'camera' && (
          <CameraScreen
            layout={selectedLayout}
            capturedShots={capturedShots}
            onAddShot={handleAddShot}
            onRemoveShot={handleRemoveShot}
            onRetakeAll={handleRetakeAll}
            onContinue={handleContinueToCustomize}
            onBack={() => setCurrentStep('layout')}
          />
        )}

        {currentStep === 'customize' && (
          <CustomizeScreen
            layout={selectedLayout}
            shots={capturedShots}
            settings={customizationSettings}
            onUpdateSettings={setCustomizationSettings}
            onContinue={handleContinueToDownload}
            onBack={() => setCurrentStep('camera')}
          />
        )}

        {currentStep === 'download' && (
          <DownloadScreen
            layout={selectedLayout}
            shots={capturedShots}
            settings={customizationSettings}
            onReset={handleReset}
            onBackToEdit={handleBackToEdit}
          />
        )}
      </main>
    </div>
  );
};

export default App;