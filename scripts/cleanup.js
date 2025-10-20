#!/usr/bin/env node

/**
 * Daily cleanup script for maintenance tasks
 */

const fs = require('fs');
const path = require('path');

console.log('🧹 Starting daily cleanup...');

// Clean up old log files (older than 7 days)
function cleanOldLogs() {
    const logDir = path.join(__dirname, '../logs');
    if (!fs.existsSync(logDir)) {
        console.log('📁 No logs directory found');
        return;
    }

    const files = fs.readdirSync(logDir);
    const now = Date.now();
    const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);

    let cleanedCount = 0;
    files.forEach(file => {
        const filePath = path.join(logDir, file);
        const stats = fs.statSync(filePath);
        
        if (stats.mtime.getTime() < sevenDaysAgo) {
            fs.unlinkSync(filePath);
            cleanedCount++;
            console.log(`🗑️  Deleted old log: ${file}`);
        }
    });

    console.log(`✅ Cleaned ${cleanedCount} old log files`);
}

// Clean up temporary files
function cleanTempFiles() {
    const tempDir = path.join(__dirname, '../temp');
    if (!fs.existsSync(tempDir)) {
        console.log('📁 No temp directory found');
        return;
    }

    const files = fs.readdirSync(tempDir);
    let cleanedCount = 0;
    
    files.forEach(file => {
        const filePath = path.join(tempDir, file);
        fs.unlinkSync(filePath);
        cleanedCount++;
        console.log(`🗑️  Deleted temp file: ${file}`);
    });

    console.log(`✅ Cleaned ${cleanedCount} temporary files`);
}

// Clean up old reports (older than 30 days)
function cleanOldReports() {
    const reportsDir = path.join(__dirname, '../reports');
    if (!fs.existsSync(reportsDir)) {
        console.log('📁 No reports directory found');
        return;
    }

    const files = fs.readdirSync(reportsDir);
    const now = Date.now();
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);

    let cleanedCount = 0;
    files.forEach(file => {
        const filePath = path.join(reportsDir, file);
        const stats = fs.statSync(filePath);
        
        if (stats.mtime.getTime() < thirtyDaysAgo) {
            fs.unlinkSync(filePath);
            cleanedCount++;
            console.log(`🗑️  Deleted old report: ${file}`);
        }
    });

    console.log(`✅ Cleaned ${cleanedCount} old report files`);
}

// Main cleanup function
async function main() {
    try {
        cleanOldLogs();
        cleanTempFiles();
        cleanOldReports();
        
        console.log('🎉 Daily cleanup completed successfully!');
        
        // Create cleanup report
        const report = {
            timestamp: new Date().toISOString(),
            status: 'success',
            message: 'Daily cleanup completed successfully'
        };
        
        const reportPath = path.join(__dirname, '../reports', `cleanup-${new Date().toISOString().split('T')[0]}.json`);
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        
    } catch (error) {
        console.error('❌ Cleanup failed:', error.message);
        process.exit(1);
    }
}

main();
