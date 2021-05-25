const Post = require("../model/post");

exports.post = async (req, res) => {
  const post = new Post({
    post: req.body.post,
    userId: req.session.user,
    username: req.body.username,
    details: req.body.details,
  });

  try {
    Post.create(post, (err, data) => {
      if (err) {
        console.log("err", err);
        return res.send(err).status(400);
      } else {
        return res.json(data).status(201);
      }
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

exports.like = async (req, res) => {
  const post = await Post.findOne({ _id: req.body.id }).then((response) => {
    if (response.likes.includes(req.session.user)) {
      Post.updateOne(
        { _id: req.body.id },
        { $pull: { likes: req.session.user } },
        function (err, data) {
          if (err) {
            return res.json(err);
          }
          return res.json("unliked");
        }
      );
    } else {
      Post.updateOne(
        { _id: req.body.id },
        { $push: { likes: req.session.user } },
        function (err, data) {
          if (err) {
            return res.json(err);
          }
          return res.json("liked");
        }
      );
    }
  });
};

exports.comment = async (req, res) => {
  const post = await Post.findOne({ _id: req.body.id });
  if (post) {
    await Post.updateOne(
      { _id: req.body.id },
      {
        $push: { comments: { comment: req.body.comment, user: req.body.user } },
      },
      function (err, data) {
        if (err) {
          console.log(err);
          return res.json("no");
        }
        req.body = null;
      }
    );
    return res.json("done");
  }
  return res.json("no");
};

exports.getAll = async (req, res) => {
  const post = await Post.find({}).sort({ _id: -1 });
  let newPost = post.map((pet) => ({
    _id: pet.id,
    likes: pet.likes,
    comments: pet.comments,
    userId: pet.userId,
    username: pet.username,
    post: pet.post,
  }));
  return res.json(post.slice(req.body.min, req.body.max));
};

exports.get = async (req, res) => {
  const post = await Post.findOne({ _id: req.body.id });
  if (post) {
    return res.json(post);
  }
  return res.json(false);
};
