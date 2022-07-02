import React, { useEffect } from 'react'

export default function UserStatistics() {

  useEffect(() => {
    const storageString = localStorage.getItem('userStats');
    // console.log("storageString:", storageString);

    if(!storageString) return;

    const history = JSON.parse(storageString).filter((game:any) => {
      return game.hasFinished
    });

    console.log("finished history:", history);
    
    
  }, [])

  return (
    <div className="statistics">UserStatistics</div>
  )
}
