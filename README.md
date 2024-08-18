```markdown
# web-to-svg

一个使用 Puppeteer 和 Sharp 的简单 API，用于捕获网页截图。

## 功能

- 捕获各种格式的截图：PNG、JPEG 和 SVG。
- 指定自定义的宽度、高度和图像质量。
- 支持多种 URL 格式以提高灵活性。

## 安装

1. 克隆仓库：

    ```sh
    git clone https://gitee.com/mxywds/web-to-svg.git
    ```

2. 进入项目目录：

    ```sh
    cd web-to-svg
    ```

3. 安装依赖：

    ```sh
    npm install
    ```

4. 启动服务器：

    ```sh
    npm start
    ```

## 使用方法

该 API 支持多种方式指定目标 URL 和图像类型。

### 1. 查询参数

**格式**：`/screenshot?url=<url>&type=<type>`

**示例**：

```sh
curl "http://localhost:3000/screenshot?url=http%3A%2F%2Fwww.baidu.com&type=jpg"
```

<img src="http://localhost:3000/screenshot?url=http%3A%2F%2Fwww.baidu.com&type=jpg">

### 2. 路径参数

**格式**：`/screenshot/<targetUrl>`

**示例**：

```sh
curl "http://localhost:3000/screenshot/http%3A%2F%2Fwww.baidu.com"
```

<img src="http://localhost:3000/screenshot/http%3A%2F%2Fwww.baidu.com">

### 3. 路径参数带类型

**格式**：`/screenshot/<targetUrl>.<type>`

**示例**：

```sh
curl "http://localhost:3000/screenshot/http%3A%2F%2Fwww.baidu.com.jpg"
```

<img src="http://localhost:3000/screenshot/http%3A%2F%2Fwww.baidu.com.jpg">

### 4. 路径中的类型，查询中的 URL

**格式**：`/screenshot.<type>?url=<url>`

**示例**：

```sh
curl "http://localhost:3000/screenshot.jpg?url=http://www.baidu.com"
```

<img src="http://localhost:3000/screenshot.jpg?url=http://www.baidu.com">

## 参数

- `url`：要捕获的网页的 URL（必需）。
- `type`：图像格式（`png`、`jpg`、`jpeg`、`svg`）。默认是 `jpg`。
- `width`：视口的宽度（可选，默认是 `1920`）。
- `height`：视口的高度（可选，默认是 `1080`）。
- `quality`：图像的质量（可选，默认是 `10`）。

## 示例请求

### 捕获 PNG 截图

```sh
curl "http://localhost:3000/screenshot?url=http://www.baidu.com&type=png"
```

<img src="http://localhost:3000/screenshot?url=http://www.baidu.com&type=png">

### 捕获自定义质量的 JPEG 截图

```sh
curl "http://localhost:3000/screenshot?url=http://www.baidu.com&type=jpg&quality=10"
```

<img src="http://localhost:3000/screenshot?url=http://www.baidu.com&type=jpg&quality=10">

### 捕获自定义尺寸的截图

```sh
curl "http://localhost:3000/screenshot?url=http://www.baidu.com&type=jpg&width=1280&height=720"
```

<img src="http://localhost:3000/screenshot?url=http://www.baidu.com&type=jpg&width=1280&height=720">

### 通过路径参数捕获截图

```sh
curl "http://localhost:3000/screenshot/http%3A%2F%2Fwww.baidu.com"
```

<img src="http://localhost:3000/screenshot/http%3A%2F%2Fwww.baidu.com">

### 通过路径参数捕获 JPEG 截图

```sh
curl "http://localhost:3000/screenshot/http%3A%2F%2Fwww.baidu.com.jpg"
```

<img src="http://localhost:3000/screenshot/http%3A%2F%2Fwww.baidu.com.jpg">

### 通过路径中的类型和查询中的 URL 捕获 JPEG 截图

```sh
curl "http://localhost:3000/screenshot.jpg?url=http://www.baidu.com"
```

<img src="http://localhost:3000/screenshot.jpg?url=http://www.baidu.com">

### 对 SVG 截图的支持

```sh
curl "http://localhost:3000/screenshot/http%3A%2F%2Fwww.baidu.com.svg"
```

<img src="http://localhost:3000/screenshot/http%3A%2F%2Fwww.baidu.com.svg">

## 错误处理

- 如果缺少 `url` 参数，API 将返回 `400` 状态码，并显示消息 `URL is required`。
- 如果在捕获截图时发生错误，API 将返回 `500` 状态码，并显示消息 `An error occurred while taking the screenshot`。

## 许可证

本项目基于 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。

```
