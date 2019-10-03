// --------------------------------------------------------------------------
// This set of scripts contain all info needed to manipulated the DOM objects
// --------------------------------------------------------------------------

"using strict"

// Pull neccesary objects from the DOM --------------------------------------------------------------------------------------
// Interactive DOM objects
let input_char = document.querySelector("#input-char");
let input_realm = document.querySelector("#input-realm");
let input_btn = document.querySelector("#btn-search");
let close_btn = document.querySelector("#btn-close");

let stats_attributes = document.querySelector("#stats-attributes-list").children;
let stats_attack = document.querySelector("#stats-attack-list").children;
let stats_char = document.querySelector("#stats-char-list").children;
let stats_defense = document.querySelector("#stats-defense-list").children;
let stats_enhancements = document.querySelector("#stats-enhancements-list").children;

let item_set_lists = document.querySelector("#items-display").children;
let char_set_list = document.querySelector("#stats-char-img-list");

// Setting up listeners on the buttons
input_btn.addEventListener("click", searchForChar);
close_btn.addEventListener("click", clearInfo);

// Update functions used for updating DOM elements ---------------------------------------------------------------------------
// Function attached to the search button -- Starts the searching chain of functions
function searchForChar(){
    callDataChar(input_char.value, input_realm.value, token);
}

// Updates all the different pieces of the page according to the character passed in
function updateStats(_char){
    // Turning attributes over 250 blue
    let incrementer = 0;
    for(let item in _char.stats.attributes){
        if (_char.stats.attributes[item] > 250){
            stats_attributes[incrementer].className = "highlight";
        } else {
            stats_attributes[incrementer].className = "";
        }
        incrementer++;
    }
    
    // Turning enhancements over 25% blue
    incrementer = 0;
    for(let item in _char.stats.enhancements){
        if (_char.stats.enhancements[item] > 25){
            stats_enhancements[incrementer].className = "highlight";
        } else {
            stats_enhancements[incrementer].className = "";
        }
        incrementer++;
    }
    
    stats_attributes[0].innerHTML = _char.stats.attributes.str;
    stats_attributes[1].innerHTML = _char.stats.attributes.agi;
    stats_attributes[2].innerHTML = _char.stats.attributes.int;
    stats_attributes[3].innerHTML = _char.stats.attributes.sta;
    
    stats_attack[0].innerHTML = `${_char.stats.attack.dmg_low.toFixed(0)}-${_char.stats.attack.dmg_high.toFixed(0)}`;
    stats_attack[1].innerHTML = _char.stats.attack.speed.toFixed(2);
    
    stats_char[0].innerHTML = _char.stats.char.level.toString();
    let name_formatted = _char.stats.char.name.toString().charAt(0).toUpperCase() + _char.stats.char.name.toString().slice(1);
    stats_char[1].innerHTML = name_formatted;
    let realm_formatted = _char.stats.char.realm.toString().charAt(0).toUpperCase() + _char.stats.char.realm.toString().slice(1);
    stats_char[2].innerHTML = realm_formatted;
    
    stats_defense[0].innerHTML = _char.stats.defense.armor;
    stats_defense[1].innerHTML = _char.stats.defense.dodge.toFixed(2) + "%"; 
    stats_defense[2].innerHTML = _char.stats.defense.parry.toFixed(2) + "%";
    stats_defense[3].innerHTML = _char.stats.defense.block.toFixed(2) + "%";
    
    stats_enhancements[0].innerHTML = _char.stats.enhancements.crit.toFixed(2) + "%";
    stats_enhancements[1].innerHTML = _char.stats.enhancements.haste.toFixed(2) + "%";
    stats_enhancements[2].innerHTML = _char.stats.enhancements.mastery.toFixed(2) + "%";
    stats_enhancements[3].innerHTML = _char.stats.enhancements.leech.toFixed(2) + "%";
    stats_enhancements[4].innerHTML = _char.stats.enhancements.versatility.toFixed(2) + "%";
    
    
}

// Updates the item list of items currently equipped to a given character
function updateItems(_char){    
    //Clear our all the old child elements but keep the container lists
    for(let i=0; i<item_set_lists.length; i++){
        while(item_set_lists[i].childElementCount > 0){
            item_set_lists[i].removeChild(item_set_lists[i].children[0]);
        }
    }
        
    //Add the elements of _char in the item list to the display
    for(let i=2; i<Object.keys(_char.items).length; i++){
        // Define and format the item type
        // EX: <li>Chest</li>
        let itemType = document.createElement("li");
        let type = Object.keys(_char.items)[i];
        let typeFormatted = type.charAt(0).toUpperCase() + type.slice(1);
        switch(typeFormatted){  // Special case whitespace formatting
            case "MainHand":
                typeFormatted = "Main Hand";
                break;
            case "OffHand":
                typeFormatted = "Off Hand";
                break;
        }
        itemType.innerHTML = typeFormatted;
        
        // Define and format the item name
        // EX: <li>Rune Platebody</li>
        let itemName = document.createElement("li");
        let name = _char.items[type].name;
        itemName.innerHTML = name;

        // Define item cost and append gold icon to it 
        // EX: <li><p>602</p> <img src="assets/icon-coin.png" alt="Gold Icon"></li>
        let itemCost = document.createElement("li");
        let costP = document.createElement("p");
        let id_input = parseInt(_char.items[type].id, 10);        
        let cost = _char.item_costs[id_input];
        if(cost==undefined){
            cost = "--";
        }
        costP.innerHTML = cost;
        let goldIcon = document.createElement("img");
        goldIcon.src = "assets/icon-coin.png";
        goldIcon.alt = "Gold Icon";
        itemCost.appendChild(costP);
        itemCost.appendChild(goldIcon);
        
        // Append elements to their parent object
        item_set_lists[0].appendChild(itemType);
        item_set_lists[1].appendChild(itemName);
        item_set_lists[2].appendChild(itemCost);
    }
    
}

// Updates characters in the compare stats column
function updateChars(_char){
    // Make a deep copy and add it to the characters lists
    let newChar = $.extend(true, {}, _char);
    characters.push(newChar);
    
    // Pull the character's thumbnail and display it on the compare sheet
    let url = URL_RENDER_BASE + `/${_char.thumbnail}`;
    let img = document.createElement("img");
    img.alt = "Character thumbnail";
    img.src = url;
    img.setAttribute("data-index", _char.char_number);
    img.addEventListener("click", updateByOldChar)
    
    // Append it to the parent list
    char_set_list.appendChild(img);
}

function updateByOldChar(_element){
    // Get the index of the character we're trying to reach
    let char_index = _element.target.getAttribute("data-index");
    
    // Pass in deep copies of the characters to prevent data loss
    updateStats($.extend(true, {}, characters[char_index]));
    updateItems($.extend(true, {}, characters[char_index]));
}

function bounceInfo(type){
    switch(type){
        case 1:
            input_realm.style.color = "red";
            break;
        case 2:
            input_char.style.color = "red";
            break;
    }
    
    setTimeout(function() { normalizeColors(); }, 1000);
}

function normalizeColors(){
    input_char.style.color = "#FAEEE8";
    input_realm.style.color = "#FAEEE8";
}

// Clears out all the info being held in the main informational section
function clearInfo(){
    updateStats(emptyCharacter);
    updateItems(emptyCharacter);
}