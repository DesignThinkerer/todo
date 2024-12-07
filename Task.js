export default class Task {
    constructor(title) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.isCompleted = false;
    }
}