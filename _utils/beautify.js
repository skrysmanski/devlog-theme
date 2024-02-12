const { glob } = require('glob');
const fs = require('fs').promises;
const path = require('path');
const beautify = require('js-beautify');

async function beautifyHtmlFiles(rootPath) {
    console.log('Beautifying HTML files...');
    console.log();

    const htmlFilePaths = await glob(`${rootPath}/**/*.html`);

    // See: https://www.npmjs.com/package/js-beautify
    const beautifyOptions = {
        "indent_size": 2,
        "space_in_empty_paren": true,
        "end_with_newline": true,
        "max_preserve_newlines": 1,
        // NOTE: We exclude <script> from reformatting to not break CSP hashes.
        "content_unformatted": [ 'pre', 'script' ],
        "extra_liners": [ 'head', '/head', 'body', '/body' ],
    };

    const beautifyHtmlPromises = htmlFilePaths.map(async (filePath) => {
         const fileContents = await fs.readFile(filePath, { encoding: 'utf8' });

        const beautifiedHtml = beautify.html(fileContents, beautifyOptions);

        fs.writeFile(filePath, beautifiedHtml, { encoding: 'utf8' });

        console.log(`Beautified: ${filePath}`);
    });

    await Promise.all(beautifyHtmlPromises);
}

(async () => {
    let rootPath = process.argv[2];
    if (!rootPath) {
        throw 'Missing parameter';
    }

    rootPath = path.resolve(rootPath);
    console.log(`Beautifying files in: ${rootPath}`);
    console.log();

    await beautifyHtmlFiles(rootPath);
})();
