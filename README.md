# CryptoNote
v1.0.0

## Setting up the project

You need to have `git`,`nodejs` and `npm` installed. You can check by using the following commands - 

```powershell
git --version
node -v
npm -v
```

These should show you the currently installed versions of NodeJs and NPM on your system. If you have both of these, continue on to the next steps. If you don't, install NodeJs from the website - https://nodejs.org/en/ which comes along with npm. And you can install git from - https://git-scm.com/

1. Clone this repository

```bash
git clone https://github.com/arkonique/CryptoNote.git
```

2. Go into the cloned repository and initialize npm here. This should use the already present package file.

```bash
cd CryptoNote
npm init -y
```

3. Install `electron`

```bash
npm install electron --save-dev --save-exact
```

4. Install `electron-packager`

```bash
npm install electron-packager --save-dev
```

5. Install `electron-json-storage`

```bash
npm install electron-json-storage --save
```

6. Install axios (Cryptocurrency API)

```bash
npm install axios --save
```

That should set up the project. The commands are same in windows or linux. You can save the following lines as a bash, powershell or batch script to do all of the above at once :-

```bash
git clone https://github.com/arkonique/CryptoNote.git
cd CryptoNote
npm init -y
npm install electron --save-dev --save-exact
npm install electron-packager --save-dev
npm install electron-json-storage --save
npm install axios --save
```

However to see notifications on Windows (not yet tested on linux), add `electron.exe` present inside `node_modules\electron\dist` to the start menu by right clicking on the `exe` and selecting `Pin to Start`

## Running the App

To run the app just use -

```bash
npm start
```

## Packaging the App

To package the app, run any of the following according to the OS you want to package this for (make sure you are running the terminal as administrator or use sudo in linux) - 


1. **For Windows** - 
```bash
npm run package-win
```

2. **For Linux** - 
```bash
npm run package-linux
```

3. **For Mac** -
```bash
npm run package-mac
```