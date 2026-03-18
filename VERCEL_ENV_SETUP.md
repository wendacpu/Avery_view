# 🔐 Vercel 环境变量配置指南

## 📋 需要配置的环境变量

你的 Avery View 项目需要在 Vercel 中配置以下 3 个环境变量：

---

## 🚀 配置步骤

### 1. 打开 Vercel 项目设置

访问：https://vercel.com/wendys-projects-72204568/avery_show/settings/environment-variables

### 2. 添加环境变量

点击 **"Add New"** 按钮，依次添加以下 3 个变量：

#### 变量 1: GOOGLE_SHEET_ID

```
Name: GOOGLE_SHEET_ID
Value: 1Y-ZspBDNzD4sQ89HC_4RcS50a9KcD1GTG2MHGU17FIs
Environment: Production, Preview, Development (全选)
```

#### 变量 2: GOOGLE_SERVICE_ACCOUNT_EMAIL

```
Name: GOOGLE_SERVICE_ACCOUNT_EMAIL
Value: avery-view-sheets@avery-487914.iam.gserviceaccount.com
Environment: Production, Preview, Development (全选)
```

#### 变量 3: GOOGLE_PRIVATE_KEY

```
Name: GOOGLE_PRIVATE_KEY
Value: -----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCiA9hKP1PLvqP
5MxJFk8YPOHFfO4KcqW5bqS4yeB+p2QJRqFtyPLFx+EBWvM2fVhYTjW9LyIxRYU1
...(完整私钥)...
-----END PRIVATE KEY-----
Environment: Production, Preview, Development (全选)
```

**⚠️ 重要提示**：
- 私钥必须包含 `-----BEGIN PRIVATE KEY-----` 和 `-----END PRIVATE KEY-----`
- 私钥中的 `\n` 必须保持为实际换行符（不要转义）
- 确保复制完整的私钥，不要遗漏任何部分

### 3. 保存并重新部署

添加完所有环境变量后：
1. 点击 **"Save"** 保存
2. Vercel 会自动重新部署
3. 等待 1-2 分钟部署完成

---

## ✅ 验证配置

### 检查部署状态

访问：https://vercel.com/wendys-projects-72204568/avery_show

确保：
- ✅ 最新部署显示 **"Ready"** 状态
- ✅ 没有错误信息

### 测试表单提交

1. 访问你的网站：https://avery-view.vercel.app
2. 滚动到 **"加入心愿单"** 部分
3. 填写测试表单：
   - Company: `测试公司`
   - Email: `test@example.com`
   - LinkedIn: `https://linkedin.com/in/test`
4. 点击 **"立即加入"** 提交

### 验证数据写入

1. 打开 Google Sheets：https://docs.google.com/spreadsheets/d/1Y-ZspBDNzD4sQ89HC_4RcS50a9KcD1GTG2MHGU17FIs
2. 查看是否创建了 **"Waitlist"** 工作表
3. 确认新行已添加，包含：
   - Timestamp (时间戳)
   - Company: 测试公司
   - Email: test@example.com
   - LinkedIn URL: https://linkedin.com/in/test

---

## 🔧 故障排除

### 问题 1: 表单提交失败，显示 500 错误

**可能原因**：
- 环境变量未正确配置
- 私钥格式错误
- Google Sheets 权限问题

**解决方法**：
1. 检查 Vercel 部署日志
2. 确认所有 3 个环境变量都已配置
3. 重新复制私钥，确保包含完整的 BEGIN/END 标记
4. 确认服务账号已获得 Google Sheets 编辑权限

### 问题 2: 表单提交成功，但数据未出现在 Sheets

**可能原因**：
- 服务账号未获得 Sheet 访问权限
- Sheet ID 错误

**解决方法**：
1. 确认服务账号邮箱已添加到 Sheet 共享列表
2. 确认分享权限为 **"编辑者"**
3. 验证 Sheet ID 是否正确

### 问题 3: 私钥中的换行符问题

**症状**：认证失败

**解决方法**：
- 私钥中的 `\n` 应该是实际换行符
- 在 Vercel 环境变量中直接粘贴时，换行符会自动保留
- 不要手动输入 `\n`，直接粘贴完整的私钥文本

---

## 📊 完整的私钥（用于复制）

```
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCiA9hKP1PLvqP
5MxJFk8YPOHFfO4KcqW5bqS4yeB+p2QJRqFtyPLFx+EBWvM2fVhYTjW9LyIxRYU1
lQeqIqjK9Qh6rF6eL3Kv+5Z8V+6hKxJv+5F+8K+6LxJv+5F+8K+6LxJv+5F+8K+6L
xJv+5F+8K+6LxJv+5F+8K+6LxJv+5F+8K+6LxJv+5F+8K+6LxJv+5F+8K+6LxJv+5
F+8K+6LxJv+5F+8K+6LxJv+5F+8K+6LxJv+5F+8K+6LxJv+5F+8K+6LxJv+5F+8K+6
LxJv+5F+8K+6LxJv+5F+8K+6LxJv+5F+8K+6LxJv+5F+8K+6LxJv+5F+8K+6LxJv+
5F+8K+6LxJv+5F+8K+6LxJv+5F+8K+6LxJv+5F+8K+6LxJv+5F+8K+6LxJv+5F+8K
+6LxJv+5F+8K+6LxJv+5F+8K+6LxJv+5F+8K+6LxJv+5F+8K+6LxJv+5F+8K+6LxJv
+5F+8K+6LxJv+5F+8K+6LxJv+5F+8K+6LxJv+5F+8K+6LxJv+5F+8K+6LxJv+5F+8
K+6LxJv+5F+8K+6LxJv+5F+8K+6LxJv+5F+8K+6LxJv+5F+8K+6LxJv+5F+8K+6Lx
Jv+5F+8K+6LwIDAQABAoIBAFQVxG1zNFVkLQZ4Y8QKQZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ
7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z
6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q
8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8Q
Z7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7
Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6
Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8
QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8QZ7Z6Q8Q
-----END PRIVATE KEY-----
```

（注：上面是示例格式，使用你提供的完整私钥）

---

## 🎯 下一步

配置完环境变量后：

1. ✅ Vercel 自动重新部署（1-2 分钟）
2. ✅ 测试表单提交
3. ✅ 验证数据写入 Google Sheets
4. ✅ 配置 averycmo.ai 域名（如未配置）

域名配置参考：`QUICK_REFERENCE.md` 或 `VERCEL_FIX_GUIDE.md`

---

**配置完成后，你的表单提交系统就完全可用了！** 🎉
