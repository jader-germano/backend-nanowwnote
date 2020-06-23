export default class Note {
    _id: string;

    title: string;

    description:string ;

    created_date: Date;

    constructor(note: Note) {
        this._id = note._id;
        this.title = note.title;
        this.description = note.description;
        this.created_date = note.created_date;

    }
}