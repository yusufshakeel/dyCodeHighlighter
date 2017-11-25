# dyCodeHighlighter
Highlight code in the web page.

# Getting Started
* [Download](https://github.com/yusufshakeel/dyCodeHighlighter/releases) the latest release of this project.
* Clone the repo: `git clone https://github.com/yusufshakeel/dyCodeHighlighter.git`
* Install with npm: `npm install dycodehighlighter`


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
* Start line number from given value


# License
It's free and released under [MIT License](https://github.com/yusufshakeel/dyCodeHighlighter/blob/master/LICENSE) Copyright (c) 2017 Yusuf Shakeel

# Donate
Feeling generous :-) Buy me a cup of tea.

[Donate via PayPal](https://www.paypal.me/yusufshakeel)