
{
    "targets":[
        {
        "target_name":"hello",
        "sources":["src/hello.cpp"],
        "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "C:/Users/Administrator/scoop/apps/ffmpeg-shared/4.4-154/include",
        # "H:/ElectronProject/Electron_Vue/electron-vue-vite/extract/node_modules/node-api-headers/include"
        ],
        "win_delay_load_hook": "true",
        "msbuild_settings": {
            "ClCompile": {
                "LanguageStandard": "stdcpp20"
                }
        },
        # "cflags":["-lavformat","-lavcodec","-lavutil"],
        # "libraries":["-lavformat","-lavcodec","-lavutil"
        "link_settings": {
            "library_dirs+": [
                "H:/ElectronProject/Electron_Vue/electron-vue-vite/extract/lib"
            ],
            "libraries": [
                # "-lH:/ElectronProject/Electron_Vue/electron-vue-vite/extract/lib/avformat.lib"
                "-lH:/ElectronProject/Electron_Vue/electron-vue-vite/extract/lib/avformat"
                # "-lavformat.lib"
            ]
        },
        "copies": [
            {
              "destination": "build/Release/",
              "files": [
                  "H:/ElectronProject/Electron_Vue/electron-vue-vite/extract/lib/avformat-58.dll"
                # "ffmpeg/ffmpeg-4.x-win64-shared/bin/avcodec-58.dll",
                # "ffmpeg/ffmpeg-4.x-win64-shared/bin/avdevice-58.dll",
                # "ffmpeg/ffmpeg-4.x-win64-shared/bin/avfilter-7.dll",
                # "ffmpeg/ffmpeg-4.x-win64-shared/bin/avformat-58.dll",
                # "ffmpeg/ffmpeg-4.x-win64-shared/bin/avutil-56.dll",
                # "ffmpeg/ffmpeg-4.x-win64-shared/bin/postproc-55.dll",
                # "ffmpeg/ffmpeg-4.x-win64-shared/bin/swresample-3.dll",
                # "ffmpeg/ffmpeg-4.x-win64-shared/bin/swscale-5.dll"
              ]
            }
        ],
        "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS"],
        }
    ]
}
