document
  .getElementById("issueInputForm")
  .addEventListener("submit", submitIssue);

function submitIssue(e) {
  e.preventDefault();

  const getInputValue = (id) => document.getElementById(id).value;
  const description = getInputValue("issueDescription");
  const severity = getInputValue("issueSeverity");
  const assignedTo = getInputValue("issueAssignedTo");
  if (description && severity && assignedTo) {
    const style = `background:green;color:white;padding:3px;`;
    const ussuDes = `text-decoration:none;`;
    const time = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString();
    const fullDate = date + " " + time;
    console.log(fullDate);

    const id = Math.floor(Math.random() * 100000000) + "";
    const status = "Open";

    const issue = {
      id,
      style,
      ussuDes,
      fullDate,
      description,
      severity,
      assignedTo,
      status,
    };
    let issues = [];
    if (localStorage.getItem("issues")) {
      issues = JSON.parse(localStorage.getItem("issues"));
    }
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));

    document.getElementById("issueInputForm").reset();
    fetchIssues();
  } else {
    alert("Please provide the valid Name!!!");
  }
}

const issuesList = document.getElementById("issuesList");
const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem("issues"));

  issuesList.innerHTML = "";

  for (var i = 0; i < issues.length; i++) {
    const {
      id,
      style,
      fullDate,
      ussuDes,
      description,
      severity,
      assignedTo,
      status,
    } = issues[i];

    issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p ><span style="${style}" class=" opens">${status}  </span></p>       
                              <h3 style="${ussuDes}" class='issuName' id="useDes"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <p>${fullDate}</p>
                              <button onclick="setStatusClosed(${id})" class="btn btn-warning">Close</button>
                              <a button onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
};

// close issues
const setStatusClosed = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const currentIssue = issues.find((issue) => issue.id == id);
  currentIssue.status = "Closed";
  currentIssue.style = `background:red;color:white;padding:3px;`;
  currentIssue.ussuDes = "text-decoration:line-through;";
  document.querySelector(".opens").style.background = currentIssue.style;
  let ussuDes = document.querySelector("#useDes");
  ussuDes.style = currentIssue.ussuDes;
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
};
// Delete ussues
const deleteIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const remainingIssues = issues.filter((issue) => issue.id != id.toString());
  console.log(remainingIssues);
  localStorage.setItem("issues", JSON.stringify(remainingIssues));
  fetchIssues();
};
// color
