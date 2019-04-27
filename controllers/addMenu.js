const addMenu = (req, res) => {
  console.log('called addMenu with body: ', req.body);
  res.status(200).json(req.body);
};

export default addMenu;
