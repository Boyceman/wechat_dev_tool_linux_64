# wechat devtool linux 64
wechat devtool linux64 transplant
>
- linux 64(my OS is mint 18.1)
- [wine 1.8.6](http://mirrors.ibiblio.org/wine/source/1.8/wine-1.8.6.tar.bz2) (if you have not installed it, install it)

## usage
1. `git clone https://github.com/Boyceman/wechat_dev_tool_linux_64.git`
2. `cd nwjs-wechat-dev-tool`
3. `./nw &`

### or

1. download zip from [release](https://github.com/Boyceman/wechat_dev_tool_linux_64/releases)
2. unpacking zip and go in the directory in terminal
3. type command `./nw &`

## tip
this program is so big, becourse this devtool is transplanted from OS X, i found package fsevents that can only be used in OS X, and i can't find which package references. so i uploaded all files include `/node_modules`

Ensure that the agent in wechat_devtool is shut down. like this
![where is the agent in wechat_devtool](/readme_local/wechat.png)
