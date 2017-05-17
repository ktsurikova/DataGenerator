import { Component } from '@angular/core';
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'generator',
    templateUrl: `generator.component.html`,

})

export class GeneratorComponent {
    //Финальные объекты
    data: {}[];  //объект, который будет преобразован в JSON
    dataUnit: {}; //информация об одной колонке таблицы, добавляется в data
    User: {};
    //Значения из этих 3 массивов заносятся в dataUnit[i]
    dataTitles: string[]; //массив названий полей
    dataTypes: string[];//массив типов полей
    dataRules: string[];// массив правил
    //Поля, с которыми взаимодействует пользователь
    templateRow: {}; //шаблон строки
    rowsArray: {}[]; //массив строк
    rowsIndexesArray: number[]; //массив индексов строк
    //
    types: string[]; //список из 6 типов полей (имя, фамилия...)
    rules: string[]; //массив правил (зависит от типа)
    showRule: boolean; //Показывать правила (зависит от типа)
    index: number;//количество выводимых на странице строк
    //
    rowsNumber: number; //количество строк в итоговом файле
    isAdded: boolean;
    // validation error messages
    emptyTitleMessage: string;
    repeatingTypeMessage: string;
    repeatingTitleMessage: string;
    //
    showMessages: boolean; //enable error messages block
    //
    trial_object: {}[];
    finalObject: {}[];
    clicked: boolean;
    jsonToShow: string;
    constructor() {
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
        ]

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
        }

        this.User = {
            DataUnits: [],
            NumberOfRows: 0
        }

        this.data = [];

        this.templateRow = {
            showRule: false,
            showRules(type: string) {
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
        }

        //функция делает копию объекта
        function makeClone(obj: any) {
            let clone = {};
            for (let prop in obj) {
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
    }  //constructor end

    doPreview() { //валидация, ajax-запрос
        this.showMessages = false;
        this.data.splice(0, this.data.length);  //обнуляем итоговый масив (если Previw уже нажимали)          
        if (this.passValidation() == false) this.showMessages = true;
        else {
            let tmp = this.createJSON();
            var info = this.index;
            var objectPrefinal: any; objectPrefinal = [];
            var mas: any; mas = [];
            var js = "";
            $.ajax({
                url: '/api/values/',
                type: 'POST',
                async: false,
                data: tmp,
                contentType: "application/json;charset=utf-8",
                success: function (serverData: any) {
                    console.log("works!");
                    let arr: any;
                    arr = [];
                    for (let x = 0; x < serverData.length; x++) arr[x] = serverData[x].Properties;

                    for (let i = 0; i < arr.length; i++) {
                        for (let j = 0; j < info; j++) {
                            let a = Object.getOwnPropertyNames(arr[i])[j];
                            //console.log(arr[i][a]);
                            mas[j] = arr[i][a];
                            console.log("J:"+j+" i:"+i+' '+mas[j]);
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
           console.log("prefinal object"+objectPrefinal);
            this.finalObject = objectPrefinal;
            console.log("final object "+this.finalObject);
        }
    }


    passValidation() {  //валидация формы
        let flag = true;
        if (this.checkEmptyTitles() == true) flag = false;; //проверка на отсутствие пустых полей
        if (this.checkRepeatingTypes() == true) flag = false;; //name,surname,age,gender only mentioned once
        if (this.checkRepeatingTitles() == true) flag = false;//no same titles
        return flag;
    }

    checkEmptyTitles() {
        let flag = false;
        for (let x = 0; x < this.index; x++) {
            if (this.checkIfEmpty(this.dataTitles[x]) == true) flag = true;
        }
        return flag;
    }

    checkRepeatingTypes() {
        let flag = false;
        let typesNumber = [0, 0, 0, 0]; //1- name, 2-surname, 3-age, 4-gender
        for (let x = 0; x < this.index; x++) {
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

        for (let x = 0; x < 3; x++)
            if (typesNumber[x] > 1) flag = true;;

        return flag;
    }

    checkRepeatingTitles() {
        let flag = false;
        let tmpArray = [""];
        for (let i = 0; i < this.index; i++) tmpArray[i] = this.dataTitles[i];

        for (let i = 0; i < this.index; i++)
            for (let j = this.index - 1; j > i; j--) {
                if (tmpArray[j - 1] < tmpArray[j]) {
                    let tmp = tmpArray[j - 1];
                    tmpArray[j - 1] = tmpArray[j];
                    tmpArray[j] = tmp;
                }

            }

        for (let i = 0; i < this.index; i++)
            if (tmpArray[i] == tmpArray[i + 1]) flag = true;
        return flag;
    }


    createJSON() {  //генерирует JSON; 

        for (let x = 0; x < this.index; x++) {
            this.data.push(this.makeDataClone(this.dataUnit));  //добавляем столько dataUnit в массив, 
            //сколько заполнено строк
        }
        for (let x = 0; x < this.index; x++) {  //заносим данные о полях в итоговый массив
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

        let finalData = JSON.stringify(this.User); //преобразуем data в JSON
        console.log(this.User)
        console.log(finalData);
        return finalData;
    }

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

    ClearDownload() {
        var x = document.getElementById('A');
        x.parentNode.removeChild(x);

    }

    addRow() //добавить строку; вызывается при нажатии "Add Row"
    {
        this.rowsArray.push(this.makeRowClone(this.templateRow));
        this.dataRules[this.index] = "None";
        this.dataTitles[this.index] = "";
        this.dataTypes[this.index] = "Name";
        this.rowsIndexesArray.push(this.index);
        this.index++;
        this.isAdded = true;
    }

    deleteRow() { //удалить последнюю строку; вызывается при нажатии "Delete Row"
        this.rowsIndexesArray.splice(this.index - 1, 1);
        this.rowsArray.splice(this.index - 1, 1);
        this.dataRules.splice(this.index - 1, 1);
        this.dataTitles.splice(this.index - 1, 1);
        this.dataTypes.splice(this.index - 1, 1);
        this.index--;
    }
    showAddButton(ind: number) { //вызывается при нажатии "+", возвращает true, если строка последняя
        if (ind == this.index - 1)
            return true;
        else return false;
    }

    showDeleteButton(ind: number) { //вызывается при нажатии "x", возвращает true, если строка последняя
        if (ind == this.index - 1 && ind != 0)
            return true;
        else return false;
    }

    setDataType(type: string, ind: number) {  //вызывается при изменении типа поля, сохраняет правило поля
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


    }


    setDataTitle(title: string, ind: number) {  //вызывается при изменении названия поля, сохраняет название
        this.dataTitles[ind] = title;
    }
    setDataRule(rule: string, ind: number) { //вызывается изменении правила поля, сохраняет правило
        this.dataRules[ind] = rule;
    }


    checkIfEmpty(field: string) {
        if (field == "") return true;
        else
            if (field.match(" ") != null)
                if (field.match(/ /g).length == field.length) return true;
                else return false;
    }

    setRowsNumber(num: number) {
        this.rowsNumber = num;
    }

    makeDataClone(obj: any) {
        let clone = {

        };
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if ("object" === typeof obj[prop])
                    clone[prop] = this.makeDataClone(obj[prop]);
                else
                    clone[prop] = obj[prop];
            }
        }
        return clone;
    }

    makeRowClone(obj: any) {  //создает копию шаблона строки
        let clone = {};
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if ("object" === typeof obj[prop])
                    clone[prop] = this.makeRowClone(obj[prop]);
                else
                    clone[prop] = obj[prop];
            }
        }
        return clone;
    }

    show(state: string) {

        document.getElementById('window').style.display = state;
        document.getElementById('wrap').style.display = state;
        if (state == 'none') this.ClearDownload();

    }

    checkCondition() {
        if (document.getElementById('window').style.display != 'none') return "let y of parse(trial_object,x)";
        else return "let y of rowsIndexesArray)";
    }

    parse(list: {}[], ind: number, i: number) {
        let arr = [];
        if (ind >= list.length) return "not given";
        for (let i in list[ind].hasOwnProperty)
            if (list[ind].hasOwnProperty.hasOwnProperty(i)) {
                arr.push(list[ind].hasOwnProperty[i]);
            }
        return arr[i];
    }

    getSizeArray() {
        let size = this.finalObject.length;
        let arr = [0];
        for (let i = 0; i < size; i++) arr[i] = i;
        return arr;
    }

}




