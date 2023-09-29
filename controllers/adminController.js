const fs = require("fs")
const Tour = require("../models/tourModel")

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find()
    res.render("tours/index.ejs", {
      tours,
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
    console.log(req.body)
    await Tour.create(req.body)
    res.redirect("/dashboard")
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(
      req.params.id
    )

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "success",
      message: err.message,
    })
  }
}

const editTour = async (req, res) => {
  try {
    const id = req.params.id

    const tour = await Tour.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    )

    res.status(201).json({
      status: "success",
      data: {
        tour: tour,
      },
    })
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

    const tour = await Tour.findByIdAndRemove(id)

    // validator
    if (!tour) {
      return res.status(400).json({
        status: "failed",
        message:
          "data with this id is not define",
      })
    }

    res.status(201).json({
      status: "success",
      message: "data sudah berhasil di hapus",
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

module.exports = {
  getAllTours,
  createPage,
  getTourById,
  createTour,
  editTour,
  removeTour,
}
