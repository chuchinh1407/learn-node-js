/**
 * 3 cach ket noi voi monggoose
 * +callback
 * +Promise
 * +Async/await(Promises)
 */

const User=require('../modal/User');


// const index=(req,res,next)=>{
// //tim tat ca cac record trong bang
//     User.find({},(err,users)=>{
//      if(err) next(err);
//      return res.status(200).json({users})
//     })
   
// }
//dung promise
const index=(req,res,next)=>{
    //tim tat ca cac record trong bang
       User.find({}).then(user=>{
        return res.status(200).json({user})
       }).catch((err)=>next(err))
    }

// const newUser=(req,res,next)=>{
//     console.log('req.body content',req.body);
//     //create object model

//     const newUser=new User(req.body);
//     console.log('newUser',newUser);
//     //luu trong db
//     newUser.save((err,user)=>{
//         console.log('error',err);
//         console.log('user save',user);
//         return res.status(201).json({
//             user
//         })

//     })
// }

const newUser=(req,res,next)=>{
    console.log('req.body content',req.body);
    //create object model

    const newUser=new User(req.body);
    console.log('newUser',newUser);
    //luu trong db
    newUser.save().then(user=>{
        return res.status(201).json({
            user
        })
    }).catch(err=>{
        next(err);
    })
}


module.exports={
    index,
    newUser
}