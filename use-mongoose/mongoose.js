const mongoose = require('mongoose');

// 모델 불러오기, 모델은 생성자 함수
const Product = require('./models/product');

// mongoose로 express와 mongoDB 연결
// mongoose가 알아서 효율적으로 연결을 관리.
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.w79twdx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log('데이터베이스에 연결되었습니다.');
  })
  .catch(() => {
    console.log('데이터베이스에 연결 실패');
  });

const createProduct = async (req, res, next) => {
  // 모델을 정의해놔서 상품 스키마가 무엇인지 확인 가능
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  // mongoDB에서 문서에 저장하기전에 자동으로 id 넣어줌
  // _id 대신 id 게터 제공해서 id 프로퍼티도 접근 가능. id 프로퍼티는 문자열. _id 프로퍼티는 객체.
  console.log(createdProduct); // { name: '마우스', price: 2000, _id: new ObjectId('664f41c20539bb8255be5f71') }
  // mongoose에서 제공하는 모델을 사용하면 save 메서드와 같은 로직 사용 가능. (모델의 인스턴스이기 때문)
  const result = await createdProduct.save();

  res.json(result);
};

const getProducts = async (req, res, next) => {
  // 여기서의 find 메서드는 배열을 반환해서 toArray 안해줘도됨.
  // cursor를 반환하고 싶다면 뒤에 find().cursor 붙이면 됨.
  // find는 프로미스를 반환하지 않고 프로미스 비슷한거를 반환하기 때문에 async/await 구문을 사용하기 위해 exec 메서드 사용.
  const products = await Product.find().exec();

  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
