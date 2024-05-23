
export default function onDocument(filename){
    const documentsExtensions = ['doc', 'docx', 'pdf', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'heic']
    const extension = filename.split('.').pop().toLowerCase(); // получаем расширение файла и приводим его к нижнему регистру
    return documentsExtensions.includes(extension); // возвращаем true, если расширение файла соответствует расширениям изображений
}


