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

## Build from source (Linux)

### Requirements

* Node.js >=12.0.0

### Steps

**Step 2 and 3 are only required once**

1. `npm init -y`
2. `npm i --save-dev electron`
3. `npm i -g @electron-forge/cli` (install electron-forge)
4. `electron-forge import`
5. (optional for logo) copy the inside of `"config": {}` from  "confg package" file into "package.json" into 
   the "config" object of an electron maker ("@electron-forge/maker-deb" for the .deb package)
6. `npm run make`

## Build from source (MAC OS & WINDOWS --> coming soon)
