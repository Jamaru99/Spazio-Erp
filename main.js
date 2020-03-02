const electron = require('electron');
const path = require('path');
const url = require('url');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on('ready', function(){
  // Create new window
  mainWindow = new BrowserWindow({});
  mainWindow.maximize();
  // Load html in window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'src/index.html'),
    protocol: 'file:',
    slashes:true
  }));
  // Quit app when closed
  mainWindow.on('closed', function(){
    app.quit();
  });

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
  
});

// Handle add item window
function createAddWindow(){
  
  addWindow = new BrowserWindow({
    width: 800,
    height:800,
    title:'Agendar sessão'
  });
  addWindow.setMenu(null);
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'src/windows/appointment/appointment.window.html'),
    protocol: 'file:',
    slashes:true
  }));
  // Handle garbage collection
  addWindow.on('close', function(){
    addWindow = null;
  });
}

function createServiceWindow(){
  
  addWindow = new BrowserWindow({
    width: 800,
    height:600,
    title:'Serviços'
  });
  addWindow.setMenu(null);
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'src/windows/service/service.window.html'),
    protocol: 'file:',
    slashes:true
  }));
  // Handle garbage collection
  addWindow.on('close', function(){
    addWindow = null;
  });
}

// Catch item:add
ipcMain.on('item:add', function(e, item){
  mainWindow.webContents.send('item:add', item);
  addWindow.close(); 
  // Still have a reference to addWindow in memory. Need to reclaim memory (Grabage collection)
  //addWindow = null;
});

// Create menu template
const mainMenuTemplate =  [
  // Each object is a dropdown
  {
    label: 'Agendar',
    click(){
      createAddWindow();
    }
  },
  {
    label: 'Serviços',
    click(){
      createServiceWindow();
    }
  }
];

// If OSX, add empty object to menu
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}
