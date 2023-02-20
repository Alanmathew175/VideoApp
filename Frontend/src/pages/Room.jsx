import React, { useCallback, useEffect } from 'react'
import { useSocket } from '../providers/Socket'
import { usePeer } from '../providers/peer'

const RoomPage = () => {
  const {socket} = useSocket()
  const {peer,createOffer,creatAnswer}=usePeer()
  const handleNewUserJoined= useCallback( async(data)=>{
     const {emailId} = data
     console.log('new user'+ emailId);
     const offer = await createOffer()
     socket.emit('call-user',{emailId,offer})
  },[createOffer,socket])

  const handleIncommingCall = useCallback(async(data)=>{
    const {from ,offer }=data
    console.log(from + offer);
    const ans = await creatAnswer(offer)
  },[])
  useEffect(()=>{
      socket.on('user-joined',handleNewUserJoined)
      socket.on('incoming-call',handleIncommingCall)
      return ()=>{
        socket.off('user-joined',handleNewUserJoined)
      socket.off('incoming-call',handleIncommingCall)
      }
  },[handleNewUserJoined,handleIncommingCall, socket])
  return (
    <div className='room-page-container'>
      
    </div>
  )
}

export default RoomPage
