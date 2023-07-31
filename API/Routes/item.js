const Item = require('../Models/lostItem');
const router = require('express').Router();

router.post("/",async(req,res)=>{
    const newItem = new Item(req.body);
    try{
        const savedItem = await newItem.save();
        res.status(200).json(savedItem);
    }
    catch(err){
        res.status(500).json({error:true,message:`Internal server Error ${err}`});
        console.log(err);
    };
});



router.get("/",async(req,res)=>{
    try{
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 20;
    let sort = req.query.sort || "asc";
    let block = req.query.block || "All";
    const search = req.query.search || "";
    let category = req.query.category || "All";
    let returned = req.query.returned || "All";
    const blockOptions = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "Others"
    ];

    const categoryOptions = [
        "id card",
        "electroninc items",
        "keys",
        "personal belongings",
        "sports",
        "stationaries",
        "other"
    ];

    category === "All"
        ? (category = [...categoryOptions])
        :(category = req.query.category.split(","));
    
    returned === "All"
        ? (returned = [true,false])
        : returned = [req.query.returned]
    block === "All" 
       ? (block = [...blockOptions])
        : (block = req.query.block.split(","));
    req.query.sort ? (sort = req.query.sort.split(",")) : sort=[sort];
    let sortBy={};
    if(sort[1]){
        sortBy[sort[0]] = sort[1];
    }
    else{
        sortBy[sort[0]] = "asc";
    }
    const items = await Item.find({
        item:{$regex:search,$options:"i"},
    }).where("block")
    .in([...block]).
    where("category").in([...category]).
    where("found").in([...returned])
    .sort(sortBy)
    .skip(page*limit)
    .limit(limit);

    const count = await Item.countDocuments({
        item:{$regex:search,$options:"i"},
        block:{$in:[...block]},
        found:false
    });  
    res.status(200).json({
        error:false,
        items:items,
        page:page+1,
        limit:limit,
        count:count
    });
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});

router.get("/find/:id",async(req,res)=>{

    try {
        const item = await Item.findById(req.params.id);
        res.status(200).json({
            error:false,
            item:item
        });
    } catch (error) {
        console.log(error);
    }
})

router.put("/update/:id",async(req,res)=>{
    try {
        const item = await Item.findByIdAndUpdate(req.params.id,{
            found:req.body.found,
            returnedTo:req.body.returnedTo,
            emailOfReturned:req.body.emailOfReturned
        });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({
            error:true,
            message:"Error" + error
        })
    }
})

module.exports = router;