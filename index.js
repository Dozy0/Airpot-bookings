$(document).ready(function() {
  let cityList = [];
  let url = "http://www.ije-api.tcore.xyz";

  $(".city-search").on("input", function() {
    let inputVal = $(".city-search").val();

    fetch(url + "/v1/plugins/airports-type-ahead/" + inputVal)
      .then((res) => res.json())
      .then((data) => {
        let response = data.body.data;
        if (response.length <= 100) {
          for (let i = 0; i < response.length; i++) {
            cityList.push(response[i].name);
          }
          console.log(cityList);
          console.log(response);
        }
        $(".city-search").autoComplete({
          minChars: 2,
          source: function(term, suggest) {
            term = term.toLowerCase();
            var choices = cityList;
            var matches = [];
            for (i = 0; i < choices.length; i++)
              if (~choices[i].toLowerCase().indexOf(term))
                matches.push(choices[i]);
            suggest(matches);
          }
        });
      });
  });
});
