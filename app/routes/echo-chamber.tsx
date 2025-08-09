import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/echo-chamber";
import { DataManager } from "../utils/data-manager";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "情绪树洞 - 等不到天黑" },
    { name: "description", content: "写下不能对他人诉说的思绪" },
  ];
}

export default function EchoChamber() {
  const [content, setContent] = useState("");
  const [showActions, setShowActions] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMessage, setShowMessage] = useState("");

  /**
   * 处理文本变化
   */
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setShowActions(newContent.trim().length > 0);
  };

  /**
   * 封存记忆功能
   */
  const handleArchive = async () => {
    if (!content.trim()) return;
    
    setIsProcessing(true);
    
    // 模拟处理延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // 使用数据管理工具保存
      DataManager.addEchoArchive(content);
      
      setContent("");
      setShowActions(false);
      setIsProcessing(false);
      setShowMessage("记忆已封存，它将在时间中沉淀...");
      
      setTimeout(() => setShowMessage(""), 3000);
    } catch (error) {
      setIsProcessing(false);
      setShowMessage("封存失败，请稍后再试...");
      setTimeout(() => setShowMessage(""), 3000);
    }
  };

  /**
   * 化为灰烬功能
   */
  const handleBurn = async () => {
    if (!content.trim()) return;
    
    setIsProcessing(true);
    
    // 模拟燃烧过程
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setContent("");
    setShowActions(false);
    setIsProcessing(false);
    setShowMessage("记忆化为灰烬，烟消云散...");
    
    setTimeout(() => setShowMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 page-transition">
      {/* 背景星空效果 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="particles"></div>
      </div>

      {/* 顶部导航 */}
      <div className="relative z-10 p-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-white/70 hover:text-white transition-all duration-300 group glow-effect"
        >
          <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-colors duration-300 mr-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          <span className="font-light tracking-wide">返回主页</span>
        </Link>
      </div>

      {/* 主要内容区域 */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 pb-20 pt-8">
        <div className="w-full max-w-4xl space-y-12">
          {/* 标题 */}
          <div className="text-center space-y-6 fade-in">
            <h1 className="text-5xl md:text-6xl font-light text-white/95 text-glow">
              情绪树洞
            </h1>
            <p className="text-xl text-purple-200/80 font-light leading-relaxed max-w-2xl mx-auto">
              写下你不能对他人诉说的思绪<br/>
              <span className="text-purple-300/70">选择封存或化为灰烬</span>
            </p>
            <div className="flex justify-center space-x-6 mt-8">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full twinkle"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full twinkle" style={{animationDelay: '0.5s'}}></div>
              <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-red-500 rounded-full twinkle" style={{animationDelay: '1s'}}></div>
            </div>
          </div>

          {/* 写作区域 */}
          <div className="relative fade-in" style={{animationDelay: '0.3s'}}>
            <div className="glass-morphism rounded-3xl p-1">
              <textarea
                value={content}
                onChange={handleContentChange}
                placeholder="在这里倾诉你的内心独白..."
                className="w-full h-96 p-8 bg-transparent border-none text-white/95 placeholder-white/50 resize-none focus:outline-none text-lg leading-relaxed font-light"
                disabled={isProcessing}
                style={{fontFamily: 'inherit'}}
              />
            </div>
            
            {/* 字数统计 */}
            <div className="absolute bottom-6 right-8 text-sm text-white/60 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
              {content.length} 字
            </div>
          </div>

          {/* 操作按钮 */}
          {showActions && (
            <div className="flex justify-center space-x-8 fade-in">
              <button
                onClick={handleArchive}
                disabled={isProcessing}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-500 hover:to-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed button-float"
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V8z" />
                  </svg>
                  <span>{isProcessing ? "封存中..." : "封存记忆"}</span>
                </div>
              </button>

              <button
                onClick={handleBurn}
                disabled={isProcessing}
                className="group relative px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full hover:from-orange-500 hover:to-red-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed button-float"
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                  <span>{isProcessing ? "燃烧中..." : "化为灰烬"}</span>
                </div>
              </button>
            </div>
          )}

          {/* 消息提示 */}
          {showMessage && (
            <div className="text-center space-y-4">
              <div className="inline-flex items-center space-x-3 px-6 py-3 glass-morphism rounded-full glow-effect">
                <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                <p className="text-lg text-yellow-300/90 font-light tracking-wide fade-in">
                  {showMessage}
                </p>
              </div>
            </div>
          )}

          {/* 底部装饰 */}
          <div className="flex justify-center space-x-6 opacity-40 mt-16">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-purple-400 to-transparent twinkle"></div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-blue-400 to-transparent twinkle" style={{animationDelay: '1s'}}></div>
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-indigo-400 to-transparent twinkle" style={{animationDelay: '2s'}}></div>
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-purple-300 to-transparent twinkle" style={{animationDelay: '0.5s'}}></div>
            <div className="w-px h-14 bg-gradient-to-b from-transparent via-pink-400 to-transparent twinkle" style={{animationDelay: '1.5s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}