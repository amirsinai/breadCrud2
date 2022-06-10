const express = require("express");
const breads = express.Router();
const Bread = require("../models/bread.js");
const Baker = require("../models/baker.js");

// INDEX
breads.get("/", (req, res) => {
  // console.log(Bread);

  Bread.find().then((foundBreads) => {
    // console.log(foundBreads);
    res.render("index", {
      breads: foundBreads,
      title: "Index Page",
    });
  });
});

// NEW
breads.get("/new", (req, res) => {
  Baker.find().then((foundBakers) => {
    res.render("new", {
      bakers: foundBakers,
    });
  });
});

// EDIT
// breads.get("/:indexArray/edit", (req, res) => {
//   res.render("edit", {
//     bread: Bread[req.params.indexArray],
//     index: req.params.indexArray,
//   });
// });

breads.get("/:indexArray/edit", (req, res) => {
  Baker.find().then((foundBakers) => {
    Bread.findById(req.params.indexArray).then((foundBread) => {
      res.render("edit", {
        bakers: foundBakers,
        bread: foundBread,
      });
    });
  });
});

// SHOW
breads.get("/:id", (req, res) => {
  Bread.findById(req.params.id)
    .populate("baker")
    .then((foundBread) => {
      const bakedBy = foundBread.getBakedBy();
      console.log(bakedBy);
      res.render("Show", { bread: foundBread });
    });
  // if (Bread[req.params.arrayIndex]) {
  //   res.render("Show", {
  //     bread: Bread[req.params.arrayIndex],
  //     index: req.params.arrayIndex,
  //   });
  // } else {
  //   res.render("404", {
  //     arrayIndex: req.params.arrayIndex,
  //   });
  // }
});

// CREATE
breads.post("/", (req, res) => {
  // if (!req.body.image) {
  //   req.body.image =
  //     "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";
  // }

  // if (req.body.hasGluten === "on") {
  //   req.body.hasGluten = true;
  // } else {
  //   req.body.hasGluten = false;
  // }

  // Bread.push(req.body);
  // res.redirect("/breads");

  console.log(req.body);
  if (!req.body.image) {
    req.body.image = undefined;
  }

  if (req.body.hasGluten == "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }

  Bread.create(req.body);
  res.redirect("/breads");
});

// UPDATE
breads.put("/:arrayIndex", (req, res) => {
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  Bread.findByIdAndUpdate(req.params.arrayIndex, req.body, { new: true }).then(
    (updatedBread) => {
      // console.log(updatedBread);
      res.redirect(`/breads/${req.params.arrayIndex}`);
    }
  );
});

// DELETE
// breads.delete("/:indexArray", (req, res) => {
//   console.log("did this do anything");
//   Bread.splice(req.params.indexArray, 1);
//   res.status(303).redirect("/breads");
// });

breads.delete("/:indexArray", (req, res) => {
  Bread.findByIdAndDelete(req.params.indexArray).then((deletedBread) => {
    res.status(303).redirect("/breads");
  });
});

module.exports = breads;
