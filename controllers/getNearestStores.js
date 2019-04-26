const getNearestStores = (req, res) => {
  console.log('called getNearestStores, body: ', req.body);
  res.status(200).json(req.body);
};

export default getNearestStores;
