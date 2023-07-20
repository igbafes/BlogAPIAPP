const validate = require("../validators/Joi_validator");
const handleError = require("../handleErrors/handleError");
const { blogPost } = require("../models/dbschema");

const updatePosts = async (req, res) => {
  const { error, value } = validate.updatePostVAlidate(req.body);
  if (error) {
    const errors = handleError.JoiErrorHandler(error);
    res.status(403).send(errors);
  } else {
    try {
      const post = await blogPost.findById({ _id: value.Post_Id });

      if (post) {
        await blogPost.updateOne(
          { _id: value.Post_Id },
          {
            Title: value.Title,
            Contents: value.Content,
            oldTitle: post.Title,
            oldContent: post.Contents,
            updatedAt: new Date(),
          }
        );
        res.status(201).send(" Post Updated successfully");
      } else {
        res.status(201).send("Post doesn't exist or already deleted.");
      }
    } catch (error) {
      console.log(error);
      res.status(403).json({ error });
    }
  }
};
module.exports = updatePosts;
