const { glob } = require('glob');
const fs = require('fs').promises;
const path = require('path');
const beautify = require('js-beautify');

(async () => {
    let rootPath = process.argv[2];
    if (!rootPath) {
        throw 'Missing parameter';
    }

    rootPath = path.resolve(rootPath);
    console.log(`Beautifying files in: ${rootPath}`)

    const filePaths = await glob(`${rootPath}/**/*.html`);

    const beautifyPromises = filePaths.map(async (filePath) => {
         const fileContents = await fs.readFile(filePath, { encoding: 'utf8' });

        const beautifiedHtml = beautify.html(fileContents, {
            indent_size: 2,
            space_in_empty_paren: true,
        });

        fs.writeFile(filePath, beautifiedHtml, { encoding: 'utf8' });

        console.log(`Beautified: ${filePath}`);
    });

    await Promise.all(beautifyPromises);
})();
