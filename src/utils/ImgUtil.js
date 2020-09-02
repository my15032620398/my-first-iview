function spliceImgName(url) {
    const name = url.substring(url.lastIndexOf('/')+1,url.length)
    console.log(name)
    return name;
}
function findImgUrl(uploadList,name) {
    for (let i=0;i<uploadList.length;i++){
        const oName = uploadList[i].name;
        if(oName==name){
            return uploadList[i].response[0].url
        }
    }
}

export default {
    spliceImgName,
    findImgUrl
};
