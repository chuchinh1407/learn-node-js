/**
 * 3 cach ket noi voi monggoose
 * +callback
 * +Promise
 * +Async/await(Promises)
 */

const User = require('../modal/User');
const Deck = require('../modal/Deck')
const Joi=require('@hapi/joi');
const idSchema=Joi.object().keys({
    userID:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
})
const getUser = async (req, res, next) => {
    const { userID } = req.value.params;
    const user = await User.findById(userID);
    return res.status(200).json({
        user
    })
}
const getUserDecks = async (req, res, next) => {
    const{userID}=req.params;
    const user=await User.findById(userID).populate('decks');
    return res.status(200).json({
        decks:user.decks
    })
}

const replaceUser = async (req, res, next) => {
    //enforce new user to old user
    const { userID } = req.params;

    const newUser = req.body;

    const result = await User.findByIdAndUpdate(userID, newUser);

    return res.status(200).json({
        success: true
    })
}

const updateUser = async (req, res) => {
    //number of fields

}
// const index=(req,res,next)=>{
// //tim tat ca cac record trong bang
//     User.find({},(err,users)=>{
//      if(err) next(err);
//      return res.status(200).json({users})
//     })

// }
//dung promise
// const index=(req,res,next)=>{
//     //tim tat ca cac record trong bang
//        User.find({}).then(user=>{
//         return res.status(200).json({user})
//        }).catch((err)=>next(err))
//     }

const index = async (req, res, next) => {
    const users = await User.find({})
    return res.status(200).json({ users });
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

// const newUser=(req,res,next)=>{
//     console.log('req.body content',req.body);
//     //create object model

//     const newUser=new User(req.body);
//     console.log('newUser',newUser);
//     //luu trong db
//     newUser.save().then(user=>{
//         return res.status(201).json({
//             user
//         })
//     }).catch(err=>{
//         next(err);
//     })
// }

const newUser = async (req, res, next) => {
    try {
        const newUser = new User(req.value.body)
        await newUser.save();
        return res.status(201).json({
            user: newUser
        })
    } catch (error) {
        next(error)
    }
}


const newUserDeck = async (req, res, next) => {
    const { userID } = req.params;

    //create newDeck

    const newDeck = new Deck(req.body);

    //get user

    const user = await User.findById(userID);

    //gan user vao deck

    newDeck.owner = user;

    //save deck
    await newDeck.save();

    //add deck vua luu vao cai user deck array

    user.decks.push(newDeck._id);

    await user.save();

    return res.status(201).json({
        deck: newDeck

    })
}



module.exports = {
    index,
    newUser,
    getUser,
    updateUser,
    replaceUser,
    getUserDecks,
    newUserDeck
}