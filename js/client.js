const socket = io('http://localhost:8000')

const form = document.querySelector('#send-container');
const input = document.querySelector('#input');
const  messbox = document.querySelector('.container');
const btn =document.querySelector('.btn')

const audio = new Audio('sound.mp3')

const append =(message,position)=>{
    const newinput = document.createElement('div');
    newinput.innerText = message;
    newinput.classList.add('message');
    newinput.classList.add(position);
    messbox.append(newinput)
    if(position == 'left'){
        audio.play();
   }
}

function scrollDown() {
    document.querySelector('.container').scrollTop =  document.querySelector('.container').scrollHeight
   }

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = input.value;
    append(`You: ${message}`,'right'); 
    socket.emit('send' ,message);
    input.value = ''
    scrollDown()
})

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
 append(`${name} joined the chat`, 'right')
})

socket.on('recived', data =>{
    append(`${data.name}: ${data.message}` ,'left')
   })

socket.on('left', name =>{
    append(`${name} left the chat` ,'left')
   })


