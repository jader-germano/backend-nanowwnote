export default class Workspace {
    _id: string;

    title: string;

    description: string;

    constructor({ _id, title, description }: Workspace) {
        this._id = _id;
        this.title = title;
        this.description = description;
    }
}