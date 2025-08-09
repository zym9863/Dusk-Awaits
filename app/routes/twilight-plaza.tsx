import { useState, useEffect } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/twilight-plaza";
import { DataManager, TimeUtils, MockMessageGenerator, type TwilightMessage } from "../utils/data-manager";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "夜幕广场 - 等不到天黑" },
    { name: "description", content: "在特定时刻与他人匿名分享" },
  ];
}

export default function TwilightPlaza() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<TwilightMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * 加载消息
   */
  const loadMessages = () => {
    if (!isOpen) return;
    
    // 从数据管理器加载用户消息
    const userMessages = DataManager.getTwilightMessages();
    
    // 生成一些模拟消息
    const mockMessages = MockMessageGenerator.generateMessages(8);
    
    // 合并并随机排序
    const allMessages = [...userMessages, ...mockMessages].sort(() => Math.random() - 0.5);
    
    setMessages(allMessages.slice(0, 15)); // 最多显示15条消息
  };

  /**
   * 发布消息
   */
  const handleSubmitMessage = async () => {
    if (!newMessage.trim() || newMessage.length > 50 || !isOpen) return;
    
    setIsSubmitting(true);
    
    // 模拟发布延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // 使用数据管理工具保存消息
      const message = DataManager.addTwilightMessage(newMessage);
      
      // 更新显示
      setMessages(prev => [message, ...prev].slice(0, 15));
      setNewMessage("");
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.error("发布消息失败:", error);
    }
  };

  /**
   * 共鸣功能
   */
  const handleResonance = (messageId: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId && !msg.hasResonated) {
        // 如果是用户消息，更新数据库
        if (!messageId.startsWith('mock_')) {
          DataManager.updateMessageResonance(messageId);
        }
        
        return {
          ...msg,
          resonanceCount: msg.resonanceCount + 1,
          hasResonated: true
        };
      }
      return msg;
    }));
  };

  // 定时器更新时间和状态
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setIsOpen(TimeUtils.isPlazaOpen());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 加载消息
  useEffect(() => {
    loadMessages();
    
    // 如果广场开放，定期刷新消息
    const messageTimer = isOpen 
      ? setInterval(loadMessages, 30000) // 每30秒刷新
      : null;
    
    return () => {
      if (messageTimer) clearInterval(messageTimer);
    };
  }, [isOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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

      {/* 主要内容 */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
        {/* 标题和状态 */}
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-white/90">
            夜幕广场
          </h1>
          <div className="space-y-2">
            <p className="text-lg text-purple-200/70">
              {currentTime.toLocaleString('zh-CN')}
            </p>
            {isOpen ? (
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full status-indicator online"></div>
                <span className="text-green-300">广场已开放</span>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500/20 border border-red-400/30 rounded-full">
                  <div className="w-2 h-2 bg-red-400 rounded-full status-indicator offline"></div>
                  <span className="text-red-300">广场未开放</span>
                </div>
                <p className="text-sm text-white/50">
                  开放时间：每日 19:00 - 24:00
                </p>
                <p className="text-sm text-yellow-300/70">
                  下次开放：{TimeUtils.getNextOpenTime()}
                </p>
              </div>
            )}
          </div>
        </div>

        {isOpen ? (
          <div className="space-y-8">
            {/* 发布消息区域 */}
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="space-y-4">
                <div className="relative input-focus">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="分享你此刻的心情...（最多50字）"
                    className="w-full h-24 p-4 bg-black/30 border border-white/10 rounded-xl text-white/90 placeholder-white/40 resize-none focus:outline-none focus:border-purple-400/50 transition-colors duration-300"
                    maxLength={50}
                    disabled={isSubmitting}
                  />
                  <div className="absolute bottom-2 right-3 text-xs text-white/50">
                    {newMessage.length}/50
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-white/60">
                    你的消息将匿名显示给所有在线用户
                  </p>
                  <button
                    onClick={handleSubmitMessage}
                    disabled={!newMessage.trim() || newMessage.length > 50 || isSubmitting}
                    className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full hover:from-yellow-400 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ripple button-float"
                  >
                    {isSubmitting ? "发布中..." : "点亮烟火"}
                  </button>
                </div>
              </div>
            </div>

            {/* 消息列表 */}
            <div className="space-y-4">
              <h3 className="text-xl text-white/80 text-center">夜幕中的烟火</h3>
              <div className="grid gap-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className="firework message-card backdrop-blur-sm border border-white/10 rounded-xl p-4"
                  >
                    <div className="flex justify-between items-start space-x-4">
                      <p className="text-white/80 flex-1 leading-relaxed">
                        {message.content}
                      </p>
                      <button
                        onClick={() => handleResonance(message.id)}
                        disabled={message.hasResonated}
                        className={`group flex items-center space-x-1 px-3 py-1 rounded-full transition-all duration-300 ${
                          message.hasResonated 
                            ? "bg-yellow-500/30 text-yellow-300 cursor-not-allowed status-indicator online" 
                            : "bg-white/10 hover:bg-yellow-500/20 text-white/60 hover:text-yellow-300 resonance-pulse heartbeat"
                        }`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span className="text-sm">{message.resonanceCount}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-white/50">夜幕中还没有烟火，来点亮第一簇吧...</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="space-y-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-purple-300/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="space-y-2">
                <p className="text-xl text-white/70">夜幕尚未降临</p>
                <p className="text-white/50">
                  等不到天黑，烟火不会太完美<br/>
                  请在 19:00 - 24:00 时段回来
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}