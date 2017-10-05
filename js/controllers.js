app.controller("AgendaCtrl", function($scope, $http){

    var getData = function(){
        var carrega = {type:"view"};
        $http.post("api/actionAgenda.php",carrega).success(function (data) {
            $scope.contato = data;
            console.log(data);
        }).error(function (data, status) {
            alert("Aconteceu um problema: " + data);
        });
    };

    $scope.insertData = function(agenda){
        var id = $scope.agenda.id;
        if ( id > 0) {
            $scope.agenda.type = "update";
            $http.post("api/actionAgenda.php",agenda).success(function(data){  
                alert(data);
                delete $scope.agenda;
                getData();
            });
        }else{
            $scope.agenda.type = "add";
            $http.post("api/actionAgenda.php",agenda).success(function(data){  
                alert(data);
                delete $scope.agenda; 
                getData();
            });
        }
    };

    $scope.removeData = function(id){
        var result = confirm("Deseja apagar esse contato?");
        var apaga = {id:id,type:"remove"}
        if (result) {
            $http.post("api/actionAgenda.php",apaga).success(function(data){  
                alert(data);
                getData();
            });
        }
    }

    $scope.updateData = function(a){
        $scope.titulo = "Atualização de Contato"
        $scope.botao = "Atualizar Contato";
        $scope.agenda = a;
    }

    $scope.newData = function(){
        $scope.titulo = "Cadastro de Contato";
        $scope.botao = "Adicionar Contato";
        delete $scope.agenda;
    }

    getData();
});