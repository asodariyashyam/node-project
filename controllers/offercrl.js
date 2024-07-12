const offerModel=require('../models/offer_model');

const add_offer = (req,res)=>{
    return res.render('add_offer')
}

const offerInsertData=async(req,res)=>{
    try{
        req.body.status = true;
        await offerModel.create(req.body);
        req.flash('success',"add offer data success");
        return res.redirect("back");
    }catch{
        req.flash('error',"add offer data not insert!!");
        return res.redirect("back");
    }
}

const view_offer =async(req,res)=>{
    var search="";
    if(req.query.search){
        search=req.query.search;
    }

    

    let allData=await offerModel.find({
        $or:[
            {icon: {$regex:search, $options:'i'}},
            {title: {$regex:search, $options:'i'}}
        ]
    }).countDocuments();

    const  offerData =await offerModel.find({
        $or:[
            {icon: {$regex:search, $options:'i'}},
            {title: {$regex:search, $options:'i'}}
        ]
    })
    
    .skip()
    .limit()
    return res.render('view_offer',{
        offerData:offerData,
        search : search,
    })
}

const deleteOfferRecord = async (req, res) => {
    try {
        const deleteOffer = await offerModel.findById(req.params.id);

       

        await offerModel.findByIdAndDelete(req.params.id);

        req.flash('success', 'Deleted data successfully');
        return res.redirect('back');
    } catch (err) {
        console.error(`Failed to delete offer: ${err}`);
        req.flash('error', 'Failed to delete data');
        return res.redirect('/admin/offer/view_offer');
    }
};


const deactive=async(req,res)=>{
    let deactiveData=await offerModel.findByIdAndUpdate(req.params.id ,{status:false})
    if(deactiveData){
        req.flash('success',"slider Deactivated Successfully");
        return res.redirect('back')
    }

 }

 const active=async(req,res)=>{
    let deactiveData=await offerModel.findByIdAndUpdate(req.params.id ,{status:true})
    if(deactiveData){
        req.flash('success',"slider activated Successfully");
        return res.redirect('back')
    }

 }

module.exports={
   add_offer ,offerInsertData ,view_offer ,active ,deactive, deleteOfferRecord
}