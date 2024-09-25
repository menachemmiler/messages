export default interface NewPostDTO {
    authorId:string,
    contect: string,
    hashTags :string,//רשימת נושאים שהפוסט קשור אליהם
    ref?     :string,//המזהה של הפוסט שבתגובה איליו נכתב הפוסט הזה (ואם זה ריק = פוסט ראשוני) ת
}