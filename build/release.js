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
      host: '47.98.146.129',
      port: 22,
      username: 'root',
      password: 'Wangchen15987',
      privateKey: fs.readFileSync('/Users/wcq/.ssh/id_rsa'),
      passphrase: 'wangchen15987'
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