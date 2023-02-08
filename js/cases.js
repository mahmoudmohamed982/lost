const caseTemp = `
    <!-- Single item -->
    <div class="row admin-case">
        <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
            <!-- Image -->
            <div class="bg-image hover-overlay hover-zoom ripple rounded"
                data-mdb-ripple-color="light">
                <img src="@Photo@" class="w-100" alt="case img" style="max-height: 200px;" />
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
                <button data-id="@ID@" data-type="View" data-kind="@K@" data-state="@S@" type="button" class="btn-user btn-admin btn btn-info btn-sm me-1 mb-2"
                    data-mdb-toggle="tooltip" title="View this case">
                </button>
                <button data-id="@ID@" data-type="Delete" data-kind="@K@" data-state="@S@" type="button" class="btn-user btn-admin btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip"
                    title="Delete this case">
                </button>
                <button data-id="@ID@" data-type="Edit" data-kind="@K@" data-state="@S@" type="button" class="btn-user btn-admin btn btn-warning btn-sm mb-2"
                    data-mdb-toggle="tooltip" title="Edit This Case">
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

const casesCon = document.getElementById("myCasesContainer");

const getUserCases = async () => {
    const res1 = await getDataGlobal("Person/getMissingByUser", "get", "", { Authorization: getCookie("jwt") });
    const res2 = await getDataGlobal("Person/getMissingByUserF", "get", "", { Authorization: getCookie("jwt") });
    const res3 = await getDataGlobal("Things/getThingsForUser", "get", "", { Authorization: getCookie("jwt") });
    if (res1.status == "ERROR" || res1 == "Fail") {
        showAlert("error", res1.error.response.data.message);
        return "Falid";
    }
    return { person: res1.data.data, personF: res2.data.data, things: res3.data.data };
};

const showUserCases = async () => {
    const cases = await getUserCases();
    if (cases != "Falid") {
        console.log(cases);
        const casesHtml = await makeCasesHtmlInAdmin(cases.person, "person", "missing", caseTemp);
        const casesFHtml = await makeCasesHtmlInAdmin(cases.personF, "person", "found", caseTemp);

        const trans = cases.things.filter((Case) => Case.type.toLowerCase() == "transportations");
        const devices = cases.things.filter((Case) => Case.type.toLowerCase() == "devices");
        const papers = cases.things.filter((Case) => Case.type.toLowerCase() == "papers");
        const others = cases.things.filter((Case) => Case.type.toLowerCase() == "others");

        let casesTHtml = await makeCasesHtmlInAdmin(trans, "transportations", "", caseTemp);
        casesTHtml += await makeCasesHtmlInAdmin(devices, "devices", "", caseTemp);
        casesTHtml += await makeCasesHtmlInAdmin(papers, "papers", "", caseTemp);
        casesTHtml += await makeCasesHtmlInAdmin(others, "others", "", caseTemp);
        casesCon.insertAdjacentHTML("afterbegin", casesHtml + casesFHtml + casesTHtml);
    }
};

if (casesCon) {
    showUserCases();
    // Buttons

    casesCon.addEventListener("click", async (e) => {
        if (e.target.classList.contains("btn-admin")) {
            // data-id="@ID@" data-type="accept" data-kind="person" data-state="missing"
            const id = e.target.getAttribute("data-id");
            const btnType = e.target.getAttribute("data-type"); // View
            const caseKind = e.target.getAttribute("data-kind"); // person
            const caseState = e.target.getAttribute("data-state") == "missing" ? "" : "F";
            let res = "";
            if (caseKind == "person") {
                if (btnType == "View") {
                    location.assign(`/case-info.html?id=${id}&kind=${caseKind == "person" ? (caseState == "" ? "missing" : "found") : "thing"}`);
                } else if (btnType == "Edit") {
                    location.assign(`/edit-case.html?id=${id}&kind=${caseKind == "person" ? (caseState == "" ? "missing" : "found") : "thing"}`);
                } else res = await getDataGlobal(`person/deleteMissing${caseState}/${id}`, "delete", "", { Authorization: getCookie("jwt") });
            } else {
                if (btnType == "View") {
                    location.assign(`/case-info.html?id=${id}&kind=${caseKind == "person" ? (caseState == "" ? "missing" : "found") : "thing"}`);
                } else if (btnType == "Edit") {
                    location.assign(`/edit-case.html?id=${id}&kind=${caseKind == "person" ? (caseState == "" ? "missing" : "found") : "thing"}`);
                } else res = await getDataGlobal(`Things/deleteThingsForUser/${id}`, "delete", "", { Authorization: getCookie("jwt") });
            }
            if (res.status == "ERROR" || res == "Fail") {
                showAlert("error", res.error.response.data.message);
            } else if (res.data.status === "success") {
                showAlert("success", res.data.message);
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        }
    });
}
