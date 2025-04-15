import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  Star, 
  Folder, 
  Plus, 
  Trash2, 
  FolderOpen,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Edit,
} from 'lucide-react';
import type { Report, Folder as FolderType } from '../types';

const violationTypeLabels = {
  LITTERING: 'Xả rác bừa bãi',
  WATER_WASTE: 'Lãng phí nước',
  POWER_WASTE: 'Lãng phí điện',
  PLANT_DAMAGE: 'Phá hoại cây xanh và thực vật',
  OTHER: 'Khác'
};

const folderColors = [
  'bg-red-100 text-red-800',
  'bg-blue-100 text-blue-800',
  'bg-green-100 text-green-800',
  'bg-yellow-100 text-yellow-800',
  'bg-purple-100 text-purple-800',
];

export function ReportsView() {
  const [reports, setReports] = useState<Report[]>(() => {
    const savedReports = JSON.parse(localStorage.getItem('reports') || '[]');
    return savedReports.map((report: Report) => ({
      ...report,
      id: report.id || Math.random().toString(36).substr(2, 9),
      createdAt: report.createdAt || new Date().toISOString(),
      isMarked: report.isMarked || false,
    }));
  });

  const [folders, setFolders] = useState<FolderType[]>(() => 
    JSON.parse(localStorage.getItem('folders') || '[]')
  );

  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'severity'>('date');
  const [showMarkedOnly, setShowMarkedOnly] = useState(false);

  const saveReports = (updatedReports: Report[]) => {
    localStorage.setItem('reports', JSON.stringify(updatedReports));
    setReports(updatedReports);
  };

  const saveFolders = (updatedFolders: FolderType[]) => {
    localStorage.setItem('folders', JSON.stringify(updatedFolders));
    setFolders(updatedFolders);
  };

  const handleAddFolder = () => {
    if (!newFolderName.trim()) return;

    const newFolder: FolderType = {
      id: Math.random().toString(36).substr(2, 9),
      name: newFolderName,
      color: folderColors[folders.length % folderColors.length],
    };

    saveFolders([...folders, newFolder]);
    setNewFolderName('');
    setIsAddingFolder(false);
  };

  const handleDeleteFolder = (folderId: string) => {
    if (!confirm('Bạn có chắc muốn xóa thư mục này?')) return;

    // Remove folder assignment from reports in this folder
    const updatedReports = reports.map(report => 
      report.folder === folderId ? { ...report, folder: undefined } : report
    );
    saveReports(updatedReports);

    // Delete folder
    saveFolders(folders.filter(f => f.id !== folderId));
    setSelectedFolder(null);
  };

  const handleDeleteReport = (reportId: string) => {
    if (!confirm('Bạn có chắc muốn xóa báo cáo này?')) return;
    saveReports(reports.filter(r => r.id !== reportId));
  };

  const handleToggleMarked = (reportId: string) => {
    saveReports(
      reports.map(report =>
        report.id === reportId
          ? { ...report, isMarked: !report.isMarked }
          : report
      )
    );
  };

  const handleMoveToFolder = (reportId: string, folderId: string | null) => {
    saveReports(
      reports.map(report =>
        report.id === reportId
          ? { ...report, folder: folderId || undefined }
          : report
      )
    );
  };

  const filteredReports = reports
    .filter(report => {
      if (showMarkedOnly && !report.isMarked) return false;
      if (selectedFolder) return report.folder === selectedFolder;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return b.severity - a.severity;
    });

  return (
    <div className="grid grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="col-span-1 bg-white rounded-lg shadow-md p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Thư mục</h3>
            <button
              onClick={() => setIsAddingFolder(true)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {isAddingFolder && (
            <div className="space-y-2">
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Tên thư mục"
                className="w-full px-2 py-1 text-sm border rounded"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddFolder}
                  className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Thêm
                </button>
                <button
                  onClick={() => setIsAddingFolder(false)}
                  className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}

          <button
            onClick={() => setSelectedFolder(null)}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded ${
              !selectedFolder ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            Tất cả báo cáo
          </button>

          {folders.map(folder => (
            <div key={folder.id} className="relative group">
              <button
                onClick={() => setSelectedFolder(folder.id)}
                className={`w-full flex items-center justify-between px-2 py-1.5 rounded ${
                  selectedFolder === folder.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Folder className="w-4 h-4" />
                  {folder.name}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFolder(folder.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showMarked"
              checked={showMarkedOnly}
              onChange={(e) => setShowMarkedOnly(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="showMarked" className="text-sm">
              Chỉ hiện báo cáo đã đánh dấu
            </label>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm">Sắp xếp theo:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'severity')}
              className="text-sm border rounded px-2 py-1"
            >
              <option value="date">Thời gian</option>
              <option value="severity">Mức độ nghiêm trọng</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="col-span-3 space-y-4">
        <h2 className="text-xl font-semibold mb-4">
          {selectedFolder 
            ? `Báo cáo trong thư mục: ${folders.find(f => f.id === selectedFolder)?.name}`
            : 'Tất cả báo cáo'}
        </h2>

        {filteredReports.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Chưa có báo cáo nào
          </div>
        ) : (
          filteredReports.map((report) => (
            <div key={report.id} className="bg-white p-6 rounded-lg shadow-md relative group">
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => handleToggleMarked(report.id)}
                  className={`p-1 rounded-full ${
                    report.isMarked ? 'text-yellow-500' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Star className="w-5 h-5 fill-current" />
                </button>

                <div className="relative">
                  <button
                    onClick={(e) => {
                      const menu = e.currentTarget.nextElementSibling;
                      menu?.classList.toggle('hidden');
                    }}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  <div className="hidden absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-700 font-medium">
                        Di chuyển vào thư mục
                      </div>
                      {folders.map(folder => (
                        <button
                          key={folder.id}
                          onClick={() => handleMoveToFolder(report.id, folder.id)}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            report.folder === folder.id
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {folder.name}
                        </button>
                      ))}
                      {report.folder && (
                        <button
                          onClick={() => handleMoveToFolder(report.id, null)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Bỏ khỏi thư mục
                        </button>
                      )}
                      <div className="border-t my-1"></div>
                      <button
                        onClick={() => handleDeleteReport(report.id)}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                      >
                        Xóa báo cáo
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div>
                  <span className="font-medium">Loại vi phạm:</span>{' '}
                  {violationTypeLabels[report.violationType]}
                  {report.violationType === 'OTHER' && report.otherDescription && (
                    <span className="block text-sm text-gray-600 mt-1">
                      {report.otherDescription}
                    </span>
                  )}
                </div>

                <div>
                  <span className="font-medium">Địa điểm:</span>{' '}
                  {report.location.address}
                </div>

                <div>
                  <span className="font-medium">Mô tả:</span>{' '}
                  {report.description}
                </div>

                {report.images.length > 0 && (
                  <div>
                    <span className="font-medium">Hình ảnh:</span>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {report.images.map((url, i) => (
                        <img
                          key={i}
                          src={url}
                          alt={`Hình ảnh ${i + 1}`}
                          className="w-full h-24 object-cover rounded"
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <span className="font-medium">Mức độ nghiêm trọng:</span>{' '}
                  {report.severity}/5
                </div>

                <div>
                  <span className="font-medium">Thời gian phát hiện:</span>{' '}
                  {report.detectedAt && format(new Date(report.detectedAt), 'dd/MM/yyyy HH:mm')}
                </div>

                {!report.isAnonymous && report.contact && (
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-medium mb-2">Thông tin liên hệ:</h3>
                    <div className="grid gap-1 text-sm">
                      <div>Họ tên: {report.contact.name}</div>
                      <div>Số điện thoại: {report.contact.phone}</div>
                      <div>Email: {report.contact.email}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}