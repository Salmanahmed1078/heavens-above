#!/usr/bin/env node

/**
 * Documentation generation script
 */

const fs = require('fs');
const path = require('path');

console.log('📚 Generating documentation...');

// Create docs directory structure
const docsDir = path.join(__dirname, '../docs');
const buildDir = path.join(docsDir, 'build');

if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
}

if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
}

// Generate API documentation
function generateApiDocs() {
    console.log('🔧 Generating API documentation...');
    
    const srcDir = path.join(__dirname, '../src');
    const apiDocs = [];
    
    if (fs.existsSync(srcDir)) {
        const files = fs.readdirSync(srcDir);
        
        files.forEach(file => {
            if (file.endsWith('.js')) {
                const filePath = path.join(srcDir, file);
                const content = fs.readFileSync(filePath, 'utf8');
                
                // Extract function documentation (basic)
                const functions = extractFunctions(content);
                
                if (functions.length > 0) {
                    apiDocs.push({
                        file: file,
                        functions: functions
                    });
                }
            }
        });
    }
    
    return apiDocs;
}

function extractFunctions(content) {
    const functions = [];
    const lines = content.split('\n');
    
    let currentFunction = null;
    
    lines.forEach((line, index) => {
        // Look for function declarations
        const funcMatch = line.match(/(?:function\s+(\w+)|const\s+(\w+)\s*=\s*(?:async\s+)?function|(\w+)\s*:\s*(?:async\s+)?function)/);
        
        if (funcMatch) {
            if (currentFunction) {
                functions.push(currentFunction);
            }
            
            currentFunction = {
                name: funcMatch[1] || funcMatch[2] || funcMatch[3],
                line: index + 1,
                description: ''
            };
            
            // Look for JSDoc comment above
            let docLine = index - 1;
            while (docLine >= 0 && lines[docLine].trim().startsWith('*')) {
                currentFunction.description = lines[docLine].replace(/^\s*\*\s?/, '') + ' ' + currentFunction.description;
                docLine--;
            }
            
            if (currentFunction.description.trim() === '') {
                currentFunction.description = 'No description available';
            }
        }
    });
    
    if (currentFunction) {
        functions.push(currentFunction);
    }
    
    return functions;
}

// Generate HTML documentation
function generateHtmlDocs(apiDocs) {
    console.log('🌐 Generating HTML documentation...');
    
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Heavens Above - API Documentation</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; border-bottom: 2px solid #007acc; padding-bottom: 10px; }
        h2 { color: #555; margin-top: 30px; }
        .function { background: #f8f9fa; padding: 15px; margin: 10px 0; border-left: 4px solid #007acc; border-radius: 4px; }
        .function-name { font-weight: bold; color: #007acc; font-size: 1.1em; }
        .function-description { margin-top: 8px; color: #666; }
        .file-section { margin-bottom: 30px; }
        .toc { background: #e9ecef; padding: 20px; border-radius: 4px; margin-bottom: 30px; }
        .toc ul { list-style: none; padding: 0; }
        .toc li { padding: 5px 0; }
        .toc a { text-decoration: none; color: #007acc; }
        .toc a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Heavens Above - API Documentation</h1>
        
        <div class="toc">
            <h2>📋 Table of Contents</h2>
            <ul>
                ${apiDocs.map(doc => `<li><a href="#${doc.file}">${doc.file}</a></li>`).join('')}
            </ul>
        </div>
        
        ${apiDocs.map(doc => `
        <div class="file-section">
            <h2 id="${doc.file}">📁 ${doc.file}</h2>
            ${doc.functions.map(func => `
            <div class="function">
                <div class="function-name">🔧 ${func.name}()</div>
                <div class="function-description">${func.description}</div>
                <div style="margin-top: 8px; font-size: 0.9em; color: #888;">Line: ${func.line}</div>
            </div>
            `).join('')}
        </div>
        `).join('')}
        
        <footer style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; text-align: center;">
            <p>Generated on ${new Date().toLocaleString()}</p>
        </footer>
    </div>
</body>
</html>
    `;
    
    fs.writeFileSync(path.join(buildDir, 'index.html'), html);
    console.log('✅ HTML documentation generated');
}

// Generate README for docs
function generateReadme() {
    const readme = `# Heavens Above Documentation

This directory contains the generated documentation for the Heavens Above project.

## 📁 Structure

- \`build/\` - Generated documentation files
- \`source/\` - Source documentation files (Markdown)

## 🔧 Generated Documentation

- **API Documentation** - Auto-generated from source code
- **User Guide** - Manual documentation
- **Developer Guide** - Setup and contribution guidelines

## 📚 Usage

The documentation is automatically generated and deployed to GitHub Pages when changes are made to the documentation files.

## 🔄 Regeneration

To regenerate the documentation:

\`\`\`bash
npm run docs:generate
\`\`\`

## 📖 Viewing

The documentation can be viewed at: https://[your-username].github.io/heavens-above/

---

*Last updated: ${new Date().toISOString()}*
`;

    fs.writeFileSync(path.join(docsDir, 'README.md'), readme);
}

// Main function
async function main() {
    try {
        console.log('🚀 Starting documentation generation...\n');
        
        const apiDocs = generateApiDocs();
        generateHtmlDocs(apiDocs);
        generateReadme();
        
        console.log('\n✅ Documentation generation completed!');
        console.log(`📁 Documentation saved to: ${buildDir}`);
        
    } catch (error) {
        console.error('❌ Documentation generation failed:', error.message);
        process.exit(1);
    }
}

main();
