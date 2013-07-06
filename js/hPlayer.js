/*
 * hPlayer v 1.0.1 VLC Plugin  detection and embed
 * More information about the script and how to use - http://hmscript.net/hplayer/
 * Created ZpVs
 * Copyright (c) 2013 ZpVs
 *
 * Released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */
var hPlayer = function() {
    var hOptions = {
        defaults:{
                continer: 'hPlayer',
                    type: 'http',
                  stream: '',
                   width: 936 +'px',
                  height: 464 +'px',
                    loop: false,
              windowless: false,
                 toolbar: false,
                autoplay: false,
              background: '#000000',
                  plugin: {
                        Name: 'VLC Multimedia Plug-in',
                     ActiveX: 'VideoLAN.VLCPlugin.2',
                    MimeType: 'application/x-vlc-plugin',
                     classid: 'clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921'
                },
                ad_state: false,
                 ad_link: '',
                 ad_time: 10000,
               ad_isView: false,
                 browser: 'non-ie'
        },
        init:{}
    };
    var hPlugin = {
        options:{
            configBox: false,
            isPlaying: false,
              isPause: false,
               volume: 50,
                 mute: false,
         isFullscreen: false,
                state: null
        },
        play:function() {
            var pBut = $('#playerControl-0');
            if(this.options.isPause){
                pBut.removeClass('ico-pause');
                pBut.addClass('ico-play');
                this.options.isPause = false;
            }
            else{
                this.options.isPause = true;
                pBut.removeClass('ico-play');
                pBut.addClass('ico-pause');
            }
            if(this.options.isPlaying){
                hApi.togglePause();
            }
            else{
                hApi.togglePlay();
            }
        },
        stop:function() {
            var pBut = $('#playerControl-0');
            hApi.toggleStop();
            if(this.options.isPause){
                pBut.removeClass('ico-pause');
                pBut.addClass('ico-play');
                this.options.isPause = false;
            }
        },
        mute:function() {
            var vBut = $('#playerControl-2');
            if(this.options.mute){
                vBut.removeClass('ico-volume-off');
                vBut.addClass( 'ico-volume-up' );
                this.options.mute = false;
            }
            else{
                this.options.mute = true;
                vBut.removeClass('ico-volume-up');
                vBut.addClass( 'ico-volume-off' );
            }
            hApi.toggleMute();
        },
        fullscreen:function() {
            if(hOptions.init.windowless){
                fullScreen(document.getElementById(hInterface.n_main));
            }
            else{
                 hApi.toggleFullscreen();
            }
        },
        config:function() {
            if(hPlugin.options.configBox){
                hPlugin.options.configBox = false;
                $('#' + hInterface.n_infoBox).remove();
                $('#' + hInterface.n_plugin).removeClass('infoBox-overlay');
            }
            else{
                hPlugin.options.configBox = true;
                $('#' + hInterface.n_plugin).addClass('infoBox-overlay');
                $('#' + hInterface.n_screen).append('<div id="' + hInterface.n_infoBox + '"></div>');
                $('#' + hInterface.n_infoBox).append('<div class="infoBox-inner"><h2>Настроки воспроизведения</h2>' +
                    '<p>Cоотношение сторон для видео экрана</p><span  class ="SettingsRatio"></span>' +
                    '<p>Режимы устранения чересстрочности</p><span  class ="SettingsDeint"></span>' +
                    '<p>Аудио каналы</p><span  class ="SettingsAudio"></span>' +
                    '</div>');
                var videoRatio = 'SettingsRatio';
                this.createButtonSettings(videoRatio, '1:1', 'btn-menu', function(event) {hPlugin.ratio('1:1');});
                this.createButtonSettings(videoRatio, '4:3', 'btn-menu', function(event) {hPlugin.ratio('4:3');});
                this.createButtonSettings(videoRatio, '16:9', 'btn-menu', function(event) {hPlugin.ratio('16:9');});
                this.createButtonSettings(videoRatio, '16:10', 'btn-menu', function(event) {hPlugin.ratio('16:10');});
                this.createButtonSettings(videoRatio, '221:100', 'btn-menu', function(event) {hPlugin.ratio('221:100');});
                this.createButtonSettings(videoRatio, '5:4', 'btn-menu', function(event) {hPlugin.ratio('5:4');});
                var videoDeinter = 'SettingsDeint';
                this.createButtonSettings(videoDeinter, 'blend', 'btn-menu', function(event) {hPlugin.deinterlace('blend');});
                this.createButtonSettings(videoDeinter, 'bob', 'btn-menu', function(event) {hPlugin.deinterlace('bob');});
                this.createButtonSettings(videoDeinter, 'linear', 'btn-menu', function(event) {hPlugin.deinterlace('linear');});
                this.createButtonSettings(videoDeinter, 'mean', 'btn-menu', function(event) {hPlugin.deinterlace('mean');});
                this.createButtonSettings(videoDeinter, 'yadif', 'btn-menu', function(event) {hPlugin.deinterlace('yadif');});
                this.createButtonSettings(videoDeinter, 'yadif2x', 'btn-menu', function(event) {hPlugin.deinterlace('yadif2x');});
                this.createButtonSettings(videoDeinter, 'discard', 'btn-menu', function(event) {hPlugin.deinterlace('discard');});
                var audioChannel = 'SettingsAudio';
                this.createButtonSettings(audioChannel, 'stereo', 'btn-menu', function(event) {hPlugin.audioChannel('1');});
                this.createButtonSettings(audioChannel, 'r :stereo', 'btn-menu', function(event) {hPlugin.audioChannel('2');});
                this.createButtonSettings(audioChannel, 'left', 'btn-menu', function(event) {hPlugin.audioChannel('3');});
                this.createButtonSettings(audioChannel, 'right', 'btn-menu', function(event) {hPlugin.audioChannel('4');});
                this.createButtonSettings(audioChannel, 'dolby', 'btn-menu', function(event) {hPlugin.audioChannel('5');});
            }
        },
        ratio:function(param) {
            hApi.changeAspectRatio(param);
        },
        deinterlace:function(d_type) {
            hApi.changeDeinterlace(d_type);
        },
        audioChannel:function(number) {
            hApi.changeAudioChannel(number);
        },
        infoBox:function(types) {
            var _interface = interfacePart(dOptions.screen.continer);
            if(dOptions.player.infoBox){
                dOptions.player.infoBox = false;
                $('#' + _interface.infoBox).remove();
                $('#' + _interface.plugin)[0].width = dOptions.screen.width;
                $('#' + _interface.plugin)[0].height = dOptions.screen.height;
                $('#' + _interface.plugin).removeClass( 'infoBox-overlay' );
            }
            else{
                dOptions.player.infoBox = true;
                $('#' + _interface.screen).append('<div id="' + _interface.infoBox + '"></div>');
                $('#' + _interface.infoBox).append(initInfoBox(types));
                $('#' + _interface.plugin).addClass( 'infoBox-overlay' );
                $('#' + _interface.infoBox).append(InfoBoxInterface(types));

            }

        },
        volumeSlider:function() {
            var _volume = $('#player-volume');
            _volume.slider({
                range: "min",
                min: 0,
                max: 100,
                value: 50,
                animate: true,
                start: function(event,ui) {
                },
                slide: function(event, ui) {
                    var value = _volume.slider('value');
                },
                stop: function(event,ui) {
                    hApi.changeVolume(ui.value);
                }
            });
        },
        createButton:function(box, title, cls, handler) {
            var inElement = $('.' + box);
                   var id = box + '-' + inElement[0].childNodes.length;
                  var btn = '<div id="' + id +'" class="btn-player '+cls+'" title="'+ title +'"></div>';
            inElement.append(btn);
            if (handler) {
                $('#' + id).bind('click', {doing: hApi}, handler);
            }
        },
        createButtonSettings:function(box, html, cls, handler) {
            var inElement = $('.' + box);
                   var id = box + '-' + inElement[0].childNodes.length;
                  var btn = '<div id="' + id +'" class="btn-player '+cls+'" title="'+ html +'">'+ html +'</div>';
            inElement.append(btn);
            if (handler) {
                $('#' + id).bind('click', {doing: hApi}, handler);
            }
        }
    };
    var hInterface = {};
    var hApi = {};
    function fullScreen(element) {
        var objects = $('#' + hInterface.n_plugin);
        if(hPlugin.options.isFullscreen){
            hPlugin.options.isFullscreen = false;
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
            objects[0].width = hOptions.init.width;
            objects[0].height = hOptions.init.height;
        }
        else{
            hPlugin.options.isFullscreen = true;
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            }
            if(hPlugin.options.isPlaying){
                objects[0].width = '100%';
                objects[0].height = '100%';
            }

        }
    }
    function API() {
        var doing = {
            status:{
                0:'',
                1:'Поолучение данных видео',
                2:'Буфферизация потока',
                3:'Воспроизведение канала',
                4:'Пауза',
                5:'Проигрывание остановлено',
                6:'Окончание проигрывания потока',
                7:'Ошибка воспроизведения потока'
            },
            items:{},
            set:function(name, value) {
                this.items[name] = value || null;
            },
            del:function(name) {
                delete this.items[name];
            },
            clear:function() {
                this.items = new Array();
            },
            get:function() {
                var tmp_array = new Array();
                var debug_str = "";
                var idx = 0;
                for (var i in this.items)
                {
                    var option_str = ":" + i;
                    if (this.items[i]) option_str += "=" + this.items[i];
                    tmp_array[idx] = option_str;
                    debug_str += option_str + " ";
                    idx += 1;
                }
                if (document.all) return tmp_array;
                return debug_str;
            },
            __getPlugin:function() {
                return $('#' + hInterface.n_plugin)[0];
            },
            togglePlay:function() {
                var plugin = this.__getPlugin();
                var _play = hOptions.init.stream;
                plugin.audio.volume = hPlugin.options.volume;
                if (!plugin) {
                    setTimeout(this.togglePlay(), 100);
                    return false;
                }
                else{
                    var options = this.get();
                     if(hOptions.init.ad_state){
                         if(!hOptions.init.ad_isView){
                             plugin.playlist.add(hOptions.init.ad_link, hOptions.init.ad_link, options);
                             plugin.playlist.add(_play, _play, options);
                             hOptions.init.ad_isView = false;
                             setTimeout('hPlayer.initApi().checkAds()',hOptions.init.ad_time);
                         }
                         else{
                             plugin.playlist.add(_play, _play, options);
                         }
                     }
                     else{
                            plugin.playlist.add(_play, _play, options);
                     }
                    plugin.playlist.play();
                    hPlugin.options.isPlaying = true;
                    return true;
                }
            },
            togglePause:function() {
                var plugin = this.__getPlugin();
                plugin.playlist.togglePause();
            },
            toggleStop:function() {
                var plugin = this.__getPlugin();
                hPlugin.options.isPlaying = false;
                plugin.playlist.stop();
            },
            toggleMute:function() {
                var plugin = this.__getPlugin();
                var _volume = $('#player-volume');
                if(_volume.slider("value")== '0'){
                    _volume.slider("value", hPlugin.options.volume);
                }
                else{
                    hPlugin.options.volume = _volume.slider("value");
                    _volume.slider("value", 0);
                }
                plugin.audio.toggleMute();
            },
            toggleFullscreen:function() {
                var plugin = this.__getPlugin();
                plugin.video.toggleFullscreen();
            },
            changeVolume:function(value) {
                var plugin = doing.__getPlugin();
                plugin.audio.volume = value;
            },
            changeAspectRatio:function(ratio) {
                var plugin = this.__getPlugin();
                plugin.video.aspectRatio = ratio;
            },
            changeDeinterlace:function(dein) {
                var plugin = this.__getPlugin();
                plugin.video.deinterlace.enable(dein);
            },
            changeAudioChannel:function(audio) {
                var plugin = this.__getPlugin();
                plugin.audio.channel =  parseInt(audio);
            },
            statusCheckStart:function() {
                this.statusCheckStop();
                this.statusCheckTimer = setInterval('hPlayer.initApi().statusCheck()', 100);
            },
            statusCheckStop:function() {
                clearTimeout(this.statusCheckTimer);
            },
            statusCheck:function() {
                var plugin = this.__getPlugin();
                var status =  plugin.input.state;
                if (status != hPlugin.options.state) {
                    hPlugin.options.state = status;
                    this.statusChanged();
                }
            },
            statusChanged:function() {
                var plugin = this.__getPlugin();
                var state = hPlugin.options.state;
                var objects = $('#' + hInterface.n_plugin);

                if (hOptions.init.browser == 'ie') {
                    objects[0].removeAttribute('style');
                    objects[0].setAttribute('style','height:0px; width:0px;');
                }
                else{
                    objects[0].width = '0px';
                    objects[0].height = '0px';
                }

                if (!state) {
                    this.statusText(this.status[0]);
                }
                else{
                    this.statusText(this.status[state]);
                }

                if(state == 3 || state == 4){
                    if (hOptions.init.browser == 'ie') {
                        objects[0].setAttribute('style','height:'+ hOptions.init.height +'; width:'+ hOptions.init.width +';');
                    }
                    else{
                        objects[0].width = hOptions.init.width;
                        objects[0].height = hOptions.init.height;
                    }
                }
                if(state == 5 || state == 6 || state == 7){
                    var pBut = $('#playerControl-0');
                        pBut.removeClass('ico-pause');
                        pBut.addClass('ico-play');
                        hPlugin.options.isPause = false;
                }
            },
            statusText:function(txt) {
                $('.playerInfo').html(txt);
                setTimeout('hPlayer.initApi().clearStatusText()',5000);
            },
            checkAds:function() {
                var plugin = this.__getPlugin();
                if(plugin.playlist.items.count == 2){
                    if(!hOptions.init.ad_isView){
                        plugin.playlist.items.remove(0);
                        hOptions.init.ad_isView = true;
                        this.togglePlay();
                    }
                }
            },
            clearStatusText:function() {
                $('.playerInfo').html('');
            }
        };
        return doing;
    }
    function interfacePart(wrapper) {
        var hFace = {
               n_main: wrapper,
             n_screen: wrapper + '-screen',
             n_plugin: wrapper + '-plugin',
            n_infoBox: wrapper + '-infoBox',
            n_toolbar: wrapper + '-toolbar',


               e_main: $('#' + wrapper),
             e_screen: $('#' + wrapper + '-screen'),
             e_plugin: $('#' + wrapper + '-plugin'),
            e_infoBox: $('#' + wrapper + '-infoBox'),
            e_toolbar: $('#' + wrapper + '-toolbar')

        };
        return hFace;
    }
    return{
        init:function(hConfig){
            hConfig != null ? this.initConfiguration(hConfig) : this.initConfiguration(null);
            this.initApi();
            hInterface = interfacePart(hOptions.init.continer);
            this.initInterface();
            this.initPlugin();
            hApi.statusCheckStart();
        },
        play:function(hConfig){
            this.init(hConfig);
            hPlugin.stop();
            hPlugin.play();
        },
        initConfiguration:function(config){
            if(config != null){
                var dScreen = hOptions.defaults;
                var iScreen = hOptions.init;
                config.wrapper ? iScreen.continer =  config.wrapper : iScreen.continer =  dScreen.continer;
                config.mode ? iScreen.type =  config.mode : iScreen.type =  dScreen.type;
                config.stream ? iScreen.stream =  config.stream : iScreen.stream =  dScreen.stream;
                config.width ? iScreen.width =  config.width : iScreen.width =  dScreen.width;
                config.height ? iScreen.height =  config.height : iScreen.height =  dScreen.height;
                config.loop ? iScreen.loop =  config.loop : iScreen.loop =  dScreen.loop;
                config.windowless ? iScreen.windowless =  config.windowless : iScreen.windowless =  dScreen.windowless;
                config.toolbar ? iScreen.toolbar =  config.toolbar : iScreen.toolbar =  dScreen.toolbar;
                config.autoplay ? iScreen.autoplay =  config.autoplay : iScreen.autoplay =  dScreen.autoplay;
                config.bg ? iScreen.background =  config.bg : iScreen.background =  dScreen.background;
                config.ad_state ? iScreen.ad_state =  config.ad_state : iScreen.ad_state =  dScreen.ad_state;
                config.ad_link ? iScreen.ad_link =  config.ad_link : iScreen.ad_link =  dScreen.ad_link;
                config.ad_time ? iScreen.ad_time =  config.ad_time : iScreen.ad_time =  dScreen.ad_time;
                iScreen.ad_state ? iScreen.ad_isView =  dScreen.ad_isView : iScreen.ad_isView =  true;
                iScreen.type == 'http' ? iScreen.plugin =  dScreen.plugin : iScreen.plugin =  null;
            }
            else{
                hOptions.init = hOptions.defaults;
            }
            !+"\v1" ? hOptions.init.browser = 'ie' : hOptions.init.browser = hOptions.defaults.browser;
        },
        initApi:function(){
            hApi = API();
            return hApi;
        },
        initInterface:function() {
          var _PlayerContiner = '<div id="' + hInterface.n_screen + '">' +
                                     '<div id="' + hInterface.n_plugin + '"></div>' +
                                '</div>' +
                                '<div id="' + hInterface.n_toolbar + '"></div>';

          hInterface.e_main.html('');
          hInterface.e_main.append(_PlayerContiner);

          var _controlContiner = '<div class="playerControl"></div>' +
                                 '<div class="playerInfo"></div>' +
                                 '<div class="playerConfig"></div>';
          var _volume = '<div id="player-volume"></div>';
          var _toolbar = $('#' + hInterface.n_toolbar);

          _toolbar.append(_controlContiner);
            hPlugin.createButton('playerControl', 'Проигрование / Пауза', 'ico-play', function(event) {hPlugin.play();});
            hPlugin.createButton('playerControl', 'Остановить', 'ico-stop', function(event) {hPlugin.stop();});
            hPlugin.createButton('playerControl', 'Громкость', 'ico-volume-up', function(event) {hPlugin.mute();});
          $('.playerControl').append(_volume);
            hPlugin.createButton('playerConfig', 'Настройки', 'ico-cogs', function(event) {hPlugin.config();});
            hPlugin.createButton('playerConfig', 'На весь экран', 'ico-fullscreen', function(event) {hPlugin.fullscreen();});
            hPlugin.volumeSlider();
        },
        initPlugin:function() {
            var hScreen = hOptions.init;
            var element, el = document.getElementById(hInterface.n_plugin);
            if (el) {
                if (hOptions.init.browser == 'ie') {
                    var att = '';
                    var par = '';
                    att += 'id="' + hInterface.n_plugin + '"';
                    att += 'bgcolor="' + hScreen.background + '"';
                    att += 'toolbar="' + hScreen.toolbar + '"';
                    att += 'loop="' + hScreen.loop + '"';
                    att += 'windowless="' + hScreen.windowless + '"';
                    att += 'autoplay="' + hScreen.autoplay + '"';
                    par += '<param name="id" value="' + hInterface.n_plugin + '" />';
                    par += '<param name="bgcolor" value="' + hScreen.background + '" />';
                    par += '<param name="width" value="' + hScreen.width + '" />';
                    par += '<param name="height" value="' + hScreen.height + '" />';
                    par += '<param name="toolbar" value="' + hScreen.toolbar + '" />';
                    par += '<param name="loop" value="' + hScreen.loop + '" />';
                    par += '<param name="windowless" value="' + hScreen.windowless + '" />';
                    par += '<param name="autoplay" value="' + hScreen.autoplay + '" />';
                    el.outerHTML = '<object classid="'+ hScreen.plugin.classid +'"' +
                        att +
                        'codebase="http://download.videolan.org/pub/videolan/vlc/last/win32/axvlc.cab">' +
                        par +
                        '</object>';
                    element = document.getElementById(hInterface.n_plugin);

                }
                else {
                    var AXO = document.createElement('object');
                        AXO.setAttribute("id", hInterface.n_plugin);
                        AXO.setAttribute("type", hScreen.plugin.MimeType);
                        AXO.setAttribute("bgcolor", hScreen.background);
                        AXO.setAttribute("width", hScreen.width);
                        AXO.setAttribute("height", hScreen.height);
                        AXO.setAttribute("toolbar", hScreen.toolbar);
                        if(hScreen.loop){AXO.setAttribute("loop", hScreen.loop);}
                        if(hScreen.windowless){ AXO.setAttribute("windowless", hScreen.windowless);}
                        if(hScreen.autoplay){AXO.setAttribute("autoplay", hScreen.autoplay);}
                    el.parentNode.replaceChild(AXO, el);
                    element = AXO;
                }
            }
            return element;
        }
    }
}();