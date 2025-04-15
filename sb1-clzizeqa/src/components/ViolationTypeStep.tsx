import React from 'react';
import { AlertTriangle, Trash2, Droplets, Zap, Trees } from 'lucide-react';
import type { ViolationType } from '../types';

interface Props {
  value: ViolationType;
  onChange: (type: ViolationType) => void;
  otherDescription: string;
  onOtherDescriptionChange: (desc: string) => void;
}

const violationTypes = [
  { type: 'LITTERING' as const, icon: Trash2, label: 'Xả rác bừa bãi' },
  { type: 'WATER_WASTE' as const, icon: Droplets, label: 'Lãng phí nước' },
  { type: 'POWER_WASTE' as const, icon: Zap, label: 'Lãng phí điện' },
  { type: 'PLANT_DAMAGE' as const, icon: Trees, label: 'Phá hoại cây xanh và thực vật' },
  { type: 'OTHER' as const, icon: AlertTriangle, label: 'Khác' },
];

export function ViolationTypeStep({ value, onChange, otherDescription, onOtherDescriptionChange }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Chọn loại vi phạm</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {violationTypes.map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={`p-4 rounded-lg border flex flex-col items-center gap-2 transition-colors
              ${value === type 
                ? 'border-green-500 bg-green-50 text-green-700' 
                : 'border-gray-200 hover:border-gray-300'
              }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-center text-sm">{label}</span>
          </button>
        ))}
      </div>
      
      {value === 'OTHER' && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Mô tả loại vi phạm khác
          </label>
          <textarea
            value={otherDescription}
            onChange={(e) => onOtherDescriptionChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            rows={3}
            placeholder="Vui lòng mô tả chi tiết hành vi vi phạm"
          />
        </div>
      )}
    </div>
  );
}