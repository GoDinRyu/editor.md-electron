    /**
     * 将Markdown文档解析为HTML用于前台显示
     * Parse Markdown to HTML for Font-end preview.
     * 
     * @param   {String}   id            用于显示HTML的对象ID
     * @param   {Object}   [options={}]  配置选项，可选
     * @returns {Object}   div           返回jQuery对象元素
     */
    
    editormd.markdownToHTML = function(id, options) {
        var defaults = {
            gfm                  : true,
            toc                  : true,
            tocm                 : false,
            tocStartLevel        : 1,
            tocTitle             : "目录",
            tocDropdown          : false,
            tocContainer         : "",
            markdown             : "",
            markdownSourceCode   : false,
            htmlDecode           : false,
            autoLoadKaTeX        : true,
            pageBreak            : true,
            atLink               : true,    // for @link
            emailLink            : true,    // for mail address auto link
            tex                  : false,
            taskList             : false,   // Github Flavored Markdown task lists
            emoji                : false,
            flowChart            : false,
            sequenceDiagram      : false,
            previewCodeHighlight : true
        };
        
        editormd.$marked  = marked;

        var div           = $("#" + id);
        var settings      = div.settings = $.extend(true, defaults, options || {});
        var saveTo        = div.find("textarea");
        
        if (saveTo.length < 1)
        {
            div.append("<textarea></textarea>");
            saveTo        = div.find("textarea");
        }        
        
        var markdownDoc   = (settings.markdown === "") ? saveTo.val() : settings.markdown; 
        var markdownToC   = [];

        var rendererOptions = {  
            toc                  : settings.toc,
            tocm                 : settings.tocm,
            tocStartLevel        : settings.tocStartLevel,
            taskList             : settings.taskList,
            emoji                : settings.emoji,
            tex                  : settings.tex,
            pageBreak            : settings.pageBreak,
            atLink               : settings.atLink,           // for @link
            emailLink            : settings.emailLink,        // for mail address auto link
            flowChart            : settings.flowChart,
            sequenceDiagram      : settings.sequenceDiagram,
            previewCodeHighlight : settings.previewCodeHighlight,
        };

        var markedOptions = {
            renderer    : editormd.markedRenderer(markdownToC, rendererOptions),
            gfm         : settings.gfm,
            tables      : true,
            breaks      : true,
            pedantic    : false,
            sanitize    : (settings.htmlDecode) ? false : true, // 是否忽略HTML标签，即是否开启HTML标签解析，为了安全性，默认不开启
            smartLists  : true,
            smartypants : true
        };
        
		markdownDoc = new String(markdownDoc);
        
        var markdownParsed = marked(markdownDoc, markedOptions);
        
        markdownParsed = editormd.filterHTMLTags(markdownParsed, settings.htmlDecode);
        
        if (settings.markdownSourceCode) {
            saveTo.text(markdownDoc);
        } else {
            saveTo.remove();
        }
        
        div.addClass("markdown-body " + this.classPrefix + "html-preview").append(markdownParsed);
        
        var tocContainer = (settings.tocContainer !== "") ? $(settings.tocContainer) : div;
        
        if (settings.tocContainer !== "")
        {
            tocContainer.attr("previewContainer", false);
        }
         
        if (settings.toc) 
        {
            div.tocContainer = this.markdownToCRenderer(markdownToC, tocContainer, settings.tocDropdown, settings.tocStartLevel);
            
            if (settings.tocDropdown || div.find("." + this.classPrefix + "toc-menu").length > 0)
            {
                this.tocDropdownMenu(div, settings.tocTitle);
            }
            
            if (settings.tocContainer !== "")
            {
                div.find(".editormd-toc-menu, .editormd-markdown-toc").remove();
            }
        }
            
        if (settings.previewCodeHighlight) 
        {
            div.find("pre").addClass("prettyprint linenums");
            prettyPrint();
        }
        
        if (!editormd.isIE8) 
        {
            if (settings.flowChart) {
                div.find(".flowchart").flowChart(); 
            }

            if (settings.sequenceDiagram) {
                div.find(".sequence-diagram").sequenceDiagram({theme: "simple"});
            }
        }

        if (settings.tex)
        {
            var katexHandle = function() {
                div.find("." + editormd.classNames.tex).each(function(){
                    var tex  = $(this);                    
                    katex.render(tex.html().replace(/&lt;/g, "<").replace(/&gt;/g, ">"), tex[0]);                    
                    tex.find(".katex").css("font-size", "1.6em");
                });
            };
            
            if (settings.autoLoadKaTeX && !editormd.$katex && !editormd.kaTeXLoaded)
            {
                this.loadKaTeX(function() {
                    editormd.$katex      = katex;
                    editormd.kaTeXLoaded = true;
                    katexHandle();
                });
            }
            else
            {
                katexHandle();
            }
        }
        
        div.getMarkdown = function() {            
            return saveTo.val();
        };
        
        return div;
    };