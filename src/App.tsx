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
  theme: 'cherry-polkadot',
  fontStyle: 'grotesk',
  title: 'Things i loved today',
  subtitle: 'dot booth',
  editionText: '10.11.26 edition',
  showDateStamp: true,
  showPolkaDots: true,
  frameBorderRadius: 10,
  stickers: [],
};

export const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<StepId>('start');
  const [selectedLayout, setSelectedLayout] = useState<LayoutConfig>(LAYOUT_OPTIONS[0]);
  const [capturedShots, setCapturedShots] = useState<CapturedShot[]>([]);
  const [customizationSettings, setCustomizationSettings] = useState<CustomizationSettings>(DEFAULT_SETTINGS);

  const handleSelectLayout = (layout: LayoutConfig) => {
    if (layout.id !== selectedLayout.id) {
      setSelectedLayout(layout);
      setCapturedShots([]);
    }
  };

  const handleAddShot = (shot: CapturedShot) => {
    setCapturedShots((prev) => [...prev, shot]);
  };

  const handleRemoveShot = (id: number) => {
    setCapturedShots((prev) => prev.filter((s) => s.id !== id));
  };

  const handleRetakeAll = () => { setCapturedShots([]); };

  const handleReset = () => {
    setCurrentStep('start');
    setSelectedLayout(LAYOUT_OPTIONS[0]);
    setCapturedShots([]);
    setCustomizationSettings(DEFAULT_SETTINGS);
  };

  const getBackHandler = () => {
    switch (currentStep) {
      case 'layout': return () => setCurrentStep('start');
      case 'camera': return () => setCurrentStep('layout');
      case 'customize': return () => setCurrentStep('camera');
      case 'download': return () => setCurrentStep('customize');
      default: return undefined;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFE7] text-zinc-950 flex flex-col">
      <Navbar
        currentStep={currentStep}
        onReset={handleReset}
        onBack={getBackHandler()}
      />

      <main className="flex-1 w-full">
        {currentStep === 'start' && (
          <StartScreen onStart={() => setCurrentStep('layout')} />
        )}
        {currentStep === 'layout' && (
          <FrameLayoutScreen
            selectedLayout={selectedLayout}
            onSelectLayout={handleSelectLayout}
            onContinue={() => setCurrentStep('camera')}
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
            onContinue={() => setCurrentStep('customize')}
            onBack={() => setCurrentStep('layout')}
          />
        )}
        {currentStep === 'customize' && (
          <CustomizeScreen
            layout={selectedLayout}
            shots={capturedShots}
            settings={customizationSettings}
            onUpdateSettings={setCustomizationSettings}
            onContinue={() => setCurrentStep('download')}
            onBack={() => setCurrentStep('camera')}
          />
        )}
        {currentStep === 'download' && (
          <DownloadScreen
            layout={selectedLayout}
            shots={capturedShots}
            settings={customizationSettings}
            onReset={handleReset}
            onBackToEdit={() => setCurrentStep('customize')}
          />
        )}
      </main>
    </div>
  );
};

export default App;
