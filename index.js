document.addEventListener("DOMContentLoaded", function () {

    const usernameInput = document.getElementById("username")
    const searchbtn = document.getElementById("search")
    const statsContainer = document.querySelector(".stats-container")
    const statsCard = document.querySelector(".stats-card")
    const easyCircle = document.querySelector(".easy-progress")
    const mediumCircle = document.querySelector(".medium-progress")
    const hardCircle = document.querySelector(".hard-progress")
    const easyLabel = document.getElementById("easy")
    const mediumLabel = document.getElementById("medium")
    const hardLabel = document.getElementById("hard")

    function validateUserName(usernameInput) {
        if (usernameInput.trim() == "") {
            alert("Username should not be empty")
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(usernameInput);
        if (!isMatching) {
            alert("Invalid Username!")
        }
        return isMatching;
    }
    async function fetchUserDetails(username) {

        // const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        // const url = `https://leetcode-api-faisalshohag.vercel.app/user/${username}`;
        const url = `https://alfa-leetcode-api.onrender.com/${username}/solved`;
        try {
            searchbtn.textContent = "Searching..."
            searchbtn.disabled = true;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Unable to fetch");
            }
            const data = await response.json();
            console.log("Logging data:", data);
            displayUserData(data);
        }
        catch (error) {
            // console.log("Not found");
            statsContainer.innerHTML = `<p>No Data Found</p>`;
        }
        finally {
            searchbtn.textContent = "Search"
            searchbtn.disabled = false;
        }
    }
    // const 
    // function updateProgress(solved, total,circle){
    //     const progressDegree=
    // }

    function displayUserData(data) {
        const totalSubmitted = data.totalSubmissionNum[0].count;
        const totalEasy = data.totalSubmissionNum[1].count;
        const totalMedium = data.totalSubmissionNum[2].count;
        const totalHard = data.totalSubmissionNum[3].count;
        const totalSolved = data.solvedProblem;
        const solvedEasy = data.easySolved;
        const solvedMedium = data.mediumSolved;
        const solvedHard = data.hardSolved;

        statsContainer.innerHTML=
        `<div class="cards">
        <div class="card">
        <h3> Total Submissions:</h3>
        <p>${totalSubmitted}</p>
        </div>
        <div class="card">
        <h3> Easy Solved:</h3>
        <p>${solvedEasy}</p>
        </div>
        <div class="card">
        <h3> Medium Solved:</h3>
        <p>${solvedMedium}</p>
        </div>
        <div class="card">
        <h3> Hard Solved:</h3>
        <p>${solvedHard}</p>
        </div>
        </div>`

    }

    searchbtn.addEventListener("click", function () {
        const username = usernameInput.value;
        console.log("Logging with:", username);
        if (validateUserName(username)) {
            fetchUserDetails(username);
        }
    })
})