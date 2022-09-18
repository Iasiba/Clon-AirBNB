const users=require("../models/user.model")
const roleAdminMiddleware = async (req, res, next) => {
    /*const user= await users.findOne(
        {where : {id:req.user.id}}
    )
    .then((response)=>{
        const rol = response.roleId
    })
    .catch(()=>res.status(401).json({status: 'error', message: 'User not authorized to make this request'}))
    */

    console.log(req.user.id)
    const rol = req.user.rol
    if(rol === '5ee551ed-7bf4-44b0-aeb5-daaa824b9473'){//admin ID
        next()
    }else { 
        res.status(401).json({status: 'error', message: 'User not authorized to make this request'})
    }
}
exports.roleAdminMiddleware = roleAdminMiddleware