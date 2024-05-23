const MongoClient = require('mongodb').MongoClient; // 몽고db sdk 패키지에 존재하는 MongoClient 클래스 불러오기

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.w79twdx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url); // MongoClient 인스턴스 생성

  try {
    await client.connect(); // express와 몽고디비 연결
    const db = client.db();
    const result = await db.collection('products').insertOne(newProduct); // 데이터베이스 products 컬렉션에 newProduct 문서 생성
  } catch (error) {
    return res.json({ message: '데이터를 저장할 수 없습니다.' });
  }
  client.close(); // express와 몽고디비 연결 종료

  res.json({
    message: '성공적으로 상품을 생성했습니다.',
    product: newProduct,
  });
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);

  let products;
  try {
    await client.connect();
    const db = client.db();
    products = await db.collection('products').find().toArray();
  } catch (error) {
    return res.json({ message: '상품을 찾을 수 없습니다.' });
  }
  client.close();

  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
