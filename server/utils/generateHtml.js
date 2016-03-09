import sass     from 'node-sass';
import juice    from 'juice';
import Promise  from 'bluebird';
import path     from 'path';
import fs       from 'fs';

const renderSass = Promise.promisify(sass.render, sass);
const html = fs.readFileSync(path.join(__dirname, '../genetic_utils/template.html'), {encoding: 'utf-8'});
const scss = fs.readFileSync(path.join(__dirname, '../genetic_utils/styles.scss'), {encoding: 'utf-8'});

export default function(styleVars) {
    const scssWithVars = genVariables(styleVars) + scss;
    return renderSass({data: scssWithVars, includePaths: ['node_modules/']})
        .then(data => {
            return juice(html, {
                extraCss: data.css.toString(),
                preserveFontFaces: true,
                insertPreservedExtraCss: '#dynamic-content'
            });
        })
}

function genVariables(vars) {
    return Object.keys(vars).map(name => {
        return '$' + name + ': ' + vars[name] + ';';
    }).join('\n')
}