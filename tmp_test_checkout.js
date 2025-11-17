const http = require('http');
const ports = [3000,3001];
const payload = {cart:[{name:'Test produit',price:10,qty:1,color:'Noir',size:'M',flocking:'AB'}],customerInfo:{name:'Test User',email:'test@example.com',address:'Rue'}};
const data = JSON.stringify(payload);
function tryPort(i){
  if(i>=ports.length){
    console.error('no port responded');
    process.exit(2);
  }
  const p = ports[i];
  const options = {hostname:'localhost',port:p,path:'/api/create-checkout-session',method:'POST',headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(data)},timeout:5000};
  const req = http.request(options,res=>{
    let body='';
    res.on('data',c=>body+=c);
    res.on('end',()=>{
      console.log('port',p,'status',res.statusCode);
      console.log(body);
      process.exit(0);
    });
  });
  req.on('error',e=>{console.error('port',p,'ERR',e.message); tryPort(i+1)});
  req.on('timeout',()=>{req.destroy(); console.error('port',p,'TIMEOUT'); tryPort(i+1)});
  req.write(data);
  req.end();
}
tryPort(0);
