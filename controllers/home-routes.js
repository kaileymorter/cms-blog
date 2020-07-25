const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
    attributes: [
        'id',
        'title',
        'content',
        'created_at',
    ],
    include: [
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
            {
            model: User,
            attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts });

    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/', (req, res) => {
    res.render('homepage', {
        id: 1,
        title: 'Handlebars Docs',
        content: 'This blog post is about the handlebars docs.',
        created_at: new Date(),
        comments: [{}, {}],
        user: {
          username: 'test_user'
        }
      });
});

module.exports = router;