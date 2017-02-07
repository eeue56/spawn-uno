# spawn-uno
Spawn multiple uno build instances for testing multiple platforms at once.

### Install

```
npm install -g spawn-uno
```


### About

Pass multiple platforms to the script and it will spawn off an instance for each. Useful for when testing platform consistency. 

```bash
Noahs-MacBook-Air:spawn-uno noah$ spawn-uno --help
Options:
  -v, --verbose  Print all messages out                         [default: false]
  -h, --help     Show help                                             [boolean]
  -u, --uno      Specify a path to the `uno` binary             [default: "uno"]

Examples:
  /usr/local/bin/spawn-uno android native   Spawn Uno build for android and Mac
                                            OS X
  /usr/local/bin/spawn-uno native --uno     Spawn Uno build for Mac OS X using
  ~/dev/uno/uno                             the binary provided
```

### Usage example

```bash
noah@Noahs-MacBook-Air ~/d/f/u/l/f/T/M/TestApp> spawn-uno native android 
Running build on platform native
Running build on platform android
native build ready.
Build completed in 0.17 seconds
Deploying to native device..
android build ready.
Build completed in 0.18 seconds
Deploying to android device..
```