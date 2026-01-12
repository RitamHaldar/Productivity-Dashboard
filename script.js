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
                <button id=${idx}><i class="fa-solid fa-check"></i></button>
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
function dailygoal() {
        const goalform = document.querySelector(".goaldashboard .goal-add form")
        const goalinput = document.querySelector(".goal-add form input");
        const allgoal = document.querySelector(".allgoals");
        let goals = [];
        if (localStorage.getItem("allgoals")) {
                goals = JSON.parse(localStorage.getItem("allgoals"))
        }
        function rendergoals() {
                let sum = '';
                goals.forEach((ele, idx) => {
                        sum += `<div class="task">
                <h4>${idx + 1}. ${ele.name}</h4>
                <button id=${idx}><i class="fa-solid fa-check"></i></button>
                </div>`;
                })
                allgoal.innerHTML = sum;
                localStorage.setItem("allgoals", JSON.stringify(goals))
                document.querySelectorAll(".allgoals button").forEach((btn) => {
                        btn.addEventListener("click", (e) => {
                                goals.splice(e.target.id, 1);
                                rendergoals();
                        })
                });
        }
        rendergoals();
        goalform.addEventListener("submit", (e) => {
                e.preventDefault();
                if (goalinput.value != "") {
                        goals.push({
                                name: goalinput.value,
                        });
                }
                goalinput.value = "";
                rendergoals();
        })
}
function setdatetime() {
        function setinfo() {
                const m = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                let dateobj = new Date();
                const setdate = document.querySelector(".detail h4");
                const setday = document.querySelector(".detail h1");
                setdate.innerHTML = `${dateobj.getDate()} ${m[dateobj.getMonth()]} ${dateobj.getFullYear()}`
                setday.innerHTML = `${days[dateobj.getDay()]}, ${String(dateobj.getHours() % 12).padStart(2, "0")}:${String(dateobj.getMinutes()).padStart(2, "0")}:${String(dateobj.getSeconds()).padStart(2, "0")} ${dateobj.getHours() > 12 ? "PM" : "AM"}`;
        }
        setInterval(setinfo, 1000);
}
function setclimate() {
        const t = document.querySelector(".climate h1");
        const w = document.querySelector(".climate h4");
        const p = document.querySelector(".climate p");
        const climate=JSON.parse(localStorage.getItem("climate"));
        if (climate) {
                t.innerHTML = `${climate[0]}°C`;
                w.innerHTML = `${climate[1]}`;
                p.innerHTML = `Precipitation: ${climate[2]} % <br>
                        Humidity: ${climate[3]} % <br>
                        Wind: ${climate[4]} km/h`;
        }
}
function changeTheme() {
        const changetheme = document.querySelector("nav button");
        let darkmode = true;
        const wheatherimg = document.querySelector(".weather img")
        const todoimg = document.querySelector(".to-do img");
        const dailyplanerimg = document.querySelector(".daily-planer img");
        const motivationimg = document.querySelector(".motivation img");
        const timerimg = document.querySelector(".pomodoro img");
        const dailygoalsimg = document.querySelector(".daily-goals img");
        changetheme.innerHTML = `${darkmode ? '<i class="fa-regular fa-moon"></i>' : '<i class="fa-regular fa-sun"></i>'}`
        changetheme.addEventListener("click", () => {
                if (darkmode) {
                        document.body.style.setProperty("--x", "white");
                        document.body.style.setProperty("--y", "black");
                        darkmode = false;
                        changetheme.innerHTML = `${darkmode ? '<i class="fa-regular fa-moon"></i>' : '<i class="fa-regular fa-sun"></i>'}`
                        todoimg.src = './images/to-do2.jpg';
                        wheatherimg.src = './images/whether2.jpg';
                        dailyplanerimg.src = './images/dailyplaner1.jpg';
                        motivationimg.src = './images/motivation2.jpg';
                        timerimg.src = './images/timer2.jpg';
                        dailygoalsimg.src = './images/dailygoal1.jpg';

                }
                else {
                        document.body.style.setProperty("--y", "white");
                        document.body.style.setProperty("--x", "black");
                        darkmode = true;
                        changetheme.innerHTML = `${darkmode ? '<i class="fa-regular fa-moon"></i>' : '<i class="fa-regular fa-sun"></i>'}`;
                        todoimg.src = './images/to-do1.jpg';
                        wheatherimg.src = './images/whether1.jpg'
                        dailyplanerimg.src = './images/dailyplaner2.jpg';
                        motivationimg.src = './images/motivation1.jpg';
                        timerimg.src = './images/timer1.jpg';
                        dailygoalsimg.src = './images/dailygoal2.jpg';
                }
        })
}
function changecity() {
        const citychangeinp = document.querySelector(".changecity input");
        const citychangebtn = document.querySelector(".changecity #Changecitybtn");
        const submitbtn = document.querySelector(".changecity #Submit");
        const setplace = document.querySelector(".detail h3");
        async function getedata(name) {
                let info = await fetch(`https://wttr.in/${name}?format=j1`);
                let data = await info.json();
                const current = data.current_condition[0];
                let detail = {};
                detail[0] = current.temp_C;
                detail[1] = current.weatherDesc[0].value;
                detail[2] = current.precipMM;
                detail[3] = current.humidity;
                detail[4] = current.windspeedKmph;
                localStorage.setItem("climate", JSON.stringify(detail));
        }
        citychangebtn.addEventListener("click", () => {
                citychangebtn.style.display = "none";
                citychangeinp.style.display = "block";
                submitbtn.style.display = "block"
        })
        submitbtn.addEventListener("click", async () => {
                citychangebtn.style.display = "block";
                citychangeinp.style.display = "none";
                submitbtn.style.display = "none";
                const city = citychangeinp.value;
                setplace.innerHTML = `${city.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ")}`;
                await getedata(city);
                setclimate();
        })
}
function callallfunc() {
        managetasks();
        loadelems();
        dailytasks();
        motivationquote();
        pomodorotimer();
        dailygoal();
        setdatetime();
        setclimate();
        changeTheme();
        changecity()
}
callallfunc();