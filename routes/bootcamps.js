const express = require('express');
// kita perlu inisialisasi rutes dari express
const router = express.Router();

// karena sudah di inisialisasi di server /api/v1/bootcamps
// maka data disini tidak dipanggil panjang lagi lebih ringkas cukup / atau /:id saja
router.get('/',(req, res)=>{
    res.status(200)
       .json({success: true,
              data: 'Show all Data bootcamps'})
})

router.get('/:id',(req, res)=>{
    res.status(200)
       .json({success: true,
              data: `Show Single Data bootcamps ${req.params.id}`})
})

router.post('/',(req, res)=>{
    res.status(200)
       .json({success: true,
              data: `Add Data bootcamps`})
})

router.put('/:id',(req, res)=>{
    res.status(200)
       .json({success: true,
              data: `Update Data bootcamps ${req.params.id}`})
})

router.delete('/:id',(req, res)=>{
    res.status(200)
       .json({success: true,
              data: `Show all Data bootcamps ${req.params.id}`})
})

module.exports = router;