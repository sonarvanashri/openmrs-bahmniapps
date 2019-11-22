'use strict';
angular.module('bahmni.clinical')
    .service('dischargeSummuryService', ['$rootScope', '$translate', 'patientService', 'observationsService', 'programService', 'treatmentService',  'patientVisitHistoryService', 'conceptSetService','diagnosisService','labOrderResultService',
        function ($rootScope, $translate, patientService, observationsService, programService, treatmentService, patientVisitHistoryService, conceptSetService,diagnosisService, labOrderResultService) {
            var count = 0;
            var reportModel = {
                
                    hospitalCourse :'',
                    historyAndExaminationCourse :'',
                    dateOfOperation :'',
                    operativeProcedure :'',
                    followUpdate : '',
                    labInvestigationNotes:'',
                    radiologyNotes :'',
                    otherNotes :'',
                    additionalAdvice : '',
                    followUpPlan :'',
                
                tbComorbidity: '',
                tarvNumber: '',
                orders: [],
                diagnosisName:'',
                diaOrderName :'',
                diaCeratinityName :'',
                orderName :'',
                testName :'',
                testResult:'',
                labRes : [],
                trial :[],
                patientName:'',
                patientAge : '',
                patientGender :'',
                patientAgeEst : '',
                patientAddress:'',
                patientStautus : '',
                patientNID :'',
                patientBirthdate :'',
                address1:'',
                address2 :'',
                cityVillage:'',
                addressString :'',
                patientStatus : ''
                             
            };

            var patientUuid = '';
            var isTARVReport;

            var arvConceptUuids = [];

            this.getReportModel = function (_patientUuid, _isTARVReport) {
                patientUuid = _patientUuid;
                isTARVReport = _isTARVReport;
                return new Promise(function (resolve, reject) {
                    var p7 = populateHospitalCourse();
                    var p8 = populateHistoryAndExaminationNotes();
                    var p9 = populateDateOfOperation();
                    var p10= populateOperativeProcedure();
                    var p11 = populatefollowUpDate();
                    var p12 = populatelabInvestigationNotes();
                    var p13 = populateRadiologyNotes();
                    var p14 = populateOtherNotes();
                    var p15 = populateAdvice();
                    var p16 = populateFollowUpPlan();
                   // var p17 = populateDrugOrders();
                    var p18 = populateLocationAndDrugOrders(0);
                    var p19 = populateDignosis();
                    var p20 = populatePatientLabResults();
                    var p21 = populatePatientDemographics();
                    Promise.all([p7,p8,p9,p10,p11,p12,p13,p14,p15,p16,p18,p19,p20,p21]).then(function () {
                        resolve(reportModel);
                    }).catch(function (error) {
                        console.log(error);
                    });
                }).catch(function (error) {
                    console.log(error);
                });
            };

            var drugConceptIsARV = function (drugConceptUuid) {
                return arvConceptUuids.includes(drugConceptUuid);
            };

          
            var populateHospitalCourse = function () {
                return new Promise(function (resolve, reject) {
                    var hospitalCourseConceptName = 'Hospital Course';
                    observationsService.fetch(patientUuid, [hospitalCourseConceptName]).then(function (response) {
                        
                         if (response.data && response.data.length > 0) {
                            reportModel.hospitalCourse = response.data[0].value;
                         }
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };


            var populateHistoryAndExaminationNotes = function () {
                return new Promise(function (resolve, reject) {
                    var historyAndExaminationConceptName = 'History and Examination Notes';
                    observationsService.fetch(patientUuid, [historyAndExaminationConceptName]).then(function (response) {
                        if (response.data && response.data.length > 0) {
                            reportModel.historyAndExaminationCourse = response.data[0].value;
                        }
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };


            var populateDateOfOperation = function () {
                return new Promise(function (resolve, reject) {
                    var dateOdOperationConceptName = 'Date of Operation';
                    observationsService.fetch(patientUuid, [dateOdOperationConceptName]).then(function (response) {
                       
                        if (response.data && response.data.length > 0) {
                            reportModel.dateOfOperation = response.data[0].value;
                        }
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };

            var populateOperativeProcedure = function () {
                return new Promise(function (resolve, reject) {
                    var operativeProcedureConceptName = 'Operative Procedure';
                    observationsService.fetch(patientUuid, [operativeProcedureConceptName]).then(function (response) {
                       
                        if (response.data && response.data.length > 0) {
                            reportModel.operativeProcedure = response.data[0].value;
                        }
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };

            var populatefollowUpDate = function () {
                return new Promise(function (resolve, reject) {
                    var followUpDateConceptName = 'Follow up Date';
                    observationsService.fetch(patientUuid, [followUpDateConceptName]).then(function (response) {
                       
                        if (response.data && response.data.length > 0) {
                            reportModel.followUpdate = response.data[0].value;
                        }
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };

            var populatelabInvestigationNotes = function () {
                return new Promise(function (resolve, reject) {
                    var labInvestigationConceptName = 'Lab Investigation Notes';
                    observationsService.fetch(patientUuid, [labInvestigationConceptName]).then(function (response) {
                       
                        if (response.data && response.data.length > 0) {
                            reportModel.labInvestigationNotes = response.data[0].value;
                        }
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };


            var populateRadiologyNotes = function () {
                return new Promise(function (resolve, reject) {
                    var radiologyNotesConceptName = 'Radiology Notes';
                    observationsService.fetch(patientUuid, [radiologyNotesConceptName]).then(function (response) {
                       
                        if (response.data && response.data.length > 0) {
                            reportModel.radiologyNotes = response.data[0].value;
                        }
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };


            var populateOtherNotes = function () {
                return new Promise(function (resolve, reject) {
                    var otherNotesConceptName = 'Other Notes';
                    observationsService.fetch(patientUuid, [otherNotesConceptName]).then(function (response) {
                       
                        if (response.data && response.data.length > 0) {
                            reportModel.otherNotes = response.data[0].value;
                        }
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };
            
            var populateAdvice = function () {
                return new Promise(function (resolve, reject) {
                    var additionalAdviceConceptName = 'Additional Advice on Discharge';
                    observationsService.fetch(patientUuid, [additionalAdviceConceptName]).then(function (response) {
                       
                        if (response.data && response.data.length > 0) {
                            reportModel.additionalAdvice = response.data[0].value;
                        }
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };
        

            var populateFollowUpPlan = function () {
                return new Promise(function (resolve, reject) {
                    var followUpPlanConceptName = 'Discharge Summary, Plan for follow up';
                    observationsService.fetch(patientUuid, [followUpPlanConceptName]).then(function (response) {
                        if (response.data && response.data.length > 0) {
                            reportModel.followUpPlan = response.data[0].value;
                        }
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };

            var populateDrugOrders = function (visitUuid) {
                return new Promise(function (resolve, reject) {
                    treatmentService.getPrescribedDrugOrders(patientUuid, true).then(function (response) {
                        var currentVisitOrders = response.filter(function (order) {
                            return order.visit.uuid === visitUuid && !drugConceptIsARV(order.concept.uuid);
                        });
                        if (currentVisitOrders.length <= 0) {
                            count = count + 1;
                            populateLocationAndDrugOrders(count);
                        }
                        reportModel.orders = [];
                        currentVisitOrders.forEach(function (order) {
                           
                            var drug = order.drugNonCoded;
                            if (order.drug) {
                                drug = order.drug.name;
                            }
                            var instructions = '';
                            if (order.dosingInstructions.administrationInstructions) {
                                instructions = JSON.parse(order.dosingInstructions.administrationInstructions).instructions;
                                if (JSON.parse(order.dosingInstructions.administrationInstructions).additionalInstructions) {
                                    instructions += '. ' + JSON.parse(order.dosingInstructions.administrationInstructions).additionalInstructions;
                                }
                            }
                            var newOrder = {
                                drugName: drug,
                                dosage: order.dosingInstructions.dose,
                                drugUnit: order.dosingInstructions.doseUnits,
                                frequency: order.dosingInstructions.frequency,
                                duration: order.duration,
                                route: order.dosingInstructions.route,
                                durationUnit: order.durationUnits,
                                quantity: order.dosingInstructions.quantity,
                                startDate: moment(order.scheduledDate).format('DD/MM/YYYY'),
                                instructions: instructions
                            };
                            reportModel.orders.push(newOrder);
                        });
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };

            var populateLocationAndDrugOrders = function (lastVisit) {
                return new Promise(function (resolve, reject) {
                    patientVisitHistoryService.getVisitHistory(patientUuid, null).then(function (response) {
                        if (response.visits && response.visits.length > 0 && response.visits[lastVisit]) {
                            populateDrugOrders(response.visits[lastVisit].uuid);
                        }
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };

            var populateDignosis = function(){
                return new Promise(function(resolve,reject){
                    console.log("diagnose",$rootScope.diagnosisData);
                    var temp =  [];
                    temp = $rootScope.diagnosisData;
                    console.log("temp",temp);
                    for (var i=0;i<temp.length;i++)
                    {
                        var data1  = temp[i].codedAnswer.name;
                        var data2 = temp[i].order;
                        var data3 = temp[i].certainty;
                        var diagnosis = {
                            diaOrderName : data1,
                            diaCeratinityName : data2,
                            diagnosisName : data3
                                        }
                                        reportModel.trial.push(diagnosis);
                                       
                    }
                    resolve();   
                    console.log(trial);    
                }).catch(function (error) {
                    console.log(error);
                 });
            };

            var populatePatientLabResults = function () {
                return new Promise(function (resolve, reject) {
                   var arr = [];
                   arr = $rootScope.labResults.results;
                   console.log("arr",arr);
                   for(var i=0;i<arr.length;i++){
                       var lab1 = arr[i].panelName;
                       var lab2 = arr[i].testName;
                       var lab3 = arr[i].result;
                       var labResults = {
                        orderName : lab1,
                        testName : lab2,
                        testResult :lab3
                       }
                       reportModel.labRes.push(labResults);
                   }
                    resolve();
                }).catch(function (error) {
                    console.log(error);
                });
            };



            var populatePatientDemographics = function () {
                return new Promise(function (resolve, reject) {
                    patientService.getPatient(patientUuid).then(function (response) {
                        console.log("response",response);
                        var patientMapper = new Bahmni.PatientMapper($rootScope.patientConfig, $rootScope, $translate);
                        var patient = patientMapper.map(response.data);
                         reportModel.patientName =  patient.name;
                         reportModel.patientAge = patient.age;
                         if(patient.gender === "F")
                         {
                            reportModel.patientGender = "Female" ;
                         }
                         else{
                            reportModel.patientGender = "Male"
                         }
                         reportModel. patientAddress = patient.address.address1 +','+ patient.address.address2 +','+ patient.address.cityVillage;
                        if(patient.birthdateEstimated === true)
                        {
                            reportModel.patientAgeEst = "Estimated";
                        }
                        else
                        {
                            reportModel.patientAgeEst = " ";
                        }
                         reportModel.patientNID = patient.identifier;             
                         reportModel.patientBirthdate = patient.birthdate;
                        // reportModel.patientStatus= response.data.person.attributes[3].display;

                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };
            

        }]);
