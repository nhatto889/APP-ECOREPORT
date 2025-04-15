import React from 'react';
import type { Location } from '../types';

interface Props {
  value: Location;
  onChange: (location: Location) => void;
}

export function LocationStep({ value, onChange }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Địa điểm vi phạm</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Địa điểm
        </label>
        <textarea
          value={value.address}
          onChange={(e) => onChange({ address: e.target.value })}
          placeholder="Vui lòng mô tả chi tiết địa điểm vi phạm (ví dụ: khu A nhà ăn tiểu học, khu B nhà ăn trung học, lớp a, lớp b, phòng c,...)"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          rows={4}
        />
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          Vui lòng cung cấp địa điểm càng chi tiết càng tốt để chúng tôi có thể xác minh và xử lý vi phạm hiệu quả.
        </p>
      </div>
    </div>
  );
}