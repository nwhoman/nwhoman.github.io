const textArea = document.getElementById("text-input");
const coordInput = document.getElementById("coord");
const valInput = document.getElementById("val");
const errorMsg = document.getElementById("error");

document.addEventListener("DOMContentLoaded", () => {
  textArea.value =
    "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
  fillpuzzle(textArea.value);
});

textArea.addEventListener("input", () => {
  fillpuzzle(textArea.value);
});

function fillpuzzle(data) {
  let len = data.length < 81 ? data.length : 81;
  for (let i = 0; i < len; i++) {
    let rowLetter = String.fromCharCode('A'.charCodeAt(0) + Math.floor(i / 9));
    let col = (i % 9) + 1; 
    if (!data[i] || data[i] === ".") {
      document.getElementsByClassName(rowLetter + col)[0].innerText = " ";
      continue;
    }
    document.getElementsByClassName(rowLetter + col)[0].innerText = data[i];
  }
  return;
}

async function getSolved() {
  const stuff = {"puzzle": textArea.value}
  const data = await fetch("/api/solve", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(stuff)
  })
  console.log(data)
  errorMsg.innerHTML = `<code>hello</code>`;
  const parsed = await data.json();
  //if (parsed.error) {
    //errorMsg.innerHTML = `<code>${JSON.stringify(parsed, null, 2)}</code>`;
    //return
  //}
  
  //fillpuzzle(parsed.solution)
}

async function getChecked() {
  const stuff = {"puzzle": textArea.value, "coordinate": coordInput.value, "value": valInput.value}
    const data = await fetch("/api/check", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(stuff)
  })
  const parsed = await data.json();
  errorMsg.innerHTML = `<code>${JSON.stringify(parsed, null, 2)}</code>`;
 

}


document.getElementById("solve-button").addEventListener("click", getSolved)
document.getElementById("check-button").addEventListener("click", getChecked)