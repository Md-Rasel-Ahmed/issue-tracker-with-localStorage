document
  .getElementById("issueInputForm")
  .addEventListener("submit", submitIssue);

function submitIssue(e) {
  const getInputValue = (id) => document.getElementById(id).value;
  const description = getInputValue("issueDescription");
  const severity = getInputValue("issueSeverity");
  const assignedTo = getInputValue("issueAssignedTo");
  const id = Math.floor(Math.random() * 100000000); //bug
  const status = "Open";

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  console.log(issues);
  if (localStorage.getItem("issues")) {
    issues = JSON.parse(localStorage.getItem("issues"));
    // console.log(issues);
  }

  // console.log(issues);
  issues.push(issue);
  // console.log(issues);

  localStorage.setItem("issues", JSON.stringify(issues));

  document.getElementById("issueInputForm").reset();
  fetchIssues();
  e.preventDefault();
}

const deleteIssue = (id) => {
  // console.log(id);
  const issues = JSON.parse(localStorage.getItem("issues"));
  // console.log(issues);
  const remainingIssues = issues.filter((issue) => issue.id !== id); //bug
  // console.log(remainingIssues);
  localStorage.setItem("issues", JSON.stringify(remainingIssues)); //bug
  fetchIssues();
};

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const issuesList = document.getElementById("issuesList");
  issuesList.innerHTML = "";
  console.log(issues);

  for (var i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status } = issues[i];

    issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3 id="marking"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
};
const setStatusClosed = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  console.log(issues);
  // console.log(issues[0]);
  const currentIssue = issues.find((issue) => issue.id == id); //bug
  console.log(currentIssue);
  currentIssue.status = "Closed";
  localStorage.setItem("issues", JSON.stringify(issues)); //bug
  //   document.getElementById("marking").style.backgroundColor = "red"; //bug
  fetchIssues();
};
// const setStatusClosed = (id) => {
//   const issues = JSON.parse(localStorage.getItem("issues"));
//   const currentIssue = issues.find((issue) => issue.id == id);
//   currentIssue.status = "Closed"; //bug
//   localStorage.setItem("issues", JSON.stringify(issues));
//   fetchIssues();
// };
