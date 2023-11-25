var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer"); 
var textarea = document.getElementById("texter"); 
var terminal = document.getElementById("terminal");
var after = document.getElementById("after");

var git = 0;
var tab = 0;
var pw = false;
let pwd = false;
var commandsLog = [];
var selectedTabCmd = "";
var current_theme = "midnight";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

setTimeout(async function() {
  // 选择随机的 banner

  //await new Promise((resolve)=>{resolve(loopLines(banner, "terminal-banner", 80));});
  await loopLines(banners[Math.floor(Math.random() * banners.length)], "terminal-banner", 1);
  loopLines(welcomeMsg, "", 1);
  textarea.focus();
}, 100);

window.addEventListener('click', focusTextArea, true); 
window.addEventListener("keyup", enterKey);

//init
textarea.value = "";
command.innerHTML = textarea.value;

function focusTextArea() {
  textarea.focus();
}

function enterKey(e) {
  if (e.keyCode == 181) {
    document.location.reload(true);
  }
  // Enter key
  if (e.keyCode == 13) {    
    removeTabCompleteLine();    
    tab = 0;                                  // update the tab index
    if ( selectedTabCmd != "" ) {
      textarea.value = selectedTabCmd;
      command.innerHTML = selectedTabCmd;
      selectedTabCmd = "";
      return;
    }
    commandsLog.push(command.innerHTML);
    git = commandsLog.length;                 // update the arrow key index
    addLine(" > " + command.innerHTML, "no-animation", 0);
    commander(command.innerHTML.toLowerCase());
    command.innerHTML = "";
    textarea.value = "";
  }
  // Arrow up
  if (e.keyCode == 38 && git != 0) {
    git -= 1;
    textarea.value = commandsLog[git];
    command.innerHTML = textarea.value;
  }
  // Arrow down
  if (e.keyCode == 40 && git != commandsLog.length) {
    git += 1;
    if (commandsLog[git] === undefined) {
      textarea.value = "";
    } else {
      textarea.value = commandsLog[git];
    }
    command.innerHTML = textarea.value;
  }
  // Tab complete
  if (e.keyCode == 9) {
    // if (textarea.value.length == 0) {
    //   refreshTabCompleteLine("");
    // }
    // else {
      cmdOptions = completeQuery(allCommands, textarea.value);
      if ( tab == cmdOptions.length ) {
        tab = 0;
      }
      if (cmdOptions.length == 1) {
        textarea.value = cmdOptions[0];
        command.innerHTML = textarea.value;
      }
      else if (cmdOptions.length > 1) {
        selectedTabCmd = cmdOptions[tab];

        suggestionTxt = "";
        for (let i = 0; i < cmdOptions.length; i++) {
          if ( i == tab ) {
            suggestionTxt += `<span class=\"command\">${cmdOptions[i]}</span>    `;
            continue;
          }
          suggestionTxt += `<span class=\"inherit\">${cmdOptions[i]}</span>    `;
        }
        refreshTabCompleteLine(suggestionTxt, "no-animation", 0);
      }
      tab += 1;
    }
  // }
}

function commander(cmd) {
  var cmdAll = cmd.split(" "); 
  var cmd = cmdAll[0];
  var args = "";
  if (cmdAll.length > 1) {
    args = cmdAll.slice(1).join(" ");
  }
  switch (cmd.toLowerCase()) {
    // content stuff
    case "help":
      loopLines(help, "color2 margin no-animation", 20);
      break;
    case "about":
      loopLines(about, "color2 margin no-animation", 0);
      break;
    case "iceyear":
      loopLines(iceyear, "color2 margin no-animation", 0);
      break;
    case "links":
      loopLines(links, "color2 margin no-animation", 0);
      break;
    case "email":
      addLine('正在传送至邮箱：<a href="inopeth1@beeble.com">mail@0pt.im</a>...', "color2", 80);
      newTab(email);
      break;
    // socials
    case "github":
      addLine("正在传送至 春风少年兄 的 GitHub...", "color2", 0);
      newTab(github);
      break;
    case "blog":
      addLine("正在传送至 春风少年兄 的博客...", "color2", 1);
      newTab(blog);
      break; 
    case "oldblog":
      addLine("正在传送至 春风少年兄 的旧博客...", "color2", 0);
      newTab(oldblog);
        break; 
    case "codeberg":
      addLine("正在传送至 春风少年兄 的 Codeberg...", "color2", 0);
      newTab(codeberg);
      break;    
    // functional commands
    case "gui":
      addLine("正在造轮子中...", "inherit", 0);
      break;
    case "history":
      addLine("<br>", "", 0);
      loopLines(commandsLog, "color2", 20);
      addLine("<br>", "command", 80 * commandsLog.length + 50);
      break;
    case "clear":
      setTimeout(function() {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      break;
    case "banner":
      // 将以下两行代码替换掉原来的 loopLines(banner, "terminal-banner", 2);
      loopLines(banners[Math.floor(Math.random() * banners.length)], "terminal-banner", 2);

      break;
    case "theme":
      var allArgs = args.split(" ");
      var themeCmd = allArgs[0];
      var themeArg = "";
      if (allArgs.length == 2) {
        themeArg = allArgs[1];
      }
      switch (themeCmd.toLowerCase()) {
        case "":
          addLine(`用法： <span class=\"command\">theme</span> [参数]`, "inherit no-animation", 0);
          addLine(`参数：`, "inherit no-animation", 0);
          addLine(`   - <span class=\"command\">ls</span>： 显示主题列表`, "inherit no-animation", 0);
          addLine(`   - <span class=\"command\">set</span>： 设置指定主题`, "inherit no-animation", 0);
          addLine(`示例：`, "inherit no-animation", 0);
          addLine(`   <span class=\"command\">theme random</span>： 切换至随机主题`, "inherit no-animation", 0);
          addLine(`   <span class=\"command\">theme ls</span>： 列出所有可用的主题`, "inherit no-animation", 0);
          break;
        case "ls":
          loopLines(Object.keys(themes), "inherit", 80);
          break;
        case "set":
          if ( !Object.keys(themes).includes(themeArg) ) {
            addLine(`<span class=\"inherit\">名为 '${themeArg}' 的主题不存在！</span>`);
            break;
          }
          addLine(`<span class=\"inherit\">切换至 '${themeArg}' 主题...</span>`);
          setThemeCSS(themeArg);
          break;
        case "random":
          var theme = current_theme;
          while (theme == current_theme) {
            theme = Object.keys(themes)[Math.floor(Math.random()*Object.keys(themes).length)];
          }
          addLine(`<span class=\"inherit\">切换至 '${theme}' 主题...</span>`);
          current_theme = theme;
          setThemeCSS(theme);
          break;
      }
      break;
    case "echo":
      addLine(`${args}`, "color2", 80);
      break;
    case "ping":
      if (/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(args)) {
          addLine(`<span class=\"inherit\">PING ${args} (${args}): 56(84) 字节的数据</span>`);
          addLine(`<span class=\"inherit\">64 字节，来自 ${args}: icmp_seq=1 ttl=114 时间=114.514 毫秒</span>`);
          addLine(`<span class=\"inherit\">64 字节，来自 ${args}: icmp_seq=1 ttl=514 时间=114.514 毫秒</span>`);
          addLine(`<span class=\"inherit\">64 字节，来自 ${args}: icmp_seq=4 ttl=114 时间=114.514 毫秒</span>`);
          addLine(`<span class=\"inherit\">64 字节，来自 ${args}: icmp_seq=5 ttl=514 时间=114.514 毫秒</span>`);
          addLine(`<span class=\"inherit\">64 字节，来自 ${args}: icmp_seq=1 ttl=114 时间=114.514 毫秒</span>`);
          addLine(`<span class=\"inherit\">64 字节，来自 ${args}: icmp_seq=4 ttl=514 时间=114.514 毫秒</span>`);
      }
      else {
          addLine(`<span class=\"inherit\">ping: ${args}: 未知的名称或服务</span>`);
      }
      break;
    // fun commands
    case "ls":
      addLine("<span class=\"inherit\">你</span>", "color2", 80);
      addLine("<span class=\"inherit\">干嘛~~</span>", "color2", 80);
      addLine("<span class=\"inherit\">哎哟</span>", "color2", 80);
      if (args == "-a") {
        addLine("<span class=\"inherit\">.你</span>", "color2", 80);
        addLine("<span class=\"inherit\">.好烦</span>", "color2", 80);
        addLine("<span class=\"inherit\">.哈哈哈</span>", "color2", 80);
      }
      break;
    case "cd":
      // check for file like path given in args
      addLine("<span class=\"inherit\"></span>", "color2", 80);
      break;
    case "vi":
      addLine("<span class=\"inherit\">还在用 vi？ 快试试 <span class=\"command\">vim</span> 吧</span>。", "color2", 80);
      break;
    case "vim":
      addLine("<span class=\"inherit\">为什么要用 vim？ 来感受 <span class=\"command\">emacs</span> 的 Power ！</span>", "color2", 80);
      break;
    case "emacs":
      addLine("<span class=\"inherit\">真的吗？ 居然用 emacs？ 你应该用 <span class=\"command\">vim</span></span> 。", "color2", 80);
      break;
    case "sudo":
      addLine(`<span class=\"inherit\">拒绝访问: 无法以 root 用户身份运行 '${args}' 命令。</span>`, "color2", 80);
      setTimeout(function() {
        window.open('https://www.bilibili.com/video/BV1SB4y1k7Qg');
      }, 1); 
      break;
      case "uname":
        if (args == "") {
          addLine("fyTernimal", "color2", 80);
          addLine("You could type <span class=\"command\">'uname --help'</span> to see usage of this command.", "color2", 80);
        }
        if (args == "-a") {
          addLine("fyTermial fyterm 114.51.4 KUN LOCKEY/Ice Year", "color2", 80);
          addLine("This repo is forked from https://github.com/philippwulff/pw-term. Ice Year added Chinese Language Support and some features.春风少年兄做了一些修改。Thanks Ice Year", "color2", 80);
          addLine("fyTerminal Source Code: https://codeberg.org/iceyear/homepage", "color2", 80);
          addLine("FYTerminal Source Code: https://codeberg.org/antipeth/homepage", "color2", 80);
        }
        if (args == "-s") {
          addLine("FYTernimal", "color2", 80);
        }
        if (args == "-n") {
          addLine("fyterm", "color2", 80);
        }
        if (args == "-r") {
          addLine("114.51.4", "color2", 80);
        }
        if (args == "-m") {
          addLine("KUN", "color2", 80);
        }
        if (args == "-o") {
          addLine("Fire Yeah", "color2", 80);
        }
        if (args == "--help") {
          addLine("用法：uname [选项]...", "color2", 80);
          addLine("输出特定的系统信息。如果不带 <选项>，则视为使用了 -s 选项。", "color2", 80);
          addLine("-a：按如下次序输出所有信息", "color2", 80);
          addLine("-s：输出内核名称", "color2", 80);
          addLine("-n：输出网络节点的主机名", "color2", 80);
          addLine("-r：输出内核发行号", "color2", 80);
          addLine("-m：输出主机的硬件架构名称", "color2", 80);
          addLine("-o：输出操作系统名称", "color2", 80);
          
        }
        break;
    case "":
      addLine("", "color2", 0);
      break;
    default:
      addLine(`找不到命令: ${cmd}。 输入 <span class=\"command\">'help'</span>（然后按回车键） 查看可用命令。`, "inherit no-animation", 0);
      break;
  }
}

function newTab(link) {
  setTimeout(function() {
    window.open(link, "_blank");
  }, 500);
}

async function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  //setTimeout(function() {
  await delay(time);
  var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  //}, time);
  return;
}

async function loopLines(name, style, time) {
  // name.forEach(function(item, index) {
  //     addLine(item, style, index * time);
  // });
  for (var i = 0; i < name.length; i++) {
    await addLine(name[i], style, i * time);
  }
  return;
}

function setThemeCSS(theme) {
  // Selects other CSS theme
  var lnk = document.createElement('link');
  lnk.href = themes[theme];
  lnk.rel = 'stylesheet';
  lnk.type = 'text/css';
  (document.head||document.documentElement).appendChild(lnk);
}

function completeQuery(arr, query) {
  // Completes the query string with a list of matching elements from arr
  return arr.filter(function(item) {
    return item.startsWith(query);
  });
}

function refreshTabCompleteLine(text, style, time) {
  // Refreshes the line below the command for tab completion suggestions
  removeTabCompleteLine();
  setTimeout(function() {
    var next = document.createElement("p");
    next.setAttribute("id", "tabCompleteLine");
    next.innerHTML = text;
    next.className = style;

    after.parentNode.insertBefore(next, after);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function removeTabCompleteLine() {
  // Deletes the HTML element
  var tcl = document.getElementById("tabCompleteLine");
  if ( tcl !== null ) {
    tcl.outerHTML = "";
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
