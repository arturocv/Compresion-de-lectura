// import app from "./app";
const app = require('./app');

// const main = () => {
//     app.listen(app.get("port"));
//     // console.log(`Server on port: ${app.get("port")}`);
// };

app.listen(app.port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});

main();