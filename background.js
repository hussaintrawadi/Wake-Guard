let isAwake = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('keepAwake', { periodInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'keepAwake' && isAwake) {
    chrome.power.requestKeepAwake('display');
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'start') {
    chrome.alarms.create('keepAwake', { periodInMinutes: 1 });
    chrome.power.requestKeepAwake('display');
    isAwake = true;
    sendResponse({ status: 'started' });
  } else if (request.action === 'stop') {
    chrome.alarms.clear('keepAwake');
    chrome.power.releaseKeepAwake();
    isAwake = false;
    sendResponse({ status: 'stopped' });
  } else if (request.action === 'status') {
    sendResponse({ status: isAwake ? 'started' : 'stopped' });
  }
});
