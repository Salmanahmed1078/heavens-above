#!/usr/bin/env node

/**
 * Health check script for the heavens-above application
 */

const fs = require('fs');
const path = require('path');

console.log('🏥 Running health check...');

function checkFileSystem() {
    console.log('📁 Checking file system...');
    
    const requiredPaths = [
        path.join(__dirname, '../src'),
        path.join(__dirname, '../public'),
        path.join(__dirname, '../package.json'),
        path.join(__dirname, '../run.js')
    ];
    
    const missing = [];
    
    requiredPaths.forEach(requiredPath => {
        if (!fs.existsSync(requiredPath)) {
            missing.push(requiredPath);
            console.log(`❌ Missing: ${requiredPath}`);
        } else {
            console.log(`✅ Found: ${requiredPath}`);
        }
    });
    
    return missing.length === 0;
}

function checkDependencies() {
    console.log('📦 Checking dependencies...');
    
    try {
        const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
        const dependencies = Object.keys(packageJson.dependencies || {});
        
        let allDependenciesOk = true;
        
        dependencies.forEach(dep => {
            try {
                require(dep);
                console.log(`✅ Dependency OK: ${dep}`);
            } catch (error) {
                console.log(`❌ Dependency missing: ${dep}`);
                allDependenciesOk = false;
            }
        });
        
        return allDependenciesOk;
    } catch (error) {
        console.log(`❌ Failed to read package.json: ${error.message}`);
        return false;
    }
}

function checkApplicationLogic() {
    console.log('🔧 Checking application logic...');
    
    try {
        // Check if the main application files are valid JavaScript
        const mainFiles = [
            path.join(__dirname, '../run.js'),
            path.join(__dirname, '../src/satellite.js'),
            path.join(__dirname, '../src/iridium.js'),
            path.join(__dirname, '../src/utils.js')
        ];
        
        let allFilesValid = true;
        
        mainFiles.forEach(file => {
            if (fs.existsSync(file)) {
                try {
                    const content = fs.readFileSync(file, 'utf8');
                    // Basic syntax check by attempting to parse
                    new Function(content);
                    console.log(`✅ Valid JavaScript: ${path.basename(file)}`);
                } catch (error) {
                    console.log(`❌ Invalid JavaScript: ${path.basename(file)} - ${error.message}`);
                    allFilesValid = false;
                }
            }
        });
        
        return allFilesValid;
    } catch (error) {
        console.log(`❌ Failed to check application logic: ${error.message}`);
        return false;
    }
}

function checkDataDirectory() {
    console.log('📊 Checking data directory...');
    
    const dataDir = path.join(__dirname, '../public/data');
    
    if (!fs.existsSync(dataDir)) {
        console.log('⚠️  Data directory does not exist - this is normal for first run');
        return true;
    }
    
    try {
        const files = fs.readdirSync(dataDir);
        console.log(`✅ Data directory contains ${files.length} files`);
        
        if (files.length === 0) {
            console.log('⚠️  Data directory is empty - application may need to run to generate data');
        }
        
        return true;
    } catch (error) {
        console.log(`❌ Failed to check data directory: ${error.message}`);
        return false;
    }
}

function generateHealthReport() {
    const checks = [
        { name: 'File System', result: checkFileSystem() },
        { name: 'Dependencies', result: checkDependencies() },
        { name: 'Application Logic', result: checkApplicationLogic() },
        { name: 'Data Directory', result: checkDataDirectory() }
    ];
    
    const allChecksPassed = checks.every(check => check.result);
    
    const report = {
        timestamp: new Date().toISOString(),
        status: allChecksPassed ? 'healthy' : 'unhealthy',
        checks: checks.map(check => ({
            name: check.name,
            status: check.result ? 'pass' : 'fail'
        })),
        summary: {
            total: checks.length,
            passed: checks.filter(check => check.result).length,
            failed: checks.filter(check => !check.result).length
        }
    };
    
    // Save report
    const reportsDir = path.join(__dirname, '../reports');
    if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    const reportPath = path.join(reportsDir, `health-check-${new Date().toISOString().split('T')[0]}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    return report;
}

// Main function
async function main() {
    try {
        console.log('🚀 Starting health check...\n');
        
        const report = generateHealthReport();
        
        console.log('\n📋 Health Check Summary:');
        console.log(`Status: ${report.status === 'healthy' ? '✅ Healthy' : '❌ Unhealthy'}`);
        console.log(`Total checks: ${report.summary.total}`);
        console.log(`Passed: ${report.summary.passed}`);
        console.log(`Failed: ${report.summary.failed}`);
        
        if (report.status === 'healthy') {
            console.log('\n🎉 All health checks passed!');
            process.exit(0);
        } else {
            console.log('\n⚠️  Some health checks failed. Please review the output above.');
            process.exit(1);
        }
        
    } catch (error) {
        console.error('❌ Health check failed:', error.message);
        process.exit(1);
    }
}

main();
