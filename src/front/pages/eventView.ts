const { ipcRenderer } = require('electron');

ipcRenderer.on('event-id', (event: any, eventId: Number) => {
    // Use the article ID in your child window as needed
    console.log('Received Article ID:', eventId);
  });