const {createServer} = require("http");
const {Server} = require("socket.io");

const httpServer= createServer();
const io = new Server(httpServer, {
    cors: "http://localhost:5147/",
})

const allUsers = {};
const allRooms = [];

io.on("connection", (socket) => {
    // console.log(socket);
    allUsers[socket.id] = {
        socket: socket,
        online: true
    }
    console.log(allUsers);
    socket.on("request_to_play", (data) => {
        const currentUser = allUsers[socket.id];
        currentUser.playerName = data.playerName;

        let opponentPlayer;

        for(const key in allUsers){
            const user = allUsers[key];
            if(user.online && socket.id !== key){
                opponentPlayer = user;
                break;
            }
        }

        console.log(opponentPlayer);
        if(opponentPlayer){
            allRooms.push({
                player1: opponentPlayer,
                player2: currentUser,
            })
            console.log(opponentPlayer);
            console.log(currentUser.playerName);
    
            currentUser.socket.emit("opponentFound", {
                opponentName: opponentPlayer.playerName,
                playingAs:"circle",
            });
    
            opponentPlayer.socket.emit("opponentFound", {
                opponentName: currentUser.playerName,
                playingAs: "cross",
            })

            currentUser.socket.on("playerMoveFromClient", (data)=> {
                opponentPlayer.socket.emit("playerMoveFromServer", {
                    ...data,
                });
            });

            opponentPlayer.socket.on("playerMoveFromClient", (data)=>{
                currentUser.socket.emit("playerMoveFromServer", {
                    ...data
                })
            })
        } else {
            currentUser.socket.emit("opponentNotFound");
        }
    });
    
    socket.on("disconnect", function () {
        const currentUser = allUsers[socket.id];
        currentUser.online = false;

        for(let index=0; index < allRooms.length; index++){
            const {player1, player2} = allRooms[index];

            if(player1.socket.id === socket.id){
                player2.socket.emit("opponentLeftMatch");
                break;
            }
            if(player2.socket.id === socket.id){
                player1.socket.emit("opponentLeftMatch");
                break;
            }
        }
    })
})

httpServer.listen(3000, ()=>{
    console.log(`Server is running on 3000`)
});