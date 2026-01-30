import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { ZoomIn, ZoomOut, Move } from 'lucide-react';
import { cn } from '../ui/utils';
import { ImageSetting } from '@/app/utils/image-helpers';

interface ImageCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  onConfirm: (settings: ImageSetting) => void;
  initialSettings?: ImageSetting;
}

export const ImageCropModal: React.FC<ImageCropModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  onConfirm,
  initialSettings
}) => {
  const [fit, setFit] = useState<ImageSetting['fit']>(initialSettings && initialSettings.fit ? initialSettings.fit : 'cover');
  const [position, setPosition] = useState<ImageSetting['position']>(initialSettings && initialSettings.position ? initialSettings.position : 'center');
  const [zoom, setZoom] = useState<number>(initialSettings && initialSettings.zoom !== undefined ? initialSettings.zoom : 100);

  const handleConfirm = () => {
    onConfirm({
      url: imageUrl,
      fit,
      position,
      zoom
    });
    onClose();
  };

  const fitOptions = [
    { value: 'cover', label: 'Cover', description: 'Fills the area, may crop edges' },
    { value: 'contain', label: 'Contain', description: 'Fits within area, may show background' },
    { value: 'fill', label: 'Fill', description: 'Stretches to fill area' },
    { value: 'scale-down', label: 'Stretch', description: 'Never enlarges, like contain' }
  ];

  const positionOptions = [
    { value: 'top-left', label: 'Top Left' },
    { value: 'top', label: 'Top' },
    { value: 'top-right', label: 'Top Right' },
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' },
    { value: 'bottom-left', label: 'Bottom Left' },
    { value: 'bottom', label: 'Bottom' },
    { value: 'bottom-right', label: 'Bottom Right' }
  ];

  // Convert position value to object-position CSS value
  const getObjectPosition = (pos: string) => {
    const posMap: Record<string, string> = {
      'top-left': 'left top',
      'top': 'center top',
      'top-right': 'right top',
      'left': 'left center',
      'center': 'center center',
      'right': 'right center',
      'bottom-left': 'left bottom',
      'bottom': 'center bottom',
      'bottom-right': 'right bottom'
    };
    return posMap[pos] || 'center center';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 bg-background border-border">
        <DialogHeader className="px-6 pt-6 pb-4 space-y-1.5">
          <DialogTitle className="font-sans text-foreground" style={{ fontSize: 'var(--text-lg)' }}>
            Adjust Image Display
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-sans" style={{ fontSize: 'var(--text-sm)' }}>
            Choose how the image should be displayed in the layout.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-6">
          {/* Preview */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground">Preview</label>
            <div 
              className="relative w-full h-64 bg-muted/20 border border-border rounded-lg overflow-hidden"
              style={{
                background: 'repeating-conic-gradient(var(--muted) 0% 25%, var(--background) 0% 50%) 50% / 20px 20px'
              }}
            >
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-full"
                style={{
                  objectFit: fit,
                  objectPosition: getObjectPosition(position || 'center'),
                  transform: `scale(${zoom / 100})`
                }}
              />
            </div>
          </div>

          {/* Image Fit */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
              <Move className="w-3.5 h-3.5" />
              Image Fit
            </label>
            <div className="grid grid-cols-2 gap-2">
              {fitOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFit(option.value as ImageSetting['fit'])}
                  className={cn(
                    'flex flex-col items-start gap-1 p-3 rounded-md border text-xs transition-all',
                    fit === option.value
                      ? 'border-primary bg-primary/5 ring-1 ring-primary/20 text-primary'
                      : 'border-border hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  )}
                >
                  <span className="font-medium">{option.label}</span>
                  <span className="text-[10px] text-muted-foreground">{option.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Image Position */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-muted-foreground">Image Position</label>
            <div className="grid grid-cols-3 gap-1 w-full max-w-[240px] aspect-square bg-muted/20 p-1 rounded-md border border-border mx-auto">
              {positionOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPosition(option.value as ImageSetting['position'])}
                  title={option.label}
                  className={cn(
                    'w-full h-full rounded-sm transition-all border border-transparent flex items-center justify-center',
                    position === option.value
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm z-10'
                      : 'bg-background hover:bg-muted text-muted-foreground hover:scale-105'
                  )}
                >
                  <div className="w-2 h-2 rounded-full bg-current" />
                </button>
              ))}
            </div>
          </div>

          {/* Zoom Control */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                <ZoomIn className="w-3.5 h-3.5" />
                Zoom
              </label>
              <span className="text-xs font-mono text-muted-foreground">{zoom}%</span>
            </div>
            <div className="flex items-center gap-3">
              <ZoomOut className="w-4 h-4 text-muted-foreground shrink-0" />
              <Slider
                value={[zoom]}
                onValueChange={(values) => setZoom(values[0])}
                min={50}
                max={200}
                step={5}
                className="flex-1"
              />
              <ZoomIn className="w-4 h-4 text-muted-foreground shrink-0" />
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 pb-6 flex gap-2">
          <Button variant="outline" onClick={onClose} className="font-sans">
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="font-sans">
            Apply Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
