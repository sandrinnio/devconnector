const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const User = require('../../modules/User')
const Post = require('../../modules/Post')
const Profile = require('../../modules/Profile')

router.post('/', [auth, [
  check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  try {
    const user = await User.findById(req.user._id).select('-password')

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user._id
    })

    const post = await newPost.save()

    res.json(post)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 })

    res.json(posts)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) return res.status(404).json({ msg: 'Post not found' })

    res.json(post)
  } catch (error) {
    console.error(error.message)
    if (error.kind === 'ObjectId') return res.status(404).json({ msg: 'Post not found' })
    res.status(500).send('Server Error')
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) return res.status(404).json({ msg: 'Post not found' })

    if (post.user.toString() !== req.user._id) return res.status(401).json({ msg: 'User not authorized' })

    await post.remove()

    res.json({ msg: 'Post removed' })
  } catch (error) {
    console.error(error.message)
    if (error.kind === 'ObjectId') return res.status(404).json({ msg: 'Post not found' })
    res.status(500).send('Server Error')
  }
})

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (post.likes.filter(like => like.user.toString() === req.user._id).length > 0) return res.status(400).json({ msg: 'Post already liked' })

    post.likes.unshift({ user: req.user._id })

    await post.save()

    res.json(post.likes)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (post.likes.filter(like => like.user.toString() === req.user._id).length === 0) return res.status(400).json({ msg: 'Post has not yet been liked' })

    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user._id)

    post.likes.splice(removeIndex, 1)

    await post.save()

    res.json(post.likes)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

router.post('/comment/:id', [auth, [
  check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  try {
    const user = await User.findById(req.user._id).select('-password')
    const post = await Post.findById(req.params.id)

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user._id
    }

    post.comments.unshift(newComment)

    await post.save()

    res.json(post.comments)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

router.delete('/comment/:id/:commentId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const comment = post.comments.find(comment => comment.id === req.params.commentId)

    if (!comment) return res.status(404).json({ msg: 'Comment does not exist' })

    if (comment.user.toString() !== req.user._id) return res.status(401).json({ msg: 'User not authorized' })

    const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user._id)

    post.comments.splice(removeIndex, 1)

    await post.save()

    res.json(post.comments)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
