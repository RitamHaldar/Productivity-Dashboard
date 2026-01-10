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
                fullelemnts[e.target.id].style.scale = "0";
                elem.style.zIndex = "10";

        });
        const dailyp = document.querySelector(".dailyp button");
        dailyp.addEventListener("click", (e) => {
                fullelemnts[e.target.id].style.positionAnchor = "--dailyplan";
                fullelemnts[e.target.id].style.borderRadius = "15px";
                fullelemnts[e.target.id].style.zIndex = "7";
                fullelemnts[e.target.id].style.scale = "0";
                elem.style.zIndex = "10";
        });
        const moti = document.querySelector(".moti button");
        moti.addEventListener("click", (e) => {
                fullelemnts[e.target.id].style.positionAnchor = "--motivate";
                fullelemnts[e.target.id].style.borderRadius = "15px";
                fullelemnts[e.target.id].style.zIndex = "7";
                fullelemnts[e.target.id].style.scale = "0";
                elem.style.zIndex = "10";
        });
        const pomo = document.querySelector(".pomo button");
        pomo.addEventListener("click", (e) => {
                fullelemnts[e.target.id].style.positionAnchor = "--pomodo";
                fullelemnts[e.target.id].style.borderRadius = "15px";
                fullelemnts[e.target.id].style.zIndex = "7";
                fullelemnts[e.target.id].style.scale = "0";
                elem.style.zIndex = "10";
        });
        const daily = document.querySelector(".daily button");
        daily.addEventListener("click", (e) => {
                fullelemnts[e.target.id].style.positionAnchor = "--dailygo";
                fullelemnts[e.target.id].style.borderRadius = "15px";
                fullelemnts[e.target.id].style.zIndex = "7";
                fullelemnts[e.target.id].style.scale = "0";
                elem.style.zIndex = "10";
        });
}
function managetasks() {
        const taskform = document.querySelector(".fullelems .dashboard .task-add form")
        const taskinput = document.querySelector(".task-add form input");
        const tasktext = document.querySelector(".task-add form textarea");
        const alltask = document.querySelector(".alltasks");
        const impbtn= document.querySelector(".task-add form #imp")
        let todos = [];
        if(localStorage.getItem("alltasks")){
                todos=JSON.parse(localStorage.getItem("alltasks"))
        }
        function rendertasks() {
                let sum = '';
                todos.forEach((ele, idx) => {
                        sum += `<div class="task">
                <h4>${idx+1}. ${ele.name} ${ele.important?`<span class="implogo">IMP</span><span>`:""}${ele.detail? `<details><summary>See Details</summary>${ele.detail}</details>`:""}</span></h4>
                <button id=${idx}>Mark as done</button>
                </div>`;
                })
                alltask.innerHTML = sum;
                localStorage.setItem("alltasks", JSON.stringify(todos))
                document.querySelectorAll(".alltasks button").forEach((btn) => {
                        btn.addEventListener("click", (e) => {
                                todos.splice(e.target.id, 1);
                                rendertasks();
                        })
                });
        }
        rendertasks();
        taskform.addEventListener("submit", (e) => {
                e.preventDefault();
                if (taskinput.value != "") {
                        todos.push({
                                name:taskinput.value,
                                detail:tasktext.value,
                                important:impbtn.checked
                        });
                }
                taskinput.value = "";
                tasktext.value = "";
                impbtn.checked = false
                rendertasks();
        })
}
function dailytasks() {
        const dailytask = document.querySelector(".dailytasks");
        let tasksdetals = JSON.parse(localStorage.getItem("dailyplaner")) || {};
        let taskarray = Array.from({ length: 18 }, (_, idx) => {
                return `${6 + idx}:00 - ${7 + idx}:00`;
        })
        let total = "";
        taskarray.forEach((ele, idx) => {
                total += `<div class="dailytask">
                <h4>${ele}</h4>
                <input type="text" id=${idx}>
            </div>`
        })
        dailytask.innerHTML = total;
        let settasks = document.querySelectorAll(".dailytask input");
        settasks.forEach((ele, idx) => {
                ele.addEventListener("input", (e) => {
                        tasksdetals[e.target.id] = e.target.value;
                        localStorage.setItem("dailyplaner", JSON.stringify(tasksdetals));

                })
                ele.value = tasksdetals[idx] ? tasksdetals[idx] : "";
        })
}
function motivationquote() {
        const motivationwinbtn = document.querySelector(".motivationwindow button");
        const motivationcont = document.querySelector(".motivationwindow h1");
        const motivationauthor = document.querySelector(".motivationwindow h3");
        async function fetchQuote() {
                let response = await fetch('https://quoteslate.vercel.app/api/quotes/random')
                let data = await response.json();
                motivationcont.innerHTML = data.quote
                motivationauthor.innerHTML = "- " + data.author
        }
        fetchQuote();
        motivationwinbtn.addEventListener("click", () => {
                fetchQuote();
        })
}
function pomodorotimer() {
        const timer = document.querySelector(".pomodorotimer h1");
        const start = document.querySelector(".pomodorotimer .timer .start");
        const pause = document.querySelector(".pomodorotimer .timer .pause");
        const reset = document.querySelector(".pomodorotimer .timer .reset");
        let timeinterval = null;
        let worksession = true;
        let totaltime = 25 * 60;
        function Settime() {
                let minutes = Math.floor(totaltime / 60);
                let seconds = totaltime % 60;
                timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        }
        Settime();
        function Starttimer() {
                clearInterval(timeinterval);
                start.style.pointerEvents = "none"
                if (worksession) {
                        timeinterval = setInterval(() => {
                                if (totaltime > 0) {
                                        totaltime--;
                                        Settime();
                                }
                                else {
                                        clearInterval(timeinterval);
                                        start.style.pointerEvents = ""
                                        worksession = false;
                                        timer.innerHTML = "05:00"
                                        totaltime = worksession ? 25 * 60 : 5 * 60;
                                }

                        }, 1)
                }
                else {
                        timeinterval = setInterval(() => {
                                if (totaltime > 0) {
                                        totaltime--;
                                        Settime();
                                }
                                else {
                                        clearInterval(timeinterval);
                                        start.style.pointerEvents = "";
                                        timer.innerHTML = "25:00"
                                        worksession = true;
                                        totaltime = worksession ? 25 * 60 : 5 * 60;
                                }

                        }, 1)
                }

        }
        function Pausetimer() {
                clearInterval(timeinterval);
                start.style.pointerEvents = "";
        }
        function Resettimer() {
                clearInterval(timeinterval);
                if (worksession) {
                        totaltime = 25 * 60;
                }
                else {
                        totaltime = 5 * 60;
                }
                start.style.pointerEvents = ""
                Settime();
        }
        start.addEventListener("click", Starttimer);
        pause.addEventListener("click", Pausetimer);
        reset.addEventListener("click", Resettimer);
}
managetasks();
loadelems();
dailytasks();
motivationquote();
pomodorotimer();
