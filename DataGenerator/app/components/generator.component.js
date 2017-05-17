"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GeneratorComponent = (function () {
    function GeneratorComponent() {
        this.finalObject = [];
        this.jsonToShow = "";
        this.trial_object = [
            {
                Properties: {
                    "Name": "Maria",
                    "Surname": "Khmelnitskaya",
                    "Email": "email1@gmail.com"
                }
            },
            {
                Properties: {
                    "Name": "Inna",
                    "Surname": "Khmelnitskaya",
                    "Email": "email2@gmail.com"
                }
            },
            {
                Properties: {
                    "Name": "Kate",
                    "Surname": "Tsurikova",
                    "Email": "email3@gmail.com"
                }
            }
        ];
        this.emptyTitleMessage = "There are empty Title fields";
        this.repeatingTypeMessage = "Fields Name, Surname, Age and Gender can only be chosen once ";
        this.repeatingTitleMessage = "Fields Titles shall not be repeated ";
        this.showMessages = false;
        this.index = 1;
        this.rowsNumber = 100;
        //информация о первой строке 
        this.dataTitles = [""];
        this.dataTypes = ["Name"];
        this.dataRules = ["None"];
        this.rowsIndexesArray = [0];
        //пустой массив строк
        this.rowsArray = [];
        this.types = ["Name", "Surname", "Email", "Phone", "Age", "Gender"];
        this.dataUnit = {
            type: "",
            title: "",
            rule: ""
        };
        this.User = {
            DataUnits: [],
            NumberOfRows: 0
        };
        this.data = [];
        this.templateRow = {
            showRule: false,
            showRules: function (type) {
                switch (type) {
                    case "Gender": {
                        this.rules = ["Male", "Female", "Any"];
                        this.showRule = true;
                        break;
                    }
                    case "Age": {
                        this.rules = ["<21", "21-65", ">65", "Any"];
                        this.showRule = true;
                        break;
                    }
                    case "Phone": {
                        this.rules = ["Landline", "Mobile"];
                        this.showRule = true;
                        break;
                    }
                    default: this.rule = false;
                }
            }
        };
        //функция делает копию объекта
        function makeClone(obj) {
            var clone = {};
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    if ("object" === typeof obj[prop])
                        clone[prop] = makeClone(obj[prop]);
                    else
                        clone[prop] = obj[prop];
                }
            }
            return clone;
        }
        //добавляем в массив первый объект
        this.rowsArray.push(makeClone(this.templateRow));
    } //constructor end
    GeneratorComponent.prototype.doPreview = function () {
        this.showMessages = false;
        this.data.splice(0, this.data.length); //обнуляем итоговый масив (если Previw уже нажимали)          
        if (this.passValidation() == false)
            this.showMessages = true;
        else {
            var tmp = this.createJSON();
            var info = this.index;
            var objectPrefinal;
            objectPrefinal = [];
            var mas;
            mas = [];
            var js = "";
            $.ajax({
                url: '/api/values/',
                type: 'POST',
                async: false,
                data: tmp,
                contentType: "application/json;charset=utf-8",
                success: function (serverData) {
                    console.log("works!");
                    var arr;
                    arr = [];
                    for (var x = 0; x < serverData.length; x++)
                        arr[x] = serverData[x].Properties;
                    for (var i = 0; i < arr.length; i++) {
                        for (var j = 0; j < info; j++) {
                            var a_1 = Object.getOwnPropertyNames(arr[i])[j];
                            //console.log(arr[i][a]);
                            mas[j] = arr[i][a_1];
                            console.log("J:" + j + " i:" + i + ' ' + mas[j]);
                        }
                        objectPrefinal[i] = mas;
                        console.log(objectPrefinal[i]);
                    }
                    this.clicked = true;
                    js = JSON.stringify(arr);
                    //console.log("finalObject:   "+this.finalObject);
                    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(arr));
                    //console.log(arr);
                    var a = document.createElement('a');
                    a.href = 'data:' + data;
                    a.download = 'data.json';
                    a.innerHTML = 'download JSON';
                    a.id = 'A';
                    var container = document.getElementById('container');
                    container.appendChild(a);
                },
            });
            //this.Download(tmp);
            this.show('block');
            this.jsonToShow = js;
            console.log("prefinal object" + objectPrefinal);
            this.finalObject = objectPrefinal;
            console.log("final object " + this.finalObject);
        }
    };
    GeneratorComponent.prototype.passValidation = function () {
        var flag = true;
        if (this.checkEmptyTitles() == true)
            flag = false;
        ; //проверка на отсутствие пустых полей
        if (this.checkRepeatingTypes() == true)
            flag = false;
        ; //name,surname,age,gender only mentioned once
        if (this.checkRepeatingTitles() == true)
            flag = false; //no same titles
        return flag;
    };
    GeneratorComponent.prototype.checkEmptyTitles = function () {
        var flag = false;
        for (var x = 0; x < this.index; x++) {
            if (this.checkIfEmpty(this.dataTitles[x]) == true)
                flag = true;
        }
        return flag;
    };
    GeneratorComponent.prototype.checkRepeatingTypes = function () {
        var flag = false;
        var typesNumber = [0, 0, 0, 0]; //1- name, 2-surname, 3-age, 4-gender
        for (var x = 0; x < this.index; x++) {
            switch (this.dataTypes[x]) {
                case "Name": {
                    typesNumber[0]++;
                    break;
                }
                case "Surname": {
                    typesNumber[1]++;
                    break;
                }
                case "Age": {
                    typesNumber[2]++;
                    break;
                }
                case "Gender": {
                    typesNumber[3]++;
                    break;
                }
                default: break;
            }
        }
        for (var x = 0; x < 3; x++)
            if (typesNumber[x] > 1)
                flag = true;
        ;
        return flag;
    };
    GeneratorComponent.prototype.checkRepeatingTitles = function () {
        var flag = false;
        var tmpArray = [""];
        for (var i = 0; i < this.index; i++)
            tmpArray[i] = this.dataTitles[i];
        for (var i = 0; i < this.index; i++)
            for (var j = this.index - 1; j > i; j--) {
                if (tmpArray[j - 1] < tmpArray[j]) {
                    var tmp = tmpArray[j - 1];
                    tmpArray[j - 1] = tmpArray[j];
                    tmpArray[j] = tmp;
                }
            }
        for (var i = 0; i < this.index; i++)
            if (tmpArray[i] == tmpArray[i + 1])
                flag = true;
        return flag;
    };
    GeneratorComponent.prototype.createJSON = function () {
        for (var x = 0; x < this.index; x++) {
            this.data.push(this.makeDataClone(this.dataUnit)); //добавляем столько dataUnit в массив, 
            //сколько заполнено строк
        }
        for (var x = 0; x < this.index; x++) {
            Object.defineProperty(this.data[x], "title", {
                value: this.dataTitles[x],
                writable: true,
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(this.data[x], "type", {
                value: this.dataTypes[x],
                writable: true,
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(this.data[x], "rule", {
                value: this.dataRules[x],
                writable: true,
                enumerable: true,
                configurable: true
            });
        }
        Object.defineProperty(this.User, "DataUnits", {
            value: this.data,
            writable: true,
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(this.User, "NumberOfRows", {
            value: this.rowsNumber,
            writable: true,
            enumerable: true,
            configurable: true
        });
        var finalData = JSON.stringify(this.User); //преобразуем data в JSON
        console.log(this.User);
        console.log(finalData);
        return finalData;
    };
    //Download(tmp: string) {
    //    var data = "text/json;charset=utf-8," + encodeURIComponent(tmp);
    //    var a = document.createElement('a');
    //    a.href = 'data:' + data;
    //    a.download = 'data.json';
    //    a.innerHTML = 'download JSON';
    //    a.id = 'A';
    //    var container = document.getElementById('container');
    //    container.appendChild(a);
    //}
    GeneratorComponent.prototype.ClearDownload = function () {
        var x = document.getElementById('A');
        x.parentNode.removeChild(x);
    };
    GeneratorComponent.prototype.addRow = function () {
        this.rowsArray.push(this.makeRowClone(this.templateRow));
        this.dataRules[this.index] = "None";
        this.dataTitles[this.index] = "";
        this.dataTypes[this.index] = "Name";
        this.rowsIndexesArray.push(this.index);
        this.index++;
        this.isAdded = true;
    };
    GeneratorComponent.prototype.deleteRow = function () {
        this.rowsIndexesArray.splice(this.index - 1, 1);
        this.rowsArray.splice(this.index - 1, 1);
        this.dataRules.splice(this.index - 1, 1);
        this.dataTitles.splice(this.index - 1, 1);
        this.dataTypes.splice(this.index - 1, 1);
        this.index--;
    };
    GeneratorComponent.prototype.showAddButton = function (ind) {
        if (ind == this.index - 1)
            return true;
        else
            return false;
    };
    GeneratorComponent.prototype.showDeleteButton = function (ind) {
        if (ind == this.index - 1 && ind != 0)
            return true;
        else
            return false;
    };
    GeneratorComponent.prototype.setDataType = function (type, ind) {
        this.dataTypes[ind] = type;
        switch (type) {
            case "Gender": {
                this.dataRules[ind] = "Male";
                break;
            }
            case "Age": {
                this.dataRules[ind] = "<21";
                break;
            }
            case "Phone": {
                this.dataRules[ind] = "Landline";
                break;
            }
            default: break;
        }
    };
    GeneratorComponent.prototype.setDataTitle = function (title, ind) {
        this.dataTitles[ind] = title;
    };
    GeneratorComponent.prototype.setDataRule = function (rule, ind) {
        this.dataRules[ind] = rule;
    };
    GeneratorComponent.prototype.checkIfEmpty = function (field) {
        if (field == "")
            return true;
        else if (field.match(" ") != null)
            if (field.match(/ /g).length == field.length)
                return true;
            else
                return false;
    };
    GeneratorComponent.prototype.setRowsNumber = function (num) {
        this.rowsNumber = num;
    };
    GeneratorComponent.prototype.makeDataClone = function (obj) {
        var clone = {};
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if ("object" === typeof obj[prop])
                    clone[prop] = this.makeDataClone(obj[prop]);
                else
                    clone[prop] = obj[prop];
            }
        }
        return clone;
    };
    GeneratorComponent.prototype.makeRowClone = function (obj) {
        var clone = {};
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if ("object" === typeof obj[prop])
                    clone[prop] = this.makeRowClone(obj[prop]);
                else
                    clone[prop] = obj[prop];
            }
        }
        return clone;
    };
    GeneratorComponent.prototype.show = function (state) {
        document.getElementById('window').style.display = state;
        document.getElementById('wrap').style.display = state;
        if (state == 'none')
            this.ClearDownload();
    };
    GeneratorComponent.prototype.checkCondition = function () {
        if (document.getElementById('window').style.display != 'none')
            return "let y of parse(trial_object,x)";
        else
            return "let y of rowsIndexesArray)";
    };
    GeneratorComponent.prototype.parse = function (list, ind, i) {
        var arr = [];
        if (ind >= list.length)
            return "not given";
        for (var i_1 in list[ind].hasOwnProperty)
            if (list[ind].hasOwnProperty.hasOwnProperty(i_1)) {
                arr.push(list[ind].hasOwnProperty[i_1]);
            }
        return arr[i];
    };
    GeneratorComponent.prototype.getSizeArray = function () {
        var size = this.finalObject.length;
        var arr = [0];
        for (var i = 0; i < size; i++)
            arr[i] = i;
        return arr;
    };
    return GeneratorComponent;
}());
GeneratorComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'generator',
        templateUrl: "generator.component.html",
    }),
    __metadata("design:paramtypes", [])
], GeneratorComponent);
exports.GeneratorComponent = GeneratorComponent;
//# sourceMappingURL=generator.component.js.map