# aliwa
A light wallet for the [ALIAS](https://alias.cash/) cryptocurrency.

## Donations
The easiest way to contribute to the Alias Light Wallet: Donate with ALIAS! 
	
	Public ALIAS address: SSq7CjsPzfanmCkcN9XhKHg7yMn3bXj8i5
	Private ALIAS address: smYhZCsqgJdRkWB64GaLZ165HejRCL3tAkmDmxdCrG2McnuH7gReE3LjDoXLRqf3txrwiuE3BCpFFAADDbU1oYW4fr7y9MnU37U3AD

## WARNING: Experimental ALPHA Software
**Please put no funds on this wallet, you're not willing to lose.
Also don't restore from seeds which contains funds you're not willing to lose.**

## Download Binaries (public testnet)
ALiWa will be supported by all major Desktop and Mobile platforms.

* Desktop: Windows (7-10+), MacOS, Linux
* Mobile: Android & iOS under [aliwa-mobile](https://github.com/dynamiccreator/aliwa-mobile)
*************************************************************************************************
**WINDOWS** : [ALiWa-TESTNET-v0.0.8-Setup.exe](https://github.com/dynamiccreator/aliwa/releases/download/0.0.8/ALiWa-TESTNET-v0.0.8-Setup.exe)

**MAC OS** :  [ALiWa-TESTNET-MAC-OS-0.0.8.zip](https://github.com/dynamiccreator/aliwa/releases/download/0.0.8/ALiWa-TESTNET-MAC-OS-0.0.8.zip)

**LINUX DEB** (Debian based, Debian,Ubuntu, ...) : [.deb package](https://github.com/dynamiccreator/aliwa/releases/download/0.0.8/ALiWa-TESTNET-DEBIAN-0.0.8.deb)

**Linux RPM** (Red Hat based, Fedora, Suse, ...) : [.rpm package](https://github.com/dynamiccreator/aliwa/releases/download/0.0.8/ALiWa-TESTNET-RAT_HAT-0.0.8.rpm)
*************************************************************************************************

## Build from source (Windows)

### Requirements

* C/C++ Compiler
* Node.js
* Python
* Git 

**It is recommended to install VisualStudio and select the above packages at the Installation process.**
(I believe everything but Git can be selected there)

### Windows Preparation Steps

To build on Windows it is required to open a powershell as administrator and give "RemoteSigned" rights.

To do this: 
1. Open a power shell.
2. `Start-Process powershell -Verb runAs`
3. Confirm
4. In admin Power shell: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned`
5. Confirm with Yes

Now you're able to build on windows!

### Building Steps

**Step 2 and 3 are only required once**

1. `npm init -y`
2. `npm i --save-dev electron`
3. `npm i -g @electron-forge/cli` (install electron-forge)
4. `electron-forge import`
5. (For ALiWa icon) Follow the **APP ICON INSTRUCTIONS** from the file `confg package`
6. `npm install`  
7. `npm run make`
8. Download [tor-jul-2021.zip](https://github.com/dynamiccreator/aliwa-resources/raw/main/tor-jul-2021.zip) from the [aliwa-resources repository](https://github.com/dynamiccreator/aliwa-resources)
9. Unzip it and copy the folder `tor-for-win` into the folder where your build is located (ALiWa.exe is in here)
10. Use your preferred software (e.g. Inno Setup) to make an Windows Installer or zip it for shipping.

## Build from source (Mac Os)

### Requirements

* Xcode & Xcode Comand Line Tools
* Node.js
* Git 

### Building Steps

**Step 2 and 3 are only required once**

1. `npm init -y`
2. `npm i --save-dev electron`
3. `npm i -g @electron-forge/cli` (install electron-forge)
4. `electron-forge import`
5. (For ALiWa icon) Follow the **APP ICON INSTRUCTIONS** from the file `confg package`
8. Download [tor-jul-2021.zip](https://github.com/dynamiccreator/aliwa-resources/raw/main/tor-jul-2021.zip) from the [aliwa-resources repository](https://github.com/dynamiccreator/aliwa-resources)
9. Unzip it and copy the folder `tor-for-mac` into the repository folder  
7. `npm install`  
8. `npm run make`

## Build from source (Linux)

### Requirements

* Node.js >=12.0.0
* Git
* Tor (Only for getting a connection running the app)

### Building Steps

**Step 2 and 3 are only required once**

1. `npm init -y`
2. `npm i --save-dev electron`
3. `npm i -g @electron-forge/cli` (install electron-forge)
4. `electron-forge import`
5. (For ALiWa icon) Follow the **APP ICON INSTRUCTIONS** from the file `confg package`
6. `npm run make`
