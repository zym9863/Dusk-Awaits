/**
 * 数据类型定义
 */
export interface EchoEntry {
  id: string;
  content: string;
  createdAt: string;
  isArchived: boolean;
}

export interface TwilightMessage {
  id: string;
  content: string;
  resonanceCount: number;
  createdAt: string;
  hasResonated?: boolean;
}

/**
 * LocalStorage 数据管理工具
 */
export class DataManager {
  private static readonly ECHO_ARCHIVES_KEY = "echo-archives";
  private static readonly TWILIGHT_MESSAGES_KEY = "twilight-messages";
  private static readonly USER_PREFERENCES_KEY = "user-preferences";

  /**
   * 获取情绪树洞封存的记忆
   */
  static getEchoArchives(): EchoEntry[] {
    try {
      const data = localStorage.getItem(this.ECHO_ARCHIVES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("获取封存记忆失败:", error);
      return [];
    }
  }

  /**
   * 添加封存记忆
   */
  static addEchoArchive(content: string): EchoEntry {
    const entry: EchoEntry = {
      id: Date.now().toString(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
      isArchived: true
    };

    try {
      const archives = this.getEchoArchives();
      archives.push(entry);
      localStorage.setItem(this.ECHO_ARCHIVES_KEY, JSON.stringify(archives));
      return entry;
    } catch (error) {
      console.error("封存记忆失败:", error);
      throw error;
    }
  }

  /**
   * 删除封存记忆
   */
  static removeEchoArchive(id: string): boolean {
    try {
      const archives = this.getEchoArchives();
      const filteredArchives = archives.filter(entry => entry.id !== id);
      localStorage.setItem(this.ECHO_ARCHIVES_KEY, JSON.stringify(filteredArchives));
      return true;
    } catch (error) {
      console.error("删除封存记忆失败:", error);
      return false;
    }
  }

  /**
   * 获取夜幕广场消息
   */
  static getTwilightMessages(): TwilightMessage[] {
    try {
      const data = localStorage.getItem(this.TWILIGHT_MESSAGES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("获取夜幕消息失败:", error);
      return [];
    }
  }

  /**
   * 添加夜幕广场消息
   */
  static addTwilightMessage(content: string): TwilightMessage {
    const message: TwilightMessage = {
      id: Date.now().toString(),
      content: content.trim(),
      resonanceCount: 0,
      createdAt: new Date().toISOString(),
      hasResonated: false
    };

    try {
      const messages = this.getTwilightMessages();
      messages.push(message);
      // 只保留最近的50条消息
      const recentMessages = messages.slice(-50);
      localStorage.setItem(this.TWILIGHT_MESSAGES_KEY, JSON.stringify(recentMessages));
      return message;
    } catch (error) {
      console.error("添加夜幕消息失败:", error);
      throw error;
    }
  }

  /**
   * 更新消息共鸣数
   */
  static updateMessageResonance(messageId: string): boolean {
    try {
      const messages = this.getTwilightMessages();
      const updatedMessages = messages.map(msg => {
        if (msg.id === messageId && !msg.hasResonated) {
          return {
            ...msg,
            resonanceCount: msg.resonanceCount + 1,
            hasResonated: true
          };
        }
        return msg;
      });
      
      localStorage.setItem(this.TWILIGHT_MESSAGES_KEY, JSON.stringify(updatedMessages));
      return true;
    } catch (error) {
      console.error("更新消息共鸣失败:", error);
      return false;
    }
  }

  /**
   * 清理过期消息（保留最近7天的消息）
   */
  static cleanupOldMessages(): void {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const messages = this.getTwilightMessages();
      const recentMessages = messages.filter(msg => 
        new Date(msg.createdAt) > sevenDaysAgo
      );
      
      localStorage.setItem(this.TWILIGHT_MESSAGES_KEY, JSON.stringify(recentMessages));
    } catch (error) {
      console.error("清理过期消息失败:", error);
    }
  }

  /**
   * 获取统计数据
   */
  static getStatistics() {
    try {
      const archives = this.getEchoArchives();
      const messages = this.getTwilightMessages();
      
      return {
        totalArchives: archives.length,
        totalMessages: messages.length,
        totalResonances: messages.reduce((sum, msg) => sum + msg.resonanceCount, 0),
        lastActivity: Math.max(
          ...archives.map(entry => new Date(entry.createdAt).getTime()),
          ...messages.map(msg => new Date(msg.createdAt).getTime())
        )
      };
    } catch (error) {
      console.error("获取统计数据失败:", error);
      return {
        totalArchives: 0,
        totalMessages: 0,
        totalResonances: 0,
        lastActivity: 0
      };
    }
  }

  /**
   * 导出数据（用于备份）
   */
  static exportData() {
    try {
      return {
        echoArchives: this.getEchoArchives(),
        twilightMessages: this.getTwilightMessages(),
        exportTime: new Date().toISOString(),
        version: "1.0"
      };
    } catch (error) {
      console.error("导出数据失败:", error);
      return null;
    }
  }

  /**
   * 清空所有数据
   */
  static clearAllData(): boolean {
    try {
      localStorage.removeItem(this.ECHO_ARCHIVES_KEY);
      localStorage.removeItem(this.TWILIGHT_MESSAGES_KEY);
      localStorage.removeItem(this.USER_PREFERENCES_KEY);
      return true;
    } catch (error) {
      console.error("清空数据失败:", error);
      return false;
    }
  }
}

/**
 * 时间工具函数
 */
export class TimeUtils {
  /**
   * 检查夜幕广场是否开放
   */
  static isPlazaOpen(): boolean {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 19 || hour < 1; // 19:00-24:59
  }

  /**
   * 获取下次开放时间
   */
  static getNextOpenTime(): string {
    const now = new Date();
    const today = new Date(now);
    today.setHours(19, 0, 0, 0);
    
    if (now.getTime() > today.getTime()) {
      today.setDate(today.getDate() + 1);
    }
    
    return today.toLocaleString('zh-CN', {
      month: 'long',
      day: 'numeric', 
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * 格式化相对时间
   */
  static formatRelativeTime(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMinutes < 1) {
      return "刚刚";
    } else if (diffMinutes < 60) {
      return `${diffMinutes}分钟前`;
    } else if (diffHours < 24) {
      return `${diffHours}小时前`;
    } else if (diffDays < 7) {
      return `${diffDays}天前`;
    } else {
      return date.toLocaleDateString('zh-CN');
    }
  }
}

/**
 * 生成模拟夜幕广场消息的工具
 */
export class MockMessageGenerator {
  private static readonly mockContents = [
    "今夜的星光格外温柔",
    "想念一个人的夜晚总是很长",
    "如果能重来，我还是会选择遇见你",
    "月亮今晚很美，但不及你",
    "有些话只能对夜晚说",
    "孤独是成年人的必修课",
    "希望明天会更好一些",
    "在这个时刻，我们都是夜的孩子",
    "愿所有的失眠都有意义",
    "夜深了，思念却清醒着",
    "窗外的风声像是在诉说什么",
    "今晚的城市格外安静",
    "想起了很久以前的那个夏天",
    "如果时间可以倒流该多好",
    "有些人一旦错过就是一辈子",
    "夜晚总是让人变得感性",
    "听着雨声入眠是种幸福",
    "远方的人是否也在望着同一片星空"
  ];

  /**
   * 生成单条模拟消息
   */
  static generateMessage(): TwilightMessage {
    return {
      id: `mock_${Math.random().toString(36).substr(2, 9)}`,
      content: this.mockContents[Math.floor(Math.random() * this.mockContents.length)],
      resonanceCount: Math.floor(Math.random() * 25),
      createdAt: new Date(Date.now() - Math.random() * 3600000).toISOString(), // 最近1小时内
      hasResonated: false
    };
  }

  /**
   * 生成多条模拟消息
   */
  static generateMessages(count: number): TwilightMessage[] {
    return Array.from({ length: count }, () => this.generateMessage());
  }
}