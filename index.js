#!/usr/bin/env node
const yargs = require('yargs');
const spawn = require('child_process').spawn;
const chalk = require('chalk');


const yargv = yargs
    .example('$0 android native', 'Spawn Uno build for android and Mac OS X')
    .alias('v', 'verbose')
    .alias('u', 'uno')
    .describe('uno', 'Specify a path to the `uno` binary')
    .example('$0 native --uno ~/dev/uno/uno')
    .default('uno', 'uno')
    .help('h')
    .alias('h', 'help')
    .argv;

var chalkColours =
    [ chalk.green
    , chalk.red
    , chalk.magenta 
    , chalk.blue
    ];


const makeBuild = (unoPath, isVerbose, platform) => {
    const color = chalkColours.pop();

    console.log(color('Running build on platform'), color(platform));

    var spawnedProcess = spawn(
        unoPath, 
        ['build', '--target', platform, '--run', '-l']
    );

    spawnedProcess.stdout.on('data', (data) => {
        if (data.indexOf('Build completed') > -1){ 
            console.log(color(`${platform} build ready.`));
            console.log(data.toString().trim());
        } else if (data.indexOf('---') > -1){
            console.log(color(`Deploying to ${platform} device..`));
        }
        else if (isVerbose) {
            console.log(color(`${platform}:`), `${data.toString().trim()}`);
        }

    });

    spawnedProcess.stderr.on('data', (data) => {
      console.error(color(`Error in ${platform}: ${data.toString().trim()}`));
    });

    spawnedProcess.on('close', (code) => {
      console.log(color(`child process for ${platform} exited with code ${code}`));
    });

    return spawnedProcess;
};

var platforms = yargv._;
var unoPath = yargv.uno;

// default to global uno
if (typeof unoPath == "undefined" || !unoPath){
    unoPath = "uno";
}

console.log(`Running Uno on ${platforms.length} platforms!`);
if (platforms.length === 0) {
    console.log('Did you want to try --help?');
}

platforms.forEach(makeBuild.bind(null, unoPath, yargv.verbose));
