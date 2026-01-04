"use client";

import { useState, useRef } from "react";
import { Upload } from "lucide-react";

interface DnDAreaProps {
  onFilesSelected: (files: File[]) => void;
}

export default function DnDArea({ onFilesSelected }: DnDAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    onFilesSelected(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    onFilesSelected(selectedFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div
        className={`border-2 border-dashed rounded-lg p-12 mb-8 transition-colors cursor-pointer ${
          isDragging
            ? "border-main bg-blue-50"
            : "border-gray-300 bg-white hover:border-gray-400"
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Upload className="w-8 h-8 text-main" />
          </div>
          <p className="text-lg font-medium text-gray-700 mb-2">
            Click to upload or drag and drop
          </p>
          <p className="text-sm text-gray-500">
            Excel 파일만 업로드 가능합니다 (XLSX, XLS)
          </p>
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md">
            <p className="text-xs text-red-600 font-semibold mb-2">
              * 데이터는 Excel 파일 형식만 지원됩니다
            </p>
            <p className="text-xs text-gray-700 font-medium mb-1">
              필수 포함 항목:
            </p>
            <p className="text-xs text-gray-600">
              no, title, content, CPC, ROAS, CPM, CTR, send_date
            </p>
          </div>
        </div>
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileInput}
      />
    </>
  );
}
