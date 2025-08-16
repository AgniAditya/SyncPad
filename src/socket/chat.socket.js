function handleChatEvents (socket,io) {
    socket.on('chat-message',(data) => {
        console.log(`Chat message is: ${data.message}`)
        io.emit('chat-message-response', data)
    })
}

export {
    handleChatEvents
}