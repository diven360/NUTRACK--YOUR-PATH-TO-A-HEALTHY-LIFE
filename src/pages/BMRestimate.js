import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../style/BMR.scss";

const BMRestimate = (props) => {
    const { user, getUserInfo } = props;

    const [genderInput, setGenderInput] = useState("");
    const [ageInput, setAgeInput] = useState("");
    const [weightInput, setWeightInput] = useState("");
    const [heightInput, setHeightInput] = useState("");

    const [BMRestimate, setBMRestimate] = useState(0);

    const [error, setError] = useState("");

    useEffect(() => {
        const checkBox = document.querySelector(".checkBox");
        if (checkBox.checked) {
            checkBox.checked = false;
        }
        if (!user) {
            getUserInfo();
        }
    });

    function calcBMR(e) {
        e.preventDefault();
        if (ageInput < 0) return setError("Age cannot be negative number.");
        if (isNaN(ageInput)) return setError("Age has to be number.");
        if (weightInput < 0)
            return setError("Weight cannot be negative number.");
        if (isNaN(weightInput)) return setError("Weight has to be number.");
        if (heightInput < 0)
            return setError("Height cannot be negative number.");
        if (isNaN(heightInput)) return setError("Height has to be number.");
        if (genderInput.toLowerCase() === "man") {
            let bmrMan =
                88.362 +
                13.397 * weightInput +
                4.799 * heightInput -
                5.677 * ageInput;
            setBMRestimate(bmrMan.toFixed(2));
            setError("");
        } else if (genderInput.toLowerCase() === "women") {
            let bmrWomen =
                447.593 +
                9.247 * weightInput +
                3.098 * heightInput -
                4.33 * ageInput;
            setBMRestimate(bmrWomen.toFixed(2));
            setError("");
        } else {
            setError("Gender has to be Man or Women.");
        }
        setGenderInput("");
        setAgeInput("");
        setWeightInput("");
        setHeightInput("");
    }

    function handleGenderInput(e) {
        e.preventDefault();
        setGenderInput(e.target.value);
    }

    function handleAgeInput(e) {
        e.preventDefault();
        setAgeInput(e.target.value);
    }

    function handleWeightInput(e) {
        e.preventDefault();
        setWeightInput(e.target.value);
    }

    function handleHeightInput(e) {
        e.preventDefault();
        setHeightInput(e.target.value);
    }

    return (
        <div>
            <div className="BMRestimate">
                Approx <span className="BMRNum">{BMRestimate}</span> Kcal per
                day
            </div>
            <div className="error">{error}</div>
            <form className="addItemForm" onSubmit={(e) => calcBMR(e)}>
                <div className="segment divInForm">
                    <h2>Calculate Approx BMR</h2>
                </div>
                <div>
                    <label className="inputLabel">
                        <input
                            className="userInput"
                            type="text"
                            placeholder="Gender (Man / Women)"
                            value={genderInput}
                            onChange={(e) => handleGenderInput(e)}
                        />
                    </label>
                    <label className="inputLabel">
                        <input
                            className="userInput"
                            type="text"
                            placeholder="Age"
                            value={ageInput}
                            onChange={(e) => handleAgeInput(e)}
                        />
                    </label>
                    <label className="inputLabel">
                        <input
                            className="userInput"
                            type="text"
                            placeholder="Weight (kg)"
                            value={weightInput}
                            onChange={(e) => handleWeightInput(e)}
                        />
                    </label>
                    <label className="inputLabel">
                        <input
                            className="userInput"
                            type="text"
                            placeholder="Height (cm)"
                            value={heightInput}
                            onChange={(e) => handleHeightInput(e)}
                        />
                    </label>
                </div>
                <button className="red submitBtn" type="submit">
                    Caculate
                </button>
            </form>
        </div>
    );
};
BMRestimate.propTypes = {
    user: PropTypes.object.isRequired,
    getUserInfo: PropTypes.func.isRequired,
};
export default BMRestimate;
