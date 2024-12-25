  document.addEventListener('DOMContentLoaded', function () {
  const htmlBtn = document.getElementById('htmlBtn');
  const cssBtn = document.getElementById('cssBtn');
  const jsBtn = document.getElementById('jsBtn');
  const runBtn = document.getElementById('runBtn');
  const saveBtn = document.getElementById('saveBtn');
  const htmlCode = document.getElementById('htmlCode');
  const cssCode = document.getElementById('cssCode');
  const jsCode = document.getElementById('jsCode');
  const outputFrame = document.getElementById('outputFrame');

  let currentLanguage = 'html'; // 默认语言是HTML

  // 自动检测浏览器主题并切换
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', () => setTheme());
  setTheme(); // 页面加载时先设置一次

  function setTheme() {
    if (mediaQuery.matches) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }

  // 切换代码编辑框
  htmlBtn.addEventListener('click', () => switchLanguage('html'));
  cssBtn.addEventListener('click', () => switchLanguage('css'));
  jsBtn.addEventListener('click', () => switchLanguage('js'));

  // 运行代码
  runBtn.addEventListener('click', () => runCode());

  // 保存代码
  saveBtn.addEventListener('click', () => saveCode());

  function switchLanguage(language) {
    // 隐藏所有文本框
    htmlCode.style.display = 'none';
    cssCode.style.display = 'none';
    jsCode.style.display = 'none';

    // 显示当前选择的文本框
    if (language === 'html') {
      htmlCode.style.display = 'block';
    } else if (language === 'css') {
      cssCode.style.display = 'block';
    } else if (language === 'js') {
      jsCode.style.display = 'block';
    }

    currentLanguage = language;
  }

  function runCode() {
    const html = htmlCode.value;
    const css = cssCode.value;
    const js = jsCode.value;



    // 创建一个完整的HTML结构来展示效果
    const code = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;

    outputFrame.contentWindow.document.open();
    outputFrame.contentWindow.document.write(code);
    outputFrame.contentWindow.document.close();
  }

  function saveCode() {
    const html = htmlCode.value;
    const css = cssCode.value;
    const js = jsCode.value;

    const blob = new Blob([`<html><head><style>${css}</style></head><body>${html}<script>${js}</script></body></html>`], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.html';
    a.click();
    URL.revokeObjectURL(url);
  }

  // 初始化为HTML语言
  switchLanguage('html');
});