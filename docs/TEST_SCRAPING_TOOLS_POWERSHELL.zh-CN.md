# Dataify TypeScript SDK 抓取工具测试指南（PowerShell 中文版）

本文档用于测试 Dataify 抓取运行接口。

本测试需要 Dataify API Key。

## 1. 你要准备什么

请先确认你有：

- 一台 Windows 电脑。
- Dataify 的 API Key。
- 已生成好的 SDK 目录：`D:\dataify-TS-SDK`
- Node.js 18 或更高版本。

如果不确定 Node.js 是否安装，按下面步骤检查。

## 2. 打开 PowerShell

方法一：

1. 按键盘 `Win + R`。
2. 输入：

```text
powershell
```

3. 按回车。

方法二：

1. 点击 Windows 开始菜单。
2. 搜索 `PowerShell`。
3. 点击 `Windows PowerShell`。

打开后，你会看到一个黑色或蓝色窗口。

## 3. 进入 SDK 目录

在 PowerShell 里输入：

```powershell
cd D:\dataify-TS-SDK
```

然后按回车。

确认当前目录：

```powershell
pwd
```

你应该看到：

```text
D:\dataify-TS-SDK
```

## 4. 检查 Node.js

输入：

```powershell
node -v
```

如果输出类似：

```text
v20.11.0
```

说明 Node.js 已安装。

再检查 npm：

```powershell
npm -v
```

如果显示版本号，说明 npm 可用。

如果提示 `node 不是内部或外部命令`，需要先安装 Node.js 18 或更高版本。

## 5. 安装 SDK 依赖

在 SDK 目录下执行：

```powershell
npm.cmd install
```

等待安装完成。

如果已经安装过，也可以再次执行，不影响。

## 6. 生成工具代码

执行：

```powershell
npm.cmd run generate
```

成功时你会看到类似：

```json
{
  "scraper": 88,
  "serp": 25,
  "total": 113
}
```

含义：

- `scraper`: 88 个 Scraper 工具。
- `serp`: 25 个 SERP 搜索引擎工具。
- `total`: 总共 113 个抓取工具方法。

## 7. 类型检查

执行：

```powershell
npm.cmd run check
```

如果没有报错，说明 TypeScript 类型检查通过。

## 8. 构建 SDK

执行：

```powershell
npm.cmd run build
```

成功时会生成：

```text
D:\dataify-TS-SDK\dist
```

后续测试会从 `dist/index.js` 导入 SDK。

## 9. 设置 API Key

PowerShell 设置环境变量的命令是：

```powershell
$env:DATAIFY_API_TOKEN="你的 API Key"
```

例如：

```powershell
$env:DATAIFY_API_TOKEN="df_xxxxxxxxxxxxxxxxxxxxx"
```

注意：

- 不要把 API Key 发给别人。
- 不要把 API Key 写进公开代码。
- 当前这个设置只对当前 PowerShell 窗口有效。关闭窗口后需要重新设置。

确认是否设置成功：

```powershell
echo $env:DATAIFY_API_TOKEN
```

如果能看到你的 API Key，说明设置成功。

## 10. Mock 测试：不访问真实接口，不消耗额度

这一步只检查 SDK 发出的 URL、请求头、请求体是否正确。

执行：

```powershell
node -e "import('./dist/index.js').then(async ({ DataifyClient }) => { const calls = []; const fetchImpl = async (url, init) => { calls.push({ url: String(url), init }); return new Response(JSON.stringify({ ok: true }), { status: 200 }); }; const client = new DataifyClient({ apiKey: 'TEST_API_KEY', fetchImpl }); await client.tools.google({ q: 'Dataify', json: '1' }); await client.tools.amazonProductByUrl({ url: 'https://www.amazon.com/dp/B000000000' }); await client.webUnlocker.request({ url: 'https://example.com', type: 'html', js_render: false }); console.log(JSON.stringify(calls.map((c) => ({ url: c.url, auth: c.init.headers.Authorization, body: c.init.body?.toString?.() || '[FormData or JSON]' })), null, 2)); })"
```

你应该看到三条请求：

```text
https://scraperapi.dataify.com/request
https://scraperapi.dataify.com/builder?platform=1
https://webunlocker.dataify.com/request
```

并且请求头应该包含：

```text
Bearer TEST_API_KEY
```

如果这一步通过，说明 SDK 本地封装格式基本正确。

## 11. 真实测试 1：SERP Google 搜索

这一步会访问真实接口，可能消耗额度。

执行：

```powershell
node -e "import('./dist/index.js').then(async ({ DataifyClient }) => { const client = new DataifyClient({ apiKey: process.env.DATAIFY_API_TOKEN }); const res = await client.tools.google({ q: 'Dataify', json: '1' }); console.log(JSON.stringify(res, null, 2)); })"
```

成功时通常会返回 Google 搜索结果 JSON。

如果返回鉴权错误，检查：

- API Key 是否正确。
- 是否执行了 `$env:DATAIFY_API_TOKEN="你的 API Key"`。
- API Key 是否过期或被禁用。

## 12. 真实测试 2：Web Unlocker

执行：

```powershell
node -e "import('./dist/index.js').then(async ({ DataifyClient }) => { const client = new DataifyClient({ apiKey: process.env.DATAIFY_API_TOKEN }); const res = await client.webUnlocker.request({ url: 'https://example.com', type: 'html', js_render: false }); console.log(JSON.stringify(res, null, 2)); })"
```

成功时会返回 Web Unlocker 的结果。

## 13. 真实测试 3：Scraper 工具

Scraper 一般会创建任务，不一定立即返回最终数据。

示例：Amazon 商品详情。

```powershell
node -e "import('./dist/index.js').then(async ({ DataifyClient }) => { const client = new DataifyClient({ apiKey: process.env.DATAIFY_API_TOKEN }); const res = await client.tools.amazonProductByUrl({ url: 'https://www.amazon.com/dp/B000000000' }); console.log(JSON.stringify(res, null, 2)); })"
```

注意：

- 示例 URL 只是占位，建议换成真实 Amazon 商品 URL。
- 如果返回 task id，说明任务创建成功。
- 最终数据需要等任务完成后再下载。

## 14. 下载任务结果

如果你已经拿到了任务 ID，例如：

```text
task_id_123
```

下载 JSON 文件：

```powershell
node -e "import('./dist/index.js').then(async ({ DataifyClient }) => { const client = new DataifyClient({ apiKey: process.env.DATAIFY_API_TOKEN }); const response = await client.scraper.downloadTaskFile('task_id_123', 'json'); console.log('ok:', response.ok); console.log('status:', response.status); console.log(await response.text()); })"
```

下载 CSV 或 XLSX 时，不建议直接打印到终端。可以先只检查状态：

```powershell
node -e "import('./dist/index.js').then(async ({ DataifyClient }) => { const client = new DataifyClient({ apiKey: process.env.DATAIFY_API_TOKEN }); const response = await client.scraper.downloadTaskFile('task_id_123', 'xlsx'); console.log('ok:', response.ok); console.log('status:', response.status); })"
```

### 14.3 查询 Scraper 任务状态

使用 Builder 提交任务后返回的任务 ID。`处理中`、`成功`、`失败` 都是接口成功响应；HTTP 400 表示任务不存在或不属于当前 API Key，HTTP 403 表示缺少任务 ID 或 API Key 无效。

```powershell
node -e "import('./dist/index.js').then(async ({ DataifyClient }) => { const client = new DataifyClient({ apiKey: process.env.DATAIFY_API_TOKEN }); const result = await client.scraper.getTaskStatus('task_id_123'); console.log(JSON.stringify(result, null, 2)); })"
```

## 15. 建议优先测试的工具

建议按这个顺序测试：

1. SERP Google：

```ts
client.tools.google({ q: "Dataify", json: "1" })
```

2. Web Unlocker：

```ts
client.webUnlocker.request({ url: "https://example.com", type: "html", js_render: false })
```

3. Scraper Amazon：

```ts
client.tools.amazonProductByUrl({ url: "真实 Amazon 商品 URL" })
```

4. 其他 SERP：

```ts
client.tools.bing({ q: "Dataify", json: "1" })
client.tools.googleMaps({ q: "coffee near New York", json: "1" })
```

Yandex 暂时不要作为通过标准，因为官网详情接口当前返回空，SDK 只是预留 `client.tools.yandex()`。

## 16. 常见错误排查

### 16.1 `Cannot find module './dist/index.js'`

原因：还没有构建。

解决：

```powershell
npm.cmd run build
```

### 16.2 `Missing apiKey`

原因：没有设置 API Key。

解决：

```powershell
$env:DATAIFY_API_TOKEN="你的 API Key"
```

### 16.3 `401` 或鉴权失败

可能原因：

- API Key 不正确。
- API Key 过期。
- API Key 被禁用。



### 16.4 PowerShell 提示脚本执行策略问题

如果运行 `npm` 有问题，优先使用：

```powershell
npm.cmd install
npm.cmd run build
```

不要直接用 `npm`。

### 16.5 中文乱码

本文档是 UTF-8 编码。PowerShell 如果显示乱码，可以执行：

```powershell
chcp 65001
```

然后重新打开文档或重新运行命令。

## 17. 测试完成标准

满足下面条件即可认为抓取工具 SDK 基本可用：

- `npm.cmd run generate` 输出 `total: 113`。
- `npm.cmd run check` 无报错。
- `npm.cmd run build` 无报错。
- Mock 测试能看到三个正确接口地址。
- `client.tools.google()` 真实请求成功。
- `client.webUnlocker.request()` 真实请求成功。
- 至少一个 Scraper 工具能成功创建任务。
