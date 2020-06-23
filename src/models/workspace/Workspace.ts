export default class Workspace {
    _id: string;

    title: string;

    description:string ;

    created_date: Date;

    constructor(note: Workspace) {
        this._id = note._id;
        this.title = note.title;
        this.description = note.description;
        this.created_date = note.created_date;

    }
}