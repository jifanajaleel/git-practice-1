//! creating a model class called "Course" corresponding to db table named "Course"
class Course {
    id;
    title;
    duration;
    constructor (id, title, duration) {
        this.id = id;
        this.title = title;
        this.duration = duration;
    }
}

module.exports = Course;
