import tkinter as tk
from tkinter import ttk, scrolledtext, filedialog
import json
import requests
import threading
import os

class TranslationApp:
    def __init__(self, root):
        self.root = root
        self.root.title("公会NPC技能文本翻译工具")
        self.root.geometry("900x600")
        
        # 初始化变量
        self.json_file_path = os.path.join(os.getcwd(), "GuildNPCSkillTextTable.json")
        self.ollama_url = tk.StringVar(value="http://localhost:11434")
        self.selected_model = tk.StringVar()
        self.models = []
        self.data = []
        self.translation_cache = {}  # 翻译缓存
        
        # 创建UI
        self.create_widgets()
        
        # 自动尝试加载默认文件
        if os.path.exists(self.json_file_path):
            self.file_path_var.set(self.json_file_path)
            self.log(f"默认文件路径: {self.json_file_path}")
            self.load_json_data()
        
    def create_widgets(self):
        # 主框架
        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.pack(fill=tk.BOTH, expand=True)
        
        # 文件选择区域
        file_frame = ttk.LabelFrame(main_frame, text="文件选择", padding="10")
        file_frame.pack(fill=tk.X, pady=(0, 10))
        
        self.file_path_var = tk.StringVar()
        file_entry = ttk.Entry(file_frame, textvariable=self.file_path_var, width=60)
        file_entry.grid(row=0, column=0, sticky=tk.W, pady=5)
        
        browse_btn = ttk.Button(file_frame, text="浏览...", command=self.browse_file)
        browse_btn.grid(row=0, column=1, padx=5, pady=5)
        
        load_btn = ttk.Button(file_frame, text="加载文件", command=self.load_json_data)
        load_btn.grid(row=0, column=2, padx=5, pady=5)
        
        # 顶部配置区域
        config_frame = ttk.LabelFrame(main_frame, text="Ollama 配置", padding="10")
        config_frame.pack(fill=tk.X, pady=(0, 10))
        
        # Ollama URL
        ttk.Label(config_frame, text="Ollama 地址:").grid(row=0, column=0, sticky=tk.W, pady=5)
        url_entry = ttk.Entry(config_frame, textvariable=self.ollama_url, width=50)
        url_entry.grid(row=0, column=1, sticky=tk.W, pady=5)
        
        # 模型选择
        ttk.Label(config_frame, text="模型:").grid(row=1, column=0, sticky=tk.W, pady=5)
        self.model_combobox = ttk.Combobox(config_frame, textvariable=self.selected_model, width=47)
        self.model_combobox.grid(row=1, column=1, sticky=tk.W, pady=5)
        
        # 刷新模型按钮
        refresh_btn = ttk.Button(config_frame, text="刷新模型", command=self.refresh_models)
        refresh_btn.grid(row=1, column=2, padx=5, pady=5)
        
        # 中间操作区域
        action_frame = ttk.LabelFrame(main_frame, text="操作", padding="10")
        action_frame.pack(fill=tk.X, pady=(0, 10))
        
        # 翻译按钮
        translate_btn = ttk.Button(action_frame, text="开始翻译", command=self.start_translation)
        translate_btn.pack(side=tk.LEFT, padx=5)
        
        # 保存按钮
        save_btn = ttk.Button(action_frame, text="保存结果", command=self.save_results)
        save_btn.pack(side=tk.LEFT, padx=5)
        
        # 底部日志区域
        log_frame = ttk.LabelFrame(main_frame, text="翻译日志", padding="10")
        log_frame.pack(fill=tk.BOTH, expand=True)
        
        self.log_text = scrolledtext.ScrolledText(log_frame, width=100, height=20)
        self.log_text.pack(fill=tk.BOTH, expand=True)
        
    def browse_file(self):
        file_path = filedialog.askopenfilename(
            title="选择JSON文件",
            filetypes=[("JSON文件", "*.json"), ("所有文件", "*.*")]
        )
        if file_path:
            self.file_path_var.set(file_path)
            self.json_file_path = file_path
            self.log(f"选择文件: {file_path}")
    
    def load_json_data(self):
        if not self.json_file_path:
            self.log("请先选择文件")
            return
        
        try:
            self.log(f"当前工作目录: {os.getcwd()}")
            self.log(f"尝试加载文件: {self.json_file_path}")
            self.log(f"文件是否存在: {os.path.exists(self.json_file_path)}")
            
            if os.path.exists(self.json_file_path):
                self.log(f"文件大小: {os.path.getsize(self.json_file_path)} 字节")
            
            # 以二进制模式读取并手动处理编码
            with open(self.json_file_path, 'rb') as f:
                content = f.read()
                # 检测并处理BOM
                if content.startswith(b'\xff\xfe'):
                    # UTF-16 小端序
                    content_str = content.decode('utf-16-le')
                elif content.startswith(b'\xfe\xff'):
                    # UTF-16 大端序
                    content_str = content.decode('utf-16-be')
                elif content.startswith(b'\xef\xbb\xbf'):
                    # UTF-8 BOM
                    content_str = content[3:].decode('utf-8')
                else:
                    # 尝试UTF-8
                    try:
                        content_str = content.decode('utf-8')
                    except:
                        # 尝试UTF-16小端序
                        content_str = content.decode('utf-16-le')
                
                # 移除字符串开头的BOM字符（如果存在）
                if content_str.startswith('\ufeff'):
                    content_str = content_str[1:]
                    self.log("移除了字符串开头的BOM字符")
                
                # 解析JSON
                self.data = json.loads(content_str)
            
            self.log(f"加载成功: {len(self.data)} 条技能数据")
            # 显示前3条数据
            for i, item in enumerate(self.data[:3]):
                self.log(f"第{i+1}条: {item.get('Name')} - {item.get('Text_Korean')}")
        except Exception as e:
            self.log(f"加载文件失败: {str(e)}")
            import traceback
            self.log(f"错误详情: {traceback.format_exc()}")
            self.data = []
    
    def refresh_models(self):
        try:
            url = f"{self.ollama_url.get()}/api/tags"
            response = requests.get(url, timeout=5)
            if response.status_code == 200:
                data = response.json()
                self.models = [model['name'] for model in data.get('models', [])]
                self.model_combobox['values'] = self.models
                if self.models:
                    self.selected_model.set(self.models[0])
                self.log(f"刷新成功: 发现 {len(self.models)} 个模型")
            else:
                self.log(f"刷新模型失败: {response.status_code}")
        except Exception as e:
            self.log(f"连接 Ollama 失败: {str(e)}")
    

    
    def translate_text(self, text, target_lang):
        # 检查缓存
        cache_key = f"{text}_{target_lang}"
        if cache_key in self.translation_cache:
            return self.translation_cache[cache_key]
        
        try:
            url = f"{self.ollama_url.get()}/api/generate"
            prompt = f"将以下韩文文本翻译为{target_lang}，保持简洁准确，严格保留所有HTML标签（如<br>）和特殊符号：\n{text}"
            data = {
                "model": self.selected_model.get(),
                "prompt": prompt,
                "stream": False,
                "temperature": 0.3,  # 降低温度提高一致性
                "max_tokens": 500,  # 限制输出长度
                "top_p": 0.9  # 提高生成速度
            }
            response = requests.post(url, json=data, timeout=3)  # 进一步缩短超时时间
            if response.status_code == 200:
                result = response.json()
                translation = result.get('response', '').strip()
                # 确保保留HTML标签
                translation = self._ensure_html_tags(translation, text)
                # 缓存结果
                self.translation_cache[cache_key] = translation
                return translation
            else:
                # 翻译失败时，直接返回原文（保留所有符号）
                self.log(f"翻译服务返回错误: {response.status_code}")
                return text
        except Exception as e:
            # 异常时，直接返回原文（保留所有符号）
            self.log(f"翻译服务连接失败，使用原文")
            return text
    
    def _ensure_html_tags(self, translation, original_text):
        """确保翻译结果中保留HTML标签"""
        # 提取原文中的HTML标签
        import re
        tags = re.findall(r'<[^>]+>', original_text)
        
        # 如果原文有标签但翻译结果中没有，将标签添加回去
        for tag in tags:
            if tag not in translation:
                # 简单处理：在翻译结果末尾添加标签
                translation += tag
        
        return translation
    
    def start_translation(self):
        if not self.data:
            self.log("没有数据可翻译")
            return
        
        if not self.selected_model.get():
            self.log("请选择翻译模型")
            return
        
        # 启动翻译线程
        threading.Thread(target=self.translate_all, daemon=True).start()
    
    def translate_all(self):
        self.log("开始翻译...")
        
        total = len(self.data)
        translated_count = 0
        
        # 收集所有需要翻译的文本
        texts_to_translate = []
        for item in self.data:
            korean_text = item.get('Text_Korean', '')
            if korean_text:
                texts_to_translate.append(item)
        
        # 批量翻译
        for i, item in enumerate(texts_to_translate):
            korean_text = item.get('Text_Korean', '')
            if not korean_text:
                continue
            
            self.log(f"\n翻译第 {i+1}/{len(texts_to_translate)} 项:")
            self.log(f"原文: {korean_text}")
            
            # 翻译为中文
            chinese_translation = self.translate_text(korean_text, "中文")
            item['Text_Chinese'] = chinese_translation
            self.log(f"中文: {chinese_translation}")
            
            # 翻译为英文
            english_translation = self.translate_text(korean_text, "英文")
            item['Text_English'] = english_translation
            self.log(f"英文: {english_translation}")
            
            translated_count += 1
        
        self.log(f"\n翻译完成！共翻译 {translated_count} 项")
    
    def save_results(self):
        if not self.data:
            self.log("没有数据可保存")
            return
        
        if not self.json_file_path:
            self.log("请先选择文件")
            return
        
        try:
            self.log(f"开始保存文件: {self.json_file_path}")
            
            # 保存回原文件
            with open(self.json_file_path, 'wb') as f:
                # 写入UTF-16 BOM
                f.write(b'\xff\xfe')
                # 编码为UTF-16小端序
                content_str = json.dumps(self.data, ensure_ascii=False, indent=4, sort_keys=False)
                # 确保所有字符正确编码
                encoded_content = content_str.encode('utf-16-le')
                f.write(encoded_content)
                
            # 验证文件大小
            if os.path.exists(self.json_file_path):
                file_size = os.path.getsize(self.json_file_path)
                self.log(f"保存成功！文件大小: {file_size} 字节")
            else:
                self.log("保存失败：文件不存在")
                
        except Exception as e:
            self.log(f"保存失败: {str(e)}")
            import traceback
            self.log(f"错误详情: {traceback.format_exc()}")
    
    def log(self, message):
        # 同时输出到终端和UI
        print(message)
        self.log_text.insert(tk.END, message + "\n")
        self.log_text.see(tk.END)

if __name__ == "__main__":
    root = tk.Tk()
    app = TranslationApp(root)
    root.mainloop()