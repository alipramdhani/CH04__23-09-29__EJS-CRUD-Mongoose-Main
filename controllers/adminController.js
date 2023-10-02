const Tour = require("../models/tourModel")

const toursPage = async (req, res) => {
  try {
    const { price, name, rating } = req.query

    const condition = {}
    if (price)
      condition.price = { $gt: req.query.price }
    if (name)
      condition.name = {
        $regex: ".*" + name.toLowerCase() + ".*",
      }
    if (rating)
      condition.rating = { $gt: req.query.rating }

    const tours = await Tour.find().where(
      condition
    )

    res.render("tours/index.ejs", {
      tours,
      message: req.flash("message", ""),
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const createPage = async (req, res) => {
  try {
    res.render("tours/create.ejs")
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const createTour = async (req, res) => {
  try {
    await Tour.create(req.body)
    req.flash("message", "Ditambah")
    res.redirect("/dashboard")
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const editPage = async (req, res) => {
  try {
    const tour = await Tour.findById(
      req.params.id
    )
    res.render("tours/edit.ejs", {
      tour,
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const editTour = async (req, res) => {
  try {
    const id = req.params.id
    await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    req.flash("message", "Diupdate")
    res.redirect("/dashboard")
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const removeTour = async (req, res) => {
  try {
    const id = req.params.id
    await Tour.findByIdAndRemove(id)
    req.flash("message", "Dihapus")
    res.redirect("/dashboard")
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

module.exports = {
  toursPage,
  createPage,
  createTour,
  editPage,
  editTour,
  removeTour,
}
