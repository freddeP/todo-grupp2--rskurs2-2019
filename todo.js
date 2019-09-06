// Deklarera en variabel utan värde
let data;

// om det finns något i local storage så läs in och parsa
if(localStorage.getItem("todoGrupp2"))
{
    data = JSON.parse(localStorage.getItem("todoGrupp2")); 
}
else{
    // Om det inte finns något så skapa en tom array.
    data = [];
}

// Anropa funktionen som renderar våra händelser
renderData();

function renderData(){

    // skapa html
    let html = data.map(function(element,index){
        //map returnerar så vi returnerar en template-string med html och data
        return `
            <div>
                <h2>${element.task}</h2>
                <button onclick="deleteData(${index})"> delete </button>
                <button onclick="toggleComplete(${index})"> completed: ${element.ready} </button>
            </div>
        `;
    });
    // Skriv ut html på skärmen med en radbrytning som delare ( join("<hr>") )
    document.getElementById("taskList").innerHTML = html.join("<hr>");
}

// Lyssna efter att formuläret med id = taskForm har blivit skickat
document.getElementById("taskForm").addEventListener("submit",addData);

function addData(event){
    // förhindra att formuläret skickas så att vi kan jobba med innehållet i formuläret
    event.preventDefault();
 
    // Hämta texten som användaren skriver in
    let task = document.getElementById("taskId").value;
 
    // skapa nytt task-objekt som vi kan lägga i vår data
    let newTaskObject = {};
    newTaskObject.task = task;
    newTaskObject.ready = false;
    newTaskObject.id = Date.now();

    // spara i vår array som heter data
    data.push(newTaskObject);
    // eftersom datan är ändrad måste vi rendera den på skärmen igen.
    renderData();
    // spara till localStorage ( obs egen funktion längst ned i koden)
    saveLocal();
    // nollställ input-element och låt markören hamna i input-elementet
    document.getElementById("taskId").value = "";
    document.getElementById("taskId").focus();

}


function deleteData(index){

    //ta bort ett element på plats index som skickas med från vår utskrift
   data.splice(index,1);
   renderData();
   saveLocal();

}

function toggleComplete(index){

    // sätt ready-värdet till sin motsats.
    data[index].ready = !data[index].ready;
    renderData();
    saveLocal();
}

function saveLocal(){

    localStorage.setItem("todoGrupp2",JSON.stringify(data));

}