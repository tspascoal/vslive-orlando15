#Visual Studio Team Services Hello World Build Task

This demo is part of a VSLive Orlando 2015 Session [VST08-Automate Your Builds with Visual Studio Online or Team Foundation Server](https://live360events.com/Events/Orlando-2015/Sessions/Tuesday/VST08-Automate-Your-Builds-with-Visual-Studio-Online-or-Team-Foundation-Server.aspx)

Hello World build task, is a task that allows you write on the build log a text using ascii art.

Uses [Ascii art characters powershell script](http://www.powershelladmin.com/wiki/Ascii_art_characters_powershell_script) which is copyrighted by Svendsen Tech
Uses [ascii-art](https://registry.npmjs.org/ascii-art) which is coyrighted by Abbey Hawk Sparrow under the MIT license

Both packages have been included with the task source code in order to facilitate the task installation.

Task code is copyrighted by Tiago Pascoal under the MIT license (see [license](LICENSE))

### Installation

In order to install the task you need to install the [tfx command line tool](https://www.npmjs.com/package/tfx-cli)

After logging in with the command

```
tfx login
```
[how to tfx login](https://github.com/Microsoft/tfs-cli#login)

install the task build by issuing the command (on this folder)

```
tfx build tasks upload HelloWorld
```
More info  how to [install a build task](https://github.com/Microsoft/tfs-cli/blob/master/docs/buildtasks.md)