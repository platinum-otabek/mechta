const Product = require('../models/product');

exports.addProduct = async (req,res) => {

    const urls = []
    const files = req.files;
    for (const file of files) {
        const { path } = file;
        urls.push(path) ;
    }

    const product = new Product({
        nameUz: req.body.nameUz,
        nameRu: req.body.nameRu,
        pid: Date.now(),
        category: req.body.category,
        size: req.body.size,
        netto: req.body.netto,
        diametr: req.body.diametr,
        diz: req.body.diz,
        pok: req.body.pok,
        descriptionUz: req.body.descriptionUz,
        descriptionRu: req.body.descriptionRu,
        xarakterUz: req.body.xarakterUz,
        xarakterRu: req.body.xarakterRu,
        video: req.body.video,
        instruksiyaUz: req.body.instruksiyaUz,
        instruksiyaRu: req.body.instruksiyaRu,
        images: urls,
        price: req.body.price,
        date: Date.now()
    });

    product.save()
        .then(result => {
            res.status(200).json({
                message: "Ушпешно добавления"
            })
        });
}

exports.getProduct = async (req,res)=>{
    const product = await Product.find().sort({date: -1});
    res.send(product);

}
exports.getById = async (req,res) => {
    const getProduct = await Product.findById({_id:req.params.id});
    res.send(getProduct);
}
exports.deleteProduct = (req,res) => {
    Product.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.json({message: "Этот был удален"});
        } else {
            console.log("Error" + err);
        }
    });
}
