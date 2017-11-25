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

    // variables
    var
        dyCodeHighlighter = {},
        document = global.document;

    // constants
    const
        DY_CODEHIGHLIGHTER_CLASS = "dyCodeHighlighter",
        DY_CODEHIGHLIGHTER_CLASS_CODE_LINE = "dyCodeHighlighter-line",
        DY_CODEHIGHLIGHTER_CLASS_CODE_LINE_HIGHLIGHT = "highlight",
        DY_CODEHIGHLIGHTER_CLASS_LINE_NUMBER_ROWS = "dyCodeHighlighter-line-numbers-rows",
        DY_CODEHIGHLIGHTER_DATA_ATTRIBUTE_HIGHLIGHT = "data-dyCodeHighlighter-highlight",
        DY_CODEHIGHLIGHTER_DATA_ATTRIBUTE_LINE_START = "data-dyCodeHighlighter-line-start";

    /**
     * This function will check if selected element has a given class.
     */
    function hasClass(el, val) {
        return el.className.split(" ").indexOf(val) >= 0;
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
            lineHighlightClass = "";

        // split the code into lines
        lines = code.split("\n");

        global.console.log(lines);

        // find total lines
        totalLines = lines.length;

        // replace all empty line with space
        for (i = 0; i < totalLines; i++) {
            if (lines[i].length == 0) {
                lines[i] = " ";
            }
        }

        global.console.log(lines);

        // enclose in span
        for (i = 0; i < totalLines; i++) {
            lineHighlightClass = option.highlightLines.indexOf((i + 1).toString()) >= 0 ? DY_CODEHIGHLIGHTER_CLASS_CODE_LINE_HIGHLIGHT : "";
            formattedCode += "<span class='" + DY_CODEHIGHLIGHTER_CLASS_CODE_LINE + " " + lineHighlightClass + "'>" + lines[i] + "</span>";
        }

        // add line numbers rows if user wants
        if (option.showLineNumbers) {
            formattedCode += "<span class='" + DY_CODEHIGHLIGHTER_CLASS_LINE_NUMBER_ROWS + "'>";
            for (i = 0; i < totalLines; i++) {
                lineHighlightClass = option.highlightLines.indexOf((i + 1).toString()) >= 0 ? DY_CODEHIGHLIGHTER_CLASS_CODE_LINE_HIGHLIGHT : "";
                formattedCode += "<span class='" + lineHighlightClass + "'></span>";
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
            option = {
                showLineNumbers: false,
                highlightLines: [],
                lineStart: 1
            },
            elArr;

        // get targeted elements
        elArr = document.getElementsByClassName(DY_CODEHIGHLIGHTER_CLASS);

        global.console.log(elArr);

        Array.prototype.forEach.call(elArr, function (elem, idx) {

            // variables
            var
                // get the first child <code> element of the selected elem
                codeEl = elem.getElementsByTagName('code')[0],

                // get the text content of the selected <code> element
                codeContent = codeEl.textContent,

                // formatted code
                formattedCodeObj,

                // line numbers row <span>
                lineNumbersRowsSpan;

            global.console.log(codeEl);
            global.console.log(codeContent);

            // check if the user wants to show line numbers
            option.showLineNumbers = hasClass(elem, 'line-numbers');

            // check if the user wants to highlight any lines
            option.highlightLines = elem.hasAttribute(DY_CODEHIGHLIGHTER_DATA_ATTRIBUTE_HIGHLIGHT) ? elem.getAttribute(DY_CODEHIGHLIGHTER_DATA_ATTRIBUTE_HIGHLIGHT).split(",") : [];

            // check if the user wants to start line number from other value.
            option.lineStart = elem.hasAttribute(DY_CODEHIGHLIGHTER_DATA_ATTRIBUTE_LINE_START) ? Number(elem.getAttribute(DY_CODEHIGHLIGHTER_DATA_ATTRIBUTE_LINE_START)) : option.lineStart;

            global.console.log(option);

            // get formatted code from the code content
            formattedCodeObj = getFormattedCode(codeContent, option);

            global.console.log(formattedCodeObj);

            // update the selected <code> element HTML
            codeEl.innerHTML = formattedCodeObj.formattedCode;

            // if showing line numbers then adjust line number rows padding
            if (option.showLineNumbers) {
                lineNumbersRowsSpan = elem.querySelector("span." + DY_CODEHIGHLIGHTER_CLASS_LINE_NUMBER_ROWS);

                lineNumbersRowsSpan.style.counterReset = "linenumber " + (option.lineStart - 1);
                lineNumbersRowsSpan.style.left = -lineNumbersRowsSpan.offsetWidth - 20 + "px";
                lineNumbersRowsSpan.style.width = lineNumbersRowsSpan.offsetWidth + 10 + "px";
                elem.style.paddingLeft = lineNumbersRowsSpan.offsetWidth + 10 + "px";
            }

        });
    };

    global.dyCodeHighlighter = dyCodeHighlighter;

}(typeof window !== "undefined" ? window : this));