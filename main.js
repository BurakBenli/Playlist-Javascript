const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playListButton = document.getElementById('playlist')


const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton= document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')


//sira
let index

//dongu
let loop = true

//sarki listesi
const songsList = [
    {
        name: "Simple Piano Melody",
        link: "assets/1.mp3",
        artist: "Good_B_Music",
        image: "assets/1.jpeg"
    },
    {
        name: "Let It Go",
        link: "assets/2.mp3",
        artist: "ItsWatR",
        image: "assets/2.jpeg"
    },
    {
        name: "Leonell Cassio",
        link: "assets/3.mp3",
        artist: "Leonell Cassio",
        image: "assets/3.jpeg"
    },
    {
        name: "The Blackest Bouquet",
        link: "assets/4.mp3",
        artist: "LeonellCassio",
        image: "assets/4.jpeg"
    },
    {
        name: "Please Calm My Mind",
        link: "assets/5.mp3",
        artist: "Lesfm",
        image: "assets/5.jpeg"
    }
]

//Sarkı Atama
const setSong = (arrayIndex) =>{
    let{name,link,artist,image} = songsList[arrayIndex]
        songName.innerHTML = name
        audio.src = link
        songArtist.innerHTML = artist
        songImage.src = image 
        
        audio.onloadeddata = () =>{
            maxDuration.innerText = timeFormatter(audio.duration)
        }
        
        playAudio()
        playListContainer.classList.add('hide')
        
}

//Oynatma Listesini Göster
playListButton.addEventListener('click',()=>{
    playListContainer.classList.remove('hide')
})

//Tekrara tıklandıgında
repeatButton.addEventListener('click',()=>{
    if(repeatButton.classList.contains('active')){
        repeatButton.classList.remove('active')
        audio.loop = true
        console.log('Tekrar Kapatıldı')
    }else{
        repeatButton.classList.add('active')
        audio.loop = false
        console.log('Tekrar Acildi')
    }
})

//İlerleme cubuguna tiklandiginda
progressBar.addEventListener('click',(event)=>{
    let coordStart = progressBar.getBoundingClientRect().left
    console.log(coordStart)

    let coordEnd = event.clientX
    console.log(coordEnd)

    console.log(progressBar.offsetWidth)
    let progress = (coordEnd-coordStart) / progressBar.offsetWidth

    currentProgress.style.width = progress * 100 + '%'
    audio.currentTime = progress * audio.duration
    audio.play()

})

//Zaman tutucu
setInterval(()=>{
    currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3)) * 100 + '%' 
},1000);


//Karıstırıcı Acıldıgında
shuffleButton.addEventListener('click',()=>{
    if(shuffleButton.classList.contains('active')){
        shuffleButton.classList.remove('active')
        loop = false
        console.log('Karıstırma Kapalı')
    }else{
        shuffleButton.classList.add('active')
        loop = true
        console.log('Karistirma Acik')
    }
})

//Sarkıyı oynatır
const playAudio = () =>{
    audio.play()
    playButton.classList.add('hide')
    pauseButton.classList.remove('hide')
}

//Sarkıyı durdurur
const pauseAudio =() =>{
    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
}

const nextSong =() =>{
    if(loop){
        if(index == (songsList.length-1)){
            index = 0
        }else{
            index += index
        }
        setSong(index)
    }else{
        let randIndex = Math.floor(Math.random() * songsList.length)
        setSong(randIndex)
    }
}

const previousSong =() =>{
    pauseAudio()
    if(index > 0){  
        index -= index
    }else{
        index = songsList.length - 1
    }
    setSong(index)
}

//Sarkı bittiginde 
audio.onended =() =>{
    nextSong()
}

//Zaman düzenlemesi
const timeFormatter=(timeInput) =>{
    let minute = Math.floor(timeInput / 60 )
    minute = minute < 10 ? '0' + minute : minute
    let second = Math.floor(timeInput % 60) 
    second = second < 10 ? '0' + second : second
    return `${minute}:${second}`
}

//sarkı suresı degıstıkce
audio.addEventListener('timeupdate',()=>{
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})

//Sarkı Listesini Olustur
const initPlayList = () =>{
    for (const song in songsList) {
        playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${song})">
        <div class="playlist-image-container">
            <img src="${songsList[song].image}"/>
        </div>    
        <div class="playlist-song-details">
            <span id="playlist-song-name">
                ${songsList[song].name}
            </span>
            <span id="playlist-song-artist">
                ${songsList[song].artist}
            </span>
        </div>
        `
    }
}

//Oynata tıklandıgında
playButton.addEventListener('click',playAudio)

//Dura tıklanılkdıgında
pauseButton.addEventListener('click',pauseAudio)

//Sonraki sarkıya gec
nextButton.addEventListener('click',nextSong)

//Öncekı sarkıya gec
prevButton.addEventListener('click',previousSong)

window.onload = () =>{
    index = 0
    setSong(index)
    pauseAudio()
    initPlayList()
}