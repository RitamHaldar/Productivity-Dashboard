function loadelems() {
        const elemnts = document.querySelectorAll(".element");
        const fullelemnts = document.querySelectorAll(".fullelems");
        const elem = document.querySelector(".elements");
        elemnts.forEach((ele) => {
                ele.addEventListener("click", (e) => {
                        fullelemnts[e.target.id].style.positionAnchor = "--fullwin";
                        fullelemnts[e.target.id].style.borderRadius = "0";
                        fullelemnts[e.target.id].style.zIndex = "9";
                        fullelemnts[e.target.id].style.scale = "1";
                        elem.style.zIndex = "8";
                })
        })
        const tobtn = document.querySelector(".to button");
        tobtn.addEventListener("click", (e) => {
                fullelemnts[e.target.id].style.positionAnchor = "--animate";
                fullelemnts[e.target.id].style.borderRadius = "15px";
                fullelemnts[e.target.id].style.zIndex = "7";
                fullelemnts[e.target.id].style.scale = "0.2";
                elem.style.zIndex = "10";

        });
        const dailyp = document.querySelector(".dailyp button");
        dailyp.addEventListener("click", (e) => {
                fullelemnts[e.target.id].style.positionAnchor = "--dailyplan";
                fullelemnts[e.target.id].style.borderRadius = "15px";
                fullelemnts[e.target.id].style.zIndex = "7";
                fullelemnts[e.target.id].style.scale = "0.2";
                elem.style.zIndex = "10";
        });
        const moti = document.querySelector(".moti button");
        moti.addEventListener("click", (e) => {
                fullelemnts[e.target.id].style.positionAnchor = "--motivate";
                fullelemnts[e.target.id].style.borderRadius = "15px";
                fullelemnts[e.target.id].style.zIndex = "7";
                fullelemnts[e.target.id].style.scale = "0.2";
                elem.style.zIndex = "10";
        });
        const pomo = document.querySelector(".pomo button");
        pomo.addEventListener("click", (e) => {
                fullelemnts[e.target.id].style.positionAnchor = "--pomodo";
                fullelemnts[e.target.id].style.borderRadius = "15px";
                fullelemnts[e.target.id].style.zIndex = "7";
                fullelemnts[e.target.id].style.scale = "0.2";
                elem.style.zIndex = "10";
        });
        const daily = document.querySelector(".daily button");
        daily.addEventListener("click", (e) => {
                fullelemnts[e.target.id].style.positionAnchor = "--dailygo";
                fullelemnts[e.target.id].style.borderRadius = "15px";
                fullelemnts[e.target.id].style.zIndex = "7";
                fullelemnts[e.target.id].style.scale = "0.2";
                elem.style.zIndex = "10";
        });
}
function managetasks() {
        const taskform = document.querySelector(".fullelems .dashboard .task-add form")
        const taskinput = document.querySelector(".task-add form input");
        const tasktext = document.querySelector(".task-add form textarea");
        const alltask = document.querySelector(".alltasks");
        let todos = [];
        function addtasks() {
                let sum = '';
                todos.forEach((ele, idx) => {
                        sum += `<div class="task">
                <h4>${ele}</h4>
                <button id=${idx}>Task done</button>
                </div>`;
                })
                alltask.innerHTML = sum;
        }
        alltask.addEventListener("click", (e) => {
                if (e.target.tagName === "BUTTON") {
                        todos.splice(e.target.dataset.id, 1);
                        addtasks();
                }
        });
        taskform.addEventListener("submit", (e) => {
                e.preventDefault();
                if (taskinput.value != "") {
                        todos.push(taskinput.value);
                }
                taskinput.value = "";
                tasktext.value = "";
                addtasks();
        })
}
managetasks();
loadelems();