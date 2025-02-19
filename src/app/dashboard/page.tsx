// src/app/dashboard/page.tsx
"use client";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  const redirectToLogin = useCallback(() => {
    router.push("/login");
  }, [router]);
  
  useEffect(() => {
    if (!user) redirectToLogin();
  }, [user, redirectToLogin]);

  return (
    <div className="grid grid-cols-5 gap-4">
      {/* 사이드바 */}
      <aside className="col-span-1 bg-white shadow-lg rounded-lg p-6 h-screen">
        <h3 className="text-lg font-bold">대시보드</h3>
        <nav className="mt-4 space-y-2">
          <a href="#" className="block p-2 rounded-lg hover:bg-gray-100">
            메뉴 관리
          </a>
          <a href="#" className="block p-2 rounded-lg hover:bg-gray-100">
            AI 콘텐츠 생성
          </a>
        </nav>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="col-span-4 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold">메뉴 관리</h2>
        <p className="text-gray-500">Drag-and-Drop을 활용한 메뉴 관리</p>
        {/* TODO: Drag-and-Drop 메뉴 생성 기능 추가 */}
      </main>
    </div>
  );
}