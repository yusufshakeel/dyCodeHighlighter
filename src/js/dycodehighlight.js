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
        DY_CODEHIGHLIGHTER_CLASS_LINE_NUMBER_ROWS = "dyCodeHighlighter-line-numbers-rows";

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
            i;

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
            formattedCode += "<span class='" + DY_CODEHIGHLIGHTER_CLASS_CODE_LINE + "'>" + lines[i] + "</span>";
        }

        // add line numbers rows if user wants
        if (option.showLineNumbers) {
            formattedCode += "<span class='" + DY_CODEHIGHLIGHTER_CLASS_LINE_NUMBER_ROWS + "'>";
            for (i = 0; i < totalLines; i++) {
                formattedCode += "<span></span>";
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
                showLineNumbers: false
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
                lineNumbersRowsSpan,

                // last line number span width
                lastLineNumberSpanTagWidth;

            global.console.log(codeEl);
            global.console.log(codeContent);

            // check if the user wants to show line numbers
            option.showLineNumbers = hasClass(elem, 'line-numbers');

            global.console.log(option);

            // get formatted code from the code content
            formattedCodeObj = getFormattedCode(codeContent, option);

            global.console.log(formattedCodeObj);

            // update the selected <code> element HTML
            codeEl.innerHTML = formattedCodeObj.formattedCode;

            // if showing line numbers then adjust line number rows padding
            if (option.showLineNumbers) {
                lineNumbersRowsSpan = elem.querySelector("span." + DY_CODEHIGHLIGHTER_CLASS_LINE_NUMBER_ROWS);
                lastLineNumberSpanTagWidth = lineNumbersRowsSpan.lastChild.offsetWidth;
                console.log(lastLineNumberSpanTagWidth);

                elem.style.paddingLeft = lastLineNumberSpanTagWidth + 20 + "px";
                lineNumbersRowsSpan.style.left = -lastLineNumberSpanTagWidth - 20 + "px";
                lineNumbersRowsSpan.style.width = lastLineNumberSpanTagWidth + 10 + "px";
            }

        });
    };

    global.dyCodeHighlighter = dyCodeHighlighter;

}(typeof window !== "undefined" ? window : this));