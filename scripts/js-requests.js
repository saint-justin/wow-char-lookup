// ------------------------------------------------------------------------------
// This set of scripts contain all info needed to make the neccesary api requests
// ------------------------------------------------------------------------------

"use strict"

console.log("SCRIPT TIMING: REQUESTS");

// Initial Variables
const URL_BASE = `https://us.api.blizzard.com`; // base url for the api
const URL_CHAR_EXT = `/wow/character`; //Extension to base url for characters
const URL_ITEM_EXT = `/wow/item`
const URL_FIELDS = `fields=items%20stats`;
const URL_LANG = `locale=en_US`
const URL_RENDER_BASE = `http://render-us.worldofwarcraft.com/character`;
const ILLEGAL_CHARS = `-._~:/?#[]@!$&'()*+,;=`.split('');

// The character object to populate
character = {
    stats: {
        attributes: {
            str: 0,
            agi: 0,
            int: 0,
            sta: 0
        },

        attack: {
            dmg_low: 0,
            dmg_high: 0,
            speed: 0
        },

        char: {
            level: 0,
            name: "--",
            realm: "--"
        },

        // Make sure to store neccesary values as percentages
        defense: {
            armor: 0,
            dodge: 0,
            parry: 0,
            block: 0
        },

        enhancements: {
            crit: 0,
            haste: 0,
            mastery: 0,
            leech: 0,
            versatility: 0
        }
    },
    
    items: {},
    item_costs:{},
    thumbnail:"",
    char_number:0
}

// Make a deep copy of the character object & populate it with empty info -- TODO: add dummy items
emptyCharacter = $.extend(true, {}, character); 

// API Calling Functions --------------------------------------------------------------------------------------------

// Make the request for a given character's info via Blizz API
function callDataChar(_name, _realm, _token){
    // Check for illegal characters, bounce the submission if it contains any
    for(let i=0; i<ILLEGAL_CHARS.length; i++){
        console.log(ILLEGAL_CHARS[i].indexOf(_name));
        if (_realm.indexOf(ILLEGAL_CHARS[i]) >= 0){
            bounceInfo(1);
            return;
        }
            
        if(_name.indexOf(ILLEGAL_CHARS[i]) >= 0){
            bounceInfo(2);
            return;
        }
    }
    
    // Build out the url
    let full_url = URL_BASE + URL_CHAR_EXT;
    full_url += `/${_realm}`;
    full_url += `/${_name}`;
    full_url += `?${URL_FIELDS}`;
    full_url += `&${URL_LANG}`;
    full_url += `&access_token=${_token}`;
    
    character.stats.char.name = _name;
    character.stats.char.realm = _realm;
    character.char_number = current_character_index;
        
    // Call the ajax function
    $.ajax({
        dataType: "json",
        url: full_url,
        data: null,
        success: organizeDataChar,
        error: searchFailed
    });
    
    // Only update if this character isn't already in the set
    current_character_index++;
}

// Make the request for info based on a given item ID via Blizz API
function callDataItem(_itemID, _region, _token){
    // Build out the call URL
    let full_url = URL_BASE + URL_ITEM_EXT;
    full_url += `/${_itemID}`;
    full_url += `?${_region}`;
    full_url += `&access_token=${_token}`;
    
    // Call the ajax function, async to prevent organizeItemData from loading prior to requests coming back
    $.ajax({
        datatype: "json",
        url: full_url,
        data: null,
        async: false,
        success: organizeItemData,
        error: searchFailed
    });
}

// Data Organization Functions ----------------------------------------------------------------------------------

// Organizes the data from a character call and stores it in the character object
function organizeDataChar(_data){
    // Pulling all the neccesary info from the data object and store in the character object
    
    // Pulling Stats --------------------------------------------------------------------------------------------
    // Attributes
    character.stats.attributes.str = _data.stats.str;   //strength
    character.stats.attributes.agi = _data.stats.agi;   //agility
    character.stats.attributes.int = _data.stats.int;   //intelligence
    character.stats.attributes.sta = _data.stats.sta;   //stamina
    
    // Attack
    calcDamage(_data.stats.mainHandDmgMin, 
               _data.stats.mainHandDmgMax,
               _data.stats.power,
               _data.stats.mainHandSpeed,
               _data.stats.mastery);
    character.stats.attack.speed = _data.stats.mainHandSpeed;
    
    // Character
    character.stats.char.level = _data.level;
    
    // Defense
    character.stats.defense.armor = _data.stats.armor;
    character.stats.defense.dodge = _data.stats.dodge;
    character.stats.defense.parry = _data.stats.parry;
    character.stats.defense.block = _data.stats.block;
    
    // Enhancements
    character.stats.enhancements.crit = _data.stats.crit;
    character.stats.enhancements.haste = _data.stats.haste;
    character.stats.enhancements.mastery = _data.stats.mastery;
    character.stats.enhancements.leech = _data.stats.leech;
    character.stats.enhancements.versatility = _data.stats.versatility;
    
    // Character thumbnail
    character.thumbnail = _data.thumbnail;
    
    // Pulling Items --------------------------------------------------------------------------------------------
    // Pulls a deep copy the items from the _data.items entry
    character.items = $.extend(true, {}, _data.items);  
    
    // Call the item api for each item and populate the last column with its info
    for(let i=2; i < Object.keys(character.items).length; i++){
        let type = Object.keys(character.items)[i];
        let id = character.items[type].id;
        callDataItem(id, URL_LANG, token);
    }
    
    // Updating Display -----------------------------------------------------------------------------------------
    updateStats(character);
    updateItems(character);
    updateChars(character);
}

// Organizes the data from an item call and stores it in the character object
function organizeItemData(_data){
    // Calculate the cost in gold (it's given via the API in copper cost)
    let copperCost = _data.buyPrice;
    let goldCost = 0;
    
    // If time permits, optimize further (if copperCost > 100000, go by 100000's)
    while (copperCost > 0){
        copperCost -= 1000;
        goldCost += 1;
    }
    character.item_costs[parseInt(_data.id, 10)] = goldCost;
}

function searchFailed(){
    console.log("AJAX call failed. Check server status.");
}


// Function used to calculate min and max damage-- The formula itself might be out of date, it's from a source from 
// early 2016 but the best I could find online  -- https://eu.battle.net/forums/en/wow/topic/17613522527
function calcDamage(_minDps, _maxDps, _power, _weaponSpeed, _mastery){    
    //(weaponDPS + AttackPower/3,5 ) * weapon speed = DPS
    let coefficient =  1 + (_mastery * 0.01);
    
    // Calculating Upper Limit
    character.stats.attack.dmg_high = (_maxDps + _power/3.5) * _weaponSpeed * coefficient;
    
    // Calculating Lower Limit
    character.stats.attack.dmg_low = (_minDps + _power/3.5) * _weaponSpeed * coefficient;
}

