const random = ((num)=>{
    let nums = []
    for(i=0;i<1000000 ;i++){
        nums.push(Math.round((Math.random()) * (1000 - 0 ) + 0))
        
    }
    const numPush = {}
    for(i=1;i<1001;i++){
        numPush[i] = nums.filter((el)=>i === el).length
    }
    console.log(numPush)
    return (numPush)
})

const numerosRandom = random()

process.send(numerosRandom)