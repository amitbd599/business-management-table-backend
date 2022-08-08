const productModel = require("../model/productModel");

exports.productList = async (req, res) => {
  try {
    let pageNo = Number(req.params.pageNo);
    let perPage = Number(req.params.perPage);
    let searchValue = req.params.searchKeyword;
    let skipRow = (pageNo - 1) * perPage;
    let data;

    if (searchValue !== "0") {
      let SearchRgx = { $regex: searchValue, $options: "i" };
      let SearchQuery = {
        $or: [{ name: SearchRgx }, { category: SearchRgx }],
      };

      data = await productModel.aggregate([
        {
          $facet: {
            Total: [{ $match: SearchQuery }, { $count: "count" }],
            Rows: [
              { $match: SearchQuery },
              { $skip: skipRow },
              { $limit: perPage },
            ],
          },
        },
      ]);
    } else {
      data = await productModel.aggregate([
        {
          $facet: {
            Total: [{ $count: "count" }],
            Rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    }

    res.status(200).json({ status: "Success", data: data });
  } catch (e) {
    res.status(200).json({ status: "Fail", error: e });
  }
};
