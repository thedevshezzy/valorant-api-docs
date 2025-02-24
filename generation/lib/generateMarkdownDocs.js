const fs = require('fs').promises;
const path = require('path');
const util = require('util');
const rimraf = util.promisify(require('rimraf'));

async function generateMarkdownDocs(docsDir, dataManager)
{
    // Remove docs dir if it exists and recreate it
    try
    {
        await rimraf(docsDir);
        await fs.mkdir(docsDir);
    } catch(ignored) {}
    
    // Create folders
    for(const folder of dataManager.folders)
    {
        const folderParts = folder.split('/')
        const folderPath = path.join(docsDir, ...folderParts);
        await fs.mkdir(folderPath, {recursive: true});
        
        let readmeText = `# ${folderParts[folderParts.length - 1]}\n\n`;
        const endpointsForFolder = dataManager.endpoints.filter(endpoint => endpoint.folder === folder);
        if(endpointsForFolder.length !== 0)
        {
            readmeText += '### Endpoints:\n';
            for(const endpoint of endpointsForFolder)
            {
                readmeText += ` - [${endpoint.name}](${endpoint.method}%20${endpoint.name.replaceAll(' ', '%20')}.md)`;
                if(endpoint.description)
                {
                    readmeText += ' - ' + endpoint.description.split('\n')[0];
                }
                readmeText += '\n';
            }
            readmeText += '\n';
        }
        await fs.writeFile(path.join(folderPath, 'readme.md'), readmeText, 'utf-8');
    }
    
    // Write endpoints
    for(const endpoint of dataManager.endpoints)
    {
        const endpointFile = path.join(docsDir, ...(endpoint.folder || '').split('/'), `${endpoint.method} ${endpoint.name}.md`);
        await fs.writeFile(endpointFile, dataManager.renderEndpoint(endpoint, 'github'), 'utf-8');
    }
    
    // Write docs
    for(const docName in dataManager.docs)
    {
        const docFile = path.join(docsDir, docName + '.md');
        await fs.writeFile(docFile, dataManager.renderDoc(docName, 'github'), 'utf-8');
    }
}

module.exports = generateMarkdownDocs;
