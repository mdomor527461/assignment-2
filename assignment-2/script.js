fetch("https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=Cristiano")
.then(res => res.json())
.then(data => defaultDisplay(data));

let modal = document.getElementById("modal");
let close = document.getElementById("close");
modal.style.display = "none"
// default diplay 
const defaultDisplay = (players)=>{
    const container = document.getElementById("display-container");
    container.innerHTML = ``;
    console.log(players);
  
    for(element of players.player){
        console.log(element);
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
        <img src="${element.strThumb}" alt"player-profile">
        <p>id : ${element.idPlayer} <p>
        <h3>Player Name : ${element.strPlayer}</h3>
        <h6>Country : ${element.strNationality}</h6>
        <h5>Gender : ${element.strGender}</h5>
        <h6>Sport : ${element.strSport}</h6>
        <h6> Follow On : <a href="${element.strInstagram}"><i class="fa-brands fa-square-instagram icon"></i></a></h6>
        <div class="button-container d-flex justify-content-ceter align-items-center">
            <button onclick ="showDetails('${element.idPlayer}')" class ="p-3 bg-primary text-light m-2" >Details</button>
            <button onclick = "addPlayer('${element.strThumb}','${element.idPlayer}','${element.strPlayer}','${element.strNationality}','${element.strGender}','${element.strSport}','${element.strInstagram}')" class ="p-3 bg-primary text-light" id = ${element.idPlayer}>Add Player</button>
        </div>
        `;
        container.appendChild(div);
    }
}
document.getElementById("search-btn").addEventListener("click",(event)=>{
    const userInput = document.getElementById("user-input").value;
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${userInput}`)
    .then(res => res.json())
    .then(data => searchDisplay(data))
})

// show searched player
const searchDisplay = (players)=>{
    const container = document.getElementById("display-container");
    console.log(players)
    container.innerHTML = ``;
    if(players.player == null){
        container.innerHTML =`
        <h1 class = "text-danger text-center">Sorry Player Not Found</h1>
        `;
    }
    for(element of players.player){
        // console.log(element);
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
        <img src="${element.strThumb}" = "player-profile">
        <p>id : ${element.idPlayer} <p>
        <h3>Player Name : ${element.strPlayer}</h3>
        <h6>Country : ${element.strNationality}</h6>
        <h5>Gender : ${element.strGender}</h5>
        <h6>Sport : ${element.strSport}</h6>
        <h6> Follow On : <a href="${element.strInstagram}"><i class="fa-brands fa-square-instagram icon"></i></a></h6>
        <div class="button-container d-flex justify-content-ceter align-items-center">
            <button  onclick ="showDetails('${element.idPlayer}')" class ="p-3 bg-primary text-light m-2" >Details</button>
            <button onclick = "addPlayer('${element.strThumb}','${element.idPlayer}','${element.strPlayer}','${element.strNationality}','${element.strGender}','${element.strSport}','${element.strInstagram}')"  class =" p-3 bg-primary text-light" id = "${element.idPlayer}">Add Player</button>
        </div>
        `;
        container.appendChild(div);
    }
}
// add player 

const addPlayer = (img,id,name,nationality,gender,sport,insta)=>{
    let totalPlayer = parseInt(document.getElementById('total-player').innerText)
    
    if(totalPlayer >=11){
        console.log("11 player selected Successfully");
        // modal.style.display = "block";
        // close.addEventListener("click",(event)=>{
            //     modal.style.display = "none"
            // })
            alert("Player limit Excedded");
            return;
    }
    totalPlayer += 1;
   //check the isplayer in team?
    for(let i=0;i<ids.length;i++){
        if(id == ids[i]){
            alert("this player is already added");
            return;
        }
    }
    //total player increment
    
    // inner text 
    let button = document.getElementById(id);  
    button.innerText = "Already Added"
    button.style.backgroundClip = "red";
    
        document.getElementById("total-player").innerText = totalPlayer;
        
        //male or female player increment
        let malePlayer = parseInt(document.getElementById('male-player').innerText)
        let femalePlayer = parseInt(document.getElementById('female-player').innerText)
        if (gender == "Male"){
            malePlayer+=1;
            document.getElementById("male-player").innerText = malePlayer;
        }
        else{
            femalePlayer +=1;
            document.getElementById("female-player").innerText = femalePlayer;
        }
        const container = document.getElementById("my-container");
        // container.innerHTML = ``;
        
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
        <img src="${img}" alt"player-profile">
        <p>id : ${id} <p>
        <h3>Player Name : ${name}</h3>
        <h6>Country : ${nationality}</h6>
        <h5>Gender : ${gender}</h5>
        <h6>Sport : ${sport}</h6>
        <h6> Follow On : <a href="${insta}"><i class="fa-brands fa-square-instagram icon"></i></a></h6>
        `;
        container.appendChild(div);
        ids.push(id);
    
}
let ids = [];
const showDetails = (id)=>{
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
    .then(res => res.json())
    .then (data => modalDisplay(data))
    // console.log(element);
    

    
}
const modalDisplay = (element)=>{
    // show details in modal
    console.log(element);
    console.log(element.players);
    

    const container = document.getElementById("modal");
    container.innerHTML = ``;
   
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <img src="${element.players[0].strThumb}" alt = "player-profile">
    <p>id : ${element.players[0].idPlayer} <p>
    <h3>Player Name : ${element.players[0].strPlayer}</h3>
    <h6>Country : ${element.players[0].strNationality}</h6>
    <h5>Gender : ${element.players[0].strGender}</h5>
    <h6>Sport : ${element.players[0].strSport}</h6>
    <h6>Team : ${element.players[0].strTeam}</h6>
    <h6>Status : ${element.players[0].strStatus}</h6>
    <h6> Follow On : <a href="${element.players.strInstagram}"><i class="fa-brands fa-square-instagram icon"></i></a></h6>
    <h6> Join  : <a href="${element.players.strFacebook}"><i class="fa-brands fa-square-facebook  icon1";"></i></a></h6>
    <button id = "exit">Exit</button>
    `;
    container.appendChild(div);
    container.style.display = "block";
    exitButton = document.getElementById("exit").addEventListener("click",(event)=>{
        container.style.display = "none";
    })
}
