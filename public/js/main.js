const numberInput = document.getElementById("number")
const textInput = document.getElementById("msg")
const button = document.getElementById("button")
const response = document.querySelector(".response")

// the replace(refx) removes all non numeric characters
button.addEventListener("click", send, false);

const socket = io();
socket.on("smsStatus", data => {
    response.innerHTML = "<h5>Text message sent to " + data.number + "</h5>"
})

function send() {
    const number = numberInput.value.replace(/\D/g, "");
    const text = textInput.value;

    // will make POST request to our server with the above data 
    fetch("/", {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({number: number, text: text})
    })
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })
}

