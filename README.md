# [Keyviz](https://keyviz.org) 汉化版

<div>
   <img src="https://img.shields.io/github/v/release/zetaloop/keyviz?style=flat-square&label=%E6%B1%89%E5%8C%96%E7%89%88%E6%9C%AC" alt="汉化版本">
   <img src="https://img.shields.io/github/downloads/zetaloop/keyviz/total?style=flat-square&label=%E4%B8%8B%E8%BD%BD%E9%87%8F" alt="下载量">
   <img src="https://img.shields.io/github/stars/zetaloop/keyviz?style=flat-square&label=%E6%98%9F%E6%A0%87" alt="星标">
   <img src="https://img.shields.io/github/license/zetaloop/keyviz?style=flat-square&label=%E8%AE%B8%E5%8F%AF%E8%AF%81" alt="许可证">
   <img src="https://img.shields.io/badge/platform-Windows%20%7C%20macOS-lightgrey?style=flat-square&label=%E5%B9%B3%E5%8F%B0" alt="平台支持">
</div>

Keyviz 是一款**免费开源**的按键可视化软件，可以实时显示您的按键和鼠标操作！<br>无论是在教学、演讲还是团队协作中，您都能让观众一目了然地看到操作过程。

这里是 Keyviz 的社区汉化版，原版请访问 [mulaRahul/keyviz](https://github.com/mulaRahul/keyviz)。<br>This is the community Chinese localized version of Keyviz, please visit [mulaRahul/keyviz](https://github.com/mulaRahul/keyviz) for original version.

## ⌨️ 键鼠搭配 🖱️
除了键盘按键之外，也能显示鼠标操作，例如 <kbd>Cmd</kbd> + <kbd>Click</kbd>、<kbd>Alt</kbd> + <kbd>Drag</kbd> 等。

<img src="previews/visualization.png" alt="Keystroke Visualization" width="450">

还能在光标旁显示点击和滚动操作。

<img src="previews/mouse-indicator.gif" alt="Mouse Indicator" width="450">

</br>

## ⚙️ 由你定义
告别单调，可视化效果的每个细节都可自由调整：
- **外观**：更换颜色（区分修饰键与普通键）、大小、布局、边框、背景等。
- **过滤**：设置只显示快捷键或自定义要显示的按键。
- **历史**：以列表形式呈现按键历史。
- **位置**：将可视化界面放在屏幕任意角落。
- **动画**：内置多种出现消失动画可选。

</br>

<img src="previews/settings.png" alt="设置面板" width="600">

</br>

## 📥 安装

### Windows & macOS & Linux (x11)
前往 **[GitHub 发行版](https://github.com/zetaloop/keyviz/releases)** 页面下载最新的汉化版。

*   **Windows:** 下载 `.msi` 安装包，跟随操作步骤进行安装。
*   **macOS:** 使用 `.dmg` 安装包。<br>
    **注意**：Keyviz 需要 **输入监控** 和 **辅助功能** 权限，请在设置中允许：<br>
    `系统设置 > 隐私与安全性 > 输入监控 / 辅助功能`<br>
    如果提示 **应用损坏**，请在终端中运行 `xattr -rd com.apple.quarantine /Applications/keyviz.app` 解除隔离。
*   **Linux**：目前 Keyviz 支持 X11 协议，请下载适用于您发行版的安装包 `.deb`/`.rpm`/`.AppImage`。

</br>

## 🛠️ 构建说明

若希望进一步开发或尝试最新功能，请准备好 [Node.js](https://nodejs.org/) 和 [Tauri](https://v2.tauri.app/start)。

1.  **克隆汉化版仓库**：
    ```bash
    git clone https://github.com/zetaloop/keyviz.git
    cd keyviz
    ```

2.  **安装依赖**：
    ```bash
    npm install
    ```

3.  **构建可执行文件**：
    ```bash
    npx tauri build
    ```

<br/>


## 💖 支持此项目

*   **给[原版仓库](https://github.com/mulaRahul/keyviz)点亮星标**：向大家推荐这个软件！
*   **GitHub 赞助**：[赞助原作者 @mularahul](https://github.com/sponsors/mulaRahul)
*   **Keyviz Pro**：解锁专属功能，助力此开源项目发展。

👉 **[访问 keyviz.org/pro 购买原版 Keyviz Pro](https://keyviz.org/pro)**

</br>

---

  基于 <a href="https://v2.tauri.app/">Tauri</a>，用 🦀 与 ❤️ 制作。
