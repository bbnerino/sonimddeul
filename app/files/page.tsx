"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Upload, MoreVertical, Trash2 } from "lucide-react";
import FileDeleteModal from "./file-delete-modal";
import DnDArea from "./dnd-area";
import Link from "next/link";

interface FileItem {
  id: number;
  name: string;
  date: string;
}

export default function FilesPage() {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (menuOpenId !== null) {
        const menuElement = document.querySelector(
          `[data-menu-id="${menuOpenId}"]`
        );
        if (menuElement && !menuElement.contains(target)) {
          setMenuOpenId(null);
        }
      }
    };

    if (menuOpenId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpenId]);

  // 더미 데이터
  const [files, setFiles] = useState<FileItem[]>([
    { id: 1, name: "Q3_Marketing_Data.xlsx", date: "Oct 24, 2023" },
    { id: 2, name: "Customer_Segment_A.xlsx", date: "Oct 22, 2023" },
    { id: 3, name: "Sales_Report_2023.xlsx", date: "Oct 20, 2023" },
    { id: 4, name: "Q2_Performance_Report.xlsx", date: "Sep 15, 2023" },
    { id: 5, name: "Customer_Analysis_Data.xlsx", date: "Sep 10, 2023" },
  ]);

  const handleFilesSelected = (files: File[]) => {
    // 여기에 파일 업로드 로직 추가
    console.log("Selected files:", files);
  };

  const handleDeleteClick = (file: FileItem) => {
    setSelectedFile(file);
    setShowDeleteModal(true);
    setMenuOpenId(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedFile) {
      setFiles(files.filter((f) => f.id !== selectedFile.id));
      setShowDeleteModal(false);
      setSelectedFile(null);
    }
  };

  const handleDeleteCancel = () => {
    alert("베타 버전에서는 파일 삭제 기능을 사용할 수 없습니다.");
    return;
    setShowDeleteModal(false);
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 px-[15%] py-4 mx-auto flex justify-between items-center">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            메인으로 돌아가기
          </Link>
        </button>

        <button
          onClick={() => {
            // DnDArea는 본문에 있으므로 헤더 버튼은 클릭 시 스크롤 이동
            const dndArea = document.querySelector("[data-dnd-area]");
            if (dndArea) {
              dndArea.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
          className="flex items-center gap-2 bg-main text-white px-4 py-2 rounded-lg hover:bg-main-hover transition-colors"
        >
          <Upload className="w-4 h-4" />
          파일 업로드
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 드래그 앤 드롭 업로드 영역 */}
        <DnDArea onFilesSelected={handleFilesSelected} />

        {/* 파일 리스트 테이블 */}
        <div className="bg-white rounded-lg border border-gray-200 h-[400px] overflow-y-auto">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    파일 이름
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    날짜
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 ">
                {files.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {file.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{file.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="relative" data-menu-id={file.id}>
                        <button
                          onClick={() =>
                            setMenuOpenId(
                              menuOpenId === file.id ? null : file.id
                            )
                          }
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-400" />
                        </button>
                        {menuOpenId === file.id && (
                          <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                            <button
                              onClick={() => handleDeleteClick(file)}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              삭제
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      <FileDeleteModal
        show={showDeleteModal}
        file={selectedFile}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}
