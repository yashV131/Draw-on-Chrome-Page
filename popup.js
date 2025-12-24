const toggleBtn = document.getElementById('toggle');

let isToggled = false;

toggleBtn.addEventListener('click', () => {
    isToggled = !isToggled;
    if (isToggled) {
        document.body.style.backgroundColor = 'red';
        toggleBtn.textContent = 'Drawing toggled!';
    } else {
        document.body.style.backgroundColor = 'green';
        toggleBtn.textContent = 'Toggle drawing';

    }
});

document.getElementById("toggle").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  chrome.tabs.sendMessage(tab.id, {
    action: "toggleDrawing"
  });
});
