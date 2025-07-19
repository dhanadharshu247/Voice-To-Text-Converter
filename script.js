const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const copyBtn = document.getElementById('copyBtn');
const output = document.getElementById('output');

let recognition;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    output.value += transcript;
  };

  recognition.onend = () => {
    startBtn.disabled = false;
    stopBtn.disabled = true;
  };
} else {
  alert("Speech Recognition not supported in this browser.");
  startBtn.disabled = true;
}

startBtn.addEventListener('click', () => {
  recognition.start();
  startBtn.disabled = true;
  stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
  recognition.stop();
});

copyBtn.addEventListener('click', () => {
  output.select();
  document.execCommand('copy');
  alert('Copied to clipboard!');
});
