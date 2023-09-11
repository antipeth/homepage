
var github = "https://github.com/antipeth";
var email = 'inopeth1@beeble.com';
var blog = 'https://blog.0pt.im';
var codeberg = 'https://codeberg.org/antipeth';
const empty = "&nbsp";

about = [
  "<br>",
  "Hi there, 👋🏽",
  `🔭 I'm 春风少年兄.`,
  `😀 I love coding, surfing on Internet and making friends.`,
  `📫 You are visiting my homepage right now. My blog is called <a href="${blog}" target="_blank">春风少年兄</a>.`,
  `🎈 You could visit my blog to get more information about me.`,
  `👉 Email me at <a href="${email}" target="_blank">mail@0pt.im</a>!`,
  `🕊 It is said that feeding pigeons can effectively reduce the probability of pigeons becoming fairies. Type <span class=\"command\">feed</span> command to get the way to feed pigeons.`,
  `😇 If you love my code, please give me a ⭐ on <a href="${github}" target="_blank">Github</a> or <a href="${codeberg}" target="_blank">Codeberg</a>. Thanks a lot!`,
  "<br>",
];

iceyear = [
  "<br>",
  "伟大的ice year，感谢他给我这个homepage的代码。",
  "<br>",
];

yonzilch = [
  "<br>",
  "可敬的yon zilch，战友。",
  "<br>",
];

nanimonai = [
  "<br>",
  "可敬的nanimonai，战友。",
  "<br>",
];

links = [
  // format as table to achieve responsive column layout
  `<table>
   <tr><td>Github</td><td><a href="${github}" target="_blank">github</a></td></tr>
   <tr><td>Blog</td><td><a href="${blog}" target="_blank">blogr</a></td></tr>
   <tr><td>Codeberg</td><td><a href="${codeberg}" target="_blank">codeberg</a></td></tr>
   </table>`,
];

help = [
  "<br>",
  '终端支持的命令如下：',
  // format as table to achieve responsive column layout
  `<table>
  <tr><td><span class="command">about</span></td><td>关于 </td></tr>
  <tr><td><span class="command">links</span></td><td>春风少年兄 的相关链接</td></tr>
  <tr><td><span class="command">history</span></td><td>命令输入历史记录</td></tr>
  <tr><td><span class="command">help</span></td><td>都看到这些了，别告诉我还不知道是什么意思吧🙃</td></tr>
  <tr><td><span class="command">email</span></td><td>春风少年兄 的联系邮箱</td></tr>
  <tr><td><span class="command">uname</span></td><td>查看系统信息</td></tr>
  <tr><td><span class="command">clear</span></td><td>清空命令窗口</td></tr>
  <tr><td><span class="command">banner</span></td><td>显示 ASCII Logo</td></tr>
  <tr><td><span class="command">theme</span></td><td>更换主题</td></tr>
  <tr><td><span class="command">[tab]</span></td><td>自动补齐快捷键</td></tr>
  </table>`,
  "<br>",
  '（也可以试试你知道的其他命令，说不定有惊喜😆）',
  "<br>",
];

banner = [
  "<br>",
  "$$$$$ $$$$$$ $$$$$$$  $$$$$$ $$     $$ $$$$$$      $      $$  $$",
  "$$      $$   $$   $$  $$      $$  $$   $$         $$$     $$  $$",
  "$$$$$   $$   $$$$$$$  $$$$$$    $$     $$$$$$    $$ $$    $$$$$$",
  "$$      $$   $$   $$  $$        $$     $$       $$$$$$$   $$  $$",
  "$$      $$   $$    $$ $$        $$     $$      $$     $$  $$  $$",
  "$$    $$$$$$ $$    $$ $$$$$$    $$     $$$$$$ $$       $$ $$  $$",   
  "<br>",
];

welcomeMsg = [
  '<span class="color2 terminal-welcome-msg">欢迎来到 春风少年兄 引导页！</span>',
  "<span class=\"color2 terminal-welcome-msg\">输入</span> <span class=\"command terminal-welcome-msg\">'help'</span><span class=\"color2 terminal-welcome-msg\"> （然后按回车键）以获取可使用的命令列表。</span>",
  "<br>",
];

allCommands = [
  "help", "about", "links", "projects", "email",  "github", "history", "clear", "banner", "theme",
  "echo", "ls", "cd", "vi", "vim", "emacs", "sudo", "ping", "blog", "iceyear", "codeberg", "matrix",
  "xlog", "feed", "xmr", "btc", "eth", "uname",  
];

themes = {
  "coral": "css/style_coral.css",
  "midnight": "css/style_midnight.css",
  "chocolate": "css/style_chocolate.css",
};

allArgs = [
  "ls", "set", "random", 
];

