import React from 'react';
import { Star } from 'lucide-react';
import { format } from 'date-fns';

interface Props {
  description: string;
  onDescriptionChange: (desc: string) => void;
  images: string[];
  onImagesChange: (images: string[]) => void;
  severity: number;
  onSeverityChange: (severity: number) => void;
  detectedAt: string;
  onDetectedAtChange: (date: string) => void;
}

export function DetailsStep({
  description,
  onDescriptionChange,
  images,
  onImagesChange,
  severity,
  onSeverityChange,
  detectedAt,
  onDetectedAtChange
}: Props) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 3) {
      alert('Chỉ được tải lên tối đa 3 ảnh');
      return;
    }

    // For MVP, we'll use local URLs. In production, these would be uploaded to storage
    const newImages = files.map(file => URL.createObjectURL(file));
    onImagesChange([...images, ...newImages]);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Mô tả chi tiết</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Mô tả vi phạm
        </label>
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Hình ảnh/Video (tối đa 3)
        </label>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleImageUpload}
          className="mt-1 block w-full"
          disabled={images.length >= 3}
        />
        <div className="mt-2 grid grid-cols-3 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative">
              <img src={url} alt="" className="w-full h-24 object-cover rounded" />
              <button
                onClick={() => onImagesChange(images.filter((_, i) => i !== index))}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Mức độ nghiêm trọng
        </label>
        <div className="flex gap-2 mt-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => onSeverityChange(value)}
              className={`p-2 ${severity >= value ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              <Star className="w-6 h-6 fill-current" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Thời gian phát hiện vi phạm
        </label>
        <input
          type="datetime-local"
          value={detectedAt}
          onChange={(e) => onDetectedAtChange(e.target.value)}
          max={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>
    </div>
  );
}