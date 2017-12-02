# dyCodeHighlighter
Highlight code in the web page.

# Status

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yusufshakeel/dyCodeHighlighter)
[![npm version](https://img.shields.io/badge/npm-1.3.0-blue.svg)](https://www.npmjs.com/package/dycodehighlighter)
[![](https://data.jsdelivr.com/v1/package/npm/dycodehighlighter/badge)](https://www.jsdelivr.com/package/npm/dycodehighlighter)

# Documentation
[Click here](https://www.dyclassroom.com/dycodehighlighter/documentation) for the project documentation.

# Getting Started
* [Download](https://github.com/yusufshakeel/dyCodeHighlighter/releases) the latest release of this project.
* Clone the repo: `git clone https://github.com/yusufshakeel/dyCodeHighlighter.git`
* Install with npm: `npm install dycodehighlighter`
* From jsDelivr CDN: `https://www.jsdelivr.com/package/npm/dycodehighlighter`

# How to use?
Include the Javascript and Stylesheet file from the `dist` directory.

Then call the `init()` method of `dyCodeHighlighter`.

Sample:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>dyCodeHighlighter</title>
    <!-- dyCodeHighlighter stylesheet -->
    <link rel="stylesheet" href="path/to/dist/css/dycodehighlighter.min.css">
</head>
<body>
    
    <pre class='dyCodeHighlighter'>
      <code>
        // some code goes here...
      </code>
    </pre>

    <!-- dyCodeHighlighter javascript -->
    <script src="path/to/dist/js/dycodehighlighter.min.js"></script>
    <script>dyCodeHighlighter.init();</script>
</body>
</html>
```

# Features
* Style `pre.dyCodeHighlighter code` content
* Show line numbers
* Highlight lines
* Show header info like: total lines and filename
* Start line number from a custom integer value like -10, 0, 10 etc.
* Theme: blue, choco, dark, gray
* Custom style


# License
It's free and released under [MIT License](https://github.com/yusufshakeel/dyCodeHighlighter/blob/master/LICENSE) Copyright (c) 2017 Yusuf Shakeel

# Donate
Feeling generous :-) Buy me a cup of tea.

[Donate via PayPal](https://www.paypal.me/yusufshakeel)