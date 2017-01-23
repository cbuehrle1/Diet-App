if (window.FC === undefined) { window.FC = {}; }

(() => {

  var dietData;

  window.FC.dietData = {

    getDiets: (cb, user) => {
        var userVar = user
        $.ajax({
          url: "/api/diet"
        })
        .done((data) => {
          cb(data, userVar)
        });
    }

  }

})();
