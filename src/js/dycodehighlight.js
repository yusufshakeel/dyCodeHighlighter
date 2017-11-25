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
        DY_CODEHIGHLIGHTER_CLASS_CODE_LINE = "dyCodeHighlighter-code-line",
        DY_CODEHIGHLIGHTER_CLASS_LINE_NUMBER_ROWS = "line-numbers-rows";

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
     * @returns {string}
     */
    function getFormatedCode(code, option) {
        var
            formatedCode = "",
            lines,
            i;

        // split the code into lines
        lines = code.split("\n");

        // enclose in span
        for (i = 0; i < lines.length; i++) {
            formatedCode += "<span class='" + DY_CODEHIGHLIGHTER_CLASS_CODE_LINE + "'>" + lines[i] + "</span>";
        }

        // add line numbers rows if user wants
        if (option.showLineNumbers) {
            formatedCode += "<span class='" + DY_CODEHIGHLIGHTER_CLASS_LINE_NUMBER_ROWS + "'>";
            for (i = 0; i < lines.length; i++) {
                formatedCode += "<span></span>";
            }
        }

        return formatedCode;
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
                codeContent = codeEl.textContent;

            global.console.log(codeEl);
            global.console.log(codeContent);

            // check if the user wants to show line numbers
            option.showLineNumbers = hasClass(elem, 'line-numbers');

            global.console.log(option);

        });
    };

    global.dyCodeHighlighter = dyCodeHighlighter;

}(typeof window !== "undefined" ? window : this));