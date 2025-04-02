exports.home = (req, res, next) => {
    try {
      console.log("Chatbot backend Running");
      res.send("Chatbot backend Running");
    } catch (error) {
      next(error);
    }
  };
  