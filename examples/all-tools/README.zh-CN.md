# 全量工具测试

这个目录用于测试 `dataify-sdk` 的全部工具方法。

## 不消耗额度的全量 dry-run

只检查 113 个工具是否都能生成请求，不请求真实 Dataify 接口。

```bat
cd /d D:\codex_workspace\dataify-TS-SDK
node examples\all-tools\run-all-tools.mjs
```

结果会写入：

```text
examples\results\<时间戳>\summary.json
examples\results\<时间戳>\summary.csv
examples\results\<时间戳>\dry-run-calls.json
```

## 真实全量测试

会真实请求 113 个工具，会消耗额度。

```bat
cd /d D:\codex_workspace\dataify-TS-SDK
set "DATAIFY_API_TOKEN=你的真实APIKey"
node examples\all-tools\run-all-tools.mjs --live
```

默认每个工具之间等待 1000ms，避免请求过快。

## 常用参数

只测 SERP：

```bat
node examples\all-tools\run-all-tools.mjs --live --kind=serp
```

只测 Scraper：

```bat
node examples\all-tools\run-all-tools.mjs --live --kind=scraper
```

只测前 5 个：

```bat
node examples\all-tools\run-all-tools.mjs --live --limit=5
```

只测指定工具：

```bat
node examples\all-tools\run-all-tools.mjs --live --only=google,amazonProductByUrl,webUnlocker
```

指定每个工具之间的等待时间：

```bat
node examples\all-tools\run-all-tools.mjs --live --delay-ms=2000
```

失败就停止：

```bat
node examples\all-tools\run-all-tools.mjs --live --stop-on-error
```

## 说明

- 默认参数来自 MCP/官网工具说明和通用安全测试值。
- URL 类工具使用公开示例 URL。
- 每个工具的响应会单独保存为 JSON 文件。
- `summary.csv` 适合用 Excel 打开看成功/失败。