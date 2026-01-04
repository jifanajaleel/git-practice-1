//! Creating db table using Sequelize ORM

const { Course } = require("./models/models");  // Course is a model
const { Op, fn, col } = require("sequelize");  // imports Sequelize operators (AND, OR, LIKE, >, etc.)

//! .create() is similar to INSERT INTO query
// INSERT INTO courses(title, duration, noOfSkills) VALUES (...)
async function createCourse(course) {
    await Course.create(course)  // await is not needed in here since 'then' is used
    .then((data) => {
        console.log("Record created successfully");
    })
    .catch((error) => {
        console.log("Record creation failed:", error);
    })
}
// createCourse({
//     title: "Frontend Development",
//     duration: 7,
//     noOfSkills: 4
// })
/*
step 3) run index.js
"Record created successfully" & "Course synced: course" will be printed in console.
check pgAdmin tool for courses table. Above row will be there in it.
If you want to insert more rows, update createCourse() with new row details & run index.js.
Comment out above createCourse() and uncomment below .findAll(). Run index.js again. Console will have "Course synced: course" printed along with all table rows
*/

//! .findAll() is similar to SELECT * query
// SELECT * FROM courses
async function getCourses() {
    const courses = await Course.findAll();  // .findAll() returns an array
    console.log("Courses:", courses);
}
// getCourses();  // in the output console, check dataValues alone. Ignore __previousDataValues, uniqno etc

//! .findAll({}) is similar to SELECT * FROM table WHERE query with AND clause
// SELECT * FROM table WHERE title = ? AND duration = 12
async function getCoursess(title) {
    const courses = await Course.findAll({  // .findAll({}) returns an array
        where: {
            title: title,  // here title & duration are combined as AND condition
            duration: 12
        }
    });
    console.log("Courses:", courses);
}
// getCoursess("Fullstack Development", ); 

//! .findByPk() is for retrieving data based on primary key
// SELECT * FROM courses WHERE id = ?;
async function getCourseByCourseId(id) {
    const course = await Course.findByPk(id);  // pk means primary key. In models.js, we have already set id as primary key
    console.log("course:", course);
}
// getCourseByCourseId(2);

//! .findAll({}) is similar to SELECT * FROM table WHERE query conditions
// WHERE title ILIKE '%development%'
async function searchCoursesByTitle(searchTerm) {
    const courses = await Course.findAll({
        where: {
            title: {
                [Op.iLike]: "%" + searchTerm + "%"  // ilike is case insensitive
            }
        }
    })
    console.log("courses:", courses);
}
// searchCoursesByTitle("development");

//! .findAll({}) is similar to SELECT * FROM table WHERE query with OR clause & AND clause
async function getCoursesss(title) {
    const courses = await Course.findAll({
        where: {
            [Op.or]: [
                {title: title},  //  either title or duration should be matched. WHERE title = ? OR duration = 3
                {duration: 3}
            ],
            [Op.and]: [
                {noOfSkills: 5}
            ]
        }
    })
    console.log("courses:", courses);
}
// getCoursesss("UI");

//! Using complex where-clause with mix of AND & OR 
// where (title="UI" AND duration=6) OR (noOfSkills=7 and id > 3)
async function getCoursesByCondition() {
    const courses = await Course.findAll({
        where: {
            [Op.or]: [
                {
                    [Op.and]: [
                        { title: "UI" },
                        { duration: 6 }
                    ],
                },
                {
                    [Op.and]: [
                        { noOfSkills: 7 },
                        { id: { [Op.gt]: 3} }
                    ],
                },
            ]
        }
})
    console.log("courses:", courses);
}
// getCoursesByCondition();

//! Specify fields in select query
async function getCoursesByColumns(title) {
    const courses = await Course.findAll({
        attributes: ["id", "title"],  // SELECT id, title FROM courses;
        where: {
            [Op.or]: [
                {title: title},  //  either title or duration should be matched
                {duration: 3}
            ],
        }
    });
    console.log("courses:", courses);  // similar to SELECT id, title FROM courses WHERE title="UI" or duration=3
}
// getCoursesByColumns("UI");

//! Specify fields in select query where a column name can be renamed
async function getCoursesByColumnsRenamed(title) {
    const courses = await Course.findAll({
        attributes: ["id", 
            ["title", "course_name"],  // title will be renamed as course_name in the console
            "duration"
        ],
        where: {
            [Op.or]: [
                {title: title},  //  either title or duration should be matched
                {duration: 3}
            ],
        }
    });
    console.log("courses:", courses);  // similar to SELECT id, title FROM courses WHERE title="UI" or duration=3
}
// getCoursesByColumnsRenamed("UI");

//! Specify fields in order-by clause
async function getCoursesByOrder(title) {
    const courses = await Course.findAll({
        attributes: ["id", 
            ["title", "course_name"],  // title will be renamed as course_name in the console. SELECT title AS course_name FROM courses;
            "duration"
        ],
        order: [  // ORDER BY duration ASC, title ASC;
            "duration",  // by default, order will be ASC
            ["title", "ASC"]  // data with duration in the ASC order, and then title in ascending order will be displayed in the console
        ]  // more priority for duration in here. Then title in ASC order will be considered
    });
    console.log("courses:", courses);  // similar to SELECT id, title FROM courses WHERE title="UI" or duration=3
}
// getCoursesByOrder("UI");

//! group by
//  SELECT AVG(duration) as avg_course_duration FROM courses GROUP BY duration
async function getCoursesByGrp() {
    const courses = await Course.findAll({
        attributes: [
            [fn("AVG", col("duration")), "avg_course_duration"]
        ],
        group: ["duration"]  // group by query
    });
    console.log("courses:", courses);
}
// getCoursesByGrp();

//! UPDATE query
// SELECT "id", "title", "duration", "noOfSkills", "createdAt", "updatedAt" FROM "courses" AS "course" WHERE "id" = 4;
// UPDATE "courses" SET "title"=$1,"duration"=$2,"updatedAt"=$3 WHERE "id" = $4

// 1. get record by id
// 2. set new values
// 3. save to data
async function updateCourse(id, newObj) {
    const course = await Course.findOne({  // for getting id, you can use findByPk() since id is a primary key
        where: {
            id: id
        }
    });

    const newValues = {
        title: newObj.title,
        duration: newObj.duration
    }

    const successfull = await course.update(newValues);
    console.log("Updated successfully:", successfull);
}
// updateCourse(4, {
//     title: "Mern stack",
//     duration: 4
// })
/*
if you run above updateCourse() function, you will see title, duration, updatedAt columns getting updated in pgAdmin courses table
*/

//! DELETE query - find & delete
// SELECT "id", "title", "duration", "noOfSkills", "createdAt", "updatedAt" FROM "courses" AS "course" WHERE "id" = 5;
// DELETE FROM "courses" WHERE "id" = 5

// 1. get record by id
// 2. delete it
async function deleteCourse(id) {
    const course = await Course.findOne({  // for getting id, you can use findByPk()
        where: {
            id: id
        }
    });
    console.log("course:", course);
    if (course) {
        const successfull = await course.destroy();
        console.log("Deleted successfully:", successfull);
    }
}
// deleteCourse(5);

//! DELETE query - delete (method 2)
// DELETE FROM "courses" WHERE "id" = 4
async function deleteCourseById(id) {
    const successfull = await Course.destroy({
        where: {
            id: id
        }
    });
    console.log("Deleted successfully:", successfull);
}
deleteCourseById(4);