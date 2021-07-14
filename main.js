const { app, BrowserWindow} = require('electron');
const path = require('path');

//start tor on windows or mac
if(process.platform == 'darwin' || process.platform == 'win32'){
try {
    const fs = require('fs');
    const exec = require('child_process').exec;
//    var sep_linux = process.cwd().indexOf("/") > -1;
//    var sep = sep_linux ? "/" : "\\";

        var aliwa_tor_folder = "Tor";
        var aliwa_app_data = "";
        var aliwa_app_data_tor_DIR = "";
        var aliwa_app_data_tor_APP = "";

        if (process.platform == 'darwin') {
            aliwa_app_data = path.join(process.env.HOME, "Library", '"Application Support"', "ALiWa");
            aliwa_app_data_tor_DIR = path.join(aliwa_app_data, aliwa_tor_folder);
            aliwa_app_data_tor_APP = path.join(aliwa_app_data_tor_DIR, "Contents", "MacOS", "Tor", 'tor.real');
        }

        if(process.platform == 'win32'){
            aliwa_app_data=path.join(process.env.APPDATA,"ALiWa");
            aliwa_app_data_tor_DIR=path.join(aliwa_app_data,aliwa_tor_folder);
            aliwa_app_data_tor_APP=path.join(aliwa_app_data_tor_DIR,'tor.exe');
        }

        if (!fs.existsSync(aliwa_app_data_tor_DIR)) {
            if(process.platform == 'darwin'){
                 const execute1 = exec("cp -R " + path.join(__dirname,aliwa_tor_folder) + ' ' + aliwa_app_data);
                execute1.stdout.on('data', (data) => {
                console.log(data);
                        console.error(data);
                        // do whatever you want here with data
                });
                execute1.stderr.on('data', (data) => {
                console.error(data);
                });
            }

            if(process.platform == 'win32'){
                const execute1 = exec('xcopy "'+__dirname+'\\..\\..\\'+aliwa_tor_folder+'" "'+aliwa_app_data+'\\'+aliwa_tor_folder+'\\" /E/H');
                execute1.stdout.on('data', (data) => {
                console.log(data);
                        console.error(data);
                        // do whatever you want here with data
                });
                execute1.stderr.on('data', (data) => {
                console.error(data);
                });
            }

        }

        if(process.platform == 'darwin'){
            setTimeout(function () {
        try {
        const execute2 = exec("chmod +x "+aliwa_app_data_tor_APP);
                execute2.stdout.on('data', (data) => {
                console.log(data);
                        // do whatever you want here with data
                });
                execute2.stderr.on('data', (data) => {
                console.error(data);
                });
        } catch (e) {
        console.error(e);
        }
        }, 1000);
        }


        setTimeout(function () {
        try {
        const myShellScript = exec(aliwa_app_data_tor_APP);
                myShellScript.stdout.on('data', (data) => {
                console.log(data);
                        // do whatever you want here with data
                });
                myShellScript.stderr.on('data', (data) => {
                console.error(data);
                });
        } catch (e) {
        console.error(e);
        }
        }, 1500);

        } catch (e) {
        console.error(e);
        }

}
/*setTimeout(function(){
    require(path.join(__dirname,"./ipc_communications"))();
},500);*/
require(path.join(__dirname,"./ipc_communications"))();

app.commandLine.appendSwitch("use-cmd-decoder","validating") //prevent graphical glitches (hopefully)
app.commandLine.appendSwitch("use-gl","desktop"); //prevent graphical glitches (hopefully)

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 960,
 //   resizable: false,
//        frame: false ,
    webPreferences: {
      enableRemoteModule:false,
      preload: path.join(__dirname,'./preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      allowRunningInsecureContent: false,
      sandbox: true,
    }/*,
    icon: "/view_resources/img/aliwa_icon_256.png" */// crashes on startup | __dirname is not needed here
  });

  win.loadFile('index.html')
//  win.setMenu(null)
//  win.setIcon(__dirname+"/view_resources/img/aliwa_icon_256.png") // no crash but default icon remains | __dirname is needed here

    }



app.whenReady().then(createWindow);

app.on('window-all-closed', async() => {
     save_on_exit();

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

//prevent external links
app.on('web-contents-created', (event, contents) => {
        contents.on('will-navigate', (event, navigationUrl) => {
            event.preventDefault()});
        //prevent open new window
        contents.on('new-window', function(event, urlToOpen) {
            event.defaultPrevented = true;
        });
    });

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }






//    contextBridge.exposeInMainWorld("app", {}
//        ipcRenderer_invoke: (channel) => ipcRenderer.invoke("channel",channel)
//        );

//
//ipcRenderer_handle: (channel,...params) => ipcRenderer.handle(channel, async (event, ...params) => {
//        console.log(event);
//        console.log(params);
//        }),






//    const electron = require('electron'),
//            ipc = electron.ipcMain;
//    require(".logic/wallet")();
//    /* remaining code
//     .
//     .
//     */
//////Receive and reply to synchronous message
////ipc.on('helloSync', (event, args) => {
//// //do something with args
//// event.returnValue = 'Hi, sync reply';
////});
//
////Receive and reply to asynchronous message
//    ipc.on('get_overview', (event, args) => {
////        event.sender.send('asynReply', 'Hi, asyn reply');
//    console.log("fetch overview....")
//    });




});

