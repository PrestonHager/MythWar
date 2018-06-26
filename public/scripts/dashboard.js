var profile = JSON.parse(window.localStorage.getItem("profile"));
$(document).ready(function(){
  $.post("/profile", {id: profile.id}, function(data) {
    for (var i in data.cards.found_cards) {
      var card = data.cards.found_cards[i];
      if (card.rarity === 1) {
        $("div.found-cards div.common-cards").append(create_card(card.id, card));
      } else if (card.rarity === 2) {
        $("div.found-cards div.rare-cards").append(create_card(card.id, card));
      } else if (card.rarity == 3) {
        $("div.found-cards div.legendary-cards").append(create_card(card.id, card));
      }
    }
    for (var i in data.cards.unfound_cards) {
      var card = data.cards.unfound_cards[i];
      if (card.rarity === 1) {
        $("div.unfound-cards div.common-cards").append(create_card(card.id, card));
      } else if (card.rarity === 2) {
        $("div.unfound-cards div.rare-cards").append(create_card(card.id, card));
      } else if (card.rarity == 3) {
        $("div.unfound-cards div.legendary-cards").append(create_card(card.id, card));
      }
    }

  });
});

function create_card(id, card) {
  var card_found = "found";
  if (card.name === undefined) {
    card.name = "?";
    card_found = "unfound";
  }
  if (card.ability === undefined) {
    card.ability = {"text": "?", "action": -1, "value": -1};
    card_found = "unfound";
  }
  var elm = $("<div id=\"card-"+id+"\" class=\"card "+card.rarity_string+"-card card-"+card_found+"\" />")
    .append($("<div class=\"wrapper\" />")
      .append($("<img height=\"210\" width=\"175\" src=\"/cards/"+id+".png\" alt=\"Card "+id+"\" />")))
    .append($("<div class=\"card-info\" />")
      .append($("<p><strong>Name:</strong>"+card.name+"</p>"))
      .append($("<p><strong>Ability:</strong>"+card.ability.text+"</p>")).hide())
    .hover(function() { $(this).find($("div.card-info")).show(); }, function() { $(this).find($("div.card-info")).hide(); });
  return elm;
}
