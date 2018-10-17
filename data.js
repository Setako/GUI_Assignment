const MOCK_DATA = {
    users: [{
        name: "Tester",
        username: "student1",
        password: "student1",
        firstTimeLogin: true,
        type: USER_TYPE.STUDENT
    }, {
        username: "teching_staff1",
        password: "teching_staff1",
        firstTimeLogin: true,
        type: USER_TYPE.TEACHING_STAFF
    }, {
        username: "non_teaching_staff1",
        password: "non_teaching_staff1",
        firstTimeLogin: true,
        type: USER_TYPE.NON_TEACHING_STAFF
    }]
}

const DataStorage = (function () {
    function resetData() {
        console.log({message: "old data backup", data: localStorage.getItem("data")});
        localStorage.setItem("mock_data", JSON.stringify(MOCK_DATA));
        localStorage.setItem("data", JSON.stringify(MOCK_DATA));
    }

    function checkData() {
        if (localStorage.getItem("mock_data") !== JSON.stringify(MOCK_DATA)) {
            if (confirm("Your mock data is not up to date, clear and redeploy now?")) {
                console.log("Mock data not up to date, replacing data...");
                resetData();
            }
        }
    }

    const DATA = JSON.parse(localStorage.getItem("data"));

    function saveData() {
        localStorage.setItem("data", JSON.stringify(DATA));
    }

    return {
        resetData: resetData,
        checkData: checkData,
        saveData: saveData,
        data: DATA
    }

})();
DataStorage.checkData();
