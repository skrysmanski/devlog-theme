const { glob } = require('glob');
const fs = require('fs').promises;
const beautify = require('js-beautify');

const pathPattern = process.argv[2];
if (!pathPattern) {
    throw 'Missing parameter';
}

(async () => {
    const filePaths = await glob(pathPattern);

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
