<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>title</title>
        <link rel="stylesheet" type="text/css" href="scripts/stylesheet.css"> <!-- Connecting Stylesheet -->
        <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700" rel="stylesheet"> <!-- Connecting fonts -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script> <!-- Importing jQuery (for ajax) -->
</head>

    <body>
        <!-- ----------------- Encapsulates the entire page, defaults everything to flex ----------------- -->
        <div id="wrapper">
            <!-- ----------------- Encapsulates the information entry segment ----------------- -->
            <div id="upper">
                <img src="assets/egt-logo.png" alt="eagledream-logo" class="upper-element" id="edt-logo">
                <input type="text" name="input-character" placeholder="Character Name" class="upper-element" id="input-char">
                <input type="text" name="input-realm" placeholder="Realm Name" class="upper-element" id="input-realm">
                <button type="button" id="btn-search">Search</button>
            </div>

            <!-- ----------------- Encapsulates informational display segment ----------------- -->
            <div id="lower">
                <div id="stats">
                    <div id="stats-left">
                        <div id="stats-left">
                            <div id="stats-attributes">
                                <h1>Attributes</h1>
                                <div class="stat-container">
                                    <ul class="stat-l">
                                        <li>Strength</li>
                                        <li>Agility</li>
                                        <li>Intillect</li>
                                        <li>Stamina</li>
                                    </ul>
                                    <ul class="stat-r" id="stats-attributes-list">
                                        <li>0</li>
                                        <li>0</li>
                                        <li>0</li>
                                        <li>0</li>
                                    </ul>
                                </div>
                            </div>
                            <div id="stats-attack">
                                <h1>Attack</h1>
                                <div class="stat-container">
                                    <ul class="stat-l">
                                        <li>Damage</li>
                                        <li>Speed</li>
                                    </ul>
                                    <ul class="stat-r" id="stats-attack-list">
                                        <li>0-0</li>
                                        <li>0.00</li>
                                    </ul>
                                </div>
                            </div>
                            <div id="stats-char">
                                <h1>Character</h1>
                                <div class="stat-container">
                                    <ul class="stat-container-l">
                                        <li>Level</li>
                                        <li>Name</li>
                                        <li>Realm</li>
                                    </ul>
                                    <ul class="stat-r" id="stats-char-list">
                                        <li>00</li>
                                        <li>--</li>
                                        <li>--</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- ----------------- Left Side Stats (enhancements/defense) ----------------- -->
                    <div id="stats-right">
                        <div id="stats-left-text">
                            <div id="stat-defense">
                                <h1>Defense</h1>
                                <div class="stat-container">
                                    <ul class="stat-l">
                                        <li>Armor</li>
                                        <li>Dodge</li>
                                        <li>Parry</li>
                                        <li>Block</li>
                                    </ul>
                                    <ul class="stat-r" id="stats-defense-list">
                                        <li>0000</li>
                                        <li>0.00%</li>
                                        <li>0.00%</li>
                                        <li>0.00%</li>
                                    </ul>
                                </div>
                            </div>
                            <div id="stat-enhancements">
                                <h1>Enhancements</h1>
                                <div class="stat-container">
                                    <ul class="stat-l">
                                        <li>Crit</li>
                                        <li>Haste</li>
                                        <li>Mastery</li>
                                        <li>Leech</li>
                                        <li>Versatility</li>
                                    </ul>                                
                                    <ul class="stat-r" id="stats-enhancements-list">
                                        <li>0.00%</li>
                                        <li>0.00%</li>
                                        <li>0.00%</li>
                                        <li>0.00%</li>
                                        <li>0.00%</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- ----------------- Divider Line ----------------- -->
                    <img src="assets/faded-line.png" alt="Division Line" id="stats-division-line">
                    
                    <!-- ----------------- Comparative Section ----------------- -->
                    <div id="stats-compare">
                        <h1>Compare Stats</h1>
                        <div id="stats-char-img-list">
                            <!--
                            Example Formatting
                            <img src="http://render-us.worldofwarcraft.com/character/dalaran/254/136610814-avatar.jpg" alt="character thumbnail">
                            <img src="http://render-us.worldofwarcraft.com/character/dalaran/254/136610814-avatar.jpg" alt="character thumbnail">
                            <img src="http://render-us.worldofwarcraft.com/character/dalaran/254/136610814-avatar.jpg" alt="character thumbnail">
                            -->
                        </div>
                    </div>
                </div>
                
                <!-- ----------------- Item Set Section ----------------- -->
                <div id="items">
                    <h1>My Item Sets</h1>
                    <div id="item-images">
                        <!--<img id="items-pvp" src="assets/weapon-icon.png" alt="Weapon Icon">-->
                    </div>  
                    <div id="items-display">
                        <!-- These are placeholders. Everything in these lists will be added according to the js calls -->
                        <ul id="item-types">
                            <li>Helm</li>
                            <li>Chest</li>
                            <li>Shoulders</li>
                            <li>Legs</li>
                            <li>Feet</li>
                        </ul>
                        <ul id="item-names">
                            <li>--</li>
                            <li>--</li>
                            <li>--</li>
                            <li>--</li>
                            <li>--</li>
                        </ul> 
                        <ul id="item-costs">
                            <li><p>--</p> <img src="assets/icon-coin.png" alt="Gold Icon"></li>
                            <li><p>--</p> <img src="assets/icon-coin.png" alt="Gold Icon"></li>
                            <li><p>--</p> <img src="assets/icon-coin.png" alt="Gold Icon"></li>
                            <li><p>--</p> <img src="assets/icon-coin.png" alt="Gold Icon"></li>
                            <li><p>--</p> <img src="assets/icon-coin.png" alt="Gold Icon"></li>
                        </ul>

                       <!--
                       
                       -------------------------- Example of what this should look like ---------------
                        <ul id="item-types">
                            <li>Helm</li>
                            <li>Chest</li>
                            <li>Shoulders</li>
                            <li>Legs</li>
                            <li>Feet</li>
                            <li>Ring 1</li>
                            <li>Back</li>
                        </ul>
                        <ul id="item-names"> 
                            <li>Windfury Helm</li>
                            <li>Rune Platebody</li>
                            <li>Padded Shoulders</li>
                            <li>Leopard Print Leggings</li>
                            <li>Clown Shoes</li>
                            <li>Onyx Ring</li>
                            <li>Fire Cape</li>
                        </ul>
                        <ul id="item-costs">
                            <li><p>20</p> <img src="assets/icon-coin.png" alt="Gold Icon"></li>
                            <li><p>602</p> <img src="assets/icon-coin.png" alt="Gold Icon"></li>
                            <li><p>18</p> <img src="assets/icon-coin.png" alt="Gold Icon"></li>
                            <li><p>50</p> <img src="assets/icon-coin.png" alt="Gold Icon"></li>
                            <li><p>927</p> <img src="assets/icon-coin.png" alt="Gold Icon"></li>
                            <li><p>19</p> <img src="assets/icon-coin.png" alt="Gold Icon"></li>
                            <li><p>1244</p> <img src="assets/icon-coin.png" alt="Gold Icon"></li>
                        </ul>
                        
                        -->
                    </div>  
                </div>
                <button id="btn-close"><!--<img src="assets/close-icon.png" alt="Clear search console">--></button>
            </div>
        </div>
    </body>
    <script>
        // Use PHP to hide info for getting the token
        let token = `<?php
        define('__ROOT__', dirname(dirname(__FILE__)));
        require_once(__ROOT__ . '/wow-justin-vaughn/scripts/GetToken.php');
        echo getToken();
        ?>`;
        
        // Character object to populate in scripts
        let characters = [];
        let current_character_index = 0;
        let character; 
        let emptyCharacter;
    </script>
    <script type="text/javascript" charset="utf-8" src="scripts/js-dom-manipulation.js"></script>    <!-- DOM Manipulation scripts -->
    <script type="text/javascript" charset="utf-8" src="scripts/js-requests.js"></script>            <!-- API scripts -->
</html>


