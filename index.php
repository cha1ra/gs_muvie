<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" type="image/x-icon" href="./img/favicon.ico">
    <link rel="stylesheet" href="./css/materialize.min.css">
    <link rel="stylesheet" href="./css/style.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <title>Muve!</title>
    <link rel="manifest" href="./manifest.json">
</head>
<body>
    <header>
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper">
                    <a href="./"><img src="./img/logo.png" class='logo' style="padding-top:6px"></a>
                    <ul id="nav-mobile" class="right">
                        <li><a href="timeline.php">Timeline</a></li>
                        <li><a href="login.php">Login</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
    <main>
        <div class="container">
            <div class="row">
                <!-- <div id="listen">口撃開始</div> -->
                <div class="input-field col s12">
                    <i class="material-icons prefix" id="btn">record_voice_over</i>
                    <input id="txt" type="text" class="validate" value="ゴーン前会長の後継日産が拒否">
                    <div class="center">
                        <a class="waves-effect waves-light btn" id="listen" style="width:48%">
                            ● REC
                        </a>
                        <a class="waves-effect waves-light btn" id="morph" style="width:48%">Start</a>
                    </div>
                    <div class="container">
                        <div id="news-list"></div>
                    </div>
                </div>

                <div class="hidden">
                    <div id="specificPropertyParameters" style="margin-top:50px; height:80px;">
                        <div class="square el center" id="typo" style="padding:8px">Muve!</div>
                    </div>
    
                    <div class="col s12 center">
                        <div id="main-button">Muve!</div>
                        <div class="row" style="padding: 16px">
                            <div id="txt-morph" style="padding: 16px"></div>
                        </div>
                        <a class="waves-effect waves-light btn" id="save" style="width:48%">Save Muve!</a>
                    </div>
                            
    
    
                    <!-- <input id="txt" type="a" value="日産自動車が前代表取締役会長のカルロス・ゴーン容疑者と同等の権限を持つ後継者を受け入れるようフランス大手ルノーから要求され、拒否していたことが4日分かった。"> -->
                    
                    <!-- <a class="waves-effect waves-light btn" id="morph-auto">AUTO</a> -->
                    

                    <br>
                    <button id="eight"> 8beat </button>
            
                    <!-- <button id="play0"> 主音 </button>
                    <button id="play1"> 短3度 </button>
                    <button id="play2"> 長3度 </button>
                    <button id="play3"> 完全5度 </button>
                    <button id="play4"> ベース </button>
                    <button id="stop"> Stop </button>
                    <p>Change: <span id="changeValue">None</span> </p> -->
                    <select name="" id="type">
                        <option value="sine">Sine</option>
                        <option value="square">Square</option>
                        <option value="sawtooth">Sawtooth</option>
                        <option value="triangle">Triangle</option>
                    </select>
                    <input type="range" min="0" max="2000" size="10" id="voice-pitch" value="440">
                    <input type="range" min="50" max="1200" size="10" id="freq" value="440">
                    <input type="range" type="range" min="0" max="1" step="0.01" size="10" id="level" value="1">
                </div>
        

            </div>
        </div>
    </main>
    <!-- <footer class="page-footer" style="position: fixed; width:100%; bottom:0;">
         <div class="container">
            <div class="row">
            <div class="col l6 s12">
                <h5 class="white-text">Muve!</h5>
                <p class="grey-text text-lighten-4">Music has power of moving our heart!</p>
            </div>
            <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Links</h5>
                <ul>
                <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
                <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
                <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
                <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
                </ul>
            </div>
            </div>
        </div> 
        <div class="footer-copyright">
            <div class="container">
            © 2018 cha1ra.com
            <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
            </div>
        </div>
    </footer> -->
    <script src="./js/jquery-3.3.1.min.js"></script>
    <script src="https://www.gstatic.com/firebasejs/5.6.0/firebase.js"></script>
    <script src="./js/fb-settings.js"></script>
    <script src="./js/materialize.min.js"></script>
    <script src="./js/anime.min.js"></script>
    <script src="./js/BufferLoader.js"></script>
    <script src="./js/init.js"></script>
    <script type="module" src="./js/script.js"></script>
    <!-- <script src="./js/modules/controller/SpeechController.js"></script> -->
    <script src="./js/typo.js"></script>
</body>
</html>