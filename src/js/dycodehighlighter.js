/*!
 * dyCodeHighlighter
 *
 * Author: Yusuf Shakeel
 * https://github.com/yusufshakeel
 *
 * GitHub Link: https://github.com/yusufshakeel/dyCodeHighlighter
 *
 * MIT license
 * Copyright (c) 2017 Yusuf Shakeel
 *
 * Date: 2015-01-09 Friday
 */
(function (global) {

    "use strict";

    var
        // variables
        dyCodeHighlighter = {},
        document = global.document,

        // constants
        DY_CODEHIGHLIGHTER_CLASS = "dyCodeHighlighter",
        DY_CODEHIGHLIGHTER_CLASS_BODY = "dyCodeHighlighter-body",
        DY_CODEHIGHLIGHTER_CLASS_CODE_LINE = "dyCodeHighlighter-line",
        DY_CODEHIGHLIGHTER_CLASS_CODE_LINE_NUMBER = "dyCodeHighlighter-line-number",
        DY_CODEHIGHLIGHTER_CLASS_CODE_LINE_HIGHLIGHT = "highlight",
        DY_CODEHIGHLIGHTER_CLASS_CONTAINER = "dyCodeHighlighter-container",
        DY_CODEHIGHLIGHTER_CLASS_HEADER = "dyCodeHighlighter-header",
        DY_CODEHIGHLIGHTER_CLASS_LINE_NUMBER_ROWS = "dyCodeHighlighter-line-numbers-rows",
        DY_CODEHIGHLIGHTER_CUSTOM_STYLE_RANDOM_ID = "dyCodeHighlighter-customStyle-id-",
        DY_CODEHIGHLIGHTER_DATA_ATTRIBUTE_CUSTOM_STYLE = "data-dyCodeHighlighter-custom-style",
        DY_CODEHIGHLIGHTER_DATA_ATTRIBUTE_HIGHLIGHT = "data-dyCodeHighlighter-highlight",
        DY_CODEHIGHLIGHTER_DATA_ATTRIBUTE_LINE_START = "data-dyCodeHighlighter-line-start",
        DY_CODEHIGHLIGHTER_DATA_ATTRIBUTE_HEADER = "data-dyCodeHighlighter-header"
    ;

    /**
     * This function will check if selected element has a given class.
     *
     * @param el
     * @param val
     * @returns {boolean}
     */
    function hasClass(el, val) {
        return el.className.split(" ").indexOf(val) >= 0;
    }

    /**
     * This will wrap the element in a wrapper.
     *
     * @param el
     * @param wrapper
     */
    function wrap(el, wrap) {
        el.parentNode.insertBefore(wrap, el);
        wrap.appendChild(el);
    }

    /**
     * This will copy the default into source.
     *
     * @param {object} source
     * @param {object} defaults
     * @returns {object}
     */
    function extendSource(source, defaults) {
        var property;
        for (property in defaults) {
            if (source.hasOwnProperty(property) === false) {
                source[property] = defaults[property];
            }
        }
        return source;
    }

    /**
     * This function will add header.
     *
     * @param containerEl
     * @param {object} option
     */
    function addHeader(containerEl, option) {
        //variables
        var
            header,
            html = "";

        // create a div element for the header content
        header = document.createElement("div");

        // add class to the header div
        header.className = DY_CODEHIGHLIGHTER_CLASS_HEADER;

        // if showing lines
        if (option.lines === 'show') {
            html += "<span>" + option.totalLines + " lines</span>";
        }

        // if showing filename
        if (option.filename.length > 0) {
            html += "<span class='filename' data-filename='" + option.filename + "'>" + option.filename + "</span>";
        }

        // add the html to the header
        header.innerHTML = html;

        // prepend the header inside the container
        containerEl.prepend(header);
    }

    /**
     * This will format the code.
     *
     * @param {string} code
     * @param {object} option
     * @returns {object}
     */
    function getFormattedCode(code, option) {
        var
            formattedCode = "",
            lines,
            totalLines = 0,
            i,
            j,
            lineHighlightClass = "";

        // split the code into lines
        lines = code.split("\n");

        // find total lines
        totalLines = lines.length;

        // formatting
        for (i = 0; i < totalLines; i++) {

            // replace all empty line with space
            if (lines[i].length == 0) {
                lines[i] = " ";
            }

            // html encode
            else {
                lines[i] = lines[i].replace(/\</g, '&lt;');
                lines[i] = lines[i].replace(/\>/g, '&gt;');
                lines[i] = lines[i].replace(/\&/g, '&amp;');
                lines[i] = lines[i].replace(/\"/g, '&quot;');
                lines[i] = lines[i].replace(/\'/g, '&apos;');
            }
        }

        // enclose in span
        // for (i = 0; i < totalLines; i++) {
        //     lineHighlightClass = option.highlightLines.indexOf((i + 1).toString()) >= 0 ? DY_CODEHIGHLIGHTER_CLASS_CODE_LINE_HIGHLIGHT : "";
        //     formattedCode += "<span class='" + DY_CODEHIGHLIGHTER_CLASS_CODE_LINE + " " + lineHighlightClass + "'>" + lines[i] + "</span>";
        // }

        for (i = 0, j = option.lineStart; i < totalLines; i++, j++) {
            lineHighlightClass = option.highlightLines.indexOf(j.toString()) >= 0 ? DY_CODEHIGHLIGHTER_CLASS_CODE_LINE_HIGHLIGHT : "";
            formattedCode += "<span class='" + DY_CODEHIGHLIGHTER_CLASS_CODE_LINE + " " + lineHighlightClass + "'>" + lines[i] + "</span>";
        }

        // add line numbers rows if user wants
        if (option.showLineNumbers) {
            formattedCode += "<span class='" + DY_CODEHIGHLIGHTER_CLASS_LINE_NUMBER_ROWS + "'>";

            // for (i = 0; i < totalLines; i++) {
            //     lineHighlightClass = option.highlightLines.indexOf((i + 1).toString()) >= 0 ? DY_CODEHIGHLIGHTER_CLASS_CODE_LINE_HIGHLIGHT : "";
            //     formattedCode += "<span class='" + DY_CODEHIGHLIGHTER_CLASS_CODE_LINE_NUMBER + " " + lineHighlightClass + "'></span>";
            // }

            for (i = option.lineStart; i < option.lineStart + totalLines; i++) {
                lineHighlightClass = option.highlightLines.indexOf(i.toString()) >= 0 ? DY_CODEHIGHLIGHTER_CLASS_CODE_LINE_HIGHLIGHT : "";
                formattedCode += "<span class='" + DY_CODEHIGHLIGHTER_CLASS_CODE_LINE_NUMBER + " " + lineHighlightClass + "'> " + i + "</span>";
            }

            formattedCode += "</span>";
        }

        return {
            totalLines: totalLines,
            formattedCode: formattedCode
        };
    }

    /**
     * this function will apply the custom style.
     *
     * @param el
     * @param parentEl
     * @param {object} option
     */
    function applyCustomStyle(el, parentEl, option) {
        // variables
        var
            cssRules = '',
            head = document.head || document.getElementsByTagName('head')[0],
            style,
            customStyleElemID
        ;

        // generate random id
        customStyleElemID = DY_CODEHIGHLIGHTER_CUSTOM_STYLE_RANDOM_ID + (new global.Date().getTime().toString()) + global.parseInt(global.Math.random() * 1000);

        // add custom style id to the parent element of the el element
        parentEl.setAttribute('id', customStyleElemID);

        /**
         * create the css style rules that will be applied to the el element
         */

        // apply style to the el element code
        if (typeof option.borderTop === 'undefined') {
            option.borderTop = option.border;
        }
        if (typeof option.borderRight === 'undefined') {
            option.borderRight = option.border;
        }
        if (typeof option.borderBottom === 'undefined') {
            option.borderBottom = option.border;
        }
        if (typeof option.borderLeft === 'undefined') {
            option.borderLeft = option.border;
        }
        cssRules += '#' + customStyleElemID + ' pre.' + DY_CODEHIGHLIGHTER_CLASS + '{' +
            'background-color: ' + option.backgroundColor + ';' +
            'color: ' + option.color + ';' +
            'font-size: ' + option.fontSize + ';' +
            'border: ' + option.border + ';' +
            'border-top: ' + option.borderTop +';' +
            'border-right: ' + option.borderRight +';' +
            'border-bottom: ' + option.borderBottom +';' +
            'border-left: ' + option.borderLeft +';' +
            '}';

        // apply style to line numbers
        cssRules += '#' + customStyleElemID + ' span.' + DY_CODEHIGHLIGHTER_CLASS_CODE_LINE_NUMBER + '{' +
            'color:' + option.color + ';' +
            '}';

        // apply style to the line numbers rows
        cssRules += '#' + customStyleElemID + ' span.' + DY_CODEHIGHLIGHTER_CLASS_LINE_NUMBER_ROWS + '{' +
            'border-right: ' + option.lineNumbersBorder + ';' +
            '}';

        // apply style to highlighted lines
        cssRules += '#' + customStyleElemID + ' span.' + DY_CODEHIGHLIGHTER_CLASS_CODE_LINE + '.' + DY_CODEHIGHLIGHTER_CLASS_CODE_LINE_HIGHLIGHT + '{' +
            'background-color:' + option.highlightBgColor + ';' +
            'color:' + option.highlightColor + ';' +
            '}';

        // apply style to highlighted line numbers
        cssRules += '#' + customStyleElemID + ' span.' + DY_CODEHIGHLIGHTER_CLASS_CODE_LINE_NUMBER + '.' + DY_CODEHIGHLIGHTER_CLASS_CODE_LINE_HIGHLIGHT + '{' +
            'background-color:' + option.highlightBgColor + ';' +
            'color:' + option.highlightColor + ';' +
            '}';

        // create the style element html
        style = document.createElement('style');
        style.type = 'text/css';

        // attach the css rule to the style element
        if (style.styleSheet) {
            style.styleSheet.cssText = cssRules;
        } else {
            style.appendChild(document.createTextNode(cssRules));
        }

        // append the style to the head
        head.appendChild(style);
    }

    /**
     * This will initialise dyCodeHighlighter.
     */
    dyCodeHighlighter.init = function () {

        // variables
        var
            self = this,
            elArr;

        // get targeted elements
        elArr = document.getElementsByClassName(DY_CODEHIGHLIGHTER_CLASS);

        Array.prototype.forEach.call(elArr, function (elem, idx) {

            // variables
            var
                // container element that will enclose the elem element
                containerEl = document.createElement('div'),

                // default settings for the custom style for the selected elem element
                defaultCustomStyle = {
                    /**
                     * value: true, false
                     * if true then, applying the custom style set by the user
                     */
                    isApplied: false,

                    /**
                     * this is for the background color
                     * optional
                     * value in valid color name, hex, rgb, rgba
                     */
                    backgroundColor: '#fff',

                    /**
                     * this is for the color of the text
                     * optional
                     * value in valid color name, hex, rgb, rgba
                     */
                    color: '#333',

                    /**
                     * highlighted line background color
                     * optional
                     * value in valid color name, hex, rgb, rgba
                     */
                    highlightBgColor: '#fff8dc',

                    /**
                     * highlighted line text color
                     * optional
                     * value in valid color name, hex, rgb, rgba
                     */
                    highlightColor: '#333',

                    /**
                     * this is to style the border - top right bottom left
                     * optional
                     * value in valid form 'width style color' like '5px solid #aaa' or 'none'
                     */
                    border: '1px solid #aaa',

                    /**
                     * font size
                     * optional
                     * value in valid font size unit like: 20px
                     */
                    fontSize: 'initial',

                    /**
                     * line numbers border color
                     * optional
                     * value in valid form 'width style color' like '5px solid #aaa'
                     */
                    lineNumbersBorder: '#999'
                },

                // default header settings for the selected elem element
                defaultHeader = {
                    /**
                     * value: true, false
                     * if true then, user wants to show the header
                     */
                    show: false,

                    /**
                     * values: 'show', 'hide'
                     * if set to 'show' then, show the number of lines in the code
                     * eg: 21 lines
                     */
                    lines: 'hide',

                    /**
                     * this will be set only if the 'lines' property is set i.e., option.header.lines = 'show'
                     */
                    totalLines: 0,

                    /**
                     * file name to display
                     * eg: app.js
                     */
                    filename: ''
                },

                // default options for the selected elem element
                option = {
                    /**
                     * value: true, false
                     * if true then, show line numbers
                     */
                    showLineNumbers: false,

                    /**
                     * array containing line numbers that will be highlighted
                     * eg: [10,11,12]
                     */
                    highlightLines: [],

                    /**
                     * this is the integer number for the starting i.e., first line
                     */
                    lineStart: 1,

                    /**
                     * this holds the header information
                     * type: object
                     */
                    header: defaultHeader,

                    /**
                     * this holds the custom style information
                     * type: object
                     */
                    customStyle: defaultCustomStyle
                },

                // get the first child <code> element of the selected elem
                codeEl = elem.getElementsByTagName('code')[0],

                // get the text content of the selected <code> element
                codeContent = codeEl.textContent,

                // formatted code object
                formattedCodeObj,

                // line numbers rows <span> element
                lineNumbersRowsSpan;

            /**
             * prepare the container element
             */

            // add the container class to the container element
            containerEl.className = DY_CODEHIGHLIGHTER_CLASS_CONTAINER;

            /**
             * prepare the selected elem element
             */

            // add the body class to the selected elem element
            elem.className += " " + DY_CODEHIGHLIGHTER_CLASS_BODY;

            // check if the user wants to show line numbers
            option.showLineNumbers = hasClass(elem, 'line-numbers');

            // check if the user wants to highlight any lines
            if (elem.hasAttribute(DY_CODEHIGHLIGHTER_DATA_ATTRIBUTE_HIGHLIGHT)) {
                option.highlightLines = elem.getAttribute(DY_CODEHIGHLIGHTER_DATA_ATTRIBUTE_HIGHLIGHT).split(",");
            }

            // check if the user wants to start line number from other value
            if (elem.hasAttribute(DY_CODEHIGHLIGHTER_DATA_ATTRIBUTE_LINE_START)) {
                option.lineStart = global.parseInt(elem.getAttribute(DY_CODEHIGHLIGHTER_DATA_ATTRIBUTE_LINE_START));
            }

            // check if the user wants to show header
            if (elem.hasAttribute(DY_CODEHIGHLIGHTER_DATA_ATTRIBUTE_HEADER)) {
                option.header = extendSource(JSON.parse(elem.getAttribute(DY_CODEHIGHLIGHTER_DATA_ATTRIBUTE_HEADER)), defaultHeader);
                option.header.show = true;
            }

            // check if the user wants to apply custom style
            if (elem.hasAttribute(DY_CODEHIGHLIGHTER_DATA_ATTRIBUTE_CUSTOM_STYLE)) {
                option.customStyle = extendSource(JSON.parse(elem.getAttribute(DY_CODEHIGHLIGHTER_DATA_ATTRIBUTE_CUSTOM_STYLE)), defaultCustomStyle);
                option.customStyle.isApplied = true;
            }

            global.console.log(option);

            // get formatted code from the code content
            formattedCodeObj = getFormattedCode(codeContent, option);

            // update the selected <code> element HTML
            codeEl.innerHTML = formattedCodeObj.formattedCode;

            // if applying custom style
            if (option.customStyle.isApplied) {
                applyCustomStyle(elem, containerEl, option.customStyle);
            }

            // if showing line numbers then adjust line number rows
            // if (option.showLineNumbers) {
            //     lineNumbersRowsSpan = elem.querySelector("span." + DY_CODEHIGHLIGHTER_CLASS_LINE_NUMBER_ROWS);
            //     // lineNumbersRowsSpan.style.counterReset = "linenumber " + (option.lineStart - 1);
            //     lineNumbersRowsSpan.style.left = -lineNumbersRowsSpan.offsetWidth - 20 + "px";
            //     lineNumbersRowsSpan.style.width = lineNumbersRowsSpan.offsetWidth + 10 + "px";
            //     elem.style.paddingLeft = lineNumbersRowsSpan.offsetWidth + 10 + "px";
            // }

            //--------------- wrap the selected elem element inside the container element --------------
            wrap(elem, containerEl);

            // if showing header
            if (option.header.show === true) {

                // append totalLines to the header object if showing lines
                if (option.header.lines === 'show') {
                    option.header.totalLines = formattedCodeObj.totalLines;
                }

                // add header to the container element
                addHeader(containerEl, option.header);
            }

            // if showing line numbers then adjust line number rows
            if (option.showLineNumbers) {
                lineNumbersRowsSpan = elem.querySelector("span." + DY_CODEHIGHLIGHTER_CLASS_LINE_NUMBER_ROWS);
                // lineNumbersRowsSpan.style.counterReset = "linenumber " + (option.lineStart - 1);
                lineNumbersRowsSpan.style.left = -lineNumbersRowsSpan.offsetWidth - 20 + "px";
                lineNumbersRowsSpan.style.width = lineNumbersRowsSpan.offsetWidth + 10 + "px";
                elem.style.paddingLeft = lineNumbersRowsSpan.offsetWidth + 10 + "px";
            }

        });
    };

    global.dyCodeHighlighter = dyCodeHighlighter;

}(typeof window !== "undefined" ? window : this));