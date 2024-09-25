import { v4 } from "uuid";


class Post {
    public id:string;
    public token?:   string
    public createdAt:Date;
    public likeBy:   string[] = [];
    constructor(
        public authorId:string,
        public contect: string,
        public hashTags :string,//רשימת נושאים שהפוסט קשור אליהם
        public ref?     :string,//המזהה של הפוסט שבתגובה איליו נכתב הפוסט הזה (ואם זה ריק = פוסט ראשוני) ת
    ){
        this.createdAt = new Date();
        this.id = v4();
    }
};

export default Post;