"use strict";

(function () {
    var location = window.location;
    if (location.protocol) {
        location.protocol === "http:" && (location.protocol = "https:");
    } else {
        location.href.replace("http:", "https:");
    }
})();

var isUserPT = navigator.language.toUpperCase().indexOf("PT") !== -1;

var configs = (function () {
    var instance;
    var Singleton = function (options) {
        var options = options || Singleton.defaultOptions;
        for (var key in Singleton.defaultOptions) {
            this[key] = options[key] || Singleton.defaultOptions[key];
        }
    };
    Singleton.defaultOptions = {
        general_help: isUserPT ? "Em baixo consta uma lista com todos os comandos possíveis de utilizar.\nÉ possível recorrer ao auto-preenchimento recorrendo à tecla TAB que por sua vez autocompleta se apenas existir 1 possibilidade, ou apresenta uma lista com todas as possibilidades caso contrário." : "Below there's a list of commands that you can use.\nYou can use autofill by pressing the TAB key, autocompleting if there's only 1 possibility, or showing you a list of possibilities.",
        ls_help: isUserPT ? "Apresenta informação relativamente a todos os ficheiros e pastas (presentes no diretório atual)." : "List information about the files and folders (the current directory by default).",
        cat_help: isUserPT ? "Lê FICHEIRO(s) e imprime o seu conteúdo no dispositivo de output standard (ecrã)." : "Read FILE(s) content and print it to the standard output (screen).",
        whoami_help: isUserPT ? "Apresenta o nome do utilizador associado ao ID do utilizador atual e alguma informação complementar." : "Print the user name associated with the current effective user ID and more info.",
        date_help: isUserPT ? "Apresenta a data e hora do sistema." : "Print the system date and time.",
        help_help: isUserPT ? "Apresenta este menu." : "Print this menu.",
        clear_help: isUserPT ? "Limpa o ecrã do terminal." : "Clear the terminal screen.",
        reboot_help: isUserPT ? "Reinicia o sistema." : "Reboot the system.",
        cd_help: isUserPT ? "Altera o diretório atual." : "Change the current working directory.",
        mv_help: isUserPT ? "Move (renomeia) ficheiros." : "Move (rename) files.",
        rm_help: isUserPT ? "Remove ficheiros ou diretórios." : "Remove files or directories.",
        rmdir_help: isUserPT ? "Remove um diretório, funcionando somente se as pastas estiverem vazias." : "Remove directory, this command will only work if the folders are empty.",
        touch_help: isUserPT ? "Altera os timestamps de um ficheiro. Caso o ficheiro não exista, é criado um vazio." : "Change file timestamps. If the file doesn't exist, it's created an empty one.",
        sudo_help: isUserPT ? "Executa um comando com direitos de superutilizador." : "Execute a command as the superuser.",
        welcome: isUserPT ? "Bem-vind@ ao meu website pessoal! :)\nO meu nome é Luís Bragança, sou Engenheiro de Software e um full-stack developer web e mobile.\nAtualmente, sou estudante de Mestrado em Engenharia de Software no Instituto Politecnico de Setúbal.\nProfissionalmente, sou um software developer na Cast, Lda.\nVamos dar início: Pode executar o comando 'help' ou usar o menu verde mais intuitivo que se encontra à sua esquerda.\nPara ignorar o texto corrido prima/clique duas vezes em qualquer local na página." : "Welcome to my personal website! :)\nMy name is Luís Bragança, I'm a Software Engineer and a full-stack web and mobile developer.\nCurrently, I'm a Master's student in Software Engineering in the Polytechnic Institute of Setúbal.\nCarrer-wise, I'm a software developer in Cast, Lda.\nNow in order to get started, feel free to either execute the 'help' command or use the more user-friendly green sidenav at your left.\nIn order to skip text rolling, double click/touch anywhere.",
        internet_explorer_warning: isUserPT ? "NOTA: Acontece que se encontra a usar o internet explorer, este website não funcionará correctamente uma vez que o seu suporte não é garantido." : "NOTE: I see you're using internet explorer, this website won't work properly.",
        welcome_file_name: isUserPT ? "mensagem_boas_vindas.txt" : "welcome_message.txt",
        invalid_command_message: "<value>: " + (isUserPT ? "comando não encontrado." : "command not found."),
        reboot_message: isUserPT ? "A preparar para reiniciar...\n\n3...\n\n2...\n\n1...\n\nA reiniciar...\n\n" : "Preparing to reboot...\n\n3...\n\n2...\n\n1...\n\nRebooting...\n\n",
        permission_denied_message: isUserPT ? "Não foi foi possível executar '<value>', permissão negada." : "Unable to '<value>', permission denied.",
        sudo_message: isUserPT ? "Não é possível recorrer ao sudo através de um cliente web." : "Unable to sudo using a web client.",
        usage: isUserPT ? "Modo de utilização" : "Usage",
        file: isUserPT ? "ficheiro" : "file",
        file_not_found: isUserPT ? "Ficheiro '<value>' não encontrado." : "File '<value>' not found.",
        username: isUserPT ? "Nome de utilizador" : "Username",
        hostname: isUserPT ? "Nome do host" : "Host",
        platform: isUserPT ? "Plataforma" : "Platform",
        accesible_cores: isUserPT ? "Núcleos acessíveis" : "Accessible cores",
        language: isUserPT ? "Idioma" : "Language",
        value_token: "<value>",
        host: "lbraganca.pt",
        user: "guest",
        is_root: false,
        type_delay: 20
    };
    return {
        getInstance: function (options) {
            instance === void 0 && (instance = new Singleton(options));
            return instance;
        }
    };
})();

var files = (function () {
    var instance;
    var Singleton = function (options) {
        var options = options || Singleton.defaultOptions;
        for (var key in Singleton.defaultOptions) {
            this[key] = options[key] || Singleton.defaultOptions[key];
        }
    };
    Singleton.defaultOptions = {};
    Singleton.defaultOptions[(isUserPT ? "sobre.txt" : "about.txt")] = isUserPT ? "Este website foi elaborado usando somente JavaScript puro sem recorrer a bibliotecas.\nFoi feito de forma genérica permitindo assim que qualquer pessoa o use, bastando para isso apenas realizar o download do GitHub e alterar os textos de configuração de acordo com as suas necessidades.\nSe encontrar algum bug ou vulnerabilidade peço que me contacte para: luisbraganca@protonmail.com" : "This website was made using only pure JavaScript with no extra libraries.\nI made it dynamic so anyone can use it, just download it from GitHub and change the config text according to your needs.\nIf you manage to find any bugs or security issues feel free to email me: luisbraganca@protonmail.com";
    Singleton.defaultOptions[(isUserPT ? "interesses.txt" : "interests.txt")] = isUserPT ? "Os meus interesses passam principalmente por:\n- Java\n- Node.js\n- React (e React Native)\n- Android\n- Engenharia de Software\n- Common Lisp\n- Segurança\nE muito mais.\nNo entanto, ainda assim tenho competências em ASP.NET, SQL e UML.\nPessoalmente, acredito que mais importante do que saber o 'como', é saber o 'porquê'." : "My interests are mostly:\n- Java\n- Node.js\n- React (and React Native)\n- Android\n- Software Engineering\n- Common Lisp\n- Security\nAnd a lot more.\nHowever, I also have skills in ASP.NET, SQL and UML.\nI believe that more important than knowing 'how' it works, is knowing 'why' it works.";
    Singleton.defaultOptions[(isUserPT ? "educação.txt" : "academic_info.txt")] = isUserPT ? "2017, Instituto Politécnico de Setúbal, Mestrado em Engenharia de Software\nUnidades curriculares principais:\n- Programação Avançada para a Internet\n- Qualidade de Software\n- Segurança de Informação e de Software\n- Análise de Dados\n- Visualização de Informação\n- Marketing Digital\n- Extração Automática de Informação\n2013, Instituto Politécnico de Setúbal, Licenciatura em Engenharia Informática\nUnidades curriculares principais:\n- Engenharia de Software\n- Inteligência Artificial\n- Programação Para a Internet\n- Programação Orientada por Objetos\n- Programação Avançada\n- Computação Móvel\n- Computação Distribuída\n- Bases de Dados\n- Sistemas Operativos\n- Redes de Computadores" : "2017, Polytechnic Institute of Setúbal, Master's degree in Software Engineering\nMain subjects:\n- Advanced Internet Computing\n- Software Quality\n- Information and Software Security\n- Data Analysis\n- Information Visualization\n- Digital Marketing\n- Automated Information Extraction\n2013, Polytechnic Institute of Setúbal, Licentiate degree in Informatics Engineering\nMain subjects:\n- Software Engineering\n- Artificial Intelligence\n- Internet Computing\n- Object Oriented Programming\n- Advanced Programming\n- Mobile Computing\n- Distributed Computing\n- Databases\n- Operating Systems\n- Computer Networks";
    Singleton.defaultOptions["linkedin.txt"] = "https://www.linkedin.com/in/hazelnutsgz/";
    Singleton.defaultOptions["github.txt"] = "https://github.com/hazelnutsgz/";
    Singleton.defaultOptions[(isUserPT ? "outras_informações.txt" : "other_info.txt")] = isUserPT ? "Sou um músico com competências em composição e produção musical, usando ferramentas tais como:\n- Fruity Loops Studio\n- REAPER Digital Audio Workstation\n- Magnus Choir\n - Edirol Orchestral.\nTive 5 anos de aulas de teoria musical e sei tocar:\n- Baixo elétrico (instrumento principal)\n- Guitarra elétrica\n- Guitarra acústica\n- Bateria\n- Teclado" : "I'm a musician with both producing and composing skills using tools such as:\n- Fruity Loops Studio\n- REAPER Digital Audio Workstation\n- Magnus Choir\n- Edirol Orchestral.\nHad 5 years of musical theory lessons and I know how to play:\n- Electric bass (main instrument)\n- Electric guitar\n- Classical guitar\n- Drums\n- Keyboard";
    Singleton.defaultOptions[(isUserPT ? "contacto.txt" : "contact.txt")] = "luisbraganca@protonmail.com";
    return {
        getInstance: function (options) {
            instance === void 0 && (instance = new Singleton(options));
            return instance;
        }
    };
})();

var main = (function () {

    /**
     * AUX FUNCTIONS
     */
    
    var isUsingIE = window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./);

    var ignoreEvent = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };

    var scrollToBottom = function () {
        window.scrollTo(0, document.body.scrollHeight);
    };

    /**
     * MODEL
     */

    var InvalidArgumentException = function (message) {
        this.message = message;
        // Use V8's native method if available, otherwise fallback
        if ("captureStackTrace" in Error) {
            Error.captureStackTrace(this, InvalidArgumentException);
        } else {
            this.stack = (new Error()).stack;
        }
    };
    // Extends Error
    InvalidArgumentException.prototype = Object.create(Error.prototype);
    InvalidArgumentException.prototype.name = "InvalidArgumentException";
    InvalidArgumentException.prototype.constructor = InvalidArgumentException;

    var cmds = {
        LS: { value: "ls", help: configs.getInstance().ls_help },
        CAT: { value: "cat", help: configs.getInstance().cat_help },
        WHOAMI: { value: "whoami", help: configs.getInstance().whoami_help },
        DATE: { value: "date", help: configs.getInstance().date_help },
        HELP: { value: "help", help: configs.getInstance().help_help },
        CLEAR: { value: "clear", help: configs.getInstance().clear_help },
        REBOOT: { value: "reboot", help: configs.getInstance().reboot_help },
        CD: { value: "cd", help: configs.getInstance().cd_help },
        MV: { value: "mv", help: configs.getInstance().mv_help },
        RM: { value: "rm", help: configs.getInstance().rm_help },
        RMDIR: { value: "rmdir", help: configs.getInstance().rmdir_help },
        TOUCH: { value: "touch", help: configs.getInstance().touch_help },
        SUDO: { value: "sudo", help: configs.getInstance().sudo_help }
    };


    var Terminal = function (prompt, cmdLine, output, sidenav, profilePic, user, host, root, outputTimer) {
        if (!(prompt instanceof Node) || prompt.nodeName.toUpperCase() !== "DIV") {
            throw new InvalidArgumentException("Invalid value " + prompt + " for argument 'prompt'.");
        }
        if (!(cmdLine instanceof Node) || cmdLine.nodeName.toUpperCase() !== "INPUT") {
            throw new InvalidArgumentException("Invalid value " + cmdLine + " for argument 'cmdLine'.");
        }
        if (!(output instanceof Node) || output.nodeName.toUpperCase() !== "DIV") {
            throw new InvalidArgumentException("Invalid value " + output + " for argument 'output'.");
        }
        if (!(sidenav instanceof Node) || sidenav.nodeName.toUpperCase() !== "DIV") {
            throw new InvalidArgumentException("Invalid value " + sidenav + " for argument 'sidenav'.");
        }
        if (!(profilePic instanceof Node) || profilePic.nodeName.toUpperCase() !== "IMG") {
            throw new InvalidArgumentException("Invalid value " + profilePic + " for argument 'profilePic'.");
        }
        (typeof user === "string" && typeof host === "string") && (this.completePrompt = user + "@" + host + ":~" + (root ? "#" : "$"));
        this.profilePic = profilePic;
        this.prompt = prompt;
        this.cmdLine = cmdLine;
        this.output = output;
        this.sidenav = sidenav;
        this.sidenavOpen = false;
        this.sidenavElements = [];
        this.typeSimulator = new TypeSimulator(outputTimer, output);
    };

    Terminal.prototype.type = function (text, callback) {
        this.typeSimulator.type(text, callback);
    };

    Terminal.prototype.exec = function () {
        var command = this.cmdLine.value;
        this.cmdLine.value = "";
        this.prompt.textContent = "";
        this.output.innerHTML += "<span class=\"green\">" + this.completePrompt + "</span> " + command + "<br/>";
    };

    Terminal.prototype.init = function () {
        this.sidenav.addEventListener("click", ignoreEvent);
        this.cmdLine.disabled = true;
        this.sidenavElements.forEach(function (elem) {
            elem.disabled = true;
        });
        this.cmdLine.onfocusout = scrollToBottom;
        this.prepareSideNav();
        this.lock(); // Need to lock here since the sidenav elements were just added
        document.body.addEventListener("click", function (event) {
            if (this.sidenavOpen) {
                this.handleSidenav(event);
            }
            this.focus();
        }.bind(this));
        this.cmdLine.addEventListener("keydown", function (event) {
            if (event.which === 13 || event.keyCode === 13) {
                this.handleCmd();
                ignoreEvent(event);
            } else if (event.which === 9 || event.keyCode === 9) {
                this.handleFill();
                ignoreEvent(event);
            }
        }.bind(this));
        this.reset();
    };

    Terminal.makeElementDisappear = function (element) {
        element.style.opacity = 0;
        element.style.transform = "translateX(-300px)";
    };

    Terminal.makeElementAppear = function (element) {
        element.style.opacity = 1;
        element.style.transform = "translateX(0)";
    };

    Terminal.prototype.prepareSideNav = function () {
        var capFirst = (function () {
            return function (string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        })();
        for (var file in files.getInstance()) {
            var element = document.createElement("button");
            Terminal.makeElementDisappear(element);
            element.onclick = function (file, event) {
                this.handleSidenav(event);
                this.cmdLine.value = "cat " + file + " ";
                this.handleCmd();
            }.bind(this, file);
            element.appendChild(document.createTextNode(capFirst(file.replace(/\.[^/.]+$/, "").replace(/_/g, " "))));
            this.sidenav.appendChild(element);
            this.sidenavElements.push(element);
        }
        // Shouldn't use document.getElementById but Terminal is already using loads of params
        document.getElementById("sidenavBtn").addEventListener("click", this.handleSidenav.bind(this));
    };

    Terminal.prototype.handleSidenav = function (event) {
        if (this.sidenavOpen) {
            this.profilePic.style.opacity = 0;
            this.sidenavElements.forEach(Terminal.makeElementDisappear);
            this.sidenav.style.width = "50px";
            document.getElementById("sidenavBtn").innerHTML = "&#9776;";
            this.sidenavOpen = false;
        } else {
            this.sidenav.style.width = "300px";
            this.sidenavElements.forEach(Terminal.makeElementAppear);
            document.getElementById("sidenavBtn").innerHTML = "&times;";
            this.profilePic.style.opacity = 1;
            this.sidenavOpen = true;
        }
        document.getElementById("sidenavBtn").blur();
        ignoreEvent(event);
    };

    Terminal.prototype.lock = function () {
        this.exec();
        this.cmdLine.blur();
        this.cmdLine.disabled = true;
        this.sidenavElements.forEach(function (elem) {
            elem.disabled = true;
        });
    };

    Terminal.prototype.unlock = function () {
        this.cmdLine.disabled = false;
        this.prompt.textContent = this.completePrompt;
        this.sidenavElements.forEach(function (elem) {
            elem.disabled = false;
        });
        scrollToBottom();
        this.focus();
    };

    Terminal.prototype.handleFill = function () {
        var cmdComponents = this.cmdLine.value.trim().split(" ");
        if ((cmdComponents.length <= 1) || (cmdComponents.length === 2 && cmdComponents[0] === cmds.CAT.value)) {
            this.lock();
            var possibilities = [];
            if (cmdComponents[0].toLowerCase() === cmds.CAT.value) {
                if (cmdComponents.length === 1) {
                    cmdComponents[1] = "";
                }
                if (configs.getInstance().welcome_file_name.startsWith(cmdComponents[1].toLowerCase())) {
                    possibilities.push(cmds.CAT.value + " " + configs.getInstance().welcome_file_name);
                }
                for (var file in files.getInstance()) {
                    if (file.startsWith(cmdComponents[1].toLowerCase())) {
                        possibilities.push(cmds.CAT.value + " " + file);
                    }
                }
            } else {
                for (var command in cmds) {
                    if (cmds[command].value.startsWith(cmdComponents[0].toLowerCase())) {
                        possibilities.push(cmds[command].value);
                    }
                }
            }
            if (possibilities.length === 1) {
                this.cmdLine.value = possibilities[0] + " ";
                this.unlock();
            } else if (possibilities.length > 1) {
                this.type(possibilities.join("\n"), function () {
                    this.cmdLine.value = cmdComponents.join(" ");
                    this.unlock();
                }.bind(this));
            } else {
                this.cmdLine.value = cmdComponents.join(" ");
                this.unlock();
            }
        }
    };

    Terminal.prototype.handleCmd = function () {
        var cmdComponents = this.cmdLine.value.trim().split(" ");
        this.lock();
        switch (cmdComponents[0]) {
            case cmds.CAT.value:
                this.cat(cmdComponents);
                break;
            case cmds.LS.value:
                this.ls();
                break;
            case cmds.WHOAMI.value:
                this.whoami();
                break;
            case cmds.DATE.value:
                this.date();
                break;
            case cmds.HELP.value:
                this.help();
                break;
            case cmds.CLEAR.value:
                this.clear();
                break;
            case cmds.REBOOT.value:
                this.reboot();
                break;
            case cmds.CD.value:
            case cmds.MV.value:
            case cmds.RMDIR.value:
            case cmds.RM.value:
            case cmds.TOUCH.value:
                this.permissionDenied(cmdComponents);
                break;
            case cmds.SUDO.value:
                this.sudo();
                break;
            default:
                this.invalidCommand(cmdComponents);
                break;
        };
    };

    Terminal.prototype.cat = function (cmdComponents) {
        var result;
        if (cmdComponents.length <= 1) {
            result = configs.getInstance().usage + ": " + cmds.CAT.value + " <" + configs.getInstance().file + ">";
        } else if (!cmdComponents[1] || (!cmdComponents[1] === configs.getInstance().welcome_file_name || !files.getInstance().hasOwnProperty(cmdComponents[1]))) {
            result = configs.getInstance().file_not_found.replace(configs.getInstance().value_token, cmdComponents[1]);
        } else {
            result = cmdComponents[1] === configs.getInstance().welcome_file_name ? configs.getInstance().welcome : files.getInstance()[cmdComponents[1]];
        }
        this.type(result, this.unlock.bind(this));
    };

    Terminal.prototype.ls = function () {
        var result = ".\n..\n" + configs.getInstance().welcome_file_name + "\n";
        for (var file in files.getInstance()) {
            result += file + "\n";
        }
        this.type(result.trim(), this.unlock.bind(this));
    };

    Terminal.prototype.sudo = function () {
        this.type(configs.getInstance().sudo_message, this.unlock.bind(this));
    }

    Terminal.prototype.whoami = function (cmdComponents) {
        var result = configs.getInstance().username + ": " + configs.getInstance().user + "\n" + configs.getInstance().hostname + ": " + configs.getInstance().host + "\n" + configs.getInstance().platform + ": " + navigator.platform + "\n" + configs.getInstance().accesible_cores + ": " + navigator.hardwareConcurrency + "\n" + configs.getInstance().language + ": " + navigator.language;
        this.type(result, this.unlock.bind(this));
    };

    Terminal.prototype.date = function (cmdComponents) {
        this.type(new Date().toString(), this.unlock.bind(this));
    };

    Terminal.prototype.help = function () {
        var result = configs.getInstance().general_help + "\n\n";
        for (var cmd in cmds) {
            result += cmds[cmd].value + " - " + cmds[cmd].help + "\n";
        }
        this.type(result.trim(), this.unlock.bind(this));
    };

    Terminal.prototype.clear = function () {
        this.output.textContent = "";
        this.prompt.textContent = "";
        this.prompt.textContent = this.completePrompt;
        this.unlock();
    };

    Terminal.prototype.reboot = function () {
        this.type(configs.getInstance().reboot_message, this.reset.bind(this));
    };

    Terminal.prototype.reset = function () {
        this.output.textContent = "";
        this.prompt.textContent = "";
        if (this.typeSimulator) {
            this.type(configs.getInstance().welcome + (isUsingIE ? "\n" + configs.getInstance().internet_explorer_warning : ""), function () {
                this.unlock();
            }.bind(this));
        }
    };

    Terminal.prototype.permissionDenied = function (cmdComponents) {
        this.type(configs.getInstance().permission_denied_message.replace(configs.getInstance().value_token, cmdComponents[0]), this.unlock.bind(this));
    };

    Terminal.prototype.invalidCommand = function (cmdComponents) {
        this.type(configs.getInstance().invalid_command_message.replace(configs.getInstance().value_token, cmdComponents[0]), this.unlock.bind(this));
    };

    Terminal.prototype.focus = function () {
        this.cmdLine.focus();
    };

    var TypeSimulator = function (timer, output) {
        var timer = parseInt(timer);
        if (timer === Number.NaN || timer < 0) {
            throw new InvalidArgumentException("Invalid value " + timer + " for argument 'timer'.");
        }
        if (!(output instanceof Node)) {
            throw new InvalidArgumentException("Invalid value " + output + " for argument 'output'.");
        }
        this.timer = timer;
        this.output = output;
    };

    TypeSimulator.prototype.type = function (text, callback) {
        var isURL = (function () {
            return function (str) {
                return (str.startsWith("http") || str.startsWith("www")) && str.indexOf(" ") === -1 && str.indexOf("\n") === -1;
            };
        })();
        if (isURL(text)) {
            window.open(text);
        }
        var i = 0;
        var output = this.output;
        var timer = this.timer;
        var skipped = false;
        var skip = function () {
            skipped = true;
        }.bind(this);
        document.addEventListener("dblclick", skip);
        (function typer() {
            if (i < text.length) {
                var char = text.charAt(i);
                var isNewLine = char === "\n";
                output.innerHTML += isNewLine ? "<br/>" : char;
                i++;
                if (!skipped) {
                    setTimeout(typer, isNewLine ? timer * 2 : timer);
                } else {
                    output.innerHTML += (text.substring(i).replace(new RegExp("\n", 'g'), "<br/>")) + "<br/>";
                    document.removeEventListener("dblclick", skip);
                    callback();
                }
            } else if (callback) {
                output.innerHTML += "<br/>";
                document.removeEventListener("dblclick", skip);
                callback();
            }
            scrollToBottom();
        })();
    };

    return {
        listener: function () {
            document.getElementsByTagName("html")[0].setAttribute("lang", isUserPT ? "pt" : "en");
            new Terminal(
                document.getElementById("prompt"),
                document.getElementById("cmdline"),
                document.getElementById("output"),
                document.getElementById("sidenav"),
                document.getElementById("profilePic"),
                configs.getInstance().user,
                configs.getInstance().host,
                configs.getInstance().is_root,
                configs.getInstance().type_delay
            ).init();
        }
    };
})();

window.onload = main.listener;