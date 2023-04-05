const Sequelize=require("sequelize")
const sequelize=require("../util/database")

const CreateGroup=sequelize.define("group",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name:{
        type:Sequelize.STRING,
        allowNull: false
    }
})
module.exports=CreateGroup