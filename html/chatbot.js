const responses = [
    "Привет, как я могу вам помочь?",
    "Что вас интересует в нашем магазине?",
    "Здесь я, чтобы вас поддержать!",
    "Чем могу быть полезен?",
    "Привет, чем я могу помочь?",
];

let html = '';

function send() {
    let textBar = document.getElementById("chatInput").value;
    let root = document.getElementById("be");

    if (textBar !== '') {
        html += `<p style="text-align: end;">${textBar}</p>`;
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        html += `<p style="text-align: start;">${randomResponse}</p>`;
        root.innerHTML = html;
    }
}
