const USER_TYPE = {
    TEACHING_STAFF: 0,
    NON_TEACHING_STAFF: 1,
    STUDENT: 2,
    ALUMNI: 3
}

const USER_TYPE_DISPLAY = {
    0: "Teaching staff",
    1: "Non-teaching staff",
    2: "Student",
    3: "Alumni"
}
const ROLES = {
    0: {
        type: USER_TYPE.TEACHING_STAFF,
        maxReserve: 10,
    },
    1: {
        type: USER_TYPE.NON_TEACHING_STAFF,
        maxReserve: 10,
    },
    2: {
        type: USER_TYPE.STUDENT,
        maxReserve: 5,
    },
    3: {
        type: USER_TYPE.ALUMNI,
        maxReserve: 3,
    },
}
