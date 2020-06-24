export default class Note {
    _id: string;

    title: string;

    description: string;

    constructor({ _id, title, description }: Note) {
        this._id = _id;
        this.title = title;
        this.description = description;
    }
}