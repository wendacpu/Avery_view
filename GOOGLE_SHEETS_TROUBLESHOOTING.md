# 🔍 Google Sheets 数据未保存 - 故障排查指南

## 📋 当前状态

- ✅ 网站正常运行：https://www.averycmo.ai
- ✅ API 端点可访问：/api/waitlist
- ❌ **问题**：表单提交后，Google Sheets 没有收到数据

---

## 🎯 根本原因分析

### 代码问题（已修复）

**之前的代码问题**（api/waitlist.js 第 117-119 行）:

```javascript
} catch (sheetsError) {
    // If Google Sheets fails, still return success (don't block user experience)
    console.error('Google Sheets error (but form submission still succeeds):', sheetsError);
    // Continue to return success response
}
```

**问题**：
- Google Sheets 保存失败时，错误被**静默处理**
- 用户收到成功响应，但数据没有保存
- 无法知道具体是什么错误

**已修复**：
- 移除静默错误处理
- 返回详细错误信息
- 检查环境变量是否配置

---

## ✅ 已完成的修复

### 1. 更新 API 错误处理

**新代码**（已修改，待部署）：

```javascript
} catch (sheetsError) {
    // Return error details for debugging
    console.error('Google Sheets error:', sheetsError.message);

    // Check for common issues
    if (!process.env.GOOGLE_SHEET_ID) {
        return res.status(500).json({
            error: 'Google Sheets configuration error',
            details: 'GOOGLE_SHEET_ID environment variable is not set'
        });
    }
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
        return res.status(500).json({
            error: 'Google Sheets configuration error',
            details: 'GOOGLE_SERVICE_ACCOUNT_EMAIL environment variable is not set'
        });
    }
    if (!process.env.GOOGLE_PRIVATE_KEY) {
        return res.status(500).json({
            error: 'Google Sheets configuration error',
            details: 'GOOGLE_PRIVATE_KEY environment variable is not set'
        });
    }

    // Return the actual error
    return res.status(500).json({
        error: 'Failed to save to Google Sheets',
        details: sheetsError.message,
        hint: 'Please check: 1) Environment variables are set in Vercel, 2) Service account has Sheet access, 3) Sheet ID is correct'
    });
}
```

### 2. Git 提交

```bash
# 已提交但未推送（网络问题）
Commit: 4abbad5
Message: "fix: 移除静默错误处理，返回详细错误信息用于调试"
```

---

## 🚀 需要你执行的操作

### 方案 A：网络恢复后推送代码（推荐）

#### 步骤 1：推送代码到 GitHub

```bash
cd /Users/wanting/program/CC/Avery_view
git push origin main
```

#### 步骤 2：等待 Vercel 自动部署（1-2 分钟）

Vercel 会自动检测 GitHub push 并重新部署

#### 步骤 3：测试 API 并查看详细错误

```bash
# 测试 API 端点
curl -X POST https://www.averycmo.ai/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"company":"测试公司","email":"test@example.com","linkedin":"https://linkedin.com/in/test"}'
```

**预期结果**：
- 如果成功：`{"success":true,"message":"Successfully joined waitlist!"}` + 数据出现在 Sheets
- 如果失败：返回详细错误信息，告诉我们具体问题

---

### 方案 B：现在立即测试（无需推送代码）

由于当前部署的代码有静默错误处理，我们无法看到实际错误。

**但是**，你可以检查以下常见问题：

#### 检查项 1：Vercel 环境变量是否配置

访问：https://vercel.com/wendys-projects-72204568/averyview/settings/environment-variables

确认以下 3 个变量都已配置：

| 变量名 | 应该的值 | 状态 |
|--------|---------|------|
| `GOOGLE_SHEET_ID` | `1Y-ZspBDNzD4sQ89HC_4RcS50a9KcD1GTG2MHGU17FIs` | ⬜ 已配置 / ❌ 未配置 |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `avery-view-sheets@avery-487914.iam.gserviceaccount.com` | ⬜ 已配置 / ❌ 未配置 |
| `GOOGLE_PRIVATE_KEY` | (完整私钥，包含 BEGIN/END 标记) | ⬜ 已配置 / ❌ 未配置 |

**Environment 选择**：Production、Preview、Development（全部勾选）

#### 检查项 2：服务账号是否有 Google Sheets 访问权限

1. 打开 Google Sheets：https://docs.google.com/spreadsheets/d/1Y-ZspBDNzD4sQ89HC_4RcS50a9KcD1GTG2MHGU17FIs
2. 点击右上角 **"Share"** 按钮
3. 检查是否已添加：`avery-view-sheets@avery-487914.iam.gserviceaccount.com`
4. 确认权限是 **"Editor"** (不是 "Viewer")

**如果没有添加**：
1. 输入邮箱：`avery-view-sheets@avery-487914.iam.gserviceaccount.com`
2. 权限选择：**"Editor"**
3. 点击 **"Send"** 或 **"Share"**

#### 检查项 3：环境变量格式是否正确

**GOOGLE_PRIVATE_KEY 必须包含**：
```
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCiA9hKP1PLvqP
...(完整的私钥内容)...
-----END PRIVATE KEY-----
```

**常见错误**：
- ❌ 缺少 `-----BEGIN PRIVATE KEY-----` 或 `-----END PRIVATE KEY-----`
- ❌ 换行符不正确（应该是实际换行，不是 `\n` 字符串）
- ❌ 复制了 JSON 对象而不是纯文本私钥

---

## 🔧 最可能的问题和解决方案

### 问题 1：服务账号未添加到 Google Sheets（最常见 ⭐）

**症状**：API 返回成功，但数据没有出现在 Sheets

**原因**：服务账号 `avery-view-sheets@avery-487914.iam.gserviceaccount.com` 没有被添加到 Sheet 的共享列表中

**解决**：
1. 打开 Google Sheets
2. 点击 "Share"
3. 添加邮箱：`avery-view-sheets@avery-487914.iam.gserviceaccount.com`
4. 权限：**Editor**
5. 点击 "Send"

### 问题 2：环境变量未配置或配置错误

**症状**：API 返回 500 错误，提示环境变量未设置

**解决**：在 Vercel 控制台添加 3 个环境变量（见检查项 1）

### 问题 3：私有钥格式错误

**症状**：认证失败，提示 "Invalid grant" 或 "Unauthorized"

**解决**：重新复制私有钥，确保包含完整的 BEGIN/END 标记和换行符

---

## 📊 测试步骤清单

### 步骤 1：验证环境变量（2 分钟）
- [ ] 访问 Vercel 环境变量页面
- [ ] 确认 3 个变量都已配置
- [ ] 确认选择了所有环境

### 步骤 2：验证 Google Sheets 权限（2 分钟）
- [ ] 打开 Google Sheets
- [ ] 检查共享列表
- [ ] 确认服务账号有 Editor 权限
- [ ] 如果没有，添加服务账号

### 步骤 3：推送代码更新（1 分钟）
- [ ] 运行 `git push origin main`
- [ ] 等待 Vercel 自动部署

### 步骤 4：测试表单提交（1 分钟）
- [ ] 访问 https://www.averycmo.ai
- [ ] 填写表单并提交
- [ ] 检查返回的消息
- [ ] 如果成功，检查 Google Sheets

### 步骤 5：验证数据（1 分钟）
- [ ] 打开 Google Sheets
- [ ] 确认新行已添加
- [ ] 检查数据是否正确

---

## 🧪 本地测试（可选）

如果你想在没有部署的情况下测试 API：

```bash
# 安装依赖
npm install

# 设置环境变量（创建 .env 文件）
cat > .env << EOF
GOOGLE_SHEET_ID=1Y-ZspBDNzD4sQ89HC_4RcS50a9KcD1GTG2MHGU17FIs
GOOGLE_SERVICE_ACCOUNT_EMAIL=avery-view-sheets@avery-487914.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
...你的完整私钥...
-----END PRIVATE KEY-----"
EOF

# 测试 API（使用 node）
node -e "
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/waitlist',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => { console.log('Response:', data); });
});

req.write(JSON.stringify({
  company: '测试公司',
  email: 'test@example.com',
  linkedin: 'https://linkedin.com/in/test'
}));
req.end();
"
```

---

## 📝 修改后的 API 代码文件

**文件**：`/Users/wanting/program/CC/Avery_view/api/waitlist.js`

**修改内容**：
- 移除第 117-119 行的静默错误处理
- 添加环境变量检查
- 返回详细错误信息

**Git 状态**：
- 已提交：是
- 已推送：否（网络问题）
- 待部署：是

---

## 🎯 下一步行动

### 立即行动（网络恢复后）：

1. **推送代码**
   ```bash
   cd /Users/wanting/program/CC/Avery_view
   git push origin main
   ```

2. **等待部署**（1-2 分钟）

3. **测试并查看错误**
   ```bash
   curl -X POST https://www.averycmo.ai/api/waitlist \
     -H "Content-Type": "application/json" \
     -d '{"company":"测试","email":"test@example.com","linkedin":"https://linkedin.com/in/test"}'
   ```

4. **根据错误信息采取行动**
   - 如果是环境变量问题 → 配置环境变量
   - 如果是权限问题 → 添加服务账号到 Sheets
   - 如果是私钥问题 → 重新复制私钥

### 现在可以做的检查（无需等待网络）：

1. ✅ 检查 Vercel 环境变量是否配置
2. ✅ 检查服务账号是否添加到 Google Sheets
3. ✅ 验证环境变量格式是否正确

---

## 📞 如果问题仍然存在

**提供以下信息以便进一步诊断**：

1. API 返回的完整错误信息
2. Vercel 部署日志（如果有）
3. 环境变量配置截图（隐藏敏感信息）
4. Google Sheets 共享设置截图

---

**文件创建时间**：2026-03-05
**当前部署版本**：包含静默错误处理的旧版本
**待部署版本**：包含详细错误信息的新版本（commit 4abbad5）

**重要提示**：推送代码后，旧的静默错误处理会被替换，我们就能看到真实的错误信息了！🔍
