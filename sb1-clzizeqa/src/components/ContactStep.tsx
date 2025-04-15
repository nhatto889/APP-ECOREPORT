import React from 'react';

interface Props {
  name: string;
  onNameChange: (name: string) => void;
  phone: string;
  onPhoneChange: (phone: string) => void;
  email: string;
  onEmailChange: (email: string) => void;
  isAnonymous: boolean;
  onIsAnonymousChange: (isAnonymous: boolean) => void;
}

export function ContactStep({
  name,
  onNameChange,
  phone,
  onPhoneChange,
  email,
  onEmailChange,
  isAnonymous,
  onIsAnonymousChange
}: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Thông tin liên hệ (tùy chọn)</h2>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="anonymous"
          checked={isAnonymous}
          onChange={(e) => onIsAnonymousChange(e.target.checked)}
          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
        />
        <label htmlFor="anonymous" className="text-sm text-gray-700">
          Báo cáo ẩn danh
        </label>
      </div>

      {!isAnonymous && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Họ tên
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}