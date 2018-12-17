const fs = require('fs');
function readFile(filePath,callback){
    fs.readFile(
        filePath,
        {encoding:"utf-8"},
        function(err,data) {
            if(err){
                console.log(err);
            }else{
                console.log("File data: ",data);
                callback(data);
            }
        }
    );
    //return fileData;
}

function writeFile(filePath,fileData){
     fs.writeFileSync(
        filePath,
        fileData,
        {encoding:"utf-8"}
    );
}
module.exports = {
    readFile:readFile,
    writeFile:writeFile
}