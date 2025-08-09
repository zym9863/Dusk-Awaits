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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 page-transition">
      {/* 背景星空效果 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="particles"></div>
      </div>
      
      {/* 主要内容 */}
      <div className="relative z-10 text-center space-y-16 px-6 pt-20">
        {/* 标题 */}
        <div className="space-y-6 fade-in">
          <h1 className="text-6xl md:text-8xl font-light text-white/95 tracking-wide text-glow mb-4">
            等不到天黑
          </h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-xl md:text-3xl text-purple-200/90 font-light leading-relaxed tracking-wide">
              只要能在夜里翻来覆去的时候有寄托
            </p>
          </div>
          <div className="flex justify-center space-x-4 text-sm text-purple-300/60 mt-8">
            <span className="twinkle">✦</span>
            <span className="twinkle" style={{animationDelay: '1s'}}>✧</span>
            <span className="twinkle" style={{animationDelay: '2s'}}>✦</span>
          </div>
        </div>

        {/* 功能入口 */}
        <div className="grid md:grid-cols-2 gap-10 max-w-3xl mx-auto">
          {/* 情绪树洞 */}
          <Link 
            to="/echo-chamber"
            className="group relative p-10 glass-morphism rounded-3xl hover:scale-105 transition-all duration-700 ease-out glow-effect button-float"
          >
            <div className="space-y-6">
              <div className="relative">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 rounded-full flex items-center justify-center group-hover:from-blue-300 group-hover:via-purple-400 group-hover:to-indigo-500 transition-all duration-700 shadow-lg shadow-blue-500/30">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              </div>
              <h3 className="text-2xl md:text-3xl font-light text-white/95 text-glow">情绪树洞</h3>
              <p className="text-purple-200/80 leading-relaxed text-base md:text-lg font-light">
                写下不能对他人诉说的思绪<br/>
                <span className="text-purple-300/60">选择封存或化为灰烬</span>
              </p>
            </div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </Link>

          {/* 夜幕广场 */}
          <Link 
            to="/twilight-plaza"
            className="group relative p-10 glass-morphism rounded-3xl hover:scale-105 transition-all duration-700 ease-out glow-effect button-float"
          >
            <div className="space-y-6">
              <div className="relative">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center group-hover:from-yellow-300 group-hover:via-orange-400 group-hover:to-red-400 transition-all duration-700 shadow-lg shadow-orange-500/30">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14l1.832 1.832" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              </div>
              <h3 className="text-2xl md:text-3xl font-light text-white/95 text-glow">夜幕广场</h3>
              <p className="text-purple-200/80 leading-relaxed text-base md:text-lg font-light">
                在特定时刻与他人匿名分享<br/>
                <span className="text-purple-300/60">感受无声的陪伴</span>
              </p>
            </div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </Link>
        </div>

        {/* 底部提示 */}
        <div className="text-center space-y-4 max-w-lg mx-auto fade-in" style={{animationDelay: '0.5s'}}>
          <div className="space-y-2">
            <p className="text-purple-300/80 italic text-lg font-light tracking-wide">等不到天黑，烟火不会太完美</p>
            <p className="text-purple-400/70 italic text-base font-light tracking-wide">回忆烧成灰，还是等不到结尾</p>
          </div>
          <div className="flex justify-center space-x-8 mt-8 opacity-60">
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-purple-400 to-transparent"></div>
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-purple-300 to-transparent"></div>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-purple-300 to-transparent"></div>
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-purple-400 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
