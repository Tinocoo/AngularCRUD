var app = angular.module("Agenda",["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        title: "Página Incial",
        templateUrl : "tpl/manager.html"
    })
});

app.filter('phoneMask', function() {
    return function(input) {
        if (input.length >= 10 & input.length <= 11) {
            input=input.replace(/\D/g,"");             //Remove tudo o que não é dígito
            input=input.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
            input=input.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
        }else if (input == null){
            return input;
        }
        return input;
    };
});


app.filter("nameMask", function () {
    return function (input) {
        var listaDeNomes = input.split(" ");
        var listaDeNomesFormatada = listaDeNomes.map(function (nome) {
            if(nome.length <= 3) {
                if(/(da|de|do|das|dos)/.test(nome)) return nome;
            }
            return nome.charAt(0).toUpperCase() + nome.substring(1).toLowerCase();
        });
        return listaDeNomesFormatada.join(" ");
    };
});

app.directive('capitalize', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        var capitalize = function(inputValue) {
          if (inputValue == undefined) inputValue = '';
          var capitalized = inputValue.toUpperCase();
          if (capitalized !== inputValue) {
            modelCtrl.$setViewValue(capitalized);
            modelCtrl.$render();
          }
          return capitalized;
        }
        modelCtrl.$parsers.push(capitalize);
        capitalize(scope[attrs.ngModel]); // capitalize initial value
      }
    };
});