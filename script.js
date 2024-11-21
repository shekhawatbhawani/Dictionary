let btn = document.querySelector("button");
let outputContainer = document.querySelector(".output");
let raj = document.querySelector(".new-container")
btn.addEventListener("click", () => {
  let input = document.querySelector("input").value;
  let api = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  let API = api + input;
  fetch(API)
    .then((response) => response.json())
    .then((data) => {
      outputContainer.innerHTML = "";
      if (data.title == "No Definitions Found") {
        raj.style.display = "none"
        let notFound = document.createElement("div")
        notFound.textContent = "Word Not Found"
        document.body.append(notFound)
        console.log("data not found");
      } else {
        console.log(data);
        let word = data[0].word;
        //console.log(word);
        let audio = data[0].phonetics;
        console.log(audio);
        const myAudioSrc = audio.find((element)=> element.audio != '').audio;
        //console.log(myAudioSrc.audio);
        
        let definitions = data[0].meanings[0].definitions[0].definition;
        //console.log(definitions);
        let example = data[0].meanings[1].definitions[0].definition;
        console.log(example);

        let partOfSpeech = data[0].meanings[0].partOfSpeech
        console.log(partOfSpeech);
        

        let r = document.createElement("div");
        r.classList.add("new-container")
        r.innerHTML = "";

        r.innerHTML = `<div class="output" id="output"> 
          <div class="word-logo">
            <div class="word">
              <h1>${word}</h1>
              <p>${partOfSpeech} // / ${word} / //</p>
            </div>
            <div class="logo">
              <i id="playAudio" class="fa-solid fa-volume-high"></i>
            </div>
          </div>
          <div class="meaning">
            <p>${definitions}</p>
            <p>Example - ${example}</p>
          </div>      
         </div>`;
         outputContainer.append(r);
         document.getElementById("playAudio").addEventListener("click",()=>{
           if(myAudioSrc){
             let myAudio = new Audio(myAudioSrc);
             myAudio.play()
           }
         })
      }

    });
});
