const chatLog = document.getElementById("chat-log"),
  userInput = document.getElementById("user-input"),
  sendButton = document.getElementById("send-button"),
  buttonIcon = document.getElementById("button-icon"),
  info = document.querySelector(".info");

sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const message = userInput.value.trim();
  // if message = empty do nothing
  if (message === "") {
    return;
  }




  // if message = developer - show our message
  else if (message === "What IT majors are offered at LTUC?") {
    // clear input value
    userInput.value = "";
    // append message as user - we will code its function
    appendMessage("user", message);
    // sets a fake timeout that showing loading on send button
    setTimeout(() => {
      // send our message as bot(sender : bot)
      appendMessage(
        "bot",
        "Cloud Computing, Software Engineer, Cyber Security, Articial Intelligence"
      );
      // change button icon to default
      buttonIcon.classList.add("fa-solid", "fa-paper-plane");
      buttonIcon.classList.remove("fas", "fa-spinner", "fa-pulse");
    }, 2000);
    return;


    
  } else if (message === "Does LTUC offer any financial aid or scholarships for IT students?") {
    userInput.value = "";
    appendMessage("user", message);
    setTimeout(() => {
      appendMessage("bot", "   Yes, depending on certain conditions such as nationality and rate   ");
      buttonIcon.classList.add("fa-solid", "fa-paper-plane");
      buttonIcon.classList.remove("fas", "fa-spinner", "fa-pulse");
    }, 2000);
    return;
  } else if (message === "What is the admission process like for LTUC's IT programs?") {
    userInput.value = "";
    appendMessage("user", message);
    setTimeout(() => {
      appendMessage("bot", "He must successfully pass the Tawjihi stage      ");
      buttonIcon.classList.add("fa-solid", "fa-paper-plane");
      buttonIcon.classList.remove("fas", "fa-spinner", "fa-pulse");
    }, 2000);
    return;
  } else if (message === "What kind of facilities and resources are available to IT students at LTUC?") {
    userInput.value = "";
    appendMessage("user", message);
    setTimeout(() => {
      appendMessage("bot", "There are many facilities such as a football field, free parking, computer laboratories, workspace, business incubators and many other things    ");



      buttonIcon.classList.add("fa-solid", "fa-paper-plane");
      buttonIcon.classList.remove("fas", "fa-spinner", "fa-pulse");
    }, 2000);
    return;
  } else if (message === "What kind of career opportunities are available to graduates of LTUC's IT programs?") {
    userInput.value = "";
    appendMessage("user", message);
    setTimeout(() => {
      appendMessage("bot", "Work inside and outside Jordan because the certificate is international and you can work in any IT company according to your specialization");



      buttonIcon.classList.add("fa-solid", "fa-paper-plane");
      buttonIcon.classList.remove("fas", "fa-spinner", "fa-pulse");
    }, 2000);
    return;
  } else if (message === "How does LTUC's IT curriculum compare to other universities in Jordan or the region?") {
    userInput.value = "";
    appendMessage("user", message);
    setTimeout(() => {
      appendMessage("bot", "Taking care of the teaching plan and renewing it every short period to keep it up to date with updates in the IT world    ");

      buttonIcon.classList.add("fa-solid", "fa-paper-plane");
      buttonIcon.classList.remove("fas", "fa-spinner", "fa-pulse");
    }, 2000);
    return;
  } else if (message === "Are there any partnerships or collaborations between LTUC's IT programs and industry or other academic institutions?") {
    userInput.value = "";
    appendMessage("user", message);
    setTimeout(() => {
      appendMessage("bot", "Yes, there are several companies contracting with them such as red hat, code fellows, algon quin college, robotecs and much more");



      buttonIcon.classList.add("fa-solid", "fa-paper-plane");
      buttonIcon.classList.remove("fas", "fa-spinner", "fa-pulse");
    }, 2000);
    return;
  }





  // else if none of above
  // appends users message to screen
  appendMessage("user", message);
  userInput.value = "";

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "1887f85d7amshafb11034201cb32p18f4afjsnfde6a60007bb",
      "X-RapidAPI-Host": "chatgpt53.p.rapidapi.com",
    },
    body: `{"messages":[{"role":"user","content":"${message}"}]}`,
  };
  fetch("https://chatgpt53.p.rapidapi.com/", options)
    .then((response) => response.json())
    .then((response) => {
      appendMessage("bot", response.choices[0].message.content);

      buttonIcon.classList.add("fa-solid", "fa-paper-plane");
      buttonIcon.classList.remove("fas", "fa-spinner", "fa-pulse");
    })
    .catch((err) => {
      if (err.name === "TypeError") {
        appendMessage("bot", "Error: Check Your API Key!");
        buttonIcon.classList.add("fa-solid", "fa-paper-plane");
        buttonIcon.classList.remove("fas", "fa-spinner", "fa-pulse");
      }
    });


}

setTimeout(() => {
  appendMessage("bot", botResponse);
}, 1000);

function appendMessage(sender, message) {
  info.style.display = "none";
  // change send button icon to loading using fontawesome
  buttonIcon.classList.remove("fa-solid", "fa-paper-plane");
  buttonIcon.classList.add("fas", "fa-spinner", "fa-pulse");

  const messageElement = document.createElement("div");
  const iconElement = document.createElement("div");
  const chatElement = document.createElement("div");
  const icon = document.createElement("i");

  chatElement.classList.add("chat-box");
  iconElement.classList.add("icon");
  messageElement.classList.add(sender);
  messageElement.innerText = message;

  // add icons depending on who sends the message: bot or user
  if (sender === "user") {
    icon.classList.add("fa-regular", "fa-user");
    iconElement.setAttribute("id", "user-icon");
  } else {
    icon.classList.add("fa-solid", "fa-robot");
    iconElement.setAttribute("id", "bot-icon");
  }

  iconElement.appendChild(icon);
  chatElement.appendChild(iconElement);
  chatElement.appendChild(messageElement);
  chatLog.appendChild(chatElement);
  chatLog.scrollTo = chatLog.scrollHeight;
}
