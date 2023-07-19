// SUBIR ARCHIVOS CON NODE Y EXPRESS
const express = require('express');
const fileUpload = require('express-fileupload');
const port = 5001;
const app = express();

app.use(fileUpload({
    createParentPath: true
}));

app.listen(port, () => {
    console.log(`Escuchando servidor, API REST subida de archivos
    express-fileupload que está en ejecución en: http://localhost:${port}.`);
})

app.post('/cargadearchivo', async (req, res) => {
    
    if(!req.files || Object.keys(req.files).length === 0) {
        res.send({
            status: false,
            message: "Archivo no subido al servidor",
            error: 400
        });
    } else {
        let fileReceived = req.files.fileName; // fileName será la variable que posee el archivo al enviar la solicitud
        let extName = fileReceived.name; // variable que posee el nombre real del archivo
        console.log(fileReceived);
        uploadPath = './files/' + extName // ruta del servidor donde se desea guardar el archivo. En este caso en el directorio actual en la carpeta files

        //Luego, validamos que el archivo sea efectivamente solo texto plano
        if(fileReceived.mimetype === 'text/plain') {

            fileReceived.mv(uploadPath, error => {
                if(error) {
                    return res.status(500).send({
                        message: error
                    });
                }
                return res.status(200).send({
                    message: 'Archivo subido al servidor'
                });
            });
        } else {
            return res.status(400).send({
                message: 'Archivo invalido, solo .txt'
            })
        }
    }
})

