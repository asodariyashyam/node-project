const slider= require('../models/slider-model');
const path = require('path');
const fs = require('fs')

const add_slider = (req,res)=>{
    return res.render('add_slider')
}

const sliderInsertData= async(req,res) =>{  
    try {
        console.log(req.body)
    console.log(req.file);

    var img = "";
    if (req.file) {
        img = slider.sliderimgpath + "/" + req.file.filename;
    }
    
    req.body.sliderimage = img;
    req.body.status = true;
 
    await slider.create(req.body);
    req.flash('success',"add slider data success");
    return res.redirect("back");
    }catch{

    }
    
}

const view_slider=async(req,res)=> {
    var search="";
    if(req.query.search){
        search=req.query.search;
    }
   

    let allData=await slider.find({}).countDocuments();

    const  slidersData =await slider.find({
        $or:[
            {title: {$regex:search, $options:'i'}}
        ]
    })
    .skip()
    .limit()
    return res.render('view_slider',{
        slidersData:slidersData,
        search :search,
    })
}

const deactive=async(req,res)=>{
    let deactiveData=await slider.findByIdAndUpdate(req.params.id ,{status:false})
    if(deactiveData){
        req.flash('success',"slider Deactivated Successfully");
        return res.redirect('back')
    }

 }

 const active=async(req,res)=>{
    let deactiveData=await slider.findByIdAndUpdate(req.params.id ,{status:true})
    if(deactiveData){
        req.flash('success',"slider activated Successfully");
        return res.redirect('back')
    }

 }
 const deleteSliderRecord = async (req, res) => {
    try {
        const deleteSlider = await slider.findById(req.params.id);

        if (deleteSlider) {
            const ipath = path.join(__dirname, '..', deleteSlider.sliderimage);
            try {
                await fs.unlink(sliderimgpath);
            } catch (err) {
                console.error(`Failed to delete image file: ${err}`);
            }
        }

        await slider.findByIdAndDelete(req.params.id);

        req.flash('success', 'Deleted data successfully');
        return res.redirect('back');
    } catch (err) {
        console.error(`Failed to delete slider: ${err}`);
        req.flash('error', 'Failed to delete data');
        return res.redirect('/admin/slider/view_slider');
    }
};

module.exports={
    add_slider , sliderInsertData , view_slider ,deactive ,active,deleteSliderRecord
}