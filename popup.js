document.getElementById('start').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'start' }, (response) => {
      updateStatus(response.status);
    });
  });
  
  document.getElementById('stop').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'stop' }, (response) => {
      updateStatus(response.status);
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({ action: 'status' }, (response) => {
      updateStatus(response.status);
    });
  });
  
  function updateStatus(status) {
    const statusText = document.getElementById('status');
    if (status === 'started') {
      statusText.textContent = 'Status: Wake Guard On';
    } else {
      statusText.textContent = 'Status: Wake Guard Off';
    }
  }
  