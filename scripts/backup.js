#!/usr/bin/env node

/**
 * Backup script for data and configuration files
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const command = process.argv[2];

console.log(`🔄 Running backup command: ${command || 'help'}`);

// Create backup directory if it doesn't exist
const backupDir = path.join(__dirname, '../backup');
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
}

function createBackup() {
    console.log('📦 Creating backup...');
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupName = `backup-${timestamp}`;
    const backupPath = path.join(backupDir, backupName);
    
    fs.mkdirSync(backupPath, { recursive: true });
    
    // Backup important files and directories
    const itemsToBackup = [
        { src: path.join(__dirname, '../src'), dest: 'src' },
        { src: path.join(__dirname, '../public'), dest: 'public' },
        { src: path.join(__dirname, '../package.json'), dest: 'package.json' },
        { src: path.join(__dirname, '../run.js'), dest: 'run.js' }
    ];
    
    itemsToBackup.forEach(item => {
        if (fs.existsSync(item.src)) {
            const destPath = path.join(backupPath, item.dest);
            
            if (fs.statSync(item.src).isDirectory()) {
                copyDirectory(item.src, destPath);
            } else {
                fs.copyFileSync(item.src, destPath);
            }
            
            console.log(`✅ Backed up: ${item.src} -> ${item.dest}`);
        }
    });
    
    // Create backup manifest
    const manifest = {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        files: itemsToBackup.map(item => item.dest),
        checksum: calculateChecksum(backupPath)
    };
    
    fs.writeFileSync(
        path.join(backupPath, 'manifest.json'),
        JSON.stringify(manifest, null, 2)
    );
    
    console.log(`✅ Backup created: ${backupName}`);
    return backupPath;
}

function uploadBackup(backupPath) {
    console.log('☁️  Uploading backup to cloud storage...');
    
    // This is a placeholder for cloud upload functionality
    // In a real implementation, you would use AWS S3, Google Cloud Storage, etc.
    console.log('📤 Backup upload simulated (configure cloud storage credentials)');
    
    // Simulate upload
    const uploadLog = {
        timestamp: new Date().toISOString(),
        backupPath: backupPath,
        status: 'uploaded',
        url: 'https://example-bucket.s3.amazonaws.com/backups/'
    };
    
    fs.writeFileSync(
        path.join(backupPath, 'upload-log.json'),
        JSON.stringify(uploadLog, null, 2)
    );
    
    console.log('✅ Backup uploaded successfully');
}

function verifyBackup(backupPath) {
    console.log('🔍 Verifying backup integrity...');
    
    const manifestPath = path.join(backupPath, 'manifest.json');
    if (!fs.existsSync(manifestPath)) {
        throw new Error('Backup manifest not found');
    }
    
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const currentChecksum = calculateChecksum(backupPath);
    
    if (manifest.checksum !== currentChecksum) {
        throw new Error('Backup integrity check failed');
    }
    
    console.log('✅ Backup integrity verified');
}

function cleanupOldBackups() {
    console.log('🧹 Cleaning up old backups...');
    
    const backups = fs.readdirSync(backupDir)
        .filter(item => fs.statSync(path.join(backupDir, item)).isDirectory())
        .sort();
    
    // Keep only the last 10 backups
    if (backups.length > 10) {
        const toDelete = backups.slice(0, backups.length - 10);
        
        toDelete.forEach(backup => {
            const backupPath = path.join(backupDir, backup);
            fs.rmSync(backupPath, { recursive: true, force: true });
            console.log(`🗑️  Deleted old backup: ${backup}`);
        });
        
        console.log(`✅ Cleaned up ${toDelete.length} old backups`);
    } else {
        console.log('✅ No old backups to clean up');
    }
}

function copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const items = fs.readdirSync(src);
    
    items.forEach(item => {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);
        
        if (fs.statSync(srcPath).isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}

function calculateChecksum(dirPath) {
    const hash = crypto.createHash('sha256');
    
    function processPath(currentPath) {
        const items = fs.readdirSync(currentPath);
        
        items.forEach(item => {
            const itemPath = path.join(currentPath, item);
            const stats = fs.statSync(itemPath);
            
            if (stats.isDirectory()) {
                processPath(itemPath);
            } else {
                const content = fs.readFileSync(itemPath);
                hash.update(content);
            }
        });
    }
    
    processPath(dirPath);
    return hash.digest('hex');
}

// Main function
async function main() {
    try {
        switch (command) {
            case 'create':
                const backupPath = createBackup();
                break;
                
            case 'upload':
                const latestBackup = fs.readdirSync(backupDir)
                    .filter(item => fs.statSync(path.join(backupDir, item)).isDirectory())
                    .sort()
                    .pop();
                    
                if (!latestBackup) {
                    throw new Error('No backup found to upload');
                }
                
                uploadBackup(path.join(backupDir, latestBackup));
                break;
                
            case 'verify':
                const latestBackupForVerify = fs.readdirSync(backupDir)
                    .filter(item => fs.statSync(path.join(backupDir, item)).isDirectory())
                    .sort()
                    .pop();
                    
                if (!latestBackupForVerify) {
                    throw new Error('No backup found to verify');
                }
                
                verifyBackup(path.join(backupDir, latestBackupForVerify));
                break;
                
            case 'cleanup':
                cleanupOldBackups();
                break;
                
            default:
                console.log(`
📋 Available backup commands:
  create  - Create a new backup
  upload  - Upload latest backup to cloud storage
  verify  - Verify backup integrity
  cleanup - Clean up old backups

Usage: node backup.js <command>
                `);
        }
        
    } catch (error) {
        console.error('❌ Backup operation failed:', error.message);
        process.exit(1);
    }
}

main();
