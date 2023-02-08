const btn_cen_lang = document.querySelector("#select_cen_lang");
const btn_sign_up = document.querySelector("#btn_sign_up");
const btn_log_in = document.querySelector("#btn_log_in");
const overlay = document.querySelector("#overlay");
const search_modal = document.querySelector("#search_modal");
const search = document.querySelector("#search_filter");
const content = document.querySelector("#overlay .content .content-body");
const setting = document.querySelector("#setting");

// Url parameters
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

// General Get Data Function

const getDataGlobal = async (url, method, data = "", headers = "", errorMes = "") => {
    try {
        const res = await axios({
            method,
            url: `https://missingtest.herokuapp.com/${url}`,
            data,
            headers,
        });
        if (res.data.status === "success") {
            return res;
        }
        return "Fail";
    } catch (error) {
        console.log(`${error}`);
        return { status: "ERROR", error };
    }
};

const removeOverlay = function () {
    overlay.style.display = "none";
};
const showOverlay = function () {
    overlay.style.display = "flex";
};

const removeSearchModel = function () {
    search_modal.style.display = "none";
};
const showSearchModel = function () {
    search_modal.style.display = "flex";
};

if (overlay) {
    overlay.addEventListener("click", function (e) {
        if (e.target == overlay) removeOverlay();
    });
    document.querySelector("#btn-close-overlay").addEventListener("click", removeOverlay);
}

// TODO counters for found and missing

const showDataCount = async (route, con, kind) => {
    const res = await getDataGlobal(route);
    let { data } = res.data;
    if (kind)
        data = data.filter((Case) => {
            return Case.state == kind;
        });
    con.innerHTML = data.length;
};

const missingPersonsCount = document.getElementById("missingPersonsCount");
if (missingPersonsCount) {
    const foundPersonsCount = document.getElementById("foundPersonsCount");
    const missingThingsCount = document.getElementById("missingThingsCount");
    const foundThingsCount = document.getElementById("foundThingsCount");
    showDataCount("person/getMissing", missingPersonsCount);
    showDataCount("person/getMissingF", foundPersonsCount);
    showDataCount("Things/getAllThings", missingThingsCount, "missing");
    showDataCount("Things/getAllThings", foundThingsCount, "found");
}

// TODO Search

if (search) {
    search.addEventListener("click", function () {
        showOverlay();
        const overlayS = document.querySelector(".overlay .content");
        let html = `
        <div class="modal-content border border-white" id="searchContainer">
            <div class="modal-header">
                <h3  class="modal-title">Search Options</h3>
            </div>
            <div class="modal-body">
                <div class="swap-container d-flex mb-5 justify-content-around">
                    <button class="tablink btn btn-primary" onclick="openPage('person', this)"  id="defaultOpen">People</button>
                    <button class="tablink btn btn-primary" onclick="openPage('things', this)">Things</button>
                    <button class="tablink btn btn-primary" onclick="openPage('searchByPhoto', this)" id="openImageSearchSection">Search By Photo</button>
                </div>
                <div id="person" class="tabcontent">
                    <div class="border border-white">
                        <div class="modal-body">
                            <div class="form-row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="personStatus" class="control-label ">Status</label>
                                        <div class="form-group">
                                            <select class="form-control" id="searchPersonStatus">
                                            <option value="missing">Missing</option>
                                            <option value="found">Looking for his family</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="personName"> Name </label>
                                        <input type="text" class="form-control" name="personname" id="searchPersonName" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col">
                                    <label for="personAge"> Year Of Birth </label>
                                    <input type="text" class="form-control" name="personAge" id="searchPersonAge" />
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="personCountry"> Person Country </label>
                                        <input type="text" class="form-control" name="personCountry" id="searchPersonCountry" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class=" d-flex  justify-content-between">
                            <button data-type="person" type="submit" class="ssbtn btn btn-primary btn-lg LetsSearchCrap">search</button>
                        </div>
                    </div>
                </div>
                <div id="things" class="tabcontent">
                    <div class="border border-white">
                        <div class="modal-body">
                            <div class="form-row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="thingsType" class="control-label ">Type</label>
                                        <div class="form-group">
                                            <select class="form-control" id="searchThingType">
                                                <option value="">All</option>
                                                <option value="papers">Papers</option>
                                                <option value="devices">Devices</option>
                                                <option value="transportations">Transportations</option>
                                                <option value="others">Others</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="thingsStatus" class="control-label ">Status</label>
                                        <div class="form-group">
                                            <select class="form-control" id="searchThingStatus">
                                            <option value="missing">Missing</option>
                                            <option value="found">Founded</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="thingName">The Thing Name</label>
                                        <input type="text" class="form-control" name="thingName" id="searchThingName" />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="thingsColor" class="control-label ">Things Color</label>
                                        <div class="form-group">
                                            <input type="text" class="form-control caseColor" id="searchThingColor" >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-row d-flex  justify-content-between w-100">
                            <button data-type="thing" type="submit" class="ssbtn btn btn-primary btn-lg LetsSearchCrap ">search</button>
                        </div>
                    </div>
                </div>
                <div id="searchByPhoto" class="tabcontent">
                    <div class="border border-white">
                        <div class="modal-body">
                            <div class="image-upload mr-4">
                                <label for="file-input">
                                    <i class="fa-solid fa-camera fa-2x"></i>
                                </label>
                                <input id="searchByImage" type="file"  />
                            </div>
                        </div>
                        <div class=" d-flex  justify-content-between">
                            <button data-type="image" type="submit" class="ssbtn btn btn-primary btn-lg LetsSearchCrap">search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        content.innerHTML = "";
        overlayS.classList.add("sign-overlay");
        content.insertAdjacentHTML("beforeend", html);
        const searchContainer = document.getElementById("searchContainer");
        searchContainer.classList.remove("letsSearchDown");
        overlayS.classList.remove("letsSearchUp");

        document.getElementById("openImageSearchSection").addEventListener("click", () => {
            const imageIcon = document.querySelector("#searchByPhoto .image-upload label i");
            console.log(imageIcon);
            imageIcon.addEventListener("click", () => {
                document.getElementById("searchByImage").click();
            });
        });
        if (searchContainer) {
            searchContainer.addEventListener("click", async (e) => {
                if (e.target.classList.contains("LetsSearchCrap")) {
                    overlayS.classList.remove("sign-overlay");
                    overlay.style.overflow = "scroll";
                    searchContainer.classList.add("letsSearchDown");
                    overlayS.classList.add("letsSearchUp");
                    const spinner = `
                        <div class="sk-chase">
                            <div class="sk-chase-dot"></div>
                            <div class="sk-chase-dot"></div>
                            <div class="sk-chase-dot"></div>
                            <div class="sk-chase-dot"></div>
                            <div class="sk-chase-dot"></div>
                            <div class="sk-chase-dot"></div>
                        </div>
                    `;
                    if (e.target.getAttribute("data-type") == "person") {
                        // person/findPerson?Name=&yearOfBirth?
                        const data = {
                            name: document.getElementById("searchPersonName").value || "",
                            yearOfBirth: document.getElementById("searchPersonAge").value || "",
                            country: document.getElementById("searchPersonCountry").value || "",
                            status: document.getElementById("searchPersonStatus").value,
                        };
                        searchContainer.innerHTML = spinner;
                        const url = `person/findPersonAll?Name=${data.name}&yearOfBirth=${data.yearOfBirth}&status=${data.status}&country=${data.country}`;
                        // const url = `person/findPerson${data.status == "missing" ? "" : "F"}?Name=${data.name}&yearOfBirth=${data.yearOfBirth}&country=${data.country}`;
                        const res = await getDataGlobal(url, "get", "", { Authorization: getCookie("jwt") });
                        if (res.status == "ERROR" || res == "Fail") {
                            if (res.error.response) showAlert("error", res.error.response.data.message);
                            else showAlert("error", "check your Connection or Contact us");
                        } else if (res.data.status === "success") {
                            setTimeout(async () => {
                                searchContainer.innerHTML = "";
                                if (res.data.data.length != 0) searchContainer.insertAdjacentHTML("afterbegin", makeCasesHtml(res.data.data, "", personCase));
                                else searchContainer.innerHTML = "<h1 class='centernize'>No Cases are found</h1>";
                            }, 1500);
                        }
                    } else if (e.target.getAttribute("data-type") == "thing") {
                        // Things/serch?
                        const data = {
                            name: document.getElementById("searchThingName").value || "",
                            type: document.getElementById("searchThingType").value || "",
                            status: document.getElementById("searchThingStatus").value || "",
                            color: document.getElementById("searchThingColor").value,
                        };
                        searchContainer.innerHTML = spinner;
                        const url = `Things/serch?name=${data.name}&type=${data.type}&status=${data.status}&color=${data.color}`;
                        const res = await getDataGlobal(url, "get", "", { Authorization: getCookie("jwt") });
                        if (res.status == "ERROR" || res == "Fail") {
                            if (res.error.response) showAlert("error", res.error.response.data.message);
                            else showAlert("error", "check your Connection or Contact us");
                        } else if (res.data.status === "success") {
                            setTimeout(() => {
                                setTimeout(async () => {
                                    searchContainer.innerHTML = "";
                                    if (res.data.data.length != 0) searchContainer.insertAdjacentHTML("afterbegin", makeCasesHtml(res.data.data, "", thingCase));
                                    else searchContainer.innerHTML = "<h1 class='centernize'>No Cases are found</h1>";
                                }, 1500);
                            }, 1500);
                        }
                    } else if (e.target.getAttribute("data-type") == "image") {
                        // person/searchByImage
                        const data = new FormData();
                        data.append("photo", document.getElementById("searchByImage").files[0]);
                        searchContainer.innerHTML = spinner;
                        const res = await getDataGlobal("person/searchByImage", "post", data);
                        console.log(res);
                        if (res.status == "ERROR" || res == "Fail") {
                            if (res.error.response) showAlert("error", res.error.response.data.message);
                            else showAlert("error", "check your Connection or Contact us");
                        } else if (res.data.status === "success") {
                            setTimeout(() => {
                                setTimeout(async () => {
                                    searchContainer.innerHTML = "";
                                    if (res.data.data.length != 0) searchContainer.insertAdjacentHTML("afterbegin", makeCasesHtml(res.data.data, "", personCase));
                                    else searchContainer.innerHTML = "<h1 class='centernize'>No Cases are found</h1>";
                                }, 1500);
                            }, 1500);
                        }
                    }
                }
            });
        }
    });
}

if (btn_log_in)
    btn_log_in.addEventListener("click", function () {
        showOverlay();
        let html = `<div id="logreg-forms " style="background-color: white; padding:70px 20px; ">
        <form class="form-signin" id="loginForm">
            <h1  class="h3 mb-3 font-weight-normal" style="text-align: center"> Sign in</h1>
            <div class="social-login row d-flex justify-content-around mb-3">
                <button id="btnSignInWithFacebook" class="btn btn-primary facebook-btn social-btn col" type="button"><span><i class="fab fa-facebook-f " style="color:white;"></i> Sign in with Facebook</span> </button>
                <button id="btnSignInWithGoogle" class="btn btn-danger google-btn social-btn  col" type="button"><span><i class="fab fa-google-plus-g" style="color:white;"></i> Sign in with Google+</span> </button>
            </div>
          
            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
            
            <button class="btn btn-success btn-block" type="submit"><i class="fas fa-sign-in-alt" style="color:white;"></i> Sign in</button>
            <a href="/forgetpassword.html" id="forgot_pswd">Forgot password?</a>
            </form>`;
        content.innerHTML = "";
        document.querySelector(".overlay .content").classList.add("sign-overlay");
        content.insertAdjacentHTML("beforeend", html);
    });

if (btn_sign_up)
    btn_sign_up.addEventListener("click", function () {
        showOverlay();
        let html = `<div id="logreg-forms" style="background-color: white; padding:70px 20px; ">
        <form class="form-signin"  id="signupForm">
            <h1  class="h3 mb-3 font-weight-normal" style="text-align: center"> Sign Up</h1>
            <div class="social-reg d-flex justify-content-around mb-3">
                <button class="btn btn-primary facebook-btn social-btn" type="button"><span><i class="fab fa-facebook-f " style="color:white;"></i> Sign in with Facebook</span> </button>
                <button class="btn btn-danger google-btn social-btn " type="button"><span><i class="fab fa-google-plus-g" style="color:white;"></i> Sign in with Google+</span> </button>
            </div>
            <input type="text" id="inputName" class="form-control" placeholder="Full Name" required="" autofocus="">
            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
            <input type="password" id="inputPassword2" class="form-control" placeholder="Password Confirm" required="">
            
            <button class="btn btn-success btn-block" type="submit"><i class="fas fa-sign-in-alt " style="color:white;"></i> Sign Up</button>
            </form>`;
        content.innerHTML = "";
        document.querySelector(".overlay .content").classList.add("sign-overlay");
        content.insertAdjacentHTML("beforeend", html);
    });

// TODO Loging and sign up
const btnLogin = document.getElementById("btn_log_in");
const btnLogout = document.getElementById("btn_log_out");
const btnSignup = document.getElementById("btn_sign_up");
const profileIcon = document.querySelector(".profile");

(() => {
    const haveUser = getCookie("jwt") != "";
    if (haveUser) {
        const loggingDiv = document.querySelector(".logging-div");
        if (loggingDiv) {
            btnLogin.style.display = "none";
            btnSignup.style.display = "none";
            btnLogout.style.display = "inline";
            profileIcon.style.display = "flex";
        }
    }
})();

const showAlert = (type, msg) => {
    hideAlert();
    const markup = `<div class="c-alert c-alert--${type}">${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    setTimeout(hideAlert, 5000);
};
const hideAlert = () => {
    const el = document.querySelector(".c-alert");
    if (el) el.classList.add("hide");
    setTimeout(() => {
        if (el) el.parentElement.removeChild(el);
    }, 1000);
};

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const login = async (email, password) => {
    const res = await getDataGlobal("users/login", "post", { email, password });
    if (res.status == "ERROR" || res == "Fail") {
        showAlert("error", "Email or Password is incorrect");
    } else if (res.data.status === "success") {
        document.cookie = `jwt=${res.data.token}`;
        localStorage.setItem("name", res.data.data.name);
        localStorage.setItem("photo", res.data.data.photo);
        localStorage.setItem("userId", res.data.data._id);
        showAlert("success", "Logged in successfully");
        window.setTimeout(() => {
            location.assign("/");
        }, 1000);
    }
};

const loginAuthorized = async (dist) => {
    const res = await getDataGlobal(`Users/auth/${dist}`);
    if (res.status == "ERROR" || res == "Fail") {
        if (res.error.response) showAlert("error", res.error.response.data.message);
        else showAlert("error", "check your Connection or Contact us");
    } else if (res.data.status === "success") {
        showAlert("success", res.data.message);
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
};

if (btnLogin) {
    btnLogin.addEventListener("click", () => {
        const form = document.getElementById("loginForm");
        if (form) {
            form.addEventListener("submit", async (e) => {
                e.preventDefault();
                const userEmail = document.querySelector("#loginForm #inputEmail");
                const userPassword = document.querySelector("#loginForm #inputPassword");
                await login(userEmail.value, userPassword.value);
            });
        }
        // TODO Login With Google and FaceBook
        document.getElementById("btnSignInWithFacebook").addEventListener("click", () => {
            loginAuthorized("facebook");
        });
        document.getElementById("btnSignInWithGoogle").addEventListener("click", () => {
            loginAuthorized("google");
        });
    });
}

const logout = async () => {
    const res = await getDataGlobal("users/logout", "post", "", { Authorization: getCookie("jwt") });

    if (res.status == "ERROR" || res == "Fail") {
        showAlert("error", "Error logging out! please try again or contact us!");
    } else if (res.data.status === "success") {
        showAlert("success", "Logged out successfully");
        document.cookie = "jwt=";
        window.setTimeout(() => {
            location.assign("/");
        }, 1000);
    }
};

if (btnLogout) {
    btnLogout.addEventListener("click", async () => {
        localStorage.removeItem("name");
        localStorage.removeItem("photo");
        localStorage.removeItem("userId");
        await logout();
    });
}

const signup = async (data) => {
    const res = await getDataGlobal("users/signup", "post", data);
    if (res.status == "ERROR" || res == "Fail") {
        if (res.error.response) showAlert("error", res.error.response.data.message);
        else showAlert("error", "check your Connection or Contact us");
    } else if (res.data.status === "success") {
        localStorage.setItem("name", res.data.data.name);
        localStorage.setItem("photo", res.data.data.photo);
        localStorage.setItem("userId", res.data.data._id);
        document.cookie = `jwt=${res.data.token}`;
        showAlert("success", "signed up successfully");
        window.setTimeout(() => {
            location.assign("/profile.html");
        }, 2000);
    }
};

if (btnSignup) {
    btnSignup.addEventListener("click", () => {
        document.getElementById("signupForm").addEventListener("submit", async (e) => {
            e.preventDefault();
            const userName = document.querySelector("#signupForm #inputName");
            const userEmail = document.querySelector("#signupForm #inputEmail");
            const userPassword = document.querySelector("#signupForm #inputPassword");
            const userPasswordConfirm = document.querySelector("#signupForm #inputPassword2");
            let data = {
                name: userName.value,
                email: userEmail.value,
                password: userPassword.value,
                passwordConfirm: userPasswordConfirm.value,
            };
            const res = await signup(data);
        });
    });
}

// TODO Contact Us
const contactForm = document.getElementById("contactForm");

const sendContactusInfo = async (data) => {
    const res = await getDataGlobal("contact-us", "post", data);
    if (res.status == "ERROR" || res == "Fail") {
        if (res.error.response) showAlert("error", res.error.response.data.message);
        else showAlert("error", "check your Connection or Contact us");
    } else if (res.data.status === "success") {
        cshowAlert("success", res.data.message);
    }
};

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let data = {
            name: document.querySelector("#contactForm #name").value,
            email: document.querySelector("#contactForm #email").value,
            phone: document.querySelector("#contactForm #phone").value,
            subject: document.querySelector("#contactForm #subject").value,
            message: document.querySelector("#contactForm #message").value,
        };

        sendContactusInfo(data);
    });
}
// end contact us

// Home Showing Cases Section

const getCases = async (route) => {
    const res = await getDataGlobal(route, "get");
    if (res.status == "ERROR" || res == "Fail") {
        if (res.error.response) showAlert("error", res.error.response.data.message);
        else showAlert("error", "check your Connection or Contact us");
    } else if (res.data.status === "success") {
        return res.data.data;
    }
    return "";
};

const makeCasesHtml = (cases, kind, htmlCase, state) => {
    let htmlCases = "";
    let count = 0;
    if (kind == "home") {
        if (cases)
            cases.forEach((Case) => {
                let d = new Date(Case.date);
                if (count < 4) {
                    count++;
                    htmlCases += htmlCase
                        .replace(/@ID@/g, Case._id)
                        .replace(/@State@/g, state)
                        .replace(/@Land@/g, Case.latitude)
                        .replace(/@Lang@/g, Case.longitude)
                        .replace(/@Name@/g, Case.Name || Case.name)
                        .replace(/@Description@/g, Case.description)
                        .replace(/@Circumstances@/g, Case.circumstances)
                        .replace(/@Country@/g, Case.country || Case.location)
                        .replace(/@Photo@/g, Case.photo || "/imgs/avatar.png")
                        .replace(/@Photo@/g, "/imgs/avatar.png")
                        .replace(/@Age@/g, new Date(Case.date).getFullYear() - Case.yearOfBirth)
                        .replace(/@Date@/g, `${d.getFullYear()} : ${d.getMonth() + 1} : ${d.getDate()}`);
                }
            });
    } else {
        cases.forEach((Case) => {
            let d = new Date(Case.date);
            htmlCases += htmlCase
                .replace(/@ID@/g, Case._id)
                .replace(/@State@/g, state)
                .replace(/@Land@/g, Case.latitude)
                .replace(/@Lang@/g, Case.longitude)
                .replace(/@Name@/g, Case.Name || Case.name)
                .replace(/@Description@/g, Case.description)
                .replace(/@Circumstances@/g, Case.circumstances)
                .replace(/@Country@/g, Case.country || Case.location)
                .replace(/@Photo@/g, Case.photo || "/imgs/avatar.png")
                .replace(/@Photo@/g, "/imgs/avatar.png")
                .replace(/@Age@/g, new Date(Case.date).getFullYear() - Case.yearOfBirth)
                .replace(/@Date@/g, `${d.getFullYear()} : ${d.getMonth() + 1} : ${d.getDate()}`);
        });
    }
    return htmlCases;
};
//edit 4/7
const personCase = `
<div class="card g-col-6 g-col-md-4" >

<div class="card-body">
    <h4  class="card-title">@Name@</h4>
    <p class="card-text">@Circumstances@</p>
    
    <div class="img-contian">
    <img class="card-img-top " src="@Photo@" alt="Card image" style="width:300px;height:300px;">  
    <a  href="/case-info.html?id=@ID@&kind=@State@"  class="btn btn-primary mb-2 eye-link" >  <i class="fa-solid fa-eye"></i></a >
    <a  href="https://www.google.com/maps/@@Land@,@Lang@,21z"  class="btn btn-primary mb-2 location-link" >  <i class="fa-solid fa-location-dot"></i> </a >

    
    </div>
    
    
    <p class="card-text card-date"><i class="fa fa-calendar" aria-hidden="true"></i> @Date@</p>
    <p class="">@Country@</p>
    <p class="card-text card-age">Age : @Age@</p>
</div>
</div>

`;

//edit 4/7
const thingCase = `
<div class="card g-col-6 g-col-md-4" >

<div class="card-body">
    <h4  class="card-title">@Name@</h4>
    <p class="card-text">@Description@</p>
    
    <div class="img-contian">
    <img class="card-img-top " src="@Photo@" alt="Card image" style="width:300px;height:300px;">  
    <a  href="/case-info.html?id=@ID@&kind=thing"  class="btn btn-primary mb-2 eye-link" >  <i class="fa-solid fa-eye"></i></a >
    <a  href="https://www.google.com/maps/@@Land@,@Lang@,21z"  class="btn btn-primary mb-2 location-link" >  <i class="fa-solid fa-location-dot"></i> </a >
    </div>
    
    <p class="card-text card-date"><i class="fa fa-calendar" aria-hidden="true"></i> @Date@</p>
    <p class="">@Country@</p>
</div>
</div>

`;
const startDisplay = async (con, route, kind, tempKind, state) => {
    let temp = "";
    if (tempKind == "person") {
        temp = personCase;
    } else {
        temp = thingCase;
    }
    const cases = await getCases(route);
    con.insertAdjacentHTML("afterbegin", makeCasesHtml(cases, kind, temp, state));
};
// Home cases
const fourCasesCon = document.getElementById("cases-container");
const fourCasesFCon = document.getElementById("fcases-container");
const fourThingsCon = document.getElementById("things-container");

if (fourThingsCon) startDisplay(fourThingsCon, "things/getAllThings", "home", "thing");
if (fourCasesCon) startDisplay(fourCasesCon, "person/getMissing", "home", "person", "missing");
if (fourCasesFCon) startDisplay(fourCasesFCon, "person/getMissingF", "home", "person", "found");

// Lost Cases
const lostCarCon = document.getElementById("all-lost-transportaions-container");
const lostOtherCon = document.getElementById("lost-other-container");
const lostPeapleCon = document.getElementById("all-lost-peaple-container");
const lostMobileCon = document.getElementById("all-lost-mobile-container");
const lostDocumentCon = document.getElementById("all-lost-document-container");

if (lostPeapleCon) startDisplay(lostPeapleCon, "person/getMissing", "", "person");
if (lostOtherCon) startDisplay(lostOtherCon, "things/serch?state=missing&type=others", "", "thing");
if (lostMobileCon) startDisplay(lostMobileCon, "things/serch?state=missing&type=devices", "", "thing");
if (lostCarCon) startDisplay(lostCarCon, "things/serch?state=missing&type=transportations", "", "thing");
if (lostDocumentCon) startDisplay(lostDocumentCon, "things/serch?state=missing&type=papers", "", "thing");

const foundCarCon = document.getElementById("all-found-transportaions-container");
const foundOtherCon = document.getElementById("found-other-container");
const foundPeapleCon = document.getElementById("all-found-peaple-container");
const foundMobileCon = document.getElementById("all-found-mobile-container");
const foundDocumentCon = document.getElementById("all-found-document-container");

if (foundPeapleCon) startDisplay(foundPeapleCon, "person/getMissingF", "", "person");
if (foundOtherCon) startDisplay(foundOtherCon, "Things/serch?state=found&type=others", "", "thing");
if (foundMobileCon) startDisplay(foundMobileCon, "Things/serch?state=found&type=devices", "", "thing");
if (foundCarCon) startDisplay(foundCarCon, "Things/serch?state=found&type=transportations", "", "thing");
if (foundDocumentCon) startDisplay(foundDocumentCon, "Things/serch?state=found&type=papers", "", "thing");

// Search
function openPage(pageName, element, color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    element.style.backgroundColor = color;
}

if (search) {
    search.addEventListener("click", () => {
        // Get the element with id="defaultOpen" and click on it
        document.getElementById("defaultOpen").click();
    });
}

// TODO Admin

const caseTempInAdmin = `
    <!-- Single item -->
    <div class="row admin-case">
        <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
            <!-- Image -->
            <div class="bg-image hover-overlay hover-zoom ripple rounded"
                data-mdb-ripple-color="light">
                <img src="@Photo@" class="w-100" alt="Blue Jeans Jacket" style="max-height: 200px;" />
                <a href="#!">
                    <div class="mask" style="background-color: rgba(251, 251, 251, 0.2)"></div>
                </a>
            </div>
            <!-- Image -->
        </div>

        <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
            <!-- Data -->
            <p><strong>@Type@ : @Status@</strong></p>
            <p><strong>Name : @Name@ </strong></p>
            <p>@Kind@ : @KindValue@</p>
            <div class="admin-btns mt-4">
                <button data-id="@ID@" data-type="Reject" data-kind="@K@" data-state="@S@" type="button" class="@DISABLE@ btn-admin btn btn-info btn-sm me-1 mb-2"
                    data-mdb-toggle="tooltip" title="Reject this case">
                </button>
                <button data-id="@ID@" data-type="Delete" data-kind="@K@" data-state="@S@" type="button" class="btn-admin btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip"
                    title="Delete this case">
                </button>
                <button data-id="@ID@" data-type="Accept" data-kind="@K@" data-state="@S@" type="button" class="@DISABLE@ btn-admin btn btn-success btn-sm mb-2"
                    data-mdb-toggle="tooltip" title="Accept This Case">
                </button>
            </div>
            <!-- Data -->
        </div>

        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">

            <!-- case date -->
            <p class="text-start text-md-center">
                <p>Case Number: @i@</p>
                <strong>date of @f_or_l@ : @Date@</strong>
            </p>
            <!-- END case date -->
        </div>
    </div>
    <!-- Single item -->
    <hr class="my-4" />`;

const casesTempInAdmin = `
        <div class="container py-5">
            <div class="row d-flex justify-content-center my-4">
                <div class="col-md-8">
                    <div class="card mb-4">
                        <div class="card-header py-3">
                            <h5 class="mb-0">Uplaoded Cases</h5>
                        </div>
                        <div class="card-body">
                            @CASE@
                        </div>
                    </div>
                </div>
            </div>
        </div>
`;

const adminPersonBtn = document.querySelector(".admin-swap-persons");
const adminMobileBtn = document.querySelector(".admin-swap-devices");
const adminDocumentBtn = document.querySelector(".admin-swap-papers");
const adminOthersBtn = document.querySelector(".admin-swap-others");
const adminCarBtn = document.querySelector(".admin-swap-transportations");

const adminCustomNaver = document.querySelector(".admin-custom-naver");

// Check Admin
(async () => {
    if (getCookie("jwt")) {
        const res = await getDataGlobal("Admin/getDataAdminPerson", "get", "", { Authorization: getCookie("jwt") });
        if (res.error && res.error.response.statusText == "Forbidden") {
            document.getElementById("openAdmin").style.display = "none";
        }
    }
})();

const makeCasesHtmlInAdmin = async (cases, type, state, temp = "") => {
    return cases.map((Case) => {
        let i = Case.caseN ? Case.caseN : Case.castDate;
        if (type != "person") state = Case.state;
        if (temp == "") temp = caseTempInAdmin;
        return temp
            .replace(/@K@/g, type)
            .replace(/@S@/g, Case.status || state)
            .replace(/@Type@/g, type)
            .replace(/@ID@/g, Case._id)
            .replace(/@f_or_l@/g, state)
            .replace(/@Status@/g, state)
            .replace(/@Name@/g, Case.Name || Case.name)
            .replace(/@i@/g, i.slice(0, i.indexOf("T")))
            .replace(/@KindValue@/g, Case.gender || Case.model)
            .replace(/@DISABLE@/g, Case.Accept ? "disable" : "")
            .replace(/@Kind@/g, Case.gender ? "gender" : "model")
            .replace(/@Photo@/g, Case.photo || "/imgs/default.jpg")
            .replace(/@Photo@/g, "/imgs/default.jpg")
            .replace(/@Date@/g, Case.date.slice(0, Case.date.indexOf("T")));
    });
};
const showCasesHtmlInAdmin = (con, html) => {
    const container = document.querySelector(`#admin__${con} div`);
    container.innerHTML = "";
    container.insertAdjacentHTML("afterbegin", casesTempInAdmin.replace("@CASE@", html));
};

const showCasesFiltered = async (kind) => {
    let cases = (await getDataGlobal("Admin/getDataAdminThings", "get", "", { Authorization: getCookie("jwt") })).data.data;
    cases = cases.filter((Case) => Case.type.toLowerCase() == kind);
    const casesHtml = await makeCasesHtmlInAdmin(cases, kind, "missing");
    showCasesHtmlInAdmin(kind, casesHtml);
};

if (adminCustomNaver) {
    // Check Admin
    // Admin/getDataAdminPerson
    (async () => {
        const res = await getDataGlobal("Admin/getDataAdminPerson", "get", "", { Authorization: getCookie("jwt") });
        if (res.error && res.error.response.statusText == "Forbidden") location.assign("/");
    })();

    // Pages
    adminPersonBtn.addEventListener("click", async () => {
        let cases = (await getDataGlobal("Admin/getDataAdminPerson", "get", "", { Authorization: getCookie("jwt") })).data.data;
        let casesF = (await getDataGlobal("Admin/getDataAdminPersonF", "get", "", { Authorization: getCookie("jwt") })).data.data;
        const casesHtml = await makeCasesHtmlInAdmin(cases, "person", "missing");
        const casesFHtml = await makeCasesHtmlInAdmin(casesF, "person", "found");
        showCasesHtmlInAdmin("persons", casesHtml + casesFHtml);
    });
    adminCarBtn.addEventListener("click", async () => {
        // transportation
        showCasesFiltered("transportations");
    });
    adminMobileBtn.addEventListener("click", async () => {
        // devices
        showCasesFiltered("devices");
    });
    adminDocumentBtn.addEventListener("click", async () => {
        // paper
        showCasesFiltered("papers");
    });
    adminOthersBtn.addEventListener("click", async () => {
        // paper
        showCasesFiltered("others");
    });
    document.getElementById("admin__defaultOpen").click();

    // Buttons

    adminCustomNaver.addEventListener("click", async (e) => {
        if (e.target.classList.contains("btn-admin")) {
            // data-id="@ID@" data-type="accept" data-kind="person" data-state="missing"
            const id = e.target.getAttribute("data-id");
            const btnType = e.target.getAttribute("data-type");
            const caseKind = e.target.getAttribute("data-kind");
            const caseState = e.target.getAttribute("data-state") == "missing" ? "" : "F";
            const method = btnType == "Delete" ? "delete" : "post";
            const data = btnType == "Reject" ? prompt("Write what is wrong with this Case in here", "something is wrong") : "";
            let res = "";
            if (caseKind == "person") {
                res = await getDataGlobal(`Admin/admin${btnType}Person${caseState}/${id}`, method, data, { Authorization: getCookie("jwt") });
            } else {
                res = await getDataGlobal(`Admin/admin${btnType}Things/${id}`, method, data, { Authorization: getCookie("jwt") });
            }
            if (res.status == "ERROR" || res == "Fail") {
                if (res.error.response) showAlert("error", res.error.response.data.message);
                else showAlert("error", "check your Connection or Contact us");
            } else if (res.data.status === "success") {
                showAlert("success", res.data.message);
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        }
    });
}

// TODO Change The Password
const changePasswordForm = document.querySelector(".changePasswordForm");
const validate = (condition, container) => {
    if (condition) {
        container.classList.remove("invalid");
        container.classList.add("valid");
    } else {
        container.classList.remove("valid");
        container.classList.add("invalid");
    }
};
const makeCheckers = (con) => {
    return {
        old: document.querySelector(`${con} .oldPass`),
        length: document.querySelector(`${con} .length`),
        capital: document.querySelector(`${con} .capital`),
        content: document.querySelector(`${con} .content`),
        match: document.querySelector(`${con} .match-content`),
        not_content: document.querySelector(`${con} .not-content`),
    };
};
if (changePasswordForm) {
    const passHelp = document.getElementById("passwordHelpBlock");
    const newPassword = document.getElementById("inputPasswordNew");
    const passwordCurrent = document.getElementById("inputPasswordOld");
    const oldPassHelp = document.getElementById("oldPasswordHelpBlock");
    const submitBtn = document.querySelector(".changePasswordForm .btn");
    const passwordConfirm = document.getElementById("inputPasswordNewVerify");
    const passConfirmHelp = document.getElementById("passwordConfirmHelpBlock");

    const chekers = makeCheckers(".changePasswordForm");
    passwordCurrent.onkeyup = () => {
        validate(passwordCurrent.value != "", chekers.old);
    };
    newPassword.onkeyup = () => {
        // Validate length
        validate(newPassword.value.length >= 8, chekers.length);
        // Validate lowercase letters
        validate(newPassword.value.match(/[a-z]/g), chekers.content);
        // Validate capital letters
        validate(newPassword.value.match(/[A-Z]/g), chekers.capital);
        // Validate numbers
        validate(newPassword.value.match(/[0-9]/g), chekers.content);
        // Check special characters, emojis or spaces
        validate(!newPassword.value.match(/[^a-zA-Z0-9]/g), chekers.not_content);
        validate(newPassword.value == passwordConfirm.value, chekers.match);
    };
    passwordConfirm.onkeyup = () => {
        validate(newPassword.value == passwordConfirm.value, chekers.match);
    };
    submitBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        validate(passwordCurrent.value != "", chekers.old);
        validate(newPassword.value != "", chekers.content);
        validate(passwordConfirm.value != "", chekers.match);
        if (passHelp.innerHTML.match(/invalid/g) || passConfirmHelp.innerHTML.match(/invalid/g) || oldPassHelp.innerHTML.match(/invalid/g)) {
            showAlert("error", "Please make your password matchs the conditions");
        } else {
            // const data = ;
            const res = await getDataGlobal(
                "Users/updatePassword",
                "patch",
                {
                    passwordCurrent: passwordCurrent.value,
                    newPassword: newPassword.value,
                    passwordConfirm: passwordConfirm.value,
                },
                { Authorization: getCookie("jwt") }
            );
            if (res.status == "ERROR" || res == "Fail") {
                if (res.error.response) showAlert("error", res.error.response.data.message);
                else showAlert("error", "check your Connection or Contact us");
            } else if (res.data.status === "success") {
                document.cookie = `jwt=${res.data.token}`;
                showAlert("success", "password Updated Successfuly");
                location.assign("/profile.html");
            }
        }
    });
}

// TODO Forget Password

const resetPasswordForm = document.getElementById("resetPasswordForm");
const forgetPasswordForm = document.getElementById("forgetPasswordForm");
const changePasswordForm2 = document.getElementById("changePasswordForm2");

if (forgetPasswordForm) {
    const inputResetPasswordEmail = document.getElementById("inputResetPasswordEmail");
    forgetPasswordForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (inputResetPasswordEmail.value != "") {
            const res = await getDataGlobal("Users/forgetPassword", "post", { email: inputResetPasswordEmail.value });
            if (res.status == "ERROR" || res == "Fail") {
                if (res.error.response) showAlert("error", res.error.response.data.message);
                else showAlert("error", "check your Connection or Contact us");
            } else if (res.data.status === "success") {
                showAlert("success", res.data.message);
                setTimeout(() => {
                    location.assign("/resetPassword.html");
                }, 1500);
            }
        }
    });
}

if (resetPasswordForm) {
    const inputResetPasswordEmail = document.getElementById("inputPasswordNewVerify");
    resetPasswordForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (inputResetPasswordEmail.value != "") {
            const res = await getDataGlobal("Users/verifyCode", "post", { code: inputResetPasswordEmail.value });
            if (res.status == "ERROR" || res == "Fail") {
                if (res.error.response) showAlert("error", res.error.response.data.message);
                else showAlert("error", "check your Connection or Contact us");
            } else if (res.data.status === "success") {
                showAlert("success", res.data.message);
                setTimeout(() => {
                    location.assign(`/changePassword.html?code=${inputResetPasswordEmail.value}`);
                }, 1500);
            }
        }
    });
}

if (changePasswordForm2) {
    const { code } = params;
    if (!code) location.assign("/");
    const passHelp = document.getElementById("passwordHelpBlock");
    const inputPassword = document.getElementById("inputPasswordNew");
    const passConfirmHelp = document.getElementById("passwordConfirmHelpBlock");
    const inputPasswordConfirm = document.getElementById("inputPasswordNewVerify");

    const chekers = makeCheckers("#changePasswordForm2");
    inputPassword.onkeyup = () => {
        // Validate length
        validate(inputPassword.value.length >= 8, chekers.length);
        // Validate lowercase letters
        validate(inputPassword.value.match(/[a-z]/g), chekers.content);
        // Validate capital letters
        validate(inputPassword.value.match(/[A-Z]/g), chekers.capital);
        // Validate numbers
        validate(inputPassword.value.match(/[0-9]/g), chekers.content);
        // Check special characters, emojis or spaces
        validate(!inputPassword.value.match(/[^a-zA-Z0-9]/g), chekers.not_content);
        validate(inputPassword.value == inputPasswordConfirm.value, chekers.match);
    };
    inputPasswordConfirm.onkeyup = () => {
        validate(inputPassword.value == inputPasswordConfirm.value, chekers.match);
    };
    changePasswordForm2.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (passHelp.innerHTML.match(/invalid/g) || passConfirmHelp.innerHTML.match(/invalid/g)) {
            showAlert("error", "Please make your password matchs the conditions");
        } else {
            if (inputPassword.value != "" && inputPasswordConfirm != "") {
                const data = {
                    newPassword: inputPassword.value,
                    passwordConfirm: inputPasswordConfirm.value,
                };
                const res = await getDataGlobal(`Users/resetPasswordByButton/${code}`, "patch", data);
                if (res.status == "ERROR" || res == "Fail") {
                    if (res.error.response) showAlert("error", res.error.response.data.message);
                    else showAlert("error", "check your Connection or Contact us");
                } else if (res.data.status === "success") {
                    showAlert("success", res.data.message);
                    setTimeout(() => {
                        location.assign(`/`);
                    }, 1500);
                }
            }
        }
    });
}

// TODO Show and Edit Case

const changeCaseTemp = async (route, caseTemp, container, status, id) => {
    const res = await getDataGlobal(route, "get", "", { Authorization: getCookie("jwt") });
    if (res.status == "ERROR" || res == "Fail") {
        if (res.error.response) showAlert("error", res.error.response.data.message);
        else showAlert("error", "check your Connection or Contact us");
    } else if (res.data.status === "success") {
        const data = res.data.data.find((Case) => {
            return Case._id == id;
        });
        let kind = data.gender ? "gender" : "model";
        if (status == "thing") status = data.state;
        caseTemp = caseTemp
            .replace(/@Kind@/g, kind || "")
            .replace(/@Type@/g, data.type || "")
            .replace(/@City@/g, data.city || "")
            .replace(/@State@/g, status || "")
            .replace(/@Photo@/g, data.photo || "")
            .replace(/@Photo@/g, "/imgs/default.jpg")
            .replace(/@Phone@/g, data.phone || "")
            .replace(/@Email@/g, data.email || "")
            .replace(/@Model@/g, data.model || "")
            .replace(/@Color@/g, data.color || "")
            .replace(/@Height@/g, data.height || "")
            .replace(/@Weight@/g, data.weight || "")
            .replace(/@Location@/g, data.location || "")
            .replace(/@StateType@/g, data.stateType || "")
            .replace(/@Car_number@/g, data.car_number || "")
            .replace(/@MotherName@/g, data.motherName || "")
            .replace(/@FatherName@/g, data.fatherName || "")
            .replace(/@Name@/g, data.name || data.Name || "")
            .replace(/@WhatsNamber@/g, data.whatsNamber || "")
            .replace(/@Description@/g, data.description || "")
            .replace(/@YearOfBirth@/g, data.yearOfBirth || "")
            .replace(/@Circumstances@/g, data.circumstances || "")
            .replace(/@KindValue@/g, data.gender || data.model || "")
            .replace(/@Characteristics@/g, data.characteristics || "")
            .replace(/@Country@/g, data.country || data.location || "")
            .replace(/@AgeOrColor@/g, data.color ? "color" : "age" || "")
            .replace(/@MessengerUserName@/g, data.messengerUserName || "")
            .replace(/@DateOfLose@/g, data.date ? data.date.slice(0, data.date.indexOf("T")) : "")
            .replace(/@Describtion@/g, data.description || data.circumstances || "")
            .replace(/@AgeOrColorValue@/g, data.color || new Date(data.date).getFullYear() - data.yearOfBirth || "");
        document.querySelector(container).insertAdjacentHTML("afterbegin", caseTemp);
    }
};
const showCaseInfo = document.getElementById("showCaseInfo");
if (showCaseInfo) {
    const { id, kind } = params;
    if (!id) location.assign("/");
    const showCaseTemp = `
        <div class="col-md-4">
            <img alt="" style="width: 600px" title="" class="img-circle img-thumbnail isTooltip" src="@Photo@" data-original-title="Usuario" />
        </div>
        <div class="col-md-6 mt-3">
            <strong>Information</strong><br />
            <div class="table-responsive">
                <table class="table table-user-information">
                    <tbody>
                        <tr>
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-asterisk text-primary"></span>
                                    Phone
                                </strong>
                            </td>
                            <td class="text-primary">@Phone@</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-user text-primary"></span>
                                    Name
                                </strong>
                            </td>
                            <td class="text-primary">@Name@</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-cloud text-primary"></span>
                                    @Kind@
                                </strong>
                            </td>
                            <td class="text-primary">@KindValue@</td>
                        </tr>

                        <tr>
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-bookmark text-primary"></span>
                                    Country
                                </strong>
                            </td>
                            <td class="text-primary">@Country@</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-envelope text-primary"></span>
                                    Email
                                </strong>
                            </td>
                            <td class="text-primary">@Email@</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-calendar text-primary"></span>
                                    @AgeOrColor@
                                </strong>
                            </td>
                            <td class="text-primary">@AgeOrColorValue@</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-calendar text-primary"></span>
                                    Date of loss
                                </strong>
                            </td>
                            <td class="text-primary">@DateOfLose@</td>
                        </tr>

                        <tr>
                            <td>
                                <strong>
                                    <span class="glyphicon glyphicon-calendar text-primary"></span>
                                    Case Describtion
                                </strong>
                            </td>
                            <td class="text-primary">@Describtion@</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
    if (kind == "thing") {
        // const changeCaseTemp = async (route, caseTemp, container, status, id) => {
        changeCaseTemp(`Things/serch?_id=${id}`, showCaseTemp, "#showCaseInfo .row", kind, id);
    } else {
        //
        changeCaseTemp(`person/findPerson${kind == "missing" ? "" : "F"}`, showCaseTemp, "#showCaseInfo .row", kind, id);
    }
}

const editCaseInfo = document.getElementById("editCaseInfo");
const handleSaveCase = async (kind, id, editCaseTemp) => {
    if (kind == "thing") {
        await changeCaseTemp(`Things/serch?_id=${id}`, editCaseTemp, "#editCaseInfo .row", kind, id);
    } else {
        await changeCaseTemp(`person/getMissingByUser${kind == "missing" ? "" : "F"}`, editCaseTemp, "#editCaseInfo .row", kind, id);
    }
    const saveCase = document.querySelector("#editCaseInfo .btn");
    saveCase.addEventListener("click", async () => {
        if (kind == "thing") {
            const dataThings = {
                name: document.querySelector("#editCaseInfo #Name").value,
                type: document.querySelector("#editCaseInfo #Type").value,
                state: document.querySelector("#editCaseInfo #State").value,
                phone: document.querySelector("#editCaseInfo #Phone").value,
                model: document.querySelector("#editCaseInfo #Model").value,
                color: document.querySelector("#editCaseInfo #Color").value,
                location: document.querySelector("#editCaseInfo #Location").value,
                car_number: document.querySelector("#editCaseInfo #Car_number").value,
                whatsNamber: document.querySelector("#editCaseInfo #WhatsNamber").value,
                description: document.querySelector("#editCaseInfo #Description").value,
                messengerUserName: document.querySelector("#editCaseInfo #MessengerUserName").value,
            };
            const res = await getDataGlobal(`Things/updateThingsForUser/${id}`, "patch", dataThings, { Authorization: getCookie("jwt") });
            if (res.status == "ERROR" || res == "Fail") {
                if (res.error.response) showAlert("error", res.error.response.data.message);
                else showAlert("error", "check your Connection or Contact us");
            } else if (res.data.status === "success") {
                showAlert("success", res.data.message);
                setTimeout(() => {
                    location.reload();
                }, 1500);
            }
        } else {
            const dataPerson = {
                Name: document.querySelector("#editCaseInfo #Name").value,
                city: document.querySelector("#editCaseInfo #City").value,
                phone: document.querySelector("#editCaseInfo #Phone").value,
                height: document.querySelector("#editCaseInfo #Height").value,
                weight: document.querySelector("#editCaseInfo #Weight").value,
                country: document.querySelector("#editCaseInfo #Country").value,
                stateType: document.querySelector("#editCaseInfo #StateType").value,
                fatherName: document.querySelector("#editCaseInfo #FatherName").value,
                motherName: document.querySelector("#editCaseInfo #MotherName").value,
                yearOfBirth: document.querySelector("#editCaseInfo #YearOfBirth").value,
                circumstances: document.querySelector("#editCaseInfo #Circumstances").value,
                characteristics: document.querySelector("#editCaseInfo #Characteristics").value,
            };
            const res = await getDataGlobal(`person/updateDataofMissing${kind == "missing" ? "" : "F"}/${id}`, "patch", dataPerson, { Authorization: getCookie("jwt") });
            if (res.status == "ERROR" || res == "Fail") {
                if (res.error.response) showAlert("error", res.error.response.data.message);
                else showAlert("error", "check your Connection or Contact us");
            } else if (res.data.status === "success") {
                showAlert("success", res.data.message);
                setTimeout(() => {
                    location.reload();
                }, 1500);
            }
        }
    });
};
if (editCaseInfo) {
    const { id, kind } = params;
    if (!id) location.assign("/");
    let editCaseTemp = `
            <div class="col-md-2 border-right">
                
            </div>
            <div class="col-md-8 border-right">
                <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4  class="text-right">Case Settings</h4>
                    </div>
                    <div class="row mt-1">
                        @CASE@
                    </div>

                    <div class="mt-1 text-center"><button class="btn btn-primary profile-button" type="button">Save</button></div>
                </div>
            </div>
    `;
    const personEditCaseTemp = `
            <div class="col-md-6 mt-2"><label class="labels">Name</label><input id="Name" type="text" class="form-control" placeholder="full name" value="@Name@" /></div>
            <div class="col-md-6 mt-2"><label class="labels">Mobile Number</label><input id="Phone" type="text" class="form-control" placeholder="enter phone number" value="@Phone@" /></div>
            <div class="col-md-6 mt-2"><label class="labels">fatherName</label><input id="FatherName" type="text" class="form-control" value="@FatherName@" placeholder="fatherName" /></div>
            <div class="col-md-6 mt-2"><label class="labels">motherName</label><input id="MotherName" type="text" class="form-control" value="@MotherName@" placeholder="motherName" /></div>
            <div class="col-md-6 mt-2"><label class="labels">Country</label><input id="Country" type="text" class="form-control" placeholder="Country" value="@Country@" /></div>
            <div class="col-md-6 mt-2"><label class="labels">yearOfBirth</label><input id="YearOfBirth" type="text" class="form-control" placeholder="yearOfBirth" value="@YearOfBirth@" /></div>
            <div class="col-md-6 mt-2"><label class="labels">Circumstances</label><input id="Circumstances" type="text" class="form-control" placeholder="Circumstances" value="@Circumstances@" /></div>
            <div class="col-md-6 mt-2"><label class="labels">Characteristics</label><input id="Characteristics" type="text" class="form-control" placeholder="Characteristics" value="@Characteristics@" /></div>
            <div class="col-md-6 mt-2"><label class="labels">City</label><input id="City" type="text" class="form-control" placeholder="City" value="@City@" /></div>
            <div class="col-md-6 mt-2"><label class="labels">stateType</label><input id="StateType" type="text" class="form-control" placeholder="stateType" value="@StateType@" /></div>
            <div class="col-md-6 mt-2"><label class="labels">Height</label><input id="Height" type="text" class="form-control" placeholder="Height" value="@Height@" /></div>
            <div class="col-md-6 mt-2"><label class="labels">Weight</label><input id="Weight" type="text" class="form-control" placeholder="Weight" value="@Weight@" /></div>
            `;
    const thingsEditCaseTemp = `
            <div class="col-md-6 mt-2"><label class="labels">Name</label><input id="Name" type="text" class="form-control" placeholder="full name" value="@Name@" /></div>
            <div class="col-md-6 mt-2"><label class="labels">State</label><input id="State" type="text" class="form-control" value="@State@" placeholder="State" /></div>
            <div class="col-md-6 mt-2"><label class="labels">Type</label><input id="Type" type="text" class="form-control" placeholder="Type" value="@Type@" /></div>
            <div class="col-md-6 mt-2"><label class="labels">Mobile Number</label><input id="Phone" type="text" class="form-control" placeholder="enter phone number" value="@Phone@" /></div>
            <div class="col-md-6 mt-2"><label class="labels">Model</label><input id="Model" type="text" class="form-control" placeholder="Model" value="@Model@" /></div>
            <div class="col-md-6 mt-2"><label class="labels">Color</label><input id="Color" type="text" class="form-control" placeholder="Color" value="@Color@" /></div>
            <div class="col-md-6 mt-2"><label class="labels">Description</label><input id="Description" type="text" class="form-control" placeholder="Description" value="@Description@" /></div>
            <div class="col-md-6 mt-2"><label class="labels">Location</label><input id="Location" type="text" class="form-control" placeholder="Location" value="@Location@" /></div>
            <div class="col-md-6 mt-2"><label class="labels">Messenger Username</label><input id="MessengerUserName" type="text" class="form-control" placeholder="MessengerUserName" value="@MessengerUserName@" /></div>
            <div class="col-md-6 mt-2"><label class="labels">metal plates number</label><input id="Car_number" type="text" class="form-control" placeholder="Car_number" value="@Car_number@" /></div>
            <div class="col-md-6 mt-2"><label class="labels">WhatsApp Namber</label><input id="WhatsNamber" type="text" class="form-control" placeholder="WhatsNamber" value="@WhatsNamber@" /></div>
            `;
    if (kind == "thing") editCaseTemp = editCaseTemp.replace("@CASE@", thingsEditCaseTemp);
    else editCaseTemp = editCaseTemp.replace("@CASE@", personEditCaseTemp);
    handleSaveCase(kind, id, editCaseTemp);
}

// TODO Upload Case
const uploadPage = document.getElementById("uploadPage");
if (uploadPage) {
    document.getElementById("defaultOpen").click();

    navigator.geolocation.getCurrentPosition((pos) => {
        localStorage.setItem("lati", pos.coords.latitude);
        localStorage.setItem("long", pos.coords.longitude);
    });

    const getUploadedData = (con) => {
        return {
            name: document.querySelector(`#uploadPage #${con} .caseName`) || "",
            motherName: document.querySelector(`#uploadPage #${con} .caseMName`) || "",
            fatherName: document.querySelector(`#uploadPage #${con} .caseFName`) || "",
            weight: document.querySelector(`#uploadPage #${con} .caseWeight`) || "",
            height: document.querySelector(`#uploadPage #${con} .caseHeight`) || "",
            status: document.querySelector(`#uploadPage #${con} .caseStatus`) || "",
            gender: document.querySelector(`#uploadPage #${con} .caseGender`) || "",
            country: document.querySelector(`#uploadPage #${con} .caseCountry`) || "",
            nationality: document.querySelector(`#uploadPage #${con} .caseCountry`) || "",
            state: document.querySelector(`#uploadPage #${con} .caseState`) || "",
            city: document.querySelector(`#uploadPage #${con} .caseCity`) || "",
            yearOfBirth: document.querySelector(`#uploadPage #${con} .caseYearOfBirth`) || "",
            location: document.querySelector(`#uploadPage #${con} .caseLocation`) || "",
            number: document.querySelector(`#uploadPage #${con} .caseNumber`) || "",
            email: document.querySelector(`#uploadPage #${con} .caseEmail`) || "",
            date: document.querySelector(`#uploadPage #${con} .caseDate`) || "",
            photo: document.querySelector(`#uploadPage #${con} .casePhoto`) || "",
            photoName: document.querySelector(`#uploadPage #${con} .casePhotoName`) || "",
            type: document.querySelector(`#uploadPage #${con} .caseType`) || "" || "",
            model: document.querySelector(`#uploadPage #${con} .caseModel`) || "",
            color: document.querySelector(`#uploadPage #${con} .caseColor`) || "",
            circumstances: document.querySelector(`#uploadPage #${con} .caseComment`) || "",
            description: document.querySelector(`#uploadPage #${con} .caseComment`) || "",
        };
    };

    const personUploadBtn = document.querySelector("#uploadPage #person .LetsUploadCrap");
    personUploadBtn.addEventListener("click", async () => {
        const Case = getUploadedData("person");
        const data = new FormData();
        /*
            name: 
            status: 
            fatherName:
            motherName: 
            yearOfBirth: 
            gender: 
            height: 
            weight:
            date:
            photo: 
            country: 
            state: 
            city: 
            circumstances:
            phone: 
            currentUser: 
            // whatsApp:
            // messangerUserName:
        */
        data.append("Name", Case.name.value);
        data.append("status", Case.status.value);
        data.append("fatherName", Case.fatherName.value);
        data.append("motherName", Case.motherName.value);
        data.append("yearOfBirth", Case.yearOfBirth.value);
        data.append("gender", Case.gender.value);
        data.append("height", Case.height.value);
        data.append("weight", Case.weight.value);
        data.append("date", Case.date.value);
        data.append("country", Case.country.value);
        data.append("nationality", Case.nationality.value);
        data.append("state", Case.state.value);
        data.append("city", Case.city.value);
        data.append("circumstances", Case.circumstances.value);
        data.append("phone", Case.number.value);
        data.append("latitude", localStorage.getItem("lati"));
        data.append("longitude", localStorage.getItem("long"));
        data.append("photo", Case.photo.files[0]);
        data.append("currentUser", localStorage.getItem("userId"));
        const res = await getDataGlobal(`person/uploadMissingPerson${Case.status.value == "missing" ? "" : "F"}`, "post", data, { Authorization: getCookie("jwt") });
        if (res.status == "ERROR" || res == "Fail") {
            if (res.error.response) showAlert("error", res.error.response.data.message);
            else showAlert("error", "check your Connection or Contact us");
        } else if (res.data.status === "success") {
            showAlert("success", res.data.message);
            setTimeout(() => {
                location.reload();
            }, 1500);
        }
    });

    const thingsUploadBtn = document.querySelector("#uploadPage #things .LetsUploadCrap");
    thingsUploadBtn.addEventListener("click", async () => {
        const Case = getUploadedData("things");

        const data = new FormData();
        /*
            name: 
            type: 
            status: 
            model: 
            color:
            description:
            photo:
            date: 
            location: 
            phone: 
            whatsApp:
            userID:

        */
        data.append("name", Case.name.value);
        data.append("type", Case.type.value);
        data.append("state", Case.status.value);
        data.append("model", Case.model.value);
        data.append("color", Case.color.value);
        data.append("description", Case.description.value);
        data.append("photo", Case.photo.files[0]);
        data.append("date", Case.date.value);
        data.append("location", Case.location.value);
        data.append("phone", Case.number.value);
        data.append("userID", localStorage.getItem("userId"));
        const res = await getDataGlobal("Things/upload", "post", data, { Authorization: getCookie("jwt") });
        if (res.status == "ERROR" || res == "Fail") {
            if (res.error.response) showAlert("error", res.error.response.data.message);
            else showAlert("error", "check your Connection or Contact us");
        } else if (res.data.status === "success") {
            showAlert("success", res.data.message);
            setTimeout(() => {
                location.reload();
            }, 1500);
        }
    });
}

// Todo Ar - en
class Translate {
    constructor() {
        document.getElementById("arabic").addEventListener("click", () => {
            this.translate("arabic");
        });

        document.getElementById("english").addEventListener("click", () => {
            localStorage.clear();
            window.location.reload();
            // this.translate("english");
        });
        this.translate(localStorage.getItem("Language"));
    }

    translate(language) {
        localStorage.setItem("Language", language);
        if (language == "arabic") {
            document.querySelectorAll(".logoText").forEach((heading) => {
                heading.innerHTML = "مفقود";
            });
            document.querySelectorAll(".uploadText").forEach((heading) => {
                heading.innerHTML = "ارفع حاله";
            });
            document.querySelectorAll(".lostText").forEach((heading) => {
                heading.innerHTML = "المفقودات";
            });
            document.querySelectorAll(".PeopleText").forEach((heading) => {
                heading.innerHTML = "الاشخاص";

            });
            document.querySelectorAll(".TransportaionsT").forEach((heading) => {
                heading.innerHTML = "وسائل النقل"
            });
            document.querySelectorAll(".DevicesT").forEach((heading) => {
                heading.innerHTML = "الاجهزه";

            });
            document.querySelectorAll(".PapersT").forEach((heading) => {
                heading.innerHTML = "الاوراق";

            });
            document.querySelectorAll(".AnotherT").forEach((heading) => {
                heading.innerHTML = "أشياء اخري";
            });
            document.querySelectorAll(".FoundT").forEach((heading) => {
                heading.innerHTML = "تم العثور عليها";
            });
            document.querySelectorAll(".AboutT").forEach((heading) => {
                heading.innerHTML = "من نحن";
            });
            document.querySelectorAll(".ContactT").forEach((heading) => {
                heading.innerHTML = "تواصل معنا";
            });
            document.querySelectorAll(".LangT").forEach((heading) => {
                heading.innerHTML = "اللغه";
            });
            document.querySelectorAll(".SelectLangT").forEach((heading) => {
                heading.innerHTML = "اختار اللغه";
            });
            document.querySelectorAll(".ArabicT").forEach((heading) => {
                heading.innerHTML = "العربية";
            });
            document.querySelectorAll(".EnglishT").forEach((heading) => {
                heading.innerHTML = "الانجليزية";
            });
            document.querySelectorAll(".SearchT").forEach((heading) => {
                heading.placeholder = "ابحث";
            });
            document.querySelectorAll(".ProfileT").forEach((heading) => {
                heading.innerHTML = "الصفحه الشخصيه";
            });
            document.querySelectorAll(".MyCasesT").forEach((heading) => {
                heading.innerHTML = "حالاتي";
            });
            document.querySelectorAll(".AdminT").forEach((heading) => {
                heading.innerHTML = "الادمن";
            });

            document.querySelectorAll(".LoginT").forEach((heading) => {
                heading.innerHTML = "تسجيل الدخول";
            });
            document.querySelectorAll(".Sign-upT").forEach((heading) => {
                heading.innerHTML = "حساب جديد";
            });
            document.querySelectorAll(".LogoutT").forEach((heading) => {
                heading.innerHTML = "تسجيل الخروج";
            });
            document.querySelectorAll(".missingPersonsCountT").forEach((heading) => {
                heading.innerHTML = " المفقودين";
            });
            document.querySelectorAll(".foundPersonsCountT").forEach((heading) => {
                heading.innerHTML = " الذين عثر عليهم";
            });
            document.querySelectorAll(".foundThingsCountT").forEach((heading) => {
                heading.innerHTML = " الاشياء التي تم العثور عليها";
            });
            document.querySelectorAll(".missingThingsCountT").forEach((heading) => {
                heading.innerHTML = " الاشياء المفقوده";
            });
            document.querySelectorAll(".LatestMT").forEach((heading) => {
                heading.innerHTML = "احدث الحلات المفقوده";
            });
            document.querySelectorAll(".LatestLT").forEach((heading) => {
                heading.innerHTML = "يبحثون عن عائلاتهم";
            });
            document.querySelectorAll(".LatestMTT").forEach((heading) => {
                heading.innerHTML = "احدث الاشياء المفقوده";
            });
            document.querySelectorAll(".CopyrightT").forEach((heading) => {
                heading.innerHTML = "حقوق النشر محفوظه @2022  ";
            });

            document.querySelectorAll(".goalT").forEach((heading) => {
                heading.innerHTML = "هدفنا هو إعادة الأمل المفقود ومساعدتك في العثور على ما فقدته";
            });

            document.querySelectorAll(".goalT2").forEach((heading) => {
                heading.innerHTML = "نساعدك علي استرجاع ما فقدته وتوصيل ما وجدته الي صاحبه ونرجوا بهذا العمل ان نحل مشكله طالما ارقهت الناس";
            });

            document.querySelectorAll(".goalT3").forEach((heading) => {
                heading.innerHTML = "نسعى لإعادة الأمل في العثور على ما فقد وتسليم ما وجد لصاحبه";
            });
            document.querySelectorAll(".searchImageT").forEach((heading) => {
                heading.innerHTML = " البحث بصوره الشخص ";
            });
            document.querySelectorAll(".SendMT").forEach((heading) => {
                heading.innerHTML = " ارسل الينا رسالتك";
            });
            document.querySelectorAll(".SendBtnT").forEach((heading) => {
                heading.value = " ارسل  رسالتك";
            });
            document.querySelectorAll(".sentT").forEach((heading) => {
                heading.innerHTML = "شكرا للتواصل معنا ";
            });
            document.querySelectorAll(".ContactTextT").forEach((heading) => {
                heading.innerHTML = "نحن متاحون لأي اقتراح أو لمجرد الدردشة ";
            });
            document.querySelectorAll(".AddressT").forEach((heading) => {
                heading.innerHTML = "العنوان: الحرية شارع 21 الإسماعيلية ";
            });
            document.querySelectorAll(".uploadDescT").forEach((heading) => {
                heading.innerHTML = "هل وجدت شيئًا وتريد أن تجد صاحبه؟ أكمل هذا النموذج لمساعدتك!";
            });
              document.querySelectorAll(".uploadH").forEach((heading) => {
                heading.innerHTML = "الإبلاغ عن شيء تم العثور عليه أو فقده";
            });
            document.querySelectorAll(".SendBtnT").forEach((heading) => {
                heading.value = " ارسل  رسالتك";
            });
            document.getElementById("staticsTitle").innerHTML = "احصائيات الموقع";

            document.getElementById("PhoneT").innerHTML = " هاتف";

            document.getElementById("EmailT").innerHTML = "  mahmoudmohamed3665@gmail.com الايميل";

            document.getElementById("PhoneT").innerHTML = " هاتف";
            document.getElementById("name").placeholder = " الاسم";
            document.getElementById("email").placeholder = " الايميل";
            document.getElementById("phone").placeholder = " هاتف";
            document.getElementById("subject").placeholder = " الموضوع ";
            document.getElementById("message").placeholder = " اكتب رسالتك ";




        } 
    }
}
onload = new Translate();
