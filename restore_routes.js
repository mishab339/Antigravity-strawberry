const fs = require('fs');
const path = require('path');

const backupDir = path.join(__dirname, '_deploy_backup');
const appDir = path.join(__dirname, 'src/app');
const srcDir = path.join(__dirname, 'src');

if (!fs.existsSync(backupDir)) {
    console.log("Backup directory not found.");
    process.exit(0);
}

const itemsToRestore = [
    { src: 'auth', dest: path.join(appDir, 'auth') },
    { src: 'login', dest: path.join(appDir, 'login') },
    { src: 'order', dest: path.join(appDir, 'order') },
    { src: 'profile', dest: path.join(appDir, 'profile') },
    { src: 'signup', dest: path.join(appDir, 'signup') },
    { src: 'middleware.ts', dest: path.join(srcDir, 'middleware.ts') }
];

itemsToRestore.forEach(item => {
    const backupPath = path.join(backupDir, item.src);
    if (fs.existsSync(backupPath)) {
        fs.renameSync(backupPath, item.dest);
        console.log(`Restored ${item.src} to ${item.dest}`);
    } else {
        console.log(`${item.src} not found in backup.`);
    }
});

fs.rmSync(backupDir, { recursive: true, force: true });
console.log("Removed _deploy_backup directory.");
