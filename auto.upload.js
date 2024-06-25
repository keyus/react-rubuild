import {$} from 'bun'
import os from 'node:os'
import path from 'node:path'

const server = process.env.UPLOAD_SERVER;
const zipname = process.env.UPLOAD_ZIP_NAME;
const googlekey = process.env.UPLOAD_GOOGLE_KEY;
const password = process.env.UPLOAD_TEST_PASSWORD;
const serverpath = process.env.UPLOAD_SERVER_PATH;

const desktopZip = path.join(os.homedir(), 'Desktop', zipname);
const code= await $`oathtool --totp -b -d 6 ${googlekey}`.text();

//rsync
await $`expect -c "
set timeout 180
spawn rsync -v -e \"ssh -p20004\" \"${desktopZip}\" root@${server}:/home/online/${serverpath}/upload/
expect \"Password:\"
sleep 1
send \"${password}\r\"
expect \"Verification code:\"
send \"${code}\r\"
expect eof
"`

//deploy
await $`expect -c "
spawn ssh -l root -p 20004 ${server}
expect \"Password:\"
sleep 1
send \"${password}\r\"
expect \"Verification code:\"
send \"${code}\r\"
expect \"Last login\"
expect \"~ \"
sleep 2

send \"sh /home/online/${serverpath}/deploy_web.sh\r\"
expect \"~ \"
sleep 1

expect eof
"`
