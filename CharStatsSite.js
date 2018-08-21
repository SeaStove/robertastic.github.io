function fetchQuestData() 
{
  //var response = UrlFetchApp.fetch("http://eu.battle.net/api/wow/auction/data/Defias%20Brotherhood");
  //var apiString = response.getContentText().match("http.*json");
  var sheet = SpreadsheetApp.getActiveSheet();
  var char = "";
  var server = "";
  var apiKey = "";
  var response = "";
  var data = ""; 
  
  // Dirty enum for races
  var races = [
    1, "Human", 2, "Orc", 3, "Dwarf", 4, "Night Elf", 5, "Undead", 6, "Tauren",
    7, "Gnome", 8, "Troll", 9, "Goblin", 10, "Blood Elf", 11, "Draenei",
    22, "Worgen", 24, "Pandaren", 25, "Ally Panda", 26, "Horde Panda",
    27, "Nightborne", 28, "Hm. Tauren", 29, "Void Elf", 30, "Lf. Draenei", 31, "Zand. Troll",
    32, "Kul Tiran", 34, "Dark Iron Dwarf", 36, "Mag'har Orc"
  ];
  
  // Dirty enum for classes
  var classes = [
    1, "Warrior", 2, "Paladin", 3, "Hunter", 4, "Rogue", 5, "Priest", 6, "Death Knight",
    7, "Shaman", 8, "Mage", 9, "Warlock", 10, "Monk", 11, "Druid", 12, "Demon Hunter"    
  ];
  
  // This allows us to access persistent variables for the spreadsheet.
  // These will be used to store weekly character progression stats.
  var scriptProperties = PropertiesService.getScriptProperties();
  
  // Make sure we're looking at the 'CHAR INFO' tab.
  if (sheet.getName() == "CHAR INFO")
  {    
    // Search through rows 2 to 32.
    for (i = 2; i < 33; i++)
    {
      // Set character and server names to insert into fetch request.
      char = sheet.getRange(i,1).getValue();
      server = sheet.getRange(i,2).getValue();
      
      // Change all spaces to '%20' for URL syntax.
      server = server.replace(" ", "%20");
      
      // Store the user's API key for fetch request. Fetch will not work without this.
      apiKey = sheet.getRange(33,2).getValue();
      
      // If the first and second column are blank, ignore that row.
      if (char != "" && server != "")
      {
        // Fetch the Blizzard API with the server, character, and the user's API (which should be put in row 33, column 2).
        response = UrlFetchApp.fetch("https://us.api.battle.net/wow/character/" + server + "/" + char + "?fields=items,progression,quests&apikey=" + apiKey)
        data = JSON.parse(response.getContentText());
        Logger.log(data);
        
        // Determine Race
        for (a = 0; a < races.length; a++)
        {
          if (races[a] == data.race)
          {
            sheet.getRange(i,3).setValue(races[a+1]);
            a = races.length + 1;
          }            
        }        
        
        // Determine Class
        for (b = 0; b < classes.length; b++)
        {
          if (classes[b] == data.class)
          {
            sheet.getRange(i,4).setValue(classes[b+1]);
            b = classes.length + 1;
          }
        }
        
        // Determine Level
        sheet.getRange(i,5).setValue(data.level);
        
        // Determine equipped iLvl
        sheet.getRange(i,6).setValue(data.items.averageItemLevelEquipped);
        
        // Display each slots iLvl
        sheet.getRange(i,7).setValue(data.items.head.itemLevel);
        sheet.getRange(i,8).setValue(data.items.neck.itemLevel);
        sheet.getRange(i,9).setValue(data.items.shoulder.itemLevel);
        sheet.getRange(i,10).setValue(data.items.back.itemLevel);
        sheet.getRange(i,11).setValue(data.items.chest.itemLevel);
        sheet.getRange(i,12).setValue(data.items.wrist.itemLevel);
        sheet.getRange(i,13).setValue(data.items.hands.itemLevel);
        sheet.getRange(i,14).setValue(data.items.waist.itemLevel);
        sheet.getRange(i,15).setValue(data.items.legs.itemLevel);
        sheet.getRange(i,16).setValue(data.items.feet.itemLevel);
        sheet.getRange(i,17).setValue(data.items.finger1.itemLevel);
        sheet.getRange(i,18).setValue(data.items.finger2.itemLevel);
        sheet.getRange(i,19).setValue(data.items.trinket1.itemLevel);
        sheet.getRange(i,20).setValue(data.items.trinket2.itemLevel);
        sheet.getRange(i,21).setValue(data.items.mainHand.itemLevel);
        
        // Store all raid progression data
        // TODO: Check if a sheet exists of the character name. If so, switch to it. Otherwise create one.
        // TODO: Fill in character sheet with all 39 raid progression info.
        
        // Update Lockouts
        var date = new Date();
        var currentTime = date.getTime();
        sheet.getRange(36,1).setValue(currentTime);
        

      }
    }
  }

}
