import React from 'react';
import { Leaf, Recycle, AlertTriangle, MapPin } from 'lucide-react';

export function InfoPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center text-green-800">Thông tin hữu ích</h1>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Phân loại rác thải</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Leaf className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium">Rác Hữu Cơ</h3>
                <p className="text-gray-600">Thực phẩm thừa, vỏ trái cây, lá cây, bã trà, cà phê.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Recycle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium">Rác Tái Chế</h3>
                <p className="text-gray-600">Giấy, nhựa, kim loại, thủy tinh, hộp sữa giấy.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium">Rác Nguy Hại</h3>
                <p className="text-gray-600">Pin, bóng đèn huỳnh quang, thuốc trừ sâu, sơn, dầu nhớt.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Điểm thu gom rác tái chế</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium">Quận Bình Thạnh</h3>
              <p className="text-gray-600">
                Các điểm thu gom rác tái chế tại các siêu thị lớn như Co.opmart, 
                Vinmart hoặc các trạm thu gom của các tổ chức môi trường.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Mẹo bảo vệ môi trường</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Hạn chế sử dụng túi ni lông, hộp xốp và đồ nhựa dùng một lần</li>
          <li>Tận dụng chai lọ, hộp giấy và vải cũ làm đồ trang trí</li>
          <li>Biến rác thành vật liệu thủ công, đồ chơi hoặc vật dụng hữu ích</li>
          <li>Sử dụng điện, nước hợp lý, tránh lãng phí</li>
          <li>Tham gia các hoạt động cộng đồng bảo vệ môi trường</li>
        </ul>
      </section>
    </div>
  );
}