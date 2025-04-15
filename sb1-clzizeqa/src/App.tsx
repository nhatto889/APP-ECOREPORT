import React, { useState } from 'react';
import { Leaf, AlertCircle, ClipboardList, BookOpen, ArrowRight, List } from 'lucide-react';
import { ViolationTypeStep } from './components/ViolationTypeStep';
import { LocationStep } from './components/LocationStep';
import { DetailsStep } from './components/DetailsStep';
import { ContactStep } from './components/ContactStep';
import { InfoPage } from './components/InfoPage';
import { ReportsView } from './components/ReportsView';
import { PasswordProtection } from './components/PasswordProtection';
import type { Report, ViolationType, Location } from './types';

function App() {
  const [page, setPage] = useState<'landing' | 'report' | 'info' | 'reports' | 'password'>('landing');
  const [currentStep, setCurrentStep] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Form state
  const [violationType, setViolationType] = useState<ViolationType>('LITTERING');
  const [otherDescription, setOtherDescription] = useState('');
  const [location, setLocation] = useState<Location>({ address: '' });
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [severity, setSeverity] = useState(1);
  const [detectedAt, setDetectedAt] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (violationType === 'OTHER' && !otherDescription.trim()) {
          alert('Vui lòng mô tả loại vi phạm khác');
          return false;
        }
        return true;

      case 2:
        if (!location.address.trim()) {
          alert('Vui lòng nhập địa điểm vi phạm');
          return false;
        }
        return true;

      case 3:
        if (!description.trim()) {
          alert('Vui lòng mô tả chi tiết vi phạm');
          return false;
        }
        if (!detectedAt) {
          alert('Vui lòng chọn thời gian phát hiện vi phạm');
          return false;
        }
        return true;

      case 4:
        if (!isAnonymous) {
          if (!name.trim()) {
            alert('Vui lòng nhập họ tên');
            return false;
          }
          if (!phone.trim()) {
            alert('Vui lòng nhập số điện thoại');
            return false;
          }
          if (!email.trim()) {
            alert('Vui lòng nhập email');
            return false;
          }
        }
        return true;

      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    const report: Report = {
      id: Math.random().toString(36).substr(2, 9),
      violationType,
      otherDescription: violationType === 'OTHER' ? otherDescription : undefined,
      location,
      description,
      images,
      severity,
      detectedAt,
      contact: isAnonymous ? undefined : { name, phone, email },
      isAnonymous,
      createdAt: new Date().toISOString(),
    };

    try {
      // Save to local storage first
      const reports = JSON.parse(localStorage.getItem('reports') || '[]');
      localStorage.setItem('reports', JSON.stringify([...reports, report]));

      // Reset form
      setCurrentStep(1);
      setViolationType('LITTERING');
      setOtherDescription('');
      setLocation({ address: '' });
      setDescription('');
      setImages([]);
      setSeverity(1);
      setDetectedAt('');
      setName('');
      setPhone('');
      setEmail('');
      setIsAnonymous(false);
      setPage('landing');

      alert('Báo cáo đã được lưu thành công!');
    } catch (error) {
      console.error('Error saving report:', error);
      alert('Có lỗi xảy ra khi lưu báo cáo. Vui lòng thử lại sau!');
    }
  };

  if (page === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
        <header className="bg-white/80 backdrop-blur-sm shadow-sm fixed w-full z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-green-800 flex items-center gap-2">
                <Leaf className="w-6 h-6" />
                Báo cáo Vi phạm Môi trường
              </h1>
              <button
                onClick={() => setPage('password')}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg flex items-center gap-2"
              >
                <List className="w-5 h-5" />
                Xem báo cáo đã lưu
              </button>
            </div>
          </div>
        </header>

        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Cùng bảo vệ môi trường sống của chúng ta
              </h2>
              <p className="text-xl text-gray-600">
                Hãy chung tay giữ gìn và bảo vệ môi trường bằng cách báo cáo các hành vi vi phạm
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <button
                onClick={() => setPage('report')}
                className="group relative bg-white rounded-2xl shadow-md p-8 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="absolute top-6 right-6 text-green-500 transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <ClipboardList className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">Báo cáo vi phạm</h3>
                  <p className="text-gray-600 text-left">
                    Gửi báo cáo về các hành vi vi phạm môi trường mà bạn phát hiện
                  </p>
                </div>
              </button>

              <button
                onClick={() => setPage('info')}
                className="group relative bg-white rounded-2xl shadow-md p-8 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="absolute top-6 right-6 text-blue-500 transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">Thông tin hữu ích</h3>
                  <p className="text-gray-600 text-left">
                    Tìm hiểu thêm về cách phân loại rác và bảo vệ môi trường
                  </p>
                </div>
              </button>
            </div>

            <div className="mt-16 text-center">
              <p className="text-sm text-gray-500">
                Dự án được phát triển với mục đích bảo vệ môi trường và nâng cao ý thức cộng đồng
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-green-800 flex items-center gap-2">
              <Leaf className="w-6 h-6" />
              Báo cáo Vi phạm Môi trường
            </h1>
            <div className="space-x-4">
              <button
                onClick={() => {
                  setPage('landing');
                  setIsAuthenticated(false);
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Quay lại trang chủ
              </button>
              {page === 'reports' ? (
                <button
                  onClick={() => setPage('report')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Tạo báo cáo mới
                </button>
              ) : (
                <button
                  onClick={() => setPage(page === 'report' ? 'info' : 'report')}
                  className={`px-4 py-2 rounded-lg ${
                    page === 'report' 
                      ? 'bg-green-100 text-green-800' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page === 'report' ? 'Thông tin hữu ích' : 'Báo cáo vi phạm'}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {page === 'info' ? (
          <InfoPage />
        ) : page === 'password' ? (
          <PasswordProtection
            onSuccess={() => {
              setIsAuthenticated(true);
              setPage('reports');
            }}
          />
        ) : page === 'reports' ? (
          isAuthenticated ? (
            <ReportsView />
          ) : (
            <PasswordProtection
              onSuccess={() => {
                setIsAuthenticated(true);
                setPage('reports');
              }}
            />
          )
        ) : (
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold">Bước {currentStep}/4</h2>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`w-3 h-3 rounded-full ${
                        step <= currentStep ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {currentStep === 1 && (
                <ViolationTypeStep
                  value={violationType}
                  onChange={setViolationType}
                  otherDescription={otherDescription}
                  onOtherDescriptionChange={setOtherDescription}
                />
              )}

              {currentStep === 2 && (
                <LocationStep
                  value={location}
                  onChange={setLocation}
                />
              )}

              {currentStep === 3 && (
                <DetailsStep
                  description={description}
                  onDescriptionChange={setDescription}
                  images={images}
                  onImagesChange={setImages}
                  severity={severity}
                  onSeverityChange={setSeverity}
                  detectedAt={detectedAt}
                  onDetectedAtChange={setDetectedAt}
                />
              )}

              {currentStep === 4 && (
                <ContactStep
                  name={name}
                  onNameChange={setName}
                  phone={phone}
                  onPhoneChange={setPhone}
                  email={email}
                  onEmailChange={setEmail}
                  isAnonymous={isAnonymous}
                  onIsAnonymousChange={setIsAnonymous}
                />
              )}
            </div>

            <div className="flex justify-between">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Quay lại
                </button>
              )}
              
              <button
                onClick={() => {
                  if (validateCurrentStep()) {
                    if (currentStep < 4) {
                      setCurrentStep(currentStep + 1);
                    } else {
                      handleSubmit();
                    }
                  }
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ml-auto"
              >
                {currentStep === 4 ? 'Gửi báo cáo' : 'Tiếp tục'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;