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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* 背景星空效果 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>

      {/* 顶部导航 */}
      <div className="relative z-10 p-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-white/70 hover:text-white transition-colors duration-300"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回主页
        </Link>
      </div>

      {/* 主要内容区域 */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 pb-20">
        <div className="w-full max-w-4xl space-y-8">
          {/* 标题 */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-light text-white/90">
              情绪树洞
            </h1>
            <p className="text-lg text-purple-200/70">
              写下你不能对他人诉说的思绪，选择封存或化为灰烬
            </p>
          </div>

          {/* 写作区域 */}
          <div className="relative">
            <textarea
              value={content}
              onChange={handleContentChange}
              placeholder="在这里倾诉你的内心独白..."
              className="w-full h-96 p-6 bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl text-white/90 placeholder-white/40 resize-none focus:outline-none focus:border-purple-400/50 focus:bg-black/30 transition-all duration-300 text-lg leading-relaxed"
              disabled={isProcessing}
            />
            
            {/* 字数统计 */}
            <div className="absolute bottom-4 right-6 text-sm text-white/50">
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
            <div className="text-center">
              <p className="text-lg text-yellow-300/80 fade-in">
                {showMessage}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}