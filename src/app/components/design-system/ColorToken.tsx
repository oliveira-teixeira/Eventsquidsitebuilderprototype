import React from 'react';
import { cn } from '../ui/utils';

interface ColorTokenProps {
  name: string;
  bgClass: string;
  textClass: string;
  variable: string;
  foregroundVariable: string;
  description?: string;
  preview?: React.ReactNode;
}

export const ColorToken: React.FC<ColorTokenProps> = ({
  name,
  bgClass,
  textClass,
  variable,
  foregroundVariable,
  description,
  preview
}) => {
  return (
    <div className="flex flex-col gap-0 border rounded-xl shadow-sm bg-card overflow-hidden hover:shadow-md transition-shadow">
      <div 
        className={cn("h-40 w-full flex flex-col items-center justify-center relative p-6", bgClass, textClass)}
      >
        <div className="text-center z-10 space-y-1">
          <p className="font-bold text-3xl tracking-tight">{name}</p>
          <p className="text-xs font-medium opacity-80 uppercase tracking-widest">Contrast Check: AA/AAA</p>
        </div>
        
        {preview && (
             <div className="absolute bottom-4 right-4 z-20 shadow-lg rounded-lg overflow-hidden">
                {preview}
             </div>
        )}
      </div>
      
      <div className="p-5 space-y-4 bg-card">
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Background:</span>
                <code 
                    className="px-2 py-1 rounded font-mono"
                    style={{ 
                        backgroundColor: `color-mix(in srgb, var(${variable}), transparent 85%)`,
                        color: `var(${variable})` // Use the color itself for text
                    }}
                >
                    {variable}
                </code>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Foreground:</span>
                <code className="px-2 py-1 rounded font-mono bg-muted text-muted-foreground">
                    {foregroundVariable}
                </code>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Class:</span>
                 <code 
                    className="px-2 py-1 rounded font-mono"
                     style={{ 
                        backgroundColor: `color-mix(in srgb, var(${variable}), transparent 85%)`,
                         color: `var(${variable})`
                    }}
                >
                    {bgClass}
                </code>
            </div>
          </div>
      </div>
    </div>
  );
};
