const {
    REACT_APP_NUTRITION_API_KEY,
    REACT_APP_NUTRITION_API_HOST,
    REACT_APP_USERS_API_ENDPOINT,
    REACT_APP_REPORT_API_ENDPOINT,
    REACT_APP_ITEM_API_ENDPOINT,
} = process.env;

const fetchReq = {
    // Account Component Fetch
    updateBMR: async (token, bmr) => {
        const reqObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accepts: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                user: {
                    bmr: parseFloat(bmr),
                },
            }),
        };
        return await fetch(
            `${REACT_APP_USERS_API_ENDPOINT}update-profile`,
            reqObj
        ).then((resp) => resp.json());
    },
    updateProfile: async (token, newPw, newNm, newEm) => {
        const reqObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accepts: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                user: {
                    password: newPw,
                    name: newNm,
                    email: newEm,
                },
            }),
        };
        return await fetch(
            `${REACT_APP_USERS_API_ENDPOINT}update-profile`,
            reqObj
        ).then((resp) => resp.json());
    },
    deleteAccount: async (token, username) => {
        const reqObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accepts: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ user: { username: username } }),
        };
        return await fetch(
            `${REACT_APP_USERS_API_ENDPOINT}delete-account`,
            reqObj
        ).then((resp) => resp.json());
    },
    // App Component Fetch
    getUserInfo: async (token) => {
        const reqObj = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        return await fetch(
            `${REACT_APP_USERS_API_ENDPOINT}profile`,
            reqObj
        ).then((res) => res.json());
    },
    // Nutrition Component Fetch
    getItem: async (itemInput) => {
        return await fetch(`${REACT_APP_ITEM_API_ENDPOINT}${itemInput}`, {
            method: "GET",
            headers: {
                "x-rapidapi-key": `${REACT_APP_NUTRITION_API_KEY}`,
                "x-rapidapi-host": `${REACT_APP_NUTRITION_API_HOST}`,
            },
        }).then((resp) => resp.json());
    },
    saveReport: async (token, user_id, reportTitle, date, foodList) => {
        const reqObj = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
                reportName: reportTitle,
                intakeDate: date,
                intakes: foodList,
            }),
        };
        return await fetch(REACT_APP_REPORT_API_ENDPOINT, reqObj).then((resp) =>
            resp.json()
        );
    },
    // Overview Component Fetch
    getReports: async (token) => {
        const reqObj = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
        return await fetch(REACT_APP_REPORT_API_ENDPOINT, reqObj).then((resp) =>
            resp.json()
        );
    },
    // NuReportDisplay Component Fetch
    getReport: async (token, id) => {
        const reqObj = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
        return await fetch(
            `${REACT_APP_REPORT_API_ENDPOINT}${id}`,
            reqObj
        ).then((resp) => resp.json());
    },
    // NuReportCard Component Fetch
    deleteReport: async (token, id) => {
        const reqObj = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
        return await fetch(`${REACT_APP_REPORT_API_ENDPOINT}${id}`, reqObj);
    },
    // SignIn Component Fetch
    handleSignIn: async (username, password) => {
        const reqObj = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password,
                },
            }),
        };
        return await fetch(`${REACT_APP_USERS_API_ENDPOINT}login`, reqObj).then(
            (resp) => resp.json()
        );
    },
    // SignUp Component Fetch
    handleSignUp: async (username, password, name, email) => {
        const reqObj = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password,
                    name: name,
                    email: email,
                },
            }),
        };
        return await fetch(`${REACT_APP_USERS_API_ENDPOINT}users`, reqObj).then(
            (resp) => resp.json()
        );
    },
};
export default fetchReq;
