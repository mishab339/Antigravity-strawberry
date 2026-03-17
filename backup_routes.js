const fs = require('fs');
const path = require('path');

const backupDir = path.join(__dirname, '_deploy_backup');
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
}

const itemsToMove = [
    'src/app/auth',
    'src/app/login',
    'src/app/order',
    'src/app/profile',
    'src/app/signup',
    'src/middleware.ts'
];

itemsToMove.forEach(item => {
    const srcPath = path.join(__dirname, item);
    const destPath = path.join(backupDir, path.basename(item));
    if (fs.existsSync(srcPath)) {
        fs.renameSync(srcPath, destPath);
        console.log(`Moved ${item} to _deploy_backup/`);
    } else {
        console.log(`${item} not found.`);
    }
});
