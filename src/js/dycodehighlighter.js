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
                    header: defaultHeader
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
                option.lineStart = parseInt(elem.getAttribute(DY_CODEHIGHLIGHTER_DATA_ATTRIBUTE_LINE_START));
            }

            // check if the user wants to show header
            if (elem.hasAttribute(DY_CODEHIGHLIGHTER_DATA_ATTRIBUTE_HEADER)) {
                option.header = extendSource(JSON.parse(elem.getAttribute(DY_CODEHIGHLIGHTER_DATA_ATTRIBUTE_HEADER)), defaultHeader);
                option.header.show = true;
            }

            // get formatted code from the code content
            formattedCodeObj = getFormattedCode(codeContent, option);

            // update the selected <code> element HTML
            codeEl.innerHTML = formattedCodeObj.formattedCode;

            // if showing line numbers then adjust line number rows
            if (option.showLineNumbers) {
                lineNumbersRowsSpan = elem.querySelector("span." + DY_CODEHIGHLIGHTER_CLASS_LINE_NUMBER_ROWS);
                // lineNumbersRowsSpan.style.counterReset = "linenumber " + (option.lineStart - 1);
                lineNumbersRowsSpan.style.left = -lineNumbersRowsSpan.offsetWidth - 20 + "px";
                lineNumbersRowsSpan.style.width = lineNumbersRowsSpan.offsetWidth + 10 + "px";
                elem.style.paddingLeft = lineNumbersRowsSpan.offsetWidth + 10 + "px";
            }

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

        });
    };

    global.dyCodeHighlighter = dyCodeHighlighter;

}(typeof window !== "undefined" ? window : this));