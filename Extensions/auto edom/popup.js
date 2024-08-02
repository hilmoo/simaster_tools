document.getElementById('startButton').addEventListener('click', () => {
    const rate = document.querySelector('input[name="rate-input"]:checked').value;
  
    if (rate >= 1 && rate <= 5) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: iterateInputs,
          args: [parseInt(rate)]
        });
      });
    } else {
      alert('Please enter a valid rate between 1 and 5.');
    }
  });
  
  function iterateInputs(rate) {
    function checkRadioInput(index, rate) {
      const radioInput = document.querySelector(`input[name="jawabanInstrumenPilihan[${index}]"][value="${rate}"]`);
      if (radioInput) {
        radioInput.checked = true;
      }
    }
  
    let index = 1;
    const maxIndex = 12;
    const delay = 100;
    const interval = setInterval(() => {
      checkRadioInput(index, rate);
      index++;
      if (index > maxIndex) {
        clearInterval(interval);
      }
    }, delay);
  }
  