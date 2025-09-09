"use client"
import React, { useEffect, useState } from 'react'

const Page = () => {

    useEffect(() => {

        fetch('/api/chat',{method : 'GET'})
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })

    },[])
    
  return (
    <div>inner chat route</div>
  )
}

export default Page