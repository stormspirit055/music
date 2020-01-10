const Client = require('ssh2-sftp-client');
const path = require('path')
const klaw = require('klaw')
const fs = require('fs-extra')
const filePath = path.resolve(__dirname, '../dist')
const items = []
  klaw(filePath).on('readable', function() {
    let item
    while((item = this.read())) {
      if (!item.stats.isDirectory()) {
        items.push(item.path)
      }
    }
  }).on('end', () => {
    console.dir(items)
    put('/root/music/music/')
  })
function put(romotePath){
  let sftp = new Client();
  sftp.connect({
      host: '服务ip',
      port: '没有修改过就是22',
      username: '登录名',
      password: '登录密码',
      privateKey: "mac示例: fs.readFileSync('/Users/你的mac用户名/.ssh/id_rsa')",
      passphrase: '私钥密码'
  }).then(() => {
      const tasks = items.map(v => {
        return new Promise((resolve, reject) => {
          sftp
            .put(v, v.replace(/.*?dist\//, romotePath))
            .then(() => {
              console.log(`${v}上传完成`);
              resolve();
            })
            .catch(err => {
              console.log(err)
              console.log(`${v}上传失败`);
              reject();
            });
        });
      })
     return Promise.all(tasks);
  }).then(() =>{
      console.log("上传完成");
      sftp.end();
  }).catch((err) => {
      console.log(err, 'catch error');
  });
}