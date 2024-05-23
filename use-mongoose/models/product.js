const mongoose = require('mongoose');

// 상품의 청사진이되는 스키마 정의
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

// 스키마에 기반한 모델 생성 후 내보내기
module.exports = mongoose.model('Product', productSchema);
