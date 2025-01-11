const IncomeSchema = require("../models/incomeModel.js");

exports.addIncome = async (req, res) => {
    const {title,amount,category,description,date}=req.body
    // res.send('Income added successfully');

    const income=IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    })
    try {
        //validations
        if(!title || !description || !category || !date) return res.status(400).json({message:'all fields are required'})
        if(amount<=0 || !amount==='number') return res.status(400).json({message:'amount must be a positive number'})
        await income.save()
        // Send a success message if the income was added successfully
        res.status(201).json({ message: 'Income added successfully!', data: income });
    } catch (error) {
        res.status(400).json({ message: 'Failed to add income', error: error.message });
    }
    console.log(income)
};

//get incomes
exports.getIncomes=async (req,res) => {
    try{
        const incomes=await IncomeSchema.find().sort({createdAt:-1})
        res.status(200).json(incomes)
    }
    catch(error){
        res.status(500).json({message:'Server error',error:error.message});
    }
}


//delete incomes
exports.deleteIncome=async (req,res) => {
    const {id}=req.params;
    //console.log(req.params)  this will give id that has to be deleted
    IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
        res.status(200).json({message:'Income deleted successfully'});
    })
    .catch((error) => {
        res.status(500).json({message:'Server error',error:error.message});
    })
}
