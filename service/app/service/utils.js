'use strict';
const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const qiniu = require('qiniu');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const md5 = require('md5');
const bucket = 'imgwebsite'; // 要上传的空间名
const imageUrl = 'http://img.tonyhew.com/'; // 空间绑定的域名
const accessKey = 'T51EcOk7PQZ7-hJefbj3_gNvVLPs1C8I4aNUDA8r'; // Access Key
const secretKey = 'ZYzcOiXv-xZ6f152jkbZ-_vEisNjGxRiQZst7rNM'; // Secret Key
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
  scope: bucket,
};
const putPolicy = new qiniu.rs.PutPolicy(options);

const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;
class utilsService extends Service {
  async uploadFiles() {
    const uploadToken = putPolicy.uploadToken(mac);
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const filename =
      md5(stream.filename) + path.extname(stream.filename).toLocaleLowerCase();
    const localFilePath = path.join(__dirname, '../public/uploads', filename);
    const writeStream = fs.createWriteStream(localFilePath);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
      const formUploader = new qiniu.form_up.FormUploader(config);
      const putExtra = new qiniu.form_up.PutExtra();
      const imgSrc = await new Promise((resolve, reject) => {
        formUploader.putFile(
          uploadToken,
          filename,
          localFilePath,
          putExtra,
          (respErr, respBody, respInfo) => {
            if (respErr) {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject('');
            }
            if (respInfo.statusCode === 200) {
              resolve(imageUrl + respBody.key);
            } else {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject('');
            }
            // 上传之后删除本地文件
            fs.unlinkSync(localFilePath);
          }
        );
      });
      if (imgSrc !== '') {
        return {
          url: imgSrc,
        };
        // eslint-disable-next-line no-else-return
      } else {
        return false;
      }
    } catch (err) {
      // 如果出现错误，关闭管道
      await sendToWormhole(stream);
      return false;
    }
  }
}
module.exports = utilsService;
