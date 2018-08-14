#vue工程  完美mock 解决方案

1. 该方案可以将每个线上接口请求回来的json自动的下载到本地
2. 若想用下载到本地的数据进行不同情况数据的模拟，只需将「mode」改成 「replay」即可不走线上接口，直接走本地接口

利用 vue-cli 创建vue项目

vue create perfect-mock

注：
重点插件（已经配置好，直接下载即可）：
"axios": "^0.18.0",
"@pollyjs/core": "^0.5.0",
"@pollyjs/node-server": "^0.3.0",

下载相关依赖
cnpm install

运行
npm run serve

重点文件： src/api/index.js  接口中心，配置pollyjs关键的地方

重点代码：
const polly = new Polly('<gyfnice Recording Name>', {
  adapters: ['xhr'],
  //mode: 'replay',  //该模式可以让接口直接走已经在本地的json数据，可以根据相关情况修改相关json数据，前端
  //视图已得到不同的展示，方便调试
  mode: 'record'   //record  该模式可以自动记录所有线上接口的数据到本地, 其会自动生成一个「recordings」文件夹
});

polly.stop() //结束接口的录制









