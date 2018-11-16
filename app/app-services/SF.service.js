(function () {
    'use strict';
 
    angular
        .module('app')
        .factory('SFService', Service);
 
    function Service($http, $q) {
        var service = {};
 
        service.Save = Save;
        //service.GetAll = GetAll;
        service.GetById = GetById;
        //service.GetByUsername = GetByUsername;
        //service.Create = Create;
       // service.Update = Update;
       /// service.Delete = Delete;
 
        return service;
 
        function Save(Order) {
			//alert('SF.Service.js is called in app' + Order.Name);
            return $http.post('/api/SF/Save', Order).then(handleSuccess, handleError);
        }
		
		
 
        /*function GetAll() {
			//alert('SF.Service.js is called in app');
            return $http.get('/api/SF/Orders').then(handleSuccess, handleError);
        }*/
 
        function GetById(_id) {
			//alert(_id +' in app service');
            return $http.get('/api/SF/'+_id).then(handleSuccess, handleError);
        }
 
        /*function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError);
        }
 
        function Create(user) {
            return $http.post('/api/users', user).then(handleSuccess, handleError);
        }*/
 
        /*function Update(Order) {
			alert(Order);
            return $http.put('/api/SF/Update', Order).then(handleSuccess, handleError);
        }
 
        function Delete(_id) {
            return $http.delete('/api/SF/' + _id).then(handleSuccess, handleError);
        }*/
 
        // private functions
 
        function handleSuccess(res) {
            return res.data;
        }
 
        function handleError(res) {
            return $q.reject(res.data);
        }
    }
 
})();