import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "等不到天黑" },
    { name: "description", content: "一个诗意的情感表达空间" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      {/* 背景星空效果 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>
      
      {/* 主要内容 */}
      <div className="relative z-10 text-center space-y-12 px-6">
        {/* 标题 */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-light text-white/90 tracking-wide">
            等不到天黑
          </h1>
          <p className="text-xl md:text-2xl text-purple-200/80 font-light">
            只要能在夜里翻来覆去的时候有寄托
          </p>
        </div>

        {/* 功能入口 */}
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* 情绪树洞 */}
          <Link 
            to="/echo-chamber"
            className="group relative p-8 bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-black/30 hover:border-white/20 transition-all duration-500 hover:scale-105"
          >
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center group-hover:from-blue-300 group-hover:to-purple-400 transition-colors duration-500">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-light text-white/90">情绪树洞</h3>
              <p className="text-purple-200/70 leading-relaxed">
                写下不能对他人诉说的思绪，选择封存或化为灰烬
              </p>
            </div>
          </Link>

          {/* 夜幕广场 */}
          <Link 
            to="/twilight-plaza"
            className="group relative p-8 bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-black/30 hover:border-white/20 transition-all duration-500 hover:scale-105"
          >
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center group-hover:from-yellow-300 group-hover:to-orange-400 transition-colors duration-500">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14l1.832 1.832" />
                </svg>
              </div>
              <h3 className="text-2xl font-light text-white/90">夜幕广场</h3>
              <p className="text-purple-200/70 leading-relaxed">
                在特定时刻与他人匿名分享，感受无声的陪伴
              </p>
            </div>
          </Link>
        </div>

        {/* 底部提示 */}
        <div className="text-sm text-purple-300/60 max-w-md mx-auto">
          <p>等不到天黑，烟火不会太完美</p>
          <p>回忆烧成灰，还是等不到结尾</p>
        </div>
      </div>
    </div>
  );
}
