#!usr/bin/env node
const path = require('path');
const fs = require('fs');
const marked = require('marked');
const fetch = require('node-fetch');

const mdLinks = (pathToMd, options) => {
    return new Promise ((resolve, reject) =>{
        const absolutePath = path.resolve(pathToMd);
        fs.stat(absolutePath, (error, stats) =>{
            if (error) return Promise.resolve([]) // si hay un error, retorna un array vacío.
            if (stats.isDirectory()){
        
            } else if(stats.isFile() && path.extname(absolutePath).toLowerCase() == '.md') {
                fs.readFile(absolutePath, 'utf-8', (readFileError, data)=>{
                    if(readFileError) return Promise.resolve([]);
const links = readLinks(data);
if(options.validate){
    resolve()
}
                })
            }
            else {
                return Promise.resolve([]) // si no encuentra ni un archivo ni directorio, retorna un array vacío
            }
        })
    })

}

const readLinks = (files) => {
    fs.readFile(files, "utf8", (err, data) => {
    
      if (err){
        reject(err)
      }
     //console.log("Solo los links de ese archivo", data);
     links = [];
  
      const renderer = new marked.Renderer();
  
      renderer.link = (href, title, text, ruta) => {
  
        links.push({
          href: href,
          text: text,
          ruta: files
        
        });
        //console.log("links encontrados", links)
  
      } //fin rendered
      marked(data, { renderer: renderer })

  
  
    }) //fin readFiles

  } //Fin función readLinks
  
//si estás siendo ejecutado como programa haz esto.
if(require.main === module){
    mdLinks(process.argv[2], {validate : process.argv[3] === '--validate'});
}

 //Si no, expórtala.
module.exports = mdLinks;