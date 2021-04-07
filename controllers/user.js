const index=(req,res)=>{
    return res.status(200).json({
        message:'you request to user handle.' 
    })
}

module.exports={
    index
}