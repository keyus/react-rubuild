const fs = require('fs');
const archiver = require('archiver')('zip');
const dayjs = require('dayjs');
const path = require('path');

const zipname = 'CC_web';
const time = dayjs().format('YYYYMMDDHHmm');
const desktop = require('path').join(require('os').homedir(), 'Desktop');
const outputFileName = path.join(desktop, `${zipname}${process.env.NODE_ENV === 'production' ? `_${time}` : ''}.zip`)            //输出位置 桌面
const srcDirectory = path.join(__dirname, './build')

const zip = async () => {
    if (fs.existsSync(outputFileName)) fs.unlinkSync(outputFileName);

    const output = fs.createWriteStream(outputFileName);
    output.on('close', () => {
        console.log('\x1b[32m', `${process.env.NODE_ENV || 'build:'}  ${dayjs().format('YYYY-MM-DD HH:mm:ss')} zip file successed!`);
    })
    archiver.pipe(output);
    archiver.directory(srcDirectory, false)
    archiver.finalize();
}
zip();
