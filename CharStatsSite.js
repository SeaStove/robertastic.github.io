function getCharInfo(characterName,server,apiKey){
    $.ajaxSetup({async: false});
    var response = $.get("https://us.api.battle.net/wow/character/" + server + "/" + characterName + "?fields=items,progression,quests&apikey=" + apiKey);
    
$("#cattusPic").attr("src", "https://render-us.worldofwarcraft.com/character/" + response.responseJSON.thumbnail);
$("#banquishPic").attr("src", "https://render-us.worldofwarcraft.com/character/" + response.responseJSON.thumbnail);
    return response;
}


var classes = {1: "Warrior",11:"Druid"}

var races = {
    1: "Human", 2: "Orc", 3: "Dwarf", 4: "Night Elf", 5: "Undead", 6: "Tauren",
    7: "Gnome", 8: "Troll", 9: "Goblin", 10: "Blood Elf", 11: "Draenei",
    22: "Worgen", 24: "Pandaren", 25: "Ally Panda", 26: "Horde Panda",
    27: "Nightborne", 28: "Hm. Tauren", 29: "Void Elf", 30: "Lf. Draenei", 31: "Zand. Troll",
    32: "Kul Tiran", 34: "Dark Iron Dwarf", 36: "Mag'har Orc"
}

var classes = {
    1: "Warrior", 2: "Paladin", 3: "Hunter", 4: "Rogue", 5: "Priest", 6: "Death Knight",
    7: "Shaman", 8: "Mage", 9: "Warlock", 10: "Monk", 11: "Druid", 12: "Demon Hunter"    
};

var apiKey = config.API_KEY
var cattusData = getCharInfo("Cattus","bleeding-hollow",apiKey)
var banquishData = getCharInfo("Banquish","bleeding-hollow",apiKey)
console.log(cattusData.responseJSON)
$("#cattusPic").attr("src", "https://render-us.worldofwarcraft.com/character/" + cattusData.responseJSON.thumbnail);
$("#cattusILvl").html(cattusData.responseJSON.items.averageItemLevel)
$("#cattusLevel").html(cattusData.responseJSON.level)
$("#cattusRace").html(races[cattusData.responseJSON.race])
$("#cattusClass").html(classes[cattusData.responseJSON.class])

$("#banquishPic").attr("src", "https://render-us.worldofwarcraft.com/character/" + banquishData.responseJSON.thumbnail);
$("#banquishILvl").html(banquishData.responseJSON.items.averageItemLevel)
$("#banquishLevel").html(banquishData.responseJSON.level)
$("#banquishRace").html(races[banquishData.responseJSON.race])
$("#banquishClass").html(classes[banquishData.responseJSON.class])


