(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Order.IndexController', Controller);
		
	
 
    function Controller($window, SFService,FlashService,UserService,$scope,$filter,$state,$http, $q) {
        var vm = this;
        vm.Order = null;
        vm.saveOrder = saveOrder;
		vm.Close = Close;
		vm.ValidationForm = ValidationForm;
		vm.user = null;
		//vm.GetAll = GetAll;
		//vm.lookups = null;
		vm.getBranches = getBranches;
		vm.userBranches = null;
		vm.userDivisions = null;
		
		// for Deleting Director and Din Rows
		vm.deleteDir1 = deleteDir1;
		vm.deleteDir2=deleteDir2;
		vm.deleteDir3 = deleteDir3;
		vm.deleteDir4 =deleteDir4;
		vm.showDir1 = showDir1;
		vm.showDir2 = showDir2;
		vm.showDir3 = showDir3;
		vm.showDir4 = showDir4;
		
		vm.Divisions = null;
		vm.Branches = null;
		
		vm.divbranch = null;
		$http.get('./divbrnch.json')
            .success(function(data) {
                //angular.extend(_this, data);
                //defer.resolve();
				vm.divbranch = data;
				console.log(data)
				vm.Divisions = vm.divbranch.filter(function (item) {
					console.log(item)
					return (item.ParentID == "NULL");
				});
				
				vm.Branches = vm.divbranch.filter(function (item) {
					console.log(item)
					return (item.ParentID != "NULL");
				});
				
            })
            .error(function() {
                alert('could not find divbrnch.json');
            });
			
		
		
			
			
		vm.branch_Rel = null;
		$http.get('./branch_rel.json')
            .success(function(data) {
                //angular.extend(_this, data);
				//defer.resolve();
				console.log(data)
				vm.branch_Rel = data;
				initController();
				//alert(vm.branch_Rel	);
            })
            .error(function() {
                alert('could not find branch_rel.json');
            });
		
		$scope.$watch('vm.Order.Borrower_First_Name__c', function(val) {
			$scope.vm.Order.Borrower_First_Name__c = $filter('uppercase')(val);
		  }, true);	
		  
		  $scope.$watch('vm.Order.Borrower_Middle_Name__c', function(val) {
			$scope.vm.Order.Borrower_Middle_Name__c = $filter('uppercase')(val);
		  }, true);
			
		 $scope.$watch('vm.Order.Borrower_Last_Name__c', function(val) {
			$scope.vm.Order.Borrower_Last_Name__c = $filter('uppercase')(val);
		  }, true);
		  
		  $scope.$watch('vm.Order.channelPartnerName__c', function(val) {
			$scope.vm.Order.channelPartnerName__c = $filter('uppercase')(val);
		  }, true);
			
		 $scope.$watch('vm.Order.PartnershipOrCompanyName__c', function(val) {
			$scope.vm.Order.PartnershipOrCompanyName__c = $filter('uppercase')(val);
		  }, true);
		  
		 $scope.$watch('vm.Order.salesExecutiveName__c', function(val) {
			$scope.vm.Order.salesExecutiveName__c = $filter('uppercase')(val);
		  }, true);
		  
		  $scope.$watch('vm.Order.CIN_LLPIN__c', function(val) {
			$scope.vm.Order.CIN_LLPIN__c = $filter('uppercase')(val);
		  }, true);
		  
		  $scope.$watch('vm.Order.DirectorName1__c', function(val) {
			$scope.vm.Order.DirectorName1__c = $filter('uppercase')(val);
		  }, true);
		  
		  $scope.$watch('vm.Order.DirectorName2__c', function(val) {
			$scope.vm.Order.DirectorName2__c = $filter('uppercase')(val);
		  }, true);
		  
		  $scope.$watch('vm.Order.DirectorName3__c', function(val) {
			$scope.vm.Order.DirectorName3__c = $filter('uppercase')(val);
		  }, true);
		  
		  $scope.$watch('vm.Order.DirectorName4__c', function(val) {
			$scope.vm.Order.DirectorName4__c = $filter('uppercase')(val);
		  }, true);
		  
		  
		  
		  
		// Added for DIN Addition / Removing rows
		   $scope.delDir1 = false;
		   $scope.delDir2 = true;
		   // $scope.myDir2 = false;
		   $scope.delDir3 = true;
		   // $scope.myDir3 = false;
		   // $scope.myDir4 = false;
		   $scope.delDir4 = true;
		   
		   function showDir1(){
			   $scope.myDir1 = true;
			  $scope.delDir1 = false;
		   }
		   
		  function showDir2(){
			  $scope.myDir2 = true;
			  $scope.delDir2 = false;
		  }
		  function showDir3(){
			  $scope.myDir3 = true;
			  $scope.delDir3 = false;
		  }
		  function showDir4(){
			  $scope.myDir4 = true;
			  $scope.delDir4 = false;
		  }
		  
		  
		 function deleteDir1(){
				vm.Order.DirectorName1__c = null;
				vm.Order.DirectorDIN1__c = null;
			
			$scope.delDir1 = true; 
				
		}  
		   
		function deleteDir2(){
				vm.Order.DirectorName2__c = null;
				vm.Order.DirectorDIN2__c = null;
			
			$scope.delDir2 = true; 
				
		}  
		
		function deleteDir3(){
				vm.Order.DirectorName3__c = null;
				vm.Order.DirectorDIN3__c = null;
			
			$scope.delDir3 = true;
		}
		
		function deleteDir4(){
				vm.Order.DirectorName4__c = null;
				vm.Order.DirectorDIN4__c = null;
		
			$scope.delDir4 = true;
		}
				  
        function saveOrder() {
			//alert(vm.Order.Date_Of_Birth__c);
			//vm.Order.Date_Of_Birth__c.setDate(vm.Order.Date_Of_Birth__c.getDate()+1);
			var dateString = (vm.Order.Date_Of_Birth__c).toString();
			var RFQdate = new Array();
			RFQdate =  dateString.split('/');
			var formattedDate=(RFQdate[2]+"-"+RFQdate[1]+"-"+RFQdate[0]).toString();
			
			vm.Order.Date_Of_Birth__c=formattedDate;
			var branchName = vm.Branches.filter(function (item) {
				return (item.DivBranchID == vm.Order.Branch__c);
			   });
			   vm.Order.Branch__c = branchName[0].DivBranchName;
			   
			   var DivisionName = vm.Divisions.filter(function (item) {
				return (item.DivBranchID == vm.Order.Region__c);
			   });
			   vm.Order.Region__c = DivisionName[0].DivBranchName;
   
			vm.Order.Status__c = 'Submitted';
			vm.Order.OrderCreatedBy__c = vm.user.username;
			// to update product ordered
			if(vm.Order.ProductOrdered__c == 'Salaried Information'){
				vm.Order.IT_Salaried_Report__c = true;
			}else if(vm.Order.ProductOrdered__c == 'Salaried Credit Evaluation'){
				vm.Order.Salaried_Credit_Evaluation__c = true;
			}else if(vm.Order.ProductOrdered__c == 'Self Employed Information'){
				vm.Order.IT_Self_Employed_Report__c = true;
			}else if(vm.Order.ProductOrdered__c == 'SelfEmployedCreditEvaluation'){
				vm.Order.Self_Employed_Credit_Evaluation__c  = true;
			}else if(vm.Order.ProductOrdered__c == 'Credit Assessment Information Report'){
				vm.Order.Credit_Assessment_Information_Report__c  = true;
			}
			
			// to update the datapull
			if(vm.Order.DataPullOptionChosen__c == 'Self Service'){
				vm.Order.SelfService_Only__c= true;
			}else if(vm.Order.DataPullOptionChosen__c == 'CSR Assisted'){
				vm.Order.Assisted_Only__c = true;
			}else if(vm.Order.DataPullOptionChosen__c == 'Lender Assisted'){
				vm.Order.SelfService_Override__c = true;
			}
			
			
			SFService.Save(vm.Order)
				.then(function (Order) {
					FlashService.Success('Order Saved Successfully');
					//$window.location = '/app/#/';
					//alert('Order Saved '+Order.id);
					//vm.Order = null;
					
					$state.go('OrderView', { Id: Order.id});
					
					
				})
				.catch(function (error) {
					
					console.log(error);
					 //FlashService.Error(JSON.stringify(error));
					if(error == null){
						alert('Check Internet Connection');
					}
					
					if(error.errorCode == 'ENOENT'){
						
						FlashService.Error('Failed to connect Salesforce. Please check network connection..');
					}
					else if(error.errorCode == 'INVALID_OR_NULL_FOR_RESTRICTED_PICKLIST' || error.errorCode == 'FIELD_CUSTOM_VALIDATION_EXCEPTION' || error.errorCode == 'FIELD_CUSTOM_VALIDATION_EXCEPTION'){
						
						//FlashService.Error(error.fields[0] + ' ' + error.errorCode);
						if(error.fields[0] == 'Borrower_First_Name__c'){
							FlashService.Error('Enter valid borrower first Name');
						}
						else if(error.fields[0] == 'Borrower_Middle_Name__c'){
							FlashService.Error('Enter valid borrower Middle Name');
						}
						else if(error.fields[0] == 'Borrower_Last_Name__c'){
							FlashService.Error('Enter valid borrower Last Name');
						}
						else if(error.fields[0] == 'Date_Of_Birth__c'){
							FlashService.Error('Select valid Date of Birth');
						}
						else if(error.fields[0] == 'Loan_Applicant_PAN__c'){
							FlashService.Error('Enter valid PAN Number');
						}
						else if(error.fields[0] == 'Loan_Applicant_Email__c'){
							FlashService.Error('Enter valid Contact Email Id');
						}
						else if(error.fields[0] == 'Additional_Email__c'){
							FlashService.Error('Enter valid Additional Email Id');
						}
						else if(error.fields[0] == 'Loan_Applicant_Mobile__c'){
							FlashService.Error('Enter valid Contact Mobile Number');
						}
						else if(error.fields[0] == 'Additional_Mobile__c'){
							FlashService.Error('Enter valid Additional Mobile Number');
						}
						else if(error.fields[0] == 'Borrowerlanguage__c'){
							FlashService.Error('Select Valid Borrower Language');
						}
						else if(error.fields[0] == 'DIN_Number__c'){
							FlashService.Error('Enter Valid DIN Number');
						}
						else if(error.fields[0] == 'CIN_LLPIN__c'){
							FlashService.Error('Enter Valid CIN/LLPIN Number');
						}
						else if(error.fields[0] == 'Loan_Applicant_Pin_Code__c'){
							FlashService.Error('Enter Valid Pincode Number');
						}
						else{
							
						}
						
						
						
					} 
					else if(error.errorCode == 'JSON_PARSER_ERROR'){
						
						//FlashService.Error(error.fields[0] + ' ' + error.errorCode);
						if(error.fields[0] == 'Borrower_First_Name__c'){
							FlashService.Error('Enter valid borrower first Name');
						}
						else if(error.fields[0] == 'Borrower_Middle_Name__c'){
							FlashService.Error('Enter valid borrower Middle Name');
						}
						else if(error.fields[0] == 'Borrower_Last_Name__c'){
							FlashService.Error('Enter valid borrower Last Name');
						}
						else if(error.fields[0] == 'Date_Of_Birth__c'){
							FlashService.Error('Select valid Date of Birth');
						}
						else if(error.fields[0] == 'Loan_Applicant_PAN__c'){
							FlashService.Error('Enter valid PAN Number');
						}
						else if(error.fields[0] == 'Loan_Applicant_Email__c'){
							FlashService.Error('Enter valid Contact Email Id');
						}
						else if(error.fields[0] == 'Additional_Email__c'){
							FlashService.Error('Enter valid Additional Email Id');
						}
						else if(error.fields[0] == 'Loan_Applicant_Mobile__c'){
							FlashService.Error('Enter valid Contact Mobile Number');
						}
						else if(error.fields[0] == 'Additional_Mobile__c'){
							FlashService.Error('Enter valid Additional Mobile Number');
						}
						else if(error.fields[0] == 'Borrowerlanguage__c'){
							FlashService.Error('Select Valid Borrower Language');
						}
						else if(error.fields[0] == 'DIN_Number__c'){
							FlashService.Error('Enter Valid DIN Number');
						}
						else if(error.fields[0] == 'CIN_LLPIN__c'){
							FlashService.Error('Enter Valid CIN/LLPIN Number');
						}
						else if(error.fields[0] == 'Loan_Applicant_Pin_Code__c'){
							FlashService.Error('Enter Valid Pincode Number');
						}
						else{
							
						}
						
						
					} 
					
					// else if(error.errorCode == 'ERR_INTERNET_DISCONNECTED'){
						
						// FlashService.Error('Failed to connect Salesforce. Please check network connection..');
					// }
					else if(error.errorCode == null){
						alert('Check Internet Connection --null');
						//FlashService.Error('Failed to connect Salesforce. Please check network connection..null');
					}
					
					else {
						
						FlashService.Error(JSON.stringify(error));
					}
					
					//FlashService.Error('Error Occured Please Contact Administrator');
					//alert('Error');
					vm.Order = null;
				});
				
			
			
        }
		
		var userbranches =[];
		function initController() {
		   UserService.GetCurrent().then(function (user) {
				vm.user = user;
				//alert(vm.user.UserID);
				vm.User_Branch_Rel = vm.branch_Rel.filter(function (item) {
					return (item.UserID == vm.user.UserID);
				});
				
				console.log(vm.User_Branch_Rel);
				for(var i=0; i< vm.User_Branch_Rel.length; i ++){
					
					var usrbranch = vm.Branches.filter(function (item) {
						return (item.DivBranchID == vm.User_Branch_Rel[i].Branch_id);
					});	
					userbranches.push(usrbranch[0]);
				}
				console.log(userbranches);
				
				var ids = {};
				_.each(userbranches, function (bb) { ids[bb.ParentID] = true; });

				vm.userDivisions = _.filter(vm.Divisions, function(val){
						return ids[val.DivBranchID];
						}, userbranches);
				console.log(userbranches);
				console.log(vm.userDivisions);
		  });
		}
		
		function getBranches(DivId){
			//console.log(userbranches);
			vm.userBranches = userbranches.filter(function (item) {
				return (item.ParentID == DivId);
			});
			console.log(vm.userBranches);
		}
		
		
		
		
		function ValidationForm() {
				$scope.submitted = true;
				//alert('hi sejar');
			 }
		 
		
		 function Close() {
			$window.location = '/#';
			//alert('hi');
			//$state.go('OrderView', { Id: order.id});
		 }
    }
 
})();